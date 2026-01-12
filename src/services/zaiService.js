// OpenAI API Integration
// Uses internal server API (hides API key from client)

const INTERNAL_API_URL = '/.netlify/functions/zai-api'
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

// Get API key from environment (server-side or client-side)
const getApiKey = () => {
  const envKey = import.meta.env.VITE_OPENAI_API_KEY || ''
  const storedKey = localStorage.getItem('kmjk_openai_api_key') || ''
  
  // Prefer stored key if available, otherwise use env variable
  if (storedKey && storedKey.trim() !== '') {
    return storedKey
  }
  
  return envKey
}

// Check if we're in development environment
const isDevelopment = import.meta.env.DEV || false

// Use appropriate API URL based on environment
const getApiUrl = () => {
  return isDevelopment ? OPENAI_API_URL : INTERNAL_API_URL
}

/**
 * Transcribe and process voice/text input into professional notes
 * @param {string} text - Raw input from crew member
 * @param {object} context - Job context info
 * @returns {Promise<object>} Processed note with AI suggestions
 */
export const processCrewUpdate = async (text, context = {}) => {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const systemPrompt = `You are a helpful AI assistant for a construction job management dashboard.
Your role is to process crew member updates and make them professional.

Context:
- Client: ${context.clientName || 'Unknown'}
- Job Type: ${context.jobType || 'Unknown'}
- Description: ${context.description || 'None'}

Instructions:
1. Clean up and format input text professionally
2. Fix any spelling or grammatical errors
3. Suggest relevant tags (comma-separated) based on content
4. Identify any key information (dates, materials, progress milestones)

Response format (JSON only):
{
  "professionalNote": "Cleaned up professional note",
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "keyInfo": ["Key information extracted"],
  "summary": "Brief summary of update"
}`

  try {
    console.log('[OpenAI] Making API request to:', getApiUrl())
    console.log('[OpenAI] API Key length:', apiKey.length)
    console.log('[OpenAI] API Key starts with:', apiKey.substring(0, 10) + '...')
    
    const response = await fetch(getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 50,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: text
          }
        ]
      })
    })

    console.log('[OpenAI] Request body:', JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      max_tokens: 50,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: text
        }
      ]
    }))

    if (!response.ok) {
      console.error('[OpenAI] API Error Response Status:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('[OpenAI] Error Response Body:', errorText)
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key configuration in Settings.')
      }
      
      const errorData = await response.json()
      
      // Handle specific error codes
      if (errorData.error && errorData.error.code === 'insufficient_quota') {
        throw new Error('Insufficient OpenAI quota. Please check your OpenAI account at https://platform.openai.com and ensure your API key has an active billing plan.')
      }
      
      if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please wait a few minutes before trying again.')
      }
      
      throw new Error(errorData.error?.message || errorData.error || `API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    // Parse AI response
    if (data.choices && data.choices[0]) {
      const aiContent = data.choices[0].message.content
      
      try {
        // Try to parse JSON from response
        const jsonMatch = aiContent.match(/\{[\s\S]*?\}/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
      } catch (e) {
        console.error('Failed to parse AI response as JSON:', e)
      }
      
      // Fallback if JSON parsing fails
      return {
        professionalNote: aiContent,
        suggestedTags: [],
        keyInfo: [],
        summary: 'Crew update received'
      }
    }
    
    throw new Error('No response from OpenAI')
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

/**
 * Generate job summary using AI
 * @param {object} job - Job object with all details
 * @returns {Promise<string>} Generated summary
 */
export const generateJobSummary = async (job) => {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const systemPrompt = `You are a helpful AI assistant for a construction job management dashboard.
Your role is to generate concise, professional job summaries.

Generate a 2-3 sentence summary that includes:
1. Current status
2. Key progress or milestones
3. Any notable information (client concerns, delays, change requests)`

  const jobInfo = `
Client: ${job.clientName}
Company: ${job.company}
Job Type: ${job.jobType}
Status: ${job.status}
Budget: $${job.budget || 'Not set'}
Location: ${job.location || 'Not set'}
Description: ${job.description || 'None'}
Notes Count: ${(job.notes || []).length}
Tags: ${(job.tags || []).join(', ')}

Recent Notes:
${(job.notes || []).slice(-3).map(n => `- ${n.text} (${formatDate(n.timestamp)})`).join('\n')}

Generate a professional summary.`

  try {
    const response = await fetch(getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 100,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: jobInfo
          }
        ]
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key configuration in Settings.')
      }
      
      const errorData = await response.json()
      
      // Handle specific error codes
      if (errorData.error && errorData.error.code === 'insufficient_quota') {
        throw new Error('Insufficient OpenAI quota. Please check your OpenAI account at https://platform.openai.com and ensure your API key has an active billing plan.')
      }
      
      if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please wait a few minutes before trying again.')
      }
      
      throw new Error(errorData.error?.message || errorData.error || `API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content
    }
    
    throw new Error('No response from OpenAI')
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

