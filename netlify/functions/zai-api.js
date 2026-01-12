// Z.AI API Proxy - Server-side handler
// This hides the API key and handles all Z.AI requests

export default async function handler(event, context) {
  const { ZAI_API_KEY } = process.env
  
  if (!ZAI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error: API key not set' })
    }
  }

  try {
    const body = JSON.parse(event.body)
    const { model, messages } = body

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US,en',
        'Authorization': `Bearer ${ZAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model || 'glm-4.7',
        messages
      })
    })

    const data = await response.json()

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
