import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// Detect if running in Node.js (testing) vs browser
const isNode = typeof window === 'undefined'
const BASE_URL = isNode ? (process.env.NETLIFY_DEV_URL || 'http://localhost:8888') : ''

const OPENAI_ENDPOINT = `${BASE_URL}/.netlify/functions/kmjk-openai`
// LEAD_EMAIL_ENDPOINT removed as we use Web3Forms directly now
// const OPENAI_TIMEOUT_MS = 45000

const DIGEST_REASON_LABELS = {
  inactivity: 'Inactivity timeout',
  'manual-close': 'Manual close',
}

// Phrase variation for natural conversation
const phraseBanks = {
  curiosity: ['Just curious', 'Wondering', 'Quick question', 'Thinking aloud'],
  agreement: ['Absolutely', 'For sure', 'Definitely', 'Love that', "That's great", 'Perfect'],
  transition: ['So', 'Okay', 'Got it', 'Alright', 'Makes sense'],
}

const serviceCatalog = [
  {
    category: 'Kitchen Remodel',
    quickReply: 'Kitchen remodel',
    keywords: ['kitchen', 'cooktop', 'pantry', 'island', 'cabinet', 'backsplash', 'countertop', 'appliance'],
  },
  {
    category: 'Bathroom Remodel',
    quickReply: 'Bathroom remodel',
    keywords: ['bathroom', 'shower', 'tub', 'vanity', 'steam', 'powder room', 'wet room'],
  },
  {
    category: 'Handyman Services',
    quickReply: 'Handyman visit',
    keywords: ['handyman', 'repair', 'fix', 'punch list', 'fan', 'disposal', 'door', 'maintenance', 'touchup'],
  },
  {
    category: 'Epoxy Flooring & Coatings',
    quickReply: 'Coatings / Epoxy',
    keywords: ['epoxy', 'garage', 'flake', 'polyaspartic', 'concrete coating', 'hangar', 'floor coating', 'ballistix', 'bullet proof', 'counter attack'],
  },
  {
    category: 'TV Mounting & AV',
    quickReply: 'TV mounting / AV',
    keywords: ['tv mounting', 'tv', 'mount', 'soundbar', 'av', 'media room', 'projector'],
  },
  {
    category: 'Christmas Lighting',
    quickReply: 'Holiday Lighting',
    keywords: ['christmas light', 'holiday light', 'festive', 'decoration', 'lights'],
  },
  {
    category: 'Gutter Guards',
    quickReply: 'Gutter Guards',
    keywords: ['gutter', 'guard', 'leaf', 'protection', 'clog', 'mesh'],
  },
  {
    category: 'Roofing',
    quickReply: 'Roofing',
    keywords: ['roof', 'shingle', 'leak', 'gaf', 'timberline', 'replacement', 'repair'],
  },
  {
    category: 'Energy Rebates',
    quickReply: 'Energy Rebates',
    keywords: ['rebate', 'tax credit', 'energy audit', 'incentive', 'efficiency', 'hvac rebate', 'window rebate'],
  },
]

// Detect emotional cues in user input
function detectEmotion(input) {
  const lower = input.toLowerCase()
  if (/frustrat|annoying|hate|upset|angry|difficult|broken|can't upload|upload not working|won't work/.test(lower)) {
    return 'frustrated'
  }
  if (/excit|can't wait|love|amazing|awesome|thrilled|thanks|thank you|thx/.test(lower)) {
    return 'excited'
  }
  if (/overwhelm|confus|unsure|not sure|don't know|lost/.test(lower)) {
    return 'overwhelmed'
  }
  if (/nervous|worried|concern|anxious|stress/.test(lower)) {
    return 'nervous'
  }
  return null
}

// Detect if user has indicated they cannot upload photos
function detectPhotoUploadIssue(input) {
  const lower = input.toLowerCase()
  return /can't|cannot|broken|not working|won't work|doesn't work|no picture|no photo/i.test(lower) && 
         /upload|picture|photo|image|paperclip|attach/i.test(lower)
}

// Get random phrase from bank for variation
function getRandomPhrase(bankName) {
  const bank = phraseBanks[bankName]
  if (!bank || bank.length === 0) return ''
  return bank[Math.floor(Math.random() * bank.length)]
}

