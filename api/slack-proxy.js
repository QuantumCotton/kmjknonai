// Backend API endpoint for form submissions
// Handles text notifications and file attachments

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Endpoint URL from environment variables
    const ENDPOINT_URL = process.env.WEBHOOK_ENDPOINT_URL
    
    if (!ENDPOINT_URL) {
      throw new Error('Endpoint not configured')
    }
    
    const { messageData, attachments, customerInfo } = req.body

    // Send formatted notification
    const notificationResponse = await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData)
    })

    if (!notificationResponse.ok) {
      throw new Error(`Notification error: ${notificationResponse.status}`)
    }

    // Handle attachments if provided
    let uploadResults = []
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        try {
          // Send attachment info as follow-up message
          const attachmentMessage = {
            text: `📎 *File Received:* ${attachment.name}`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `📎 *File from ${customerInfo.name}*\n*File:* ${attachment.name}\n*Size:* ${formatFileSize(attachment.size)}\n*Type:* ${attachment.type || 'Unknown'}\n\n👉 _Customer uploaded this file_`
                }
              }
            ]
          }

          const attachmentResponse = await fetch(ENDPOINT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(attachmentMessage)
          })

          if (attachmentResponse.ok) {
            uploadResults.push({ success: true, fileName: attachment.name })
          } else {
            throw new Error(`Failed to send attachment notification`)
          }
        } catch (uploadError) {
          console.error('Failed to send attachment notification:', uploadError)
          uploadResults.push({ error: uploadError.message, fileName: attachment.name })
        }
      }
    }

    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Notification sent successfully',
      filesProcessed: uploadResults.length,
      results: uploadResults
    })

  } catch (error) {
    console.error('Backend proxy error:', error)
    res.status(500).json({ 
      error: 'Failed to send notification',
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
