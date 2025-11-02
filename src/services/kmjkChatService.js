import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const OPENAI_ENDPOINT = '/.netlify/functions/kmjk-openai'
const LEAD_EMAIL_ENDPOINT = '/.netlify/functions/kmjk-send-lead'
const OPENAI_TIMEOUT_MS = 45000

const DIGEST_REASON_LABELS = {
  inactivity: 'Inactivity timeout',
  'manual-close': 'Manual close',
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
          "Hey there! I'm Atlas with KMJK Home Improvement here on the Treasure Coast. What's your first name, and how do you prefer we reach you (text, call, or email)? Feel free to tap the paperclip to add project photos, then let me know if you're planning a kitchen remodel, bathroom remodel, handyman visit, epoxy flooring, or TV/AV setup.",
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

  const nameMatch = input.match(/(?:my name is|this is|i'm|i am)\s+([A-Za-z][A-Za-z\s'.-]{1,60})/i)
  if (nameMatch && !updated.name) {
    const rawName = nameMatch[1].trim()
    const extracted = rawName.match(/[A-Za-z][A-Za-z'.-]*(?:\s+[A-Za-z][A-Za-z'.-]*){0,3}/)
    if (extracted) {
      const cleanedName = extracted[0].trim()
      if (cleanedName.split(' ').length <= 4) {
        updated.name = cleanedName
      }
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

  return `You are Atlas, an AI concierge for KMJK Home Improvement serving kitchen, bathroom, handyman, TV/AV, and epoxy flooring projects along Florida's Treasure Coast. Embrace the "Stuart Artisan" persona: knowledgeable, calm, proudly local, and steeped in the area's history of craftsmanship, resilience, and respect for the river.

Current lead data: ${JSON.stringify(conversation.leadData)}
Qualification score: ${conversation.qualificationScore}
Intake questions asked: ${conversation.intake.askedQuestions.join(', ') || 'none'}
Visitor just said: "${userInput}"
Service catalog reference: ${serviceOverview}

Goals:
- Gather first name, preferred contact method (text, call, or email), service type (choose from the catalog), location, timeline, budget (invite a ballpark if they have one, reassure them if they don’t), and detailed project scope.
- Keep responses to 2-3 sentences, natural and friendly.
- Always acknowledge their prior message before asking the next question.
- If they provide contact info, confirm it as their preferred way to follow up; do not ask for a different method unless none has been shared.
- If service type is unknown, explicitly ask which of the catalog options fits best.
- After capturing the service category, request scope details: rooms/areas, size, materials, pain points, and any photos or inspiration they can share.
- Offer to schedule a consultation when enough info is gathered.
- Encourage them to tap the paperclip in the chat to upload project photos; only mention emailing or texting photos as a backup if they indicate issues with uploading.
- Reference Treasure Coast familiarity (Stuart, Palm City, Sewall's Point, Hutchinson Island, Jensen Beach, Port St. Lucie) naturally to reinforce local expertise.
- Sprinkle in authentic local touches drawn from Stuart history when helpful: pineapple pioneers like the Stypmann brothers, the resilience after the 1895 freeze, the downtown Lyric Theatre, the Sailfish Capital legacy, or House of Refuge durability metaphors. Use them only when they reinforce a point (e.g., durability, hospitality, local pride).
- If they mention areas outside the Treasure Coast, confirm availability and gently redirect expectations.
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
  if (!leadData.phone && !leadData.email) missing.push('a phone number or email')
  if (!leadData.projectType) missing.push('which service you need (kitchen, bathroom, handyman, epoxy, or TV/AV)')
  if (!leadData.scopeNotes || leadData.scopeNotes.length === 0) missing.push('any project details or photos')
  if (!leadData.timeline) missing.push('when you’d like the work done')
  if (!leadData.budget) missing.push('a rough investment range (totally fine if it’s just a ballpark)')

  const suffix = missing.length
    ? `Could you share ${formatMissingItems(missing)} so I can hand everything to Chris right now?`
    : 'I have what I need to brief Chris. Expect a follow-up from 772-777-0622 or info@kmjk.pro within one business day.'

  const serviceHint = leadData.projectType
    ? `Appreciate the details on your ${leadData.projectType.toLowerCase()} plans. `
    : 'Appreciate you reaching out about the project. '

  const encouragement = leadData.scopeNotes && leadData.scopeNotes.length > 0
    ? 'If anything else comes to mind, share it here or tap the paperclip to add photos—whatever helps me brief Chris before he reaches out.'
    : 'If you have dimensions, notes, or photos, you can drop them in chat with the paperclip or email/text them to info@kmjk.pro for faster quoting.'

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

  return {
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

  return {
    conversation: updatedConversation,
    message: assistantMessage,
  }
}
