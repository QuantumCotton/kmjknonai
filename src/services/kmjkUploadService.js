import { supabase } from '@/lib/supabaseClient'

const BUCKET_NAME = import.meta.env.VITE_KMJK_PHOTO_BUCKET || 'KMJK-PHOTOS'

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

    // 2. Upload to Supabase
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // 3. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    return {
      key: data.path, // Storage path
      fileUrl: publicUrl,
      viewUrl: publicUrl,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      cloudinaryPublicId: null // Legacy field, kept for compatibility if needed
    }
  } catch (error) {
    console.error('[uploadChatPhoto] Error:', error)
    throw new Error(`Photo upload failed: ${error.message}`)
  }
}