/**
 * Process homeowner question using AI chat bot
 * @param {string} question - Homeowner's question
 * @param {object} context - Job context info
 * @returns {Promise<object>} Processed response
 */
export const processHomeownerQuestion = async (question, context = {}) => {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const systemPrompt = `You are a helpful AI assistant for a construction company.
Your role is to respond to homeowner questions professionally and help them.

Context:
- Client: ${context.clientName || 'Unknown'}
- Job Type: ${context.jobType || 'Unknown'}
- Status: ${context.status || 'Unknown'}
- Company: ${context.company || 'Unknown'}

Guidelines:
1. Be friendly and professional
2. Answer questions if you know the answer
3. If you don't know, suggest they wait for contractor response
4. Never make up information or promises
5. Categorize question: scheduling, progress, concerns, change requests, other

Response format (JSON only):
{
  "categorizedAnswer": "Professional response",
  "category": "scheduling|progress|concerns|change requests|other",
  "needsContractorResponse": true/false
}`

  try {
    const response = await fetch(getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 100,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: question
          }
        ]
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key configuration in Settings.')
      }
      
      const errorData = await response.json()
      
      // Handle specific error codes
      if (errorData.error && errorData.error.code === 'insufficient_quota') {
        throw new Error('Insufficient OpenAI quota. Please check your OpenAI account at https://platform.openai.com and ensure your API key has an active billing plan.')
      }
      
      if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please wait a few minutes before trying again.')
      }
      
      throw new Error(errorData.error?.message || errorData.error || `API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.choices && data.choices[0]) {
      const aiContent = data.choices[0].message.content
      
      try {
        const jsonMatch = aiContent.match(/\{[\s\S]*?\}/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
      } catch (e) {
        // Fallback
        return {
          categorizedAnswer: aiContent,
          category: 'other',
          needsContractorResponse: true
        }
      }
    }
    
    throw new Error('No response from OpenAI')
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

/**
 * Analyze photo and suggest tags
 * @param {string} photoDescription - Optional description or context
 * @returns {Promise<string[]>} Suggested tags
 */
export const suggestPhotoTags = async (photoDescription = '') => {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const systemPrompt = `You are a helpful AI assistant for a construction job management dashboard.
Your role is to suggest relevant tags for construction photos.

Photo Description: ${photoDescription}

Suggest 3-5 relevant tags that describe this photo.
Tags should be from categories like: room (kitchen, bathroom, bedroom), work type (demo, painting, tile, electrical), materials (flooring, drywall, cabinets), or status (before, during, after).

Response format (JSON only):
{
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`

  try {
    const response = await fetch(getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 50,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: photoDescription || 'Analyze this construction photo and suggest relevant tags.'
          }
        ]
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key configuration in Settings.')
      }
      
      const errorData = await response.json()
      
      // Handle specific error codes
      if (errorData.error && errorData.error.code === 'insufficient_quota') {
        throw new Error('Insufficient OpenAI quota. Please check your OpenAI account at https://platform.openai.com and ensure your API key has an active billing plan.')
      }
      
      if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please wait a few minutes before trying again.')
      }
      
      throw new Error(errorData.error?.message || errorData.error || `API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.choices && data.choices[0]) {
      const aiContent = data.choices[0].message.content
      
      try {
        const jsonMatch = aiContent.match(/\{[\s\S]*?\}/)
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0])
          return result.tags || []
        }
      } catch (e) {
        console.error('Failed to parse AI response as JSON:', e)
      }
    }
    
    return []
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

// Helper function for formatting dates
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

export { getApiKey }
