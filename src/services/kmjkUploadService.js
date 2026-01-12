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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export async function uploadChatPhoto(file, conversationId) {
  if (!file) {
    throw new Error('No file provided')
  }

  try {
    // Get upload signature and parameters from Netlify function
    const meta = await postJson(UPLOAD_ENDPOINT, {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      conversationId,
    })

    // Convert file to base64 for Cloudinary upload
    const base64File = await fileToBase64(file)
    
    // Build the upload payload with actual file data
    // The meta.uploadPayload contains signature, timestamp, api_key, public_id
    // We replace the placeholder 'file' with our actual base64 file
    const uploadPayload = {
      file: base64File,
      api_key: meta.uploadPayload.api_key,
      timestamp: meta.uploadPayload.timestamp,
      signature: meta.uploadPayload.signature,
      public_id: meta.uploadPayload.public_id,
    }

    // Upload directly to Cloudinary
    const uploadResponse = await fetch(meta.uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadPayload),
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('Upload failed:', uploadResponse.status, errorText)
      throw new Error(errorText || `Failed to upload file (${uploadResponse.status})`)
    }

    const uploadResult = await uploadResponse.json()
    console.log('Upload success:', uploadResult)

    return {
      key: meta.key,
      fileUrl: meta.fileUrl,
      viewUrl: meta.viewUrl,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      cloudinaryPublicId: uploadResult.public_id || meta.key,
    }
  } catch (error) {
    console.error('[uploadChatPhoto] Error:', error)
    throw new Error(`Photo upload failed: ${error.message}`)
  }
}
