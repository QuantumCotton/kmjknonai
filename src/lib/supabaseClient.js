import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Database table names
export const TABLES = {
  JOBS: 'jobs',
  TAGS: 'tags',
  AUDIT_LOG: 'audit_log'
}

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error('Supabase Error:', error)
  throw new Error(error.message || 'An error occurred while communicating with the database')
}

// Jobs API functions
export const jobsApi = {
  // Fetch all jobs
  async getAll() {
    const { data, error } = await supabase
      .from(TABLES.JOBS)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Fetch job by ID
  async getById(id) {
    const { data, error } = await supabase
      .from(TABLES.JOBS)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Create new job
  async create(jobData) {
    const { data, error } = await supabase
      .from(TABLES.JOBS)
      .insert([{
        company: jobData.company,
        client_name: jobData.clientName,
        client_email: jobData.clientEmail,
        client_phone: jobData.clientPhone,
        job_type: jobData.jobType,
        description: jobData.description,
        status: jobData.status || 'lead',
        location: jobData.location,
        budget: jobData.budget ? parseFloat(jobData.budget) : null,
        estimated_completion: jobData.estimatedCompletion || null,
        tags: jobData.tags || [],
        notes: [],
        files: jobData.files || [],
        photos: jobData.photos || []
      }])
      .select()
      .single()
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Update job
  async update(id, jobData) {
    const { data, error } = await supabase
      .from(TABLES.JOBS)
      .update({
        company: jobData.company,
        client_name: jobData.clientName,
        client_email: jobData.clientEmail,
        client_phone: jobData.clientPhone,
        job_type: jobData.jobType,
        description: jobData.description,
        status: jobData.status,
        location: jobData.location,
        budget: jobData.budget ? parseFloat(jobData.budget) : null,
        estimated_completion: jobData.estimatedCompletion || null,
        tags: jobData.tags || [],
        notes: jobData.notes,
        files: jobData.files,
        photos: jobData.photos,
        ai_summary: jobData.aiSummary,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Delete job
  async delete(id) {
    const { error } = await supabase
      .from(TABLES.JOBS)
      .delete()
      .eq('id', id)
    
    if (error) handleSupabaseError(error)
    return true
  },

  // Add note to job
  async addNote(jobId, note) {
    // First get current job to get existing notes
    const job = await this.getById(jobId)
    const notes = job.notes || []
    
    const { data, error } = await supabase
      .from(TABLES.JOBS)
      .update({
        notes: [...notes, {
          id: note.id || Date.now().toString(),
          text: note.text,
          timestamp: note.timestamp || new Date().toISOString(),
          type: note.type || 'update',
          author: note.author || 'contractor',
          aiProcessed: note.aiProcessed || false
        }],
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .select()
      .single()
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Update AI summary
  async updateAiSummary(jobId, summary) {
    const { data, error } = await supabase
      .from(TABLES.JOBS)
      .update({
        ai_summary: summary,
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .select()
      .single()
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Subscribe to real-time changes
  subscribeToChanges(callback) {
    const channel = supabase
      .channel('jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.JOBS
        },
        (payload) => {
          console.log('Real-time update received:', payload)
          callback(payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }
}

// Tags API functions
export const tagsApi = {
  // Fetch all tags
  async getAll() {
    const { data, error } = await supabase
      .from(TABLES.TAGS)
      .select('*')
      .order('label', { ascending: true })
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Create new tag
  async create(label, color = 'bg-gray-100 text-gray-800') {
    const { data, error } = await supabase
      .from(TABLES.TAGS)
      .insert([{
        label: label.toLowerCase(),
        count: 1,
        color
      }])
      .select()
      .single()
    
    if (error) {
      // If tag already exists, just increment count
      if (error.code === '23505') {
        return await this.incrementCount(label)
      }
      handleSupabaseError(error)
    }
    return data
  },

  // Update tag count
  async incrementCount(label) {
    const { data, error } = await supabase
      .from(TABLES.TAGS)
      .update({ count: supabase.raw('count + 1') })
      .eq('label', label.toLowerCase())
      .select()
      .single()
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Update tag count (decrement)
  async decrementCount(label) {
    const { data, error } = await supabase
      .from(TABLES.TAGS)
      .update({ count: supabase.raw('GREATEST(count - 1, 0)') })
      .eq('label', label.toLowerCase())
      .select()
      .single()
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Delete tag
  async delete(id) {
    const { error } = await supabase
      .from(TABLES.TAGS)
      .delete()
      .eq('id', id)
    
    if (error) handleSupabaseError(error)
    return true
  },

  // Recalculate all tag counts based on jobs
  async recalculateCounts() {
    const jobs = await jobsApi.getAll()
    const tagCounts = {}
    
    jobs.forEach(job => {
      (job.tags || []).forEach(tag => {
        tagCounts[tag.toLowerCase()] = (tagCounts[tag.toLowerCase()] || 0) + 1
      })
    })
    
    // Update all tags
    for (const [label, count] of Object.entries(tagCounts)) {
      await supabase
        .from(TABLES.TAGS)
        .upsert({ label, count })
        .eq('label', label)
    }
    
    return tagCounts
  }
}

// Audit Log API functions
export const auditLogApi = {
  // Fetch all audit logs
  async getAll(limit = 100, offset = 0) {
    const { data, error } = await supabase
      .from(TABLES.AUDIT_LOG)
      .select('*')
      .order('timestamp', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Fetch audit logs for a specific job
  async getByJobId(jobId) {
    const { data, error } = await supabase
      .from(TABLES.AUDIT_LOG)
      .select('*')
      .eq('job_id', jobId)
      .order('timestamp', { ascending: false })
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Fetch audit logs by action type
  async getByAction(action, limit = 100) {
    const { data, error } = await supabase
      .from(TABLES.AUDIT_LOG)
      .select('*')
      .eq('action', action)
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) handleSupabaseError(error)
    return data
  },

  // Restore a deleted job
  async restoreJob(jobId) {
    const { data, error } = await supabase
      .rpc('restore_job', { job_uuid: jobId })
    
    if (error) handleSupabaseError(error)
    return data
  }
}

export default supabase
