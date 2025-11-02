// Secure Slack Webhook Proxy with Image Upload Support
// This sends both text notifications and images to Slack via webhook

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Webhook URL from environment variables
    const WEBHOOK_URL = process.env.NOTIFICATIONS_WEBHOOK_URL
    
    if (!WEBHOOK_URL) {
      throw new Error('Notification webhook URL not configured in environment variables')
    }
    
    const { slackPayload, images, leadInfo } = req.body

    // Send formatted lead notification to Slack
    const notificationResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackPayload)
    })

    if (!notificationResponse.ok) {
      throw new Error(`Slack notification error: ${notificationResponse.status}`)
    }

    // Handle image uploads if provided (send as separate messages)
    let uploadResults = []
    if (images && images.length > 0) {
      for (const image of images) {
        try {
          // Send image info as follow-up message
          const imageMessage = {
            text: `📎 *Image Ready for Download:* ${image.name}`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `📎 *Image from ${leadInfo.name}*\n*File:* ${image.name}\n*Size:* ${formatFileSize(image.size)}\n*Type:* ${image.type || 'Unknown'}\n\n👉 _Customer uploaded this file - download link will be provided separately_`
                }
              }
            ]
          }

          const imageResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageMessage)
          })

          if (imageResponse.ok) {
            uploadResults.push({ success: true, fileName: image.name })
          } else {
            throw new Error(`Failed to send image notification`)
          }
        } catch (uploadError) {
          console.error('Failed to send image notification:', uploadError)
          uploadResults.push({ error: uploadError.message, fileName: image.name })
        }
      }
    }

    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Slack notification sent',
      imagesProcessed: uploadResults.length,
      uploadResults: uploadResults
    })

  } catch (error) {
    console.error('Slack proxy error:', error)
    res.status(500).json({ 
      error: 'Failed to send Slack notification',
      message: error.message 
    })
  }
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
