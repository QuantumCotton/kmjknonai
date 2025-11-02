// Secure Slack Webhook Proxy
// This hides your webhook URL from the frontend

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Your webhook URL from environment variables (most secure)
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
    
    if (!SLACK_WEBHOOK_URL) {
      throw new Error('Slack webhook URL not configured in environment variables')
    }
    
    // Get the Slack payload from the request body
    const slackPayload = req.body

    // Send to Slack
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackPayload)
    })

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status}`)
    }

    // Return success response
    res.status(200).json({ success: true, message: 'Slack notification sent' })

  } catch (error) {
    console.error('Slack proxy error:', error)
    res.status(500).json({ 
      error: 'Failed to send Slack notification',
      message: error.message 
    })
  }
}