function normalizeTimestamp(value) {
  if (!value) return null
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string') {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString()
    }
    return value
  }
  const parsed = new Date(value)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString()
  }
  return null
}

function mapMessagesForTranscript(messages = []) {
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
    timestamp: normalizeTimestamp(msg.timestamp),
  }))
}

function createInitialConversation(conversationId) {
  const now = new Date()
  const timestamp = now.toISOString()
  return {
    id: conversationId,
    startedAt: timestamp,
    lastActivityAt: timestamp,
    messages: [
      {
        id: `msg_${now.getTime()}`,
        role: 'assistant',
        content:
          "Hey there! I'm Atlas with KMJK Home Improvement on the Treasure Coast. I'd love to help you explore your project ideas. What's your first name, and what are you thinking about doing?",
        timestamp,
        quickReplies: [],
      },
    ],
    leadData: { scopeNotes: [], photos: [] },
    qualificationScore: 0,
    stage: 'greeting',
    isQualified: false,
    transferredToHuman: false,
    intake: {
      active: false,
      estimatedQuestions: 6,
      askedQuestions: [],
      preference: undefined,
      maxQuestions: undefined,
      questionCount: 0,
    },
    leadNotificationSent: false,
    conversationDigestSent: false,
    conversationDigestReason: null,
    conversationDigestSentAt: null,
    turnCount: 0,
    stageTurnCount: 0,
  }
}

const STORAGE_KEY = 'kmjk_chat_conversation_v1'

export function loadConversationFromStorage() {
  if (isNode) return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored)
    // Simple validation to ensure it's not stale (> 24 hours)
    const lastActivity = new Date(parsed.lastActivityAt).getTime()
    if (Date.now() - lastActivity > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch (error) {
    console.error('Failed to load conversation from storage:', error)
    return null
  }
}

function saveConversationToStorage(conversation) {
  if (isNode || !conversation) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversation))
  } catch (error) {
    console.error('Failed to save conversation to storage:', error)
  }
}

export function clearConversationStorage() {
  if (isNode) return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear conversation storage:', error)
  }
}

export async function startKmjkConversation() {
  // Try to load existing conversation first
  const existing = loadConversationFromStorage()
  if (existing) return existing

  const conversationId = uuidv4()
  const newConv = createInitialConversation(conversationId)
  saveConversationToStorage(newConv)
  return newConv
}

