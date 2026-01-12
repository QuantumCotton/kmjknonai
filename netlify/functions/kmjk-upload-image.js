import crypto from 'crypto'

// eslint-disable-next-line no-undef
const ALLOWED_MIME_TYPES = (process.env.KMJK_ALLOWED_MIME || 'image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif').split(',')
// eslint-disable-next-line no-undef
const MAX_UPLOAD_BYTES = Number.parseInt(process.env.KMJK_UPLOAD_MAX_BYTES || `${5 * 1024 * 1024}`, 10)
// eslint-disable-next-line no-undef
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
// eslint-disable-next-line no-undef
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
// eslint-disable-next-line no-undef
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

const corsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

function generateCloudinarySignature(params, apiSecret) {
  const timestamp = Math.round(Date.now() / 1000)
  params.timestamp = timestamp
  
  // Sort parameters alphabetically
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')
  
  const stringToSign = sortedParams + apiSecret
  return crypto.createHash('sha1').update(stringToSign).digest('hex')
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: 'OK' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Missing Cloudinary configuration on server.' }),
    }
  }

  try {
    const payload = JSON.parse(event.body || '{}')
    const { fileName, fileType, fileSize, conversationId } = payload

    if (!fileName || !fileType || typeof fileSize !== 'number') {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'fileName, fileType, and fileSize are required.' }),
      }
    }

    if (fileSize > MAX_UPLOAD_BYTES) {
      return {
        statusCode: 413,
        headers: corsHeaders(),
        body: JSON.stringify({ error: `File too large. Max upload is ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.` }),
      }
    }

    if (ALLOWED_MIME_TYPES.length && !ALLOWED_MIME_TYPES.includes(fileType)) {
      return {
        statusCode: 415,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Unsupported file type.' }),
      }
    }

    // Generate unique filename
    const safeName = String(fileName).trim().replace(/[^a-zA-Z0-9._-]+/g, '_') || 'upload'
    const extension = safeName.includes('.') ? safeName.substring(safeName.lastIndexOf('.')) : ''
    const baseName = safeName.replace(extension, '')
    const folder = conversationId ? `kmjk-chat/${conversationId}` : 'kmjk-chat/general'
    const publicId = `${folder}/${baseName}-${crypto.randomUUID().slice(0, 8)}`

    // Prepare Cloudinary upload parameters
    const uploadParams = {
      public_id: publicId,
      folder: 'kmjk-chat',
      resource_type: 'auto',
      format: extension ? extension.slice(1) : undefined,
    }

    // Generate signature
    const signature = generateCloudinarySignature(uploadParams, CLOUDINARY_API_SECRET)

    // Build upload URL and payload
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`
    
    const uploadPayload = {
      file: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      api_key: CLOUDINARY_API_KEY,
      timestamp: uploadParams.timestamp,
      signature: signature,
      public_id: publicId,
    }

    // Generate view URL (what the uploaded image will be accessible at)
    const viewUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.${extension ? extension.slice(1) : 'jpg'}`
    const fileUrl = viewUrl

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ 
        uploadUrl, 
        uploadPayload,
        fileUrl, 
        viewUrl, 
        key: publicId,
        method: 'POST'
      }),
    }
  } catch (error) {
    console.error('[kmjk-upload-image] error:', error)
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Failed to prepare upload.', detail: error.message }),
    }
  }
}
