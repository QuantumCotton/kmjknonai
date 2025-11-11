export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: 'OK',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const requestBody = JSON.parse(event.body || '{}')
    const {
      messages = [],
      systemPrompt,
      temperature = 0.4,
      maxTokens = 2000,
      maxCompletionTokens,
    } = requestBody

    if (!Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'messages array is required' }),
      }
    }

    const apiKey = (process.env.OPENAI_API_KEY || '').trim()
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Missing OPENAI_API_KEY environment variable.' }),
      }
    }

    const DEFAULT_OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
    const DEFAULT_MODEL = 'gpt-5-mini'

    const resolveOpenAIUrl = () => {
      const direct = (process.env.OPENAI_API_URL || '').trim()
      if (direct) return direct

      const base = (process.env.OPENAI_BASE_URL || '').trim()
      if (!base) return DEFAULT_OPENAI_URL

      const normalized = base.replace(/\/+$/, '')
      if (/\/(v\d+|chat|responses)/i.test(normalized)) {
        return normalized
      }

      return `${normalized}/v1/chat/completions`
    }

    const getAuthHeader = (apiKey) => {
      const headerName = (process.env.OPENAI_API_KEY_HEADER || 'Authorization').trim()
      const prefix = process.env.OPENAI_API_KEY_PREFIX
      const effectivePrefix = prefix === undefined ? 'Bearer ' : prefix
      return { name: headerName, value: `${effectivePrefix || ''}${apiKey}` }
    }

    const OPENAI_TIMEOUT_MS = 45000

    const OPENAI_API_URL = resolveOpenAIUrl()
    const authHeader = getAuthHeader(apiKey)

    const preferredModel = (process.env.OPENAI_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL

    const openAiMessages = []

    if (systemPrompt) {
      openAiMessages.push({ role: 'system', content: systemPrompt })
    }

    messages.forEach((message) => {
      if (message && message.role && message.content) {
        openAiMessages.push({
          role: message.role,
          content: message.content,
        })
      }
    })

    const finalMaxTokens =
      typeof maxCompletionTokens === 'number'
        ? maxCompletionTokens
        : typeof maxTokens === 'number'
          ? maxTokens
          : undefined

    const useDefaultTemperature = typeof temperature !== 'number' || Number.isNaN(temperature) || temperature === 1

    const callModel = async (model) => {
      const payload = {
        model,
        messages: openAiMessages,
        verbosity: 'low',
      }

      if (typeof finalMaxTokens === 'number' && finalMaxTokens > 0) {
        payload.max_completion_tokens = finalMaxTokens
      }

      const disallowCustomTemperature = /gpt-5/i.test(model)

      if (!useDefaultTemperature && !disallowCustomTemperature) {
        payload.temperature = temperature
      }

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [authHeader.name]: authHeader.value,
        },
        body: JSON.stringify(payload),
      })

      return response
    }

    let usedModel = preferredModel
    let response = await callModel(usedModel)

    if (!response.ok) {
      let errorText = await response.text()
      const retriable =
        /model|does not exist|not found|invalid model/i.test(errorText) || [400, 404].includes(response.status)

      if (retriable) {
        const fallbacks = (process.env.OPENAI_FALLBACK_MODELS || '')
          .split(',')
          .map((entry) => entry.trim())
          .filter(Boolean)

        for (const fallback of fallbacks) {
          if (!fallback || fallback === usedModel) continue
          usedModel = fallback
          response = await callModel(usedModel)
          if (response.ok) break
          errorText = await response.text()
        }
      }

      if (!response.ok) {
        console.error('[kmjk-openai] OpenAI API error:', response.status, errorText)
        return {
          statusCode: 502,
          headers: corsHeaders(),
          body: JSON.stringify({ error: 'OpenAI API request failed', detail: errorText, model: usedModel }),
        }
      }
    }

    const data = await response.json()
    const choice = data.choices?.[0]
    const text = choice?.message?.content?.trim()

    if (!text) {
      console.error('[kmjk-openai] Empty response from OpenAI', data)
      return {
        statusCode: 500,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'OpenAI returned empty response', model: usedModel, debug: data }),
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        text,
        model: usedModel,
        usage: data.usage,
      }),
    }
  } catch (error) {
    console.error('[kmjk-openai] Unexpected error:', error)
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Unexpected server error', detail: error.message }),
    }
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}
