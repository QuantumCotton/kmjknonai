import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const OPENAI_ENDPOINT = '/.netlify/functions/kmjk-openai'
const LEAD_EMAIL_ENDPOINT = '/.netlify/functions/kmjk-send-lead'
const OPENAI_TIMEOUT_MS = 45000

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
    category: 'Epoxy Flooring',
    quickReply: 'Epoxy flooring',
    keywords: ['epoxy', 'garage', 'flake', 'polyaspartic', 'concrete coating', 'hangar', 'floor coating'],
  },
  {
    category: 'TV Mounting & AV',
    quickReply: 'TV mounting / AV',
    keywords: ['tv mounting', 'tv', 'mount', 'soundbar', 'av', 'media room', 'projector'],
  },
]

const defaultQuickReplies = [
  ...serviceCatalog.map((service) => service.quickReply),
  'Share project photos',
  'Timeline & pricing',
]

function createInitialConversation(conversationId) {
  const now = new Date()
  return {
    id: conversationId,
    startedAt: now,
    messages: [
      {
        id: `msg_${now.getTime()}`,
        role: 'assistant',
        content:
          "Hey there! I'm Atlas with KMJK Home Improvement. What's your name, the best way to reach you (phone or email), and which type of project are you planning — kitchen remodel, bathroom remodel, handyman visit, epoxy flooring, or TV/AV setup?",
        timestamp: now,
        quickReplies: defaultQuickReplies,
      },
    ],
    leadData: { scopeNotes: [] },
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
  }
}

function extractContactDetails(input, leadData) {
  const updated = { ...leadData }
  const emailMatch = input.match(/[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/)
  if (emailMatch && !updated.email) {
    updated.email = emailMatch[0]
  }

  const phoneMatch = input.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
  if (phoneMatch && !updated.phone) {
    updated.phone = phoneMatch[0]
  }

  const zipMatch = input.match(/\b\d{5}\b/)
  if (zipMatch && !updated.zip) {
    updated.zip = zipMatch[0]
  }

  const nameMatch = input.match(/(?:my name is|this is|i'm|i am)\s+([A-Za-z][A-Za-z\s'.-]{1,40})/i)
  if (nameMatch && !updated.name) {
    const name = nameMatch[1].trim()
    if (name.split(' ').length <= 4) {
      updated.name = name
    }
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

function generateQuickReplies(leadData) {
  const replies = new Set(defaultQuickReplies)

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

  return `You are Atlas, an AI concierge for KMJK Home Improvement serving kitchen, bathroom, handyman, TV/AV, and epoxy flooring projects along Florida's Treasure Coast.

Current lead data: ${JSON.stringify(conversation.leadData)}
Qualification score: ${conversation.qualificationScore}
Intake questions asked: ${conversation.intake.askedQuestions.join(', ') || 'none'}
Visitor just said: "${userInput}"
Service catalog reference: ${serviceOverview}

Goals:
- Gather name, phone/email, service type (choose from the catalog), location, timeline, budget, and detailed project scope.
- Keep responses to 2-3 sentences, natural and friendly.
- Always acknowledge their prior message before asking the next question.
- If contact info is missing, ask for it conversationally.
- If service type is unknown, explicitly ask which of the catalog options fits best.
- After capturing the service category, request scope details: rooms/areas, size, materials, pain points, and any photos or inspiration they can share.
- Offer to schedule a consultation when enough info is gathered.
- Encourage sharing site photos or inspiration and mention they can email or text them for faster quoting.
- If they mention areas outside Palm City, Sailfish Point, Sewall's Point, or Hutchinson Island, confirm if they are on the Treasure Coast.
- If qualification score >= 60 and you have contact info, wrap up, promise a call/text within 1 business day, and confirm a follow-up email from info@kmjk.pro or call/text from 772-777-0622.
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

function buildFallbackResponse(conversation, userInput) {
  const { leadData } = conversation
  const missing = []

  if (!leadData.name) missing.push('your name')
  if (!leadData.phone && !leadData.email) missing.push('a phone or email')
  if (!leadData.projectType) missing.push('which service you need (kitchen, bathroom, handyman, epoxy, or TV/AV)')
  if (!leadData.scopeNotes || leadData.scopeNotes.length === 0) missing.push('project details or photos')
  if (!leadData.timeline) missing.push('timeline expectations')
  if (!leadData.budget) missing.push('an investment range you have in mind')

  const suffix = missing.length
    ? `Could you share ${formatMissingItems(missing)} so I can hand everything to Chris right now?`
    : 'I have what I need to brief Chris. Expect a follow-up from 772-777-0622 or info@kmjk.pro within one business day.'

  const serviceHint = leadData.projectType
    ? `Thanks for confirming your ${leadData.projectType.toLowerCase()} plans. `
    : 'Thanks for reaching out about your project. '

  const encouragement = leadData.scopeNotes && leadData.scopeNotes.length > 0
    ? 'Feel free to tap “Here are the project details” if anything else comes to mind.'
    : 'You can tap “Here are the project details” to add photos, room sizes, or punch lists.'

  return {
    text: `${serviceHint}${suffix} ${encouragement}`.trim(),
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

export async function startKmjkConversation() {
  const conversationId = uuidv4()
  return createInitialConversation(conversationId)
}

export async function sendKmjkMessage(conversation, userInput) {
  if (!conversation) {
    return { conversation: null }
  }

  const userMessage = {
    id: `msg_user_${Date.now()}`,
    role: 'user',
    content: userInput,
    timestamp: new Date(),
  }

  const updatedConversation = {
    ...conversation,
    messages: [...conversation.messages, userMessage],
  }

  updatedConversation.leadData = extractContactDetails(userInput, updatedConversation.leadData)
  updatedConversation.leadData = detectServiceType(userInput, updatedConversation.leadData)
  updatedConversation.leadData = detectTimeline(userInput, updatedConversation.leadData)
  updatedConversation.leadData = detectBudget(userInput, updatedConversation.leadData)
  updatedConversation.leadData = captureScopeDetails(userInput, updatedConversation.leadData)
  updatedConversation.qualificationScore = updateQualificationScore(updatedConversation.leadData)

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
    const fallback = buildFallbackResponse(updatedConversation, userInput)
    assistantResponse = {
      text: fallback.text,
      quickReplies: fallback.quickReplies,
      usedFallback: true,
    }
  }

  const assistantMessage = {
    id: `msg_assistant_${Date.now()}`,
    role: 'assistant',
    content: assistantResponse.text,
    timestamp: new Date(),
    quickReplies: assistantResponse.quickReplies,
  }

  updatedConversation.messages = [...updatedConversation.messages, assistantMessage]

  if (
    !updatedConversation.leadNotificationSent &&
    updatedConversation.qualificationScore >= 60 &&
    (updatedConversation.leadData.email || updatedConversation.leadData.phone)
  ) {
    const notified = await notifyNewLead(updatedConversation)
    updatedConversation.leadNotificationSent = notified
  }

  return {
    conversation: updatedConversation,
    message: assistantMessage,
  }
}
