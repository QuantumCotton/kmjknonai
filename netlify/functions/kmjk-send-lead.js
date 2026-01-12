const WEB3FORMS_ACCESS_KEY = '8e63e7e3-ab53-43a9-80c5-ebc113c25912'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const SLACK_WEBHOOK_URL = process.env.WEBHOOK_ENDPOINT_URL

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
    const { leadData = {}, qualificationScore, conversationId, conversationDigest } = JSON.parse(event.body || '{}')

    const subject = buildSubject(leadData, qualificationScore, conversationId, conversationDigest)
    const htmlBody = buildHtmlEmail(leadData, qualificationScore, conversationId, conversationDigest)

    // Build the complete conversation transcript for the message field
    const fullTranscript = buildFullTranscript(leadData, qualificationScore, conversationId, conversationDigest)

    // Prepare Web3Forms payload
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', subject)
    formData.append('from_name', 'KMJK Chatbot Concierge')
    
    // Add lead data fields
    formData.append('lead_name', leadData.name || 'Not provided')
    formData.append('lead_email', leadData.email || 'Not provided')
    formData.append('lead_phone', leadData.phone || 'Not provided')
    formData.append('service_category', leadData.serviceCategory || leadData.projectType || 'Not provided')
    formData.append('timeline', leadData.timeline || 'Not provided')
    formData.append('budget', leadData.budget || 'Not provided')
    formData.append('zip_code', leadData.zip || 'Not provided')
    formData.append('qualification_score', String(qualificationScore ?? 'n/a'))
    formData.append('conversation_id', conversationId || 'n/a')
    
    // Add project summary
    if (leadData.projectSummary) {
      formData.append('project_summary', leadData.projectSummary)
    }
    
    // Add scope notes
    if (leadData.scopeNotes && leadData.scopeNotes.length > 0) {
      formData.append('scope_notes', leadData.scopeNotes.join('\n\n'))
    }
    
    // Add photo URLs
    if (leadData.photos && leadData.photos.length > 0) {
      const photoUrls = leadData.photos
        .map((photo, idx) => `Photo ${idx + 1}: ${photo.viewUrl || photo.fileUrl || photo.url || 'n/a'}`)
        .join('\n')
      formData.append('project_photos', photoUrls)
    }
    
    // Add conversation digest info if present
    if (conversationDigest) {
      formData.append('digest_reason', conversationDigest.reasonLabel || conversationDigest.reason || 'n/a')
      formData.append('started_at', conversationDigest.startedAt || 'n/a')
      formData.append('last_activity', conversationDigest.lastActivityAt || 'n/a')
      formData.append('message_count', String(conversationDigest.messageCount ?? 'n/a'))
    }
    
    // THE MOST IMPORTANT FIELD - Full conversation transcript
    formData.append('full_conversation_transcript', fullTranscript)
    formData.append('message', htmlBody)

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      console.error('[kmjk-send-lead] Web3Forms error:', result)
      return {
        statusCode: response.status || 500,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Failed to send via Web3Forms.', detail: result.message || 'Unknown error' }),
      }
    }

    // Also send to Slack if webhook is configured
    if (SLACK_WEBHOOK_URL) {
      try {
        await sendToSlack(leadData, qualificationScore, conversationId, conversationDigest)
      } catch (slackError) {
        console.error('[kmjk-send-lead] Slack notification failed (non-critical):', slackError)
        // Don't fail the request if Slack fails - Web3Forms is the primary notification
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ success: true }),
    }
  } catch (error) {
    console.error('[kmjk-send-lead] Unexpected error:', error)
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Unexpected server error', detail: error.message }),
    }
  }
}

