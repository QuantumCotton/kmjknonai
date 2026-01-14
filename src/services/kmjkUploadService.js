import { supabase } from '@/lib/supabaseClient'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * List all available buckets for debugging
 */
async function listBuckets() {
  try {
    const { data, error } = await supabase.storage.listBuckets()
    if (error) {
      console.error('[listBuckets] Error:', error)
      return []
    }
    console.log('[listBuckets] Available buckets:', data?.map(b => ({ id: b.id, name: b.name, public: b.public })))
    return data || []
  } catch (err) {
    console.error('[listBuckets] Exception:', err)
    return []
  }
}

/**
 * Try to upload using direct fetch API as fallback
 */
async function uploadViaFetch(bucketName, filePath, file) {
  const url = `${SUPABASE_URL}/storage/v1/object/${bucketName}/${filePath}`
  console.log('[uploadViaFetch] Attempting direct upload to:', url)
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false',
      'cache-control': '3600'
    },
    body: file
  })
  
  const responseText = await response.text()
  console.log('[uploadViaFetch] Response status:', response.status, 'body:', responseText)
  
  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}`
    try {
      const errorJson = JSON.parse(responseText)
      errorMsg = errorJson.error || errorJson.message || errorMsg
    } catch {
      errorMsg = responseText || errorMsg
    }
    throw new Error(errorMsg)
  }
  
  return JSON.parse(responseText)
}

/**
 * Uploads a file to Supabase Storage with comprehensive fallback strategies
 * @param {File} file - The file object to upload
 * @param {string} conversationId - Optional ID to organize files (used as folder name)
 * @returns {Promise<Object>} - The uploaded file metadata including viewUrl
 */
export async function uploadChatPhoto(file, conversationId = 'general') {
  if (!file) {
    throw new Error('No file provided')
  }

  console.log('[uploadChatPhoto] Starting upload for:', file.name, 'size:', file.size, 'type:', file.type)
  console.log('[uploadChatPhoto] Supabase URL:', SUPABASE_URL)
  console.log('[uploadChatPhoto] Conversation/folder:', conversationId)

  // List available buckets first for debugging
  const availableBuckets = await listBuckets()
  const bucketNames = availableBuckets.map(b => b.name)
  const bucketIds = availableBuckets.map(b => b.id)
  
  console.log('[uploadChatPhoto] Found bucket names:', bucketNames)
  console.log('[uploadChatPhoto] Found bucket IDs:', bucketIds)

  // Build candidate list: env var first, then discovered buckets, then hardcoded fallbacks
  const envBucket = import.meta.env.VITE_KMJK_PHOTO_BUCKET
  const candidatesSet = new Set()
  if (envBucket) candidatesSet.add(envBucket)
  bucketIds.forEach(id => candidatesSet.add(id))
  bucketNames.forEach(name => candidatesSet.add(name))
  candidatesSet.add('kmjk-photos')
  candidatesSet.add('KMJK-PHOTOS')
  
  const BUCKET_CANDIDATES = Array.from(candidatesSet)
  console.log('[uploadChatPhoto] Will try these buckets in order:', BUCKET_CANDIDATES)

  // Sanitize filename
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const filePath = `${conversationId}/${fileName}`
  console.log('[uploadChatPhoto] Target path:', filePath)

  let lastError = null
  let successBucket = null

  // Strategy 1: Try standard Supabase SDK upload
  for (const bucket of BUCKET_CANDIDATES) {
    console.log(`[uploadChatPhoto] Trying SDK upload to bucket: "${bucket}"`)
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.log(`[uploadChatPhoto] SDK error for "${bucket}":`, error.message, error)
        lastError = error
        const msg = (error?.message || '').toLowerCase()
        if (msg.includes('bucket not found') || msg.includes('not found') || msg.includes('400')) {
          continue
        }
        // Other errors (like duplicate) - throw immediately
        throw error
      }

      console.log(`[uploadChatPhoto] SDK upload SUCCESS to "${bucket}":`, data)
      successBucket = bucket

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      console.log('[uploadChatPhoto] Public URL:', publicUrl)

      return {
        key: data.path,
        fileUrl: publicUrl,
        viewUrl: publicUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        cloudinaryPublicId: null,
        bucket: successBucket
      }
    } catch (sdkError) {
      console.log(`[uploadChatPhoto] SDK exception for "${bucket}":`, sdkError)
      lastError = sdkError
      const msg = (sdkError?.message || '').toLowerCase()
      if (msg.includes('bucket not found') || msg.includes('not found')) {
        continue
      }
      throw sdkError
    }
  }

  // Strategy 2: Try direct fetch API upload as fallback
  console.log('[uploadChatPhoto] SDK failed for all buckets. Trying direct fetch API...')
  for (const bucket of BUCKET_CANDIDATES) {
    console.log(`[uploadChatPhoto] Trying fetch upload to bucket: "${bucket}"`)
    try {
      const result = await uploadViaFetch(bucket, filePath, file)
      console.log(`[uploadChatPhoto] Fetch upload SUCCESS to "${bucket}":`, result)
      successBucket = bucket

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`
      console.log('[uploadChatPhoto] Constructed public URL:', publicUrl)

      return {
        key: result.Key || filePath,
        fileUrl: publicUrl,
        viewUrl: publicUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        cloudinaryPublicId: null,
        bucket: successBucket
      }
    } catch (fetchError) {
      console.log(`[uploadChatPhoto] Fetch error for "${bucket}":`, fetchError.message)
      lastError = fetchError
      const msg = (fetchError?.message || '').toLowerCase()
      if (msg.includes('bucket') || msg.includes('not found') || msg.includes('400') || msg.includes('404')) {
        continue
      }
      throw fetchError
    }
  }

  // All strategies failed
  const tried = BUCKET_CANDIDATES.join(', ')
  const baseMsg = lastError?.message || 'All upload strategies failed'
  const finalError = `${baseMsg}. Tried buckets: [${tried}]. Check Supabase Storage console to verify bucket exists and has INSERT policy for anon/public roles.`
  console.error('[uploadChatPhoto] FINAL ERROR:', finalError)
  throw new Error(`Photo upload failed: ${finalError}`)
}
