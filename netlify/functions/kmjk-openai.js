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

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Missing OPENAI_API_KEY environment variable.' }),
    }
  }

  try {
    const requestBody = JSON.parse(event.body || '{}')
    const { messages = [], systemPrompt, temperature = 0.4, maxTokens = 650 } = requestBody

    if (!Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'messages array is required' }),
      }
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: openAiMessages,
        temperature,
        max_tokens: maxTokens,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[kmjk-openai] OpenAI API error:', errorText)
      return {
        statusCode: response.status,
        headers: corsHeaders(),
        body: JSON.stringify({
          error: 'OpenAI API request failed',
          detail: errorText,
        }),
      }
    }

    const data = await response.json()
    const choice = data.choices?.[0]
    const text = choice?.message?.content?.trim()

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        text: text || "I'm here to help with your remodel! Let's talk details.",
        model,
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
