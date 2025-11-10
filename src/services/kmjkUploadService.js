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

  // Convert file to base64 for Cloudinary upload
  const base64File = await fileToBase64(file)
  
  // Update the payload with actual file data
  const uploadPayload = {
    ...meta.uploadPayload,
    file: base64File,
  }

  const uploadResponse = await fetch(meta.uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadPayload),
  })

  if (!uploadResponse.ok) {
    const detail = await uploadResponse.text()
    throw new Error(detail || `Failed to upload file (${uploadResponse.status})`)
  }

  const uploadResult = await uploadResponse.json()

  return {
    key: meta.key,
    fileUrl: meta.fileUrl,
    viewUrl: meta.viewUrl,
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
    cloudinaryPublicId: uploadResult.public_id,
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
