const FROM_EMAIL = process.env.KMJK_LEAD_FROM || 'atlas@kmjk.pro'

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

  const apiKey = process.env.RESEND_API_KEY
  const recipientsEnv = process.env.KMJK_LEAD_RECIPIENTS

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Missing RESEND_API_KEY environment variable.' }),
    }
  }

  if (!recipientsEnv) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Missing KMJK_LEAD_RECIPIENTS environment variable.' }),
    }
  }

  try {
    const { leadData = {}, qualificationScore, conversationId, conversationDigest } = JSON.parse(event.body || '{}')

    const recipients = recipientsEnv
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean)

    if (recipients.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'KMJK_LEAD_RECIPIENTS must contain at least one email.' }),
      }
    }

    const subject = buildSubject(leadData, qualificationScore, conversationId, conversationDigest)
    const textBody = buildTextEmail(leadData, qualificationScore, conversationId, conversationDigest)
    const htmlBody = buildHtmlEmail(leadData, qualificationScore, conversationId, conversationDigest)

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: recipients,
        subject,
        html: htmlBody,
        text: textBody,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('[kmjk-send-lead] Resend error:', detail)
      return {
        statusCode: response.status,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Failed to send email via Resend.', detail }),
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

function buildTextEmail(leadData, qualificationScore, conversationId, conversationDigest) {
  const lines = []

  if (conversationDigest) {
    lines.push('KMJK Concierge Chat Digest')
  } else {
    lines.push('New KMJK Concierge Lead')
  }
  lines.push('')
  lines.push(`Service: ${leadData.serviceCategory || leadData.projectType || 'n/a'}`)
  lines.push(`Name: ${leadData.name || 'n/a'}`)
  lines.push(`Email: ${leadData.email || 'n/a'}`)
  lines.push(`Phone: ${leadData.phone || 'n/a'}`)
  lines.push(`Timeline: ${leadData.timeline || 'n/a'}`)
  lines.push(`Budget: ${leadData.budget || 'n/a'}`)
  lines.push(`ZIP: ${leadData.zip || 'n/a'}`)
  lines.push(`Qualification Score: ${qualificationScore ?? 'n/a'}`)
  lines.push(`Conversation ID: ${conversationId || 'n/a'}`)

  if (leadData.scopeNotes?.length) {
    lines.push('')
    lines.push('Scope Notes:')
    leadData.scopeNotes.forEach((note, index) => {
      lines.push(`${index + 1}. ${note}`)
    })
  }

  if (leadData.projectSummary) {
    lines.push('')
    lines.push('Project Summary:')
    lines.push(leadData.projectSummary)
  }

  if (leadData.photos?.length) {
    lines.push('')
    lines.push('Project Photos:')
    leadData.photos.forEach((photo, index) => {
      const label = photo?.name ? `${index + 1}. ${photo.name}` : `${index + 1}. Photo`
      const link = photo?.viewUrl || photo?.fileUrl || photo?.url || 'n/a'
      lines.push(`${label}: ${link}`)
    })
  }

  if (conversationDigest) {
    lines.push('')
    lines.push(`Digest Reason: ${conversationDigest.reasonLabel || conversationDigest.reason || 'n/a'}`)
    lines.push(`Started At: ${conversationDigest.startedAt || 'n/a'}`)
    lines.push(`Last Activity: ${conversationDigest.lastActivityAt || 'n/a'}`)
    lines.push(`Total Messages: ${conversationDigest.messageCount ?? 'n/a'}`)

    if (conversationDigest.transcript?.length) {
      lines.push('')
      lines.push('Conversation Transcript:')
      conversationDigest.transcript.forEach((entry, index) => {
        const stamp = entry.timestamp || 'unknown time'
        lines.push(`${index + 1}. [${entry.role}] ${stamp}`)
        lines.push(entry.content || '(no content)')
        lines.push('')
      })
    }
  }

  return lines.join('\n')
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