async function sendToSlack(leadData, qualificationScore, conversationId, conversationDigest) {
  if (!SLACK_WEBHOOK_URL) return

  const sessionId = conversationId || 'unknown'
  const reason = conversationDigest?.reasonLabel || conversationDigest?.reason || 'chat_completed'
  const messageCount = conversationDigest?.messageCount ?? 0
  const duration = calculateDuration(conversationDigest?.startedAt, conversationDigest?.lastActivityAt)
  
  // Build formatted transcript for Slack
  let transcriptText = `*KMJK Atlas Chat Transcript*\n`
  transcriptText += `Session: \`${sessionId}\`\n`
  transcriptText += `Reason: \`${reason}\`\n`
  transcriptText += `Final: yes\n`
  transcriptText += `Messages: ${messageCount}\n`
  transcriptText += `Duration: ${duration}\n`
  transcriptText += `Part 1/1\n\n`
  
  // Add lead info if available
  if (leadData.name) {
    transcriptText += `*Lead:* ${leadData.name}\n`
  }
  if (leadData.email) {
    transcriptText += `*Email:* ${leadData.email}\n`
  }
  if (leadData.phone) {
    transcriptText += `*Phone:* ${leadData.phone}\n`
  }
  if (leadData.serviceCategory || leadData.projectType) {
    transcriptText += `*Service:* ${leadData.serviceCategory || leadData.projectType}\n`
  }
  if (leadData.budget) {
    transcriptText += `*Budget:* ${leadData.budget}\n`
  }
  if (leadData.timeline) {
    transcriptText += `*Timeline:* ${leadData.timeline}\n`
  }
  transcriptText += `*Score:* ${qualificationScore ?? 'n/a'}\n\n`
  
  // Add conversation transcript
  if (conversationDigest?.transcript && conversationDigest.transcript.length > 0) {
    conversationDigest.transcript.forEach((entry) => {
      const role = entry.role === 'assistant' ? '*Atlas*' : '*You*'
      transcriptText += `${role}: ${entry.content}\n`
    })
  }
  
  // Add photos if available
  if (leadData.photos && leadData.photos.length > 0) {
    transcriptText += `\n*Photos:*\n`
    leadData.photos.forEach((photo, idx) => {
      const url = photo.viewUrl || photo.fileUrl || photo.url
      if (url) {
        transcriptText += `${idx + 1}. ${url}\n`
      }
    })
  }

  const slackPayload = {
    text: transcriptText,
    username: 'KMJK Atlas Bot',
    icon_emoji: ':robot_face:',
  }

  const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slackPayload),
  })

  if (!slackResponse.ok) {
    throw new Error(`Slack webhook failed with status ${slackResponse.status}`)
  }
}

function calculateDuration(startedAt, lastActivityAt) {
  if (!startedAt || !lastActivityAt) return '<1m'
  
  try {
    const start = new Date(startedAt)
    const end = new Date(lastActivityAt)
    const diffMs = end - start
    const diffMin = Math.floor(diffMs / 60000)
    
    if (diffMin < 1) return '<1m'
    if (diffMin === 1) return '1m'
    return `${diffMin}m`
  } catch {
    return '<1m'
  }
}

function buildFullTranscript(leadData, qualificationScore, conversationId, conversationDigest) {
  const lines = []
  
  lines.push('=' .repeat(80))
  lines.push('COMPLETE CHATBOT CONVERSATION TRANSCRIPT')
  lines.push('=' .repeat(80))
  lines.push('')
  
  // Lead Information
  lines.push('LEAD INFORMATION:')
  lines.push(`  Name: ${leadData.name || 'Not provided'}`)
  lines.push(`  Email: ${leadData.email || 'Not provided'}`)
  lines.push(`  Phone: ${leadData.phone || 'Not provided'}`)
  lines.push(`  Service: ${leadData.serviceCategory || leadData.projectType || 'Not provided'}`)
  lines.push(`  Timeline: ${leadData.timeline || 'Not provided'}`)
  lines.push(`  Budget: ${leadData.budget || 'Not provided'}`)
  lines.push(`  ZIP Code: ${leadData.zip || 'Not provided'}`)
  lines.push(`  Qualification Score: ${qualificationScore ?? 'n/a'}`)
  lines.push(`  Conversation ID: ${conversationId || 'n/a'}`)
  lines.push('')
  
  // Project Details
  if (leadData.projectSummary) {
    lines.push('PROJECT SUMMARY:')
    lines.push(`  ${leadData.projectSummary}`)
    lines.push('')
  }
  
  if (leadData.scopeNotes && leadData.scopeNotes.length > 0) {
    lines.push('SCOPE NOTES:')
    leadData.scopeNotes.forEach((note, idx) => {
      lines.push(`  ${idx + 1}. ${note}`)
    })
    lines.push('')
  }
  
  if (leadData.photos && leadData.photos.length > 0) {
    lines.push('PROJECT PHOTOS:')
    leadData.photos.forEach((photo, idx) => {
      const url = photo.viewUrl || photo.fileUrl || photo.url || 'n/a'
      lines.push(`  ${idx + 1}. ${photo.name || 'Photo'}: ${url}`)
    })
    lines.push('')
  }
  
  // Conversation Transcript
  if (conversationDigest && conversationDigest.transcript && conversationDigest.transcript.length > 0) {
    lines.push('=' .repeat(80))
    lines.push('FULL CONVERSATION TRANSCRIPT')
    lines.push('=' .repeat(80))
    lines.push('')
    lines.push(`Started: ${conversationDigest.startedAt || 'n/a'}`)
    lines.push(`Last Activity: ${conversationDigest.lastActivityAt || 'n/a'}`)
    lines.push(`Total Messages: ${conversationDigest.messageCount ?? 0}`)
    lines.push(`Conversation Ended: ${conversationDigest.reasonLabel || conversationDigest.reason || 'n/a'}`)
    lines.push('')
    lines.push('-' .repeat(80))
    lines.push('')
    
    conversationDigest.transcript.forEach((entry, idx) => {
      const role = entry.role === 'assistant' ? '🤖 ATLAS (Bot)' : '👤 VISITOR'
      const timestamp = entry.timestamp || 'unknown time'
      const content = entry.content || '(no content)'
      
      lines.push(`Message ${idx + 1} | ${role} | ${timestamp}`)
      lines.push(content)
      lines.push('')
      lines.push('-' .repeat(80))
      lines.push('')
    })
  } else {
    lines.push('CONVERSATION TRANSCRIPT:')
    lines.push('  No transcript available (conversation may still be active)')
    lines.push('')
  }
  
  lines.push('=' .repeat(80))
  lines.push('END OF TRANSCRIPT')
  lines.push('=' .repeat(80))
  
  return lines.join('\n')
}