function extractContactDetails(input, leadData) {
  const updated = { ...leadData }

  // Enhanced Email Regex (more permissive domain)
  const emailMatch = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  if (emailMatch && !updated.email) {
    updated.email = emailMatch[0]
  }

  // Enhanced Phone Regex (handles dots, dashes, spaces, parenthesis)
  const phoneMatch = input.match(/(?:\+?1[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/)
  if (phoneMatch && !updated.phone) {
    updated.phone = phoneMatch[0]
  }

  const zipMatch = input.match(/\b\d{5}(?:-\d{4})?\b/)
  if (zipMatch && !updated.zip) {
    updated.zip = zipMatch[0]
  }

  // Enhanced Name Regex (looks for capitalization patterns or self-introductions)
  // 1. "I am [Name]" / "My name is [Name]"
  const introMatch = input.match(/(?:my name is|this is|i'm|i am)\s+([A-Za-z][A-Za-z\s'.-]{1,50})/i)
  if (introMatch && !updated.name) {
    const rawName = introMatch[1].trim().replace(/[!.?,]+$/, '') // Strip trailing punctuation
    if (rawName.split(' ').length <= 4) {
      updated.name = rawName
    }
  }

  // 2. Fallback: specific check if they just typed a name-like string in response to a name question
  // (This would require context awareness of the last question, which is handled in the prompt,
  // but here we can be opportunistic if the input is short and looks like a name)
  if (!updated.name && input.split(' ').length <= 3 && /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/.test(input.trim())) {
    // Riskier, but effective for single inputs like "John Doe"
    // Only apply if we don't have a name yet.
    updated.name = input.trim()
  }

  return updated
}

function captureScopeDetails(input, leadData) {
  const text = input.trim()
  if (!text) return leadData

  const lower = text.toLowerCase()
  const updated = { ...leadData }
  const hasServiceContext = Boolean(updated.projectType) || serviceCatalog.some((service) =>
    service.keywords.some((keyword) => lower.includes(keyword))
  )

  if (!hasServiceContext) {
    return updated
  }

  const indicatesDetail = text.length >= 30 || /\d/.test(text)
  if (!indicatesDetail) {
    return updated
  }

  const note = text.slice(0, 600)
  const existingNotes = Array.isArray(updated.scopeNotes) ? [...updated.scopeNotes] : []

  if (!existingNotes.includes(note)) {
    existingNotes.push(note)
    updated.scopeNotes = existingNotes.slice(-6)
    if (!updated.projectSummary) {
      updated.projectSummary = note
    }
  }

  return updated
}

function detectServiceType(input, leadData) {
  const lower = input.toLowerCase()
  const updated = { ...leadData }

  for (const service of serviceCatalog) {
    if (service.keywords.some((keyword) => lower.includes(keyword))) {
      updated.projectType = service.category
      updated.serviceCategory = service.category
      updated.serviceKeyword = service.keywords[0]
      if (!updated.projectSummary) {
        updated.projectSummary = input
      }
      break
    }
  }

  return updated
}

function detectTimeline(input, leadData) {
  if (leadData.timeline) {
    return leadData
  }

  const lower = input.toLowerCase()
  const updated = { ...leadData }

  if (lower.includes('asap') || lower.includes('soon') || lower.includes('immediately')) {
    updated.timeline = 'ASAP'
  } else {
    const match = lower.match(/\b(?:next|within)?\s*\d+\s*(?:day|days|week|weeks|month|months)\b/)
    if (match) {
      updated.timeline = match[0]
    }
  }

  return updated
}

function detectBudget(input, leadData) {
  if (leadData.budget) {
    return leadData
  }

  const lower = input.toLowerCase()
  const updated = { ...leadData }
  const match = lower.match(/\$?\d+[k,]?\d*k?/)

  if (match) {
    updated.budget = match[0]
  } else if (lower.includes('flexible') || lower.includes('depends')) {
    updated.budget = 'Flexible'
  }

  return updated
}

function updateQualificationScore(leadData) {
  let score = 0
  if (leadData.projectType || leadData.serviceCategory) score += 20
  if (leadData.timeline) score += 15
  if (leadData.budget) score += 15
  if (leadData.zip) score += 15
  if (leadData.email) score += 20
  if (leadData.phone) score += 15

  if (leadData.scopeNotes && leadData.scopeNotes.length > 0) {
    score += 10
  }

  if (leadData.budget && /(50|75|100)k/i.test(leadData.budget)) {
    score += 10
  }

  if (leadData.timeline === 'ASAP') {
    score += 5
  }

  return Math.min(Math.max(score, 0), 100)
}

// Determine conversation stage based on collected data
function determineStage(conversation) {
  const { stage, leadData, qualificationScore, stageTurnCount } = conversation;
  if (stage === 'wrap_up') return stage;
  if (stage === 'greeting') {
    if (leadData.projectType || leadData.serviceCategory) return 'dreaming';
    return stage;
  }
  if (stage === 'dreaming') {
    // Require minimum 3 turns in dreaming phase before advancing
    const hasMinTurns = stageTurnCount >= 3;
    const hasScopeNotes = Array.isArray(leadData.scopeNotes) && leadData.scopeNotes.length > 0;
    if (hasMinTurns && hasScopeNotes) return 'logistics';
    return stage;
  }
  if (stage === 'logistics') {
    const hasContact = Boolean(leadData.email || leadData.phone);
    if (qualificationScore >= 60 && hasContact) return 'wrap_up';
    return stage;
  }
  return stage;
}

function generateQuickReplies(leadData) {
  const replies = new Set()

  if (!leadData.name) {
    replies.add('My name is...')
  }
  if (!leadData.email) {
    replies.add('Here is my email')
  }
  if (!leadData.phone) {
    replies.add('Here is my phone number')
  }
  if (!leadData.projectType) {
    serviceCatalog.forEach((service) => replies.add(service.quickReply))
  }
  if (!leadData.scopeNotes || leadData.scopeNotes.length === 0) {
    replies.add('Here are the project details')
  }

  return Array.from(replies)
}

function buildPrompt(conversation, userInput) {
  const serviceOverview = serviceCatalog.map((service) => `${service.category}: ${service.keywords.join(', ')}`).join(' | ')
  const detectedEmotion = detectEmotion(userInput)
  const hasPhotoIssue = detectPhotoUploadIssue(userInput)
  const randomCuriosity = getRandomPhrase('curiosity')
  const randomAgreement = getRandomPhrase('agreement')
  
  // Track what we've already collected to avoid re-asking
  const collectedItems = []
  if (conversation.leadData?.name) collectedItems.push(`name (${conversation.leadData.name})`)
  if (conversation.leadData?.phone) collectedItems.push(`phone (${conversation.leadData.phone})`)
  if (conversation.leadData?.email) collectedItems.push(`email (${conversation.leadData.email})`)
  if (conversation.leadData?.projectType) collectedItems.push(`project type (${conversation.leadData.projectType})`)
  if (conversation.leadData?.timeline) collectedItems.push(`timeline (${conversation.leadData.timeline})`)
  
  const alreadyCollected = collectedItems.length > 0 ? `Already collected: ${collectedItems.join(', ')}` : ''

  return `<role_and_personality>
You are Atlas, a friendly home improvement consultant with KMJK on the Treasure Coast. You're genuinely excited about helping homeowners bring their vision to life. You're conversational, curious, and collaborative—you ask thoughtful questions to understand what they really want, then help them explore possibilities. You embrace the "Stuart Artisan" persona: knowledgeable, warm, proudly local, and passionate about craftsmanship.

Your goal is to:
1. Build rapport naturally through conversation
2. Understand their vision (not just collect facts)
3. Ask questions that help THEM clarify what they want
4. Share ideas and get reactions
5. Gather practical details organically as the conversation flows
</role_and_personality>

<context>
Stage: ${conversation.stage}
Stage turn count: ${conversation.stageTurnCount} (minimum 3 turns required in dreaming phase)
Current lead data: ${JSON.stringify(conversation.leadData)}
${alreadyCollected}
Qualification score: ${conversation.qualificationScore}
Intake asked questions: ${conversation.intake.askedQuestions.join(', ') || 'none'}
Visitor just said: "${userInput}"
Detected emotion: ${detectedEmotion || 'neutral'}
Photo upload issue detected: ${hasPhotoIssue || 'no'}
Available services: ${serviceOverview}
Phrase suggestions for variety: "${randomCuriosity}" / "${randomAgreement}"
</context>

<photo_upload_handling>
${hasPhotoIssue ? `
IMPORTANT: The user has indicated they cannot upload photos or the photo upload is not working.
- DO NOT ask them to upload photos again
- DO NOT mention the paperclip button
- Accept that photos are not available and move on
- Focus on what they CAN share through text
- Be understanding and kind: "No worries about the photos - we can work with what you've shared!"
- Suggest they can email/text photos later if they want: "Feel free to text any photos to 772-777-0622 when you get a chance, but it's totally optional."
` : ''}
</photo_upload_handling>

<conversation_flow>
**Phase 1: Initial Connection**
- Greet warmly and get their first name
- Ask what project they're thinking about
- Show genuine interest in THEIR vision first

**Phase 2: Dream Building (MOST IMPORTANT - Don't rush this)**
This is where you shine. Ask conversational questions that help them clarify their vision:
- What's inspiring this project? What's not working now? What have they seen that they love?
- Explore style preferences naturally: "Are you drawn to modern and sleek, or more warm and traditional?"
- Discuss specific elements based on the project type:
  - Kitchens & Bathrooms: We focus on using **Ballistix**, **Bullet Proof**, and **Counter Attack** coating systems. Mention these when discussing countertops, backsplashes, or showers. Explain that these allow for incredible dexterity, custom color schemes, and extreme durability compared to traditional materials.
  - Coatings (Garage/Floors): Highlight our industrial-strength polyaspartic systems and custom metallic finishes using Ballistix/Bullet Proof technology.
  - Christmas Lights: Ask about their vision—classic white, colorful, roofline only, or wrapped trees? Mention we handle everything from design to storage.
  - Gutter Guards: Ask about their current cleaning issues. Mention our stainless steel micro-mesh and hydro-lock technology.
  - Roofing: Ask about age/leaks. Mention GAF Timberline HDZ and our "WindProven" infinite wind speed protection.
  - Energy Rebates: Ask if they are interested in federal tax credits (30%) or utility rebates for HVAC/Windows.
- React to their answers and build on them: "Oh, a big island for entertaining—I love that! We could use a Counter Attack metallic pour to make that a real showpiece."
- Paint a picture based on what they shared: "I'm seeing this... [describe]. Does that feel right?"
- Help them think through options without overwhelming them

**Phase 3: Practical Details (Weave in naturally)**
As the conversation progresses, casually gather:
- Timeline: "When are you hoping to get started?"
- Budget range: "Do you have a ballpark budget in mind, or want us to help you figure that out?"
- Scope details: size, specific rooms/areas, current pain points
- Contact method: text, call, or email
- Location/zip code to confirm service area

Only ask for photos if relevant: "Got any photos of the space? Feel free to tap the paperclip—that would help me visualize this better."

**Inspiration Hooks (use when appropriate):**
- For kitchen projects: "Have any inspiration pics from Pinterest or Houzz? Tap the paperclip to share, or text them to 772-777-0622!"
- For any project: "If you've seen something you love in a friend's house or online, I'd love to see it—helps me get on the same page with your vision"
- Offer to help them explore: "Want me to describe a few popular styles so you can pick what resonates?"

**Phase 4: Next Steps (wrap_up stage)**
When you have enough information (qualification score >= 60 and contact info):
- Summarize their vision warmly and enthusiastically
- Propose a specific next step with day/time options: "This sounds like an amazing project! I'll have Chris reach out within 24 hours. Quick question: does Tuesday or Wednesday afternoon work better for a free in-home consultation? He usually has 2pm or 4pm slots available."
- Confirm contact: "You'll hear from 772-777-0622 or info@kmjk.pro—[their preferred method: text/call/email]"
- End with confidence and excitement about their project
</conversation_flow>

<conversation_style>
CRITICAL RULES:
- **Be conversational**: Use natural language, contractions, casual phrasing—talk like a real person
- **ONE question at a time**: Don't list multiple questions. Let the conversation breathe.
- **Build on their answers**: Reference what they said earlier to show you're listening
- **Share micro-ideas**: Drop small suggestions based on what they share to keep it collaborative
- **Vary your phrasing**: Use the phrase suggestions provided or create your own natural variations
- **Match their energy**: If they're detailed, go deep. If they're brief, keep it light
- **Use their name** occasionally after they share it
- **Be a consultant, not a form**: You're exploring together, not filling out paperwork
- **Keep responses to 2-4 sentences max** unless you're painting a vision for them
- **Always acknowledge what they just said** before moving forward
- **Never ask for information they've already provided**
- **If they're vague or uncertain**, help them explore options with gentle questions
</conversation_style>

<empathy_responses>
If detected emotion is "frustrated": Start with empathy like "I totally get how frustrating that must be" or "That can be so annoying"
If detected emotion is "excited": Match their energy with "Love the excitement!" or "This is going to be amazing!"
If detected emotion is "overwhelmed": Reassure with "No worries—let's break it down together, one step at a time" or "I hear you. Let's keep it simple"
If detected emotion is "nervous": Comfort with "Totally normal to feel that way. We'll walk through this together" or "I get it—big decisions can feel stressful"
</empathy_responses>

<information_to_gather>
Throughout the conversation, naturally collect:
- First name
- Contact method preference (text/call/email) and contact info (phone or email)
- Project type: kitchen remodel, bathroom remodel, handyman services, epoxy flooring, or TV/AV setup
- Vision/style preferences (colors, materials, vibe, inspiration)
- Functional needs (what they want to accomplish, pain points)
- Timeline (when they want to start)
- Budget range (ballpark is fine)
- Space details (size, current state, specific areas)
- Location/zip code (to confirm Treasure Coast service area)
- Photos if helpful (via paperclip upload)

BUT: Gather these through natural conversation, not interrogation. Let it flow.
</information_to_gather>

<local_touches>
- Reference Treasure Coast familiarity naturally (Stuart, Palm City, Sewall's Point, Hutchinson Island, Jensen Beach, Port St. Lucie)
- Sprinkle in authentic local history when it reinforces a point: pineapple pioneers (Stypmann brothers), 1895 freeze resilience, Lyric Theatre, Sailfish Capital legacy, House of Refuge durability
- Use these sparingly and only when they enhance the conversation
- If they mention areas outside Treasure Coast, confirm availability politely
</local_touches>

<company_info>
- Company: KMJK Home Improvement
- Your name: Atlas
- Phone: 772-777-0622
- Email: info@kmjk.pro
- Contact: Chris Cotton, Josue Lopez (Coatings Lead)
- Services: Kitchens, Bathrooms, Handyman, Epoxy/Coatings (Ballistix, Bullet Proof, Counter Attack), TV/AV, Christmas Lights, Gutter Guards, Roofing, Energy Rebates
</company_info>

<critical_reminders>
- Act like a helpful friend who knows home improvement, not a data collection bot
- Let the conversation develop naturally—don't rush to the next question
- Help them dream and explore before diving into logistics (minimum 3 turns in dreaming stage)
- Stage rules (STRICTLY FOLLOW):
  - greeting → focus on rapport and project vision
  - dreaming → ask vision-clarifying questions; do NOT ask budget, timeline, or zip (minimum 3 turns here)
  - logistics → now you may ask budget, timeline, zip/location if still missing
  - wrap_up → summarize and propose concrete appointment with day/time options
- Never re-ask for information already in lead data or listed in Intake asked questions
- Show you're listening by referencing their earlier messages
- Adapt your approach based on how they respond
- Respond to detected emotions with empathy first, then continue the conversation
- Use phrase variation to sound natural and avoid repetition
- Photo uploads: Encourage the paperclip feature, mention texting to 772-777-0622 as alternative
- In wrap_up stage: End with specific appointment scheduling question (days/times)
- If project is kitchen/bathroom: Occasionally suggest sharing inspiration photos or mood boards
</critical_reminders>
`
}

async function requestOpenAI(messages, systemPrompt) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS)

  try {
    const response = await axios.post(
      OPENAI_ENDPOINT,
      { messages, systemPrompt },
      { signal: controller.signal }
    )
    clearTimeout(timeout)
    return {
      text: response.data?.text || "I'm here to help with your remodel! Let's talk details.",
      usedFallback: false,
    }
  } catch (error) {
    clearTimeout(timeout)
    throw error
  }
}

