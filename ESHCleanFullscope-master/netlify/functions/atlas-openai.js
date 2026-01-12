const DEFAULT_OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-5-nano';

const resolveOpenAIUrl = () => {
  const direct = (process.env.OPENAI_API_URL || '').trim();
  if (direct) return direct;

  const base = (process.env.OPENAI_BASE_URL || '').trim();
  if (!base) return DEFAULT_OPENAI_URL;

  const normalized = base.replace(/\/+$/, '');
  if (/\/(v\d+|chat|responses)/i.test(normalized)) {
    return normalized;
  }

  return `${normalized}/v1/chat/completions`;
};

const getAuthHeader = (apiKey) => {
  const headerName = (process.env.OPENAI_API_KEY_HEADER || 'Authorization').trim();
  const prefix = process.env.OPENAI_API_KEY_PREFIX;
  const effectivePrefix = prefix === undefined ? 'Bearer ' : prefix;
  return { name: headerName, value: `${effectivePrefix || ''}${apiKey}` };
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing OPENAI_API_KEY' }) };
    }

    const OPENAI_API_URL = resolveOpenAIUrl();
    const authHeader = getAuthHeader(apiKey);

    const {
      systemPrompt = '',
      messages = [],
      temperature,
      maxTokens = 2000,  // Increased for GPT-5 reasoning models (need tokens for thinking + output)
      max_tokens = 0,
      max_completion_tokens = 0
    } = JSON.parse(event.body || '{}');

    const finalMaxTokens = max_completion_tokens || max_tokens || maxTokens;
    const useDefaultTemperature = typeof temperature !== 'number' || Number.isNaN(temperature) || temperature === 1;

    if (!Array.isArray(messages)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'messages must be an array' }) };
    }

    const preferredModel = process.env.OPENAI_MODEL || DEFAULT_MODEL;

    const openaiMessages = [
      { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content || '')
      }))
    ];

    async function callModel(model) {
      const res = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [authHeader.name]: authHeader.value
        },
        body: JSON.stringify({
          model,
          messages: openaiMessages,
          ...(useDefaultTemperature ? {} : { temperature }),
          max_completion_tokens: finalMaxTokens,
          verbosity: 'low'  // GPT-5 specific: keeps responses concise
        })
      });
      return res;
    }

    let usedModel = preferredModel;
    let response = await callModel(usedModel);
    if (!response.ok) {
      let errText = await response.text();
      const retriable = /model|does not exist|not found|invalid model/i.test(errText) || [400, 404].includes(response.status);
      if (retriable) {
        const fallbacks = (process.env.OPENAI_FALLBACK_MODELS || '').split(',').map(m => m.trim()).filter(Boolean);
        for (const fb of fallbacks) {
          if (!fb || fb === usedModel) continue;
          usedModel = fb;
          response = await callModel(usedModel);
          if (response.ok) break;
          errText = await response.text();
        }
      }

      if (!response.ok) {
        console.error('OpenAI error:', response.status, errText);
        return { statusCode: 502, body: JSON.stringify({ error: 'Upstream OpenAI error', detail: errText }) };
      }
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || '';
    
    // Log the full response for debugging
    console.log('GPT-5 full response:', JSON.stringify(data, null, 2));
    
    if (!text) {
      console.error('GPT-5 returned empty response. Full data:', data);
      // Return an error instead of a fallback message
      return { statusCode: 500, body: JSON.stringify({ 
        error: 'Model returned empty response', 
        model: usedModel,
        debug: data 
      }) };
    }

    return { statusCode: 200, body: JSON.stringify({ text, model: usedModel }) };
  } catch (err) {
    console.error('atlas-openai function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Function error' }) };
  }
};
