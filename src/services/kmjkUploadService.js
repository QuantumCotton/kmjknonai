const UPLOAD_ENDPOINT = '/.netlify/functions/kmjk-upload-image'

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Upload request failed (${response.status})`)
  }

  return response.json()
}

export async function uploadChatPhoto(file, conversationId) {
  if (!file) {
    throw new Error('No file provided')
  }

  const meta = await postJson(UPLOAD_ENDPOINT, {
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    conversationId,
  })

  const uploadResponse = await fetch(meta.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  })

  if (!uploadResponse.ok) {
    const detail = await uploadResponse.text()
    throw new Error(detail || `Failed to upload file (${uploadResponse.status})`)
  }

  return {
    key: meta.key,
    fileUrl: meta.fileUrl,
    viewUrl: meta.viewUrl,
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
  }
}