function formatMissingItems(items) {
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  const [first, second, ...rest] = items
  return [first, second, ...rest.slice(0, -1)].join(', ') + `, and ${items[items.length - 1]}`
}

function buildFallbackResponse(conversation) {
  const { leadData, stage } = conversation
  const missing = []

  // Only ask for what's truly missing based on conversation stage
  // Don't ask for photos if they've indicated they can't upload
  const hasPhotoIssue = conversation.leadData?.photoUploadIssue
  
  if (!leadData.name) missing.push('your name')
  if (!leadData.phone && !leadData.email) missing.push('a phone number or email')
  if (!leadData.projectType) missing.push('which service you need')
  if (!leadData.scopeNotes || leadData.scopeNotes.length === 0) missing.push('any project details')
  
  // Only ask for timeline/budget in logistics or wrap_up stages
  if (stage === 'logistics' || stage === 'wrap_up') {
    if (!leadData.timeline) missing.push('when you would like the work done')
    if (!leadData.budget) missing.push('a rough investment range')
  }

  let responseText = ''
  
  // More human, conversational responses based on what we have
  if (missing.length === 0) {
    // Have everything we need
    responseText = `Thanks for sharing all that info, ${leadData.name || 'there'}! I've got everything I need to brief Chris. You'll hear from 772-777-0622 or info@kmjk.pro within one business day. Feel free to add more details if you think of anything else!`
  } else if (missing.length === 1) {
    // Only need one more thing
    responseText = `Almost there! Just need one more thing from you - ${missing[0]}. Once I have that, I can get Chris in touch with you.`
  } else if (missing.length <= 2) {
    // Need a couple more things
    responseText = `Thanks for sharing! To get you connected with Chris, I just need ${formatMissingItems(missing)}. Whatever you're comfortable sharing works.`
  } else {
    // Need more info - be gentle
    responseText = `I'd love to help you with this project! To connect you with Chris, could you share ${formatMissingItems(missing)}? Take your time.`
  }

  // Don't mention photos if user can't upload
  if (!hasPhotoIssue && (!leadData.scopeNotes || leadData.scopeNotes.length === 0)) {
    responseText += ' If you have any photos or details to share, that always helps!'
  }

  return {
    text: responseText,
    quickReplies: generateQuickReplies(leadData),
  }
}

