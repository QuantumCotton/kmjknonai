import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'

const ALLOWED_MIME_TYPES = (process.env.KMJK_ALLOWED_MIME || 'image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif').split(',')
const MAX_UPLOAD_BYTES = Number.parseInt(process.env.KMJK_UPLOAD_MAX_BYTES || `${5 * 1024 * 1024}`, 10)
const BUCKET = process.env.KMJK_S3_BUCKET
const REGION = process.env.KMJK_S3_REGION

const corsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

const s3Client = new S3Client({ region: REGION })

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

  if (!BUCKET || !REGION) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Missing S3 configuration on server.' }),
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

    const safeName = String(fileName).trim().replace(/[^a-zA-Z0-9._-]+/g, '_') || 'upload'
    const extension = safeName.includes('.') ? safeName.substring(safeName.lastIndexOf('.')) : ''
    const baseKey = safeName.replace(extension, '')
    const folder = conversationId ? conversationId : 'general'
    const objectKey = `chat-uploads/${folder}/${baseKey}-${crypto.randomUUID()}${extension}`

    const putCommand = new PutObjectCommand({
      Bucket: BUCKET,
      Key: objectKey,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 900 })

    const getCommand = new GetObjectCommand({ Bucket: BUCKET, Key: objectKey })
    const viewUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 60 * 60 * 24 * 7 })

    const fileUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${objectKey}`

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ uploadUrl, fileUrl, viewUrl, key: objectKey }),
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