function buildSubject(leadData, qualificationScore, conversationId, conversationDigest) {
  if (conversationDigest) {
    const reason = conversationDigest.reasonLabel || conversationDigest.reason || 'Chat Digest'
    const name = leadData.name || 'Visitor'
    return `KMJK Chat Digest • ${reason} • ${name}`
  }

  const service = leadData.serviceCategory || leadData.projectType || 'Project Inquiry'
  const name = leadData.name || 'Unknown contact'
  const score = typeof qualificationScore === 'number' ? `• Score ${qualificationScore}` : ''
  return `KMJK Lead • ${service} • ${name} ${score}`.trim()
}

function buildHtmlEmail(leadData, qualificationScore, conversationId, conversationDigest) {
  const safe = (value) =>
    (value || '')
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const rows = [
    { label: 'Service', value: leadData.serviceCategory || leadData.projectType || 'n/a' },
    { label: 'Name', value: leadData.name || 'n/a' },
    { label: 'Email', value: leadData.email || 'n/a' },
    { label: 'Phone', value: leadData.phone || 'n/a' },
    { label: 'Timeline', value: leadData.timeline || 'n/a' },
    { label: 'Budget', value: leadData.budget || 'n/a' },
    { label: 'ZIP', value: leadData.zip || 'n/a' },
    { label: 'Qualification Score', value: qualificationScore ?? 'n/a' },
    { label: 'Conversation ID', value: conversationId || 'n/a' },
  ]

  const scopeList = (leadData.scopeNotes || [])
    .map((note) => `<li>${safe(note)}</li>`)
    .join('')

  const photoList = (leadData.photos || [])
    .map((photo, index) => {
      const href = safe(photo?.viewUrl || photo?.fileUrl || photo?.url || '')
      const label = safe(photo?.name || `Photo ${index + 1}`)
      return href
        ? `<li><a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a></li>`
        : `<li>${label}</li>`
    })
    .join('')

  const transcriptRows = (conversationDigest?.transcript || [])
    .map((entry, index) => {
      const role = safe(entry.role || 'unknown')
      const timestamp = safe(entry.timestamp || '')
      const content = safe(entry.content || '(no content)')
      return `
        <tr>
          <td style="vertical-align:top; padding: 6px 8px; border-bottom: 1px solid #e5e7eb;"><strong>${index + 1}.</strong></td>
          <td style="vertical-align:top; padding: 6px 8px; border-bottom: 1px solid #e5e7eb;">
            <div><strong>${role}</strong> <span style="color:#6b7280;">${timestamp}</span></div>
            <div style="margin-top:4px; white-space:pre-wrap;">${content}</div>
          </td>
        </tr>`
    })
    .join('')

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: Arial, Helvetica, sans-serif; color: #1f2933; }
      table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
      th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; }
      th { background: #f3f4f6; font-weight: 600; }
      ul { padding-left: 20px; }
    </style>
  </head>
  <body>
    <h2>${conversationDigest ? 'KMJK Concierge Chat Digest' : 'New KMJK Concierge Lead'}</h2>
    <table>
      <tbody>
        ${rows
          .map(
            (row) => `
            <tr>
              <th>${safe(row.label)}</th>
              <td>${safe(row.value)}</td>
            </tr>
          `
          )
          .join('')}
      </tbody>
    </table>

    ${leadData.projectSummary ? `<h3>Project Summary</h3><p>${safe(leadData.projectSummary)}</p>` : ''}

    ${scopeList ? `<h3>Scope Notes</h3><ul>${scopeList}</ul>` : ''}
    ${photoList ? `<h3>Project Photos</h3><ul>${photoList}</ul>` : ''}

    ${conversationDigest ? `
      <h3>Conversation Digest</h3>
      <p><strong>Reason:</strong> ${safe(conversationDigest.reasonLabel || conversationDigest.reason || 'n/a')}</p>
      <p><strong>Started At:</strong> ${safe(conversationDigest.startedAt || 'n/a')}</p>
      <p><strong>Last Activity:</strong> ${safe(conversationDigest.lastActivityAt || 'n/a')}</p>
      <p><strong>Total Messages:</strong> ${safe(conversationDigest.messageCount ?? 'n/a')}</p>
      ${transcriptRows
        ? `<table style="width:100%; margin-top:12px; border-collapse: collapse;">${transcriptRows}</table>`
        : '<p>No transcript available.</p>'}
    ` : ''}
  </body>
</html>`
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}