async function notifyNewLead(conversation) {
  try {
    await axios.post(LEAD_EMAIL_ENDPOINT, {
      leadData: conversation.leadData,
      qualificationScore: conversation.qualificationScore,
      conversationId: conversation.id,
      serviceCategory: conversation.leadData.serviceCategory,
      scopeNotes: conversation.leadData.scopeNotes,
    })
    return true
  } catch (error) {
    console.error('[KMJK Chat] Lead notification error:', error)
    return false
  }
}


export function registerPhotoUpload(conversation, photoMeta) {
  if (!conversation) return conversation

  const timestamp = new Date()
  const isoTimestamp = timestamp.toISOString()
  const safeMeta = {
    url: photoMeta?.url || photoMeta?.fileUrl || photoMeta?.viewUrl || '',
    viewUrl: photoMeta?.viewUrl || photoMeta?.url || photoMeta?.fileUrl || '',
    fileUrl: photoMeta?.fileUrl || photoMeta?.url || photoMeta?.viewUrl || '',
    key: photoMeta?.key,
    name: photoMeta?.name || 'Project photo',
    size: photoMeta?.size,
    type: photoMeta?.type,
    uploadedAt: photoMeta?.uploadedAt || isoTimestamp,
  }

  const scopeNotes = Array.isArray(conversation.leadData?.scopeNotes)
    ? [...conversation.leadData.scopeNotes]
    : []

  const noteLabel = `Photo uploaded: ${safeMeta.name}`
  const noteValue = `${noteLabel} (${safeMeta.viewUrl || safeMeta.url})`

  if (!scopeNotes.some((existing) => existing.includes(safeMeta.viewUrl || safeMeta.url))) {
    scopeNotes.push(noteValue)
  }

  const updated = {
    ...conversation,
    messages: [
      ...conversation.messages,
      {
        id: `msg_photo_${timestamp.getTime()}`,
        role: 'user',
        content: `${noteLabel}\n${safeMeta.viewUrl || safeMeta.url}`.trim(),
        timestamp: isoTimestamp,
        photo: safeMeta,
      },
    ],
    leadData: {
      ...conversation.leadData,
      scopeNotes: scopeNotes.slice(-6),
      photos: [...(conversation.leadData?.photos || []), safeMeta],
    },
    lastActivityAt: isoTimestamp,
    conversationDigestSent: false,
    conversationDigestReason: null,
    conversationDigestSentAt: null,
  }

  saveConversationToStorage(updated)
  return updated
}

