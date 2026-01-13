import { supabase } from '@/lib/supabaseClient'

const BUCKET_CANDIDATES = [
  import.meta.env.VITE_KMJK_PHOTO_BUCKET,
  'KMJK-PHOTOS',
  'kmjk-photos',
].filter(Boolean)

/**
 * Uploads a file to Supabase Storage
 * @param {File} file - The file object to upload
 * @param {string} conversationId - Optional ID to organize files (used as folder name)
 * @returns {Promise<Object>} - The uploaded file metadata including viewUrl
 */
export async function uploadChatPhoto(file, conversationId = 'general') {
  if (!file) {
    throw new Error('No file provided')
  }

  try {
    // 1. Sanitize filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${conversationId}/${fileName}`

    let lastError = null

    for (const bucket of BUCKET_CANDIDATES) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        lastError = error
        const msg = (error?.message || '').toLowerCase()
        if (msg.includes('bucket not found')) {
          continue
        }
        throw error
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return {
        key: data.path,
        fileUrl: publicUrl,
        viewUrl: publicUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        cloudinaryPublicId: null,
        bucket
      }
    }

    const tried = BUCKET_CANDIDATES.join(', ')
    const baseMsg = lastError?.message || 'Bucket not found'
    throw new Error(`${baseMsg}. Tried buckets: ${tried}`)
  } catch (error) {
    console.error('[uploadChatPhoto] Error:', error)
    throw new Error(`Photo upload failed: ${error.message}`)
  }
}