export async function sendConversationDigest(conversation, reason = 'inactivity') {
  if (!conversation) {
    return { conversation, sent: false }
  }

  const transcript = mapMessagesForTranscript(conversation.messages)
  const digest = {
    reason,
    reasonLabel: DIGEST_REASON_LABELS[reason] || reason,
    startedAt: conversation.startedAt,
    lastActivityAt: conversation.lastActivityAt,
    messageCount: transcript.length,
    transcript,
  }

  try {
    await axios.post(LEAD_EMAIL_ENDPOINT, {
      leadData: conversation.leadData || {},
      qualificationScore: conversation.qualificationScore,
      conversationId: conversation.id,
      conversationDigest: digest,
    })

    const sentAt = new Date().toISOString()
    const updatedConversation = {
      ...conversation,
      conversationDigestSent: true,
      conversationDigestReason: reason,
      conversationDigestSentAt: sentAt,
    }

    return { conversation: updatedConversation, sent: true }
  } catch (error) {
    console.error('[KMJK Chat] Conversation digest email failed:', error)
    return { conversation, sent: false, error }
  }
}

export async function sendKmjkMessage(conversation, userInput) {
  if (!conversation) {
    return { conversation: null }
  }

  const userTimestamp = new Date()
  const userIso = userTimestamp.toISOString()
  const userMessage = {
    id: `msg_user_${userTimestamp.getTime()}`,
    role: 'user',
    content: userInput,
    timestamp: userIso,
  }

  const updatedConversation = {
    ...conversation,
    messages: [...conversation.messages, userMessage],
    lastActivityAt: userIso,
    conversationDigestSent: false,
    conversationDigestReason: null,
    conversationDigestSentAt: null,
  }

  // Track photo upload issue if user indicates they can't upload
  if (detectPhotoUploadIssue(userInput)) {
    updatedConversation.leadData = {
      ...updatedConversation.leadData,
      photoUploadIssue: true
    }
  }

  updatedConversation.leadData = extractContactDetails(userInput, updatedConversation.leadData)
  updatedConversation.leadData = detectServiceType(userInput, updatedConversation.leadData)
  updatedConversation.leadData = detectTimeline(userInput, updatedConversation.leadData)
  updatedConversation.leadData = detectBudget(userInput, updatedConversation.leadData)
  updatedConversation.leadData = captureScopeDetails(userInput, updatedConversation.leadData)
  updatedConversation.qualificationScore = updateQualificationScore(updatedConversation.leadData)
  
  // Increment turn counters
  const previousStage = updatedConversation.stage
  updatedConversation.turnCount = (updatedConversation.turnCount || 0) + 1
  updatedConversation.stageTurnCount = (updatedConversation.stageTurnCount || 0) + 1
  
  // Update conversation stage based on latest info
  const newStage = determineStage(updatedConversation)
  
  // Reset stageTurnCount if stage changed
  if (newStage !== previousStage) {
    updatedConversation.stageTurnCount = 0
  }
  
  updatedConversation.stage = newStage

  const chatMessages = updatedConversation.messages
    .filter((msg) => msg.content?.trim())
    .map((msg) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }))

  const systemPrompt = buildPrompt(updatedConversation, userInput)

  let assistantResponse
  try {
    const response = await requestOpenAI(chatMessages, systemPrompt)
    assistantResponse = {
      text: response.text,
      quickReplies: generateQuickReplies(updatedConversation.leadData),
    }
  } catch (error) {
    console.error('[KMJK Chat] Falling back after OpenAI error:', error)
    const fallback = buildFallbackResponse(updatedConversation)
    assistantResponse = {
      text: fallback.text,
      quickReplies: fallback.quickReplies,
      usedFallback: true,
    }
  }

  const assistantTimestamp = new Date()
  const assistantIso = assistantTimestamp.toISOString()
  const assistantMessage = {
    id: `msg_assistant_${assistantTimestamp.getTime()}`,
    role: 'assistant',
    content: assistantResponse.text,
    timestamp: assistantIso,
    quickReplies: assistantResponse.quickReplies,
  }

  updatedConversation.messages = [...updatedConversation.messages, assistantMessage]
  updatedConversation.lastActivityAt = assistantIso

  const hasContact = Boolean(updatedConversation.leadData.email || updatedConversation.leadData.phone)
  const hasProjectContext = Boolean(
    updatedConversation.leadData.serviceCategory ||
      updatedConversation.leadData.projectType ||
      (Array.isArray(updatedConversation.leadData.scopeNotes) && updatedConversation.leadData.scopeNotes.length > 0) ||
      updatedConversation.leadData.projectSummary
  )

  if (!updatedConversation.leadNotificationSent && hasContact && hasProjectContext) {
    const notified = await notifyNewLead(updatedConversation)
    updatedConversation.leadNotificationSent = notified
    if (notified) {
      updatedConversation.leadNotificationSentAt = new Date().toISOString()
    }
  }

  saveConversationToStorage(updatedConversation)

  return {
    conversation: updatedConversation,
    message: assistantMessage,
  }
}
