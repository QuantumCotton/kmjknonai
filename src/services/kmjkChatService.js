import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const OPENAI_ENDPOINT = '/.netlify/functions/kmjk-openai'
const LEAD_EMAIL_ENDPOINT = '/.netlify/functions/kmjk-send-lead'
const OPENAI_TIMEOUT_MS = 45000

const serviceKeywords = [
  'kitchen',
  'bathroom',
  'handyman',
  'epoxy',
  'flooring',
  'remodel',
  'renovation',
  'tv mounting',
  'mounting',
  'repair',
  'paint',
  'tile',
  'countertop',
  'cabinet',
  'island',
  'plumbing',
  'lighting',
  'appliance',
  'carpet',
  'vinyl',
  'luxury vinyl plank',
  'lvp',
  'lanai',
  'outdoor kitchen',
  'garage',
]

const defaultQuickReplies = [
  'Kitchen project',
  'Bathroom project',
  'Handyman help',
  'Epoxy flooring',
  'TV mounting',
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
          "Hey there! I'm Atlas with KMJK Home Improvement. What's your name and the best way to reach you (phone or email)?",
        timestamp: now,
        quickReplies: defaultQuickReplies,
      },
    ],
    leadData: {},
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

function detectServiceType(input, leadData) {
  if (leadData.projectType) {
    return leadData
  }

  const lower = input.toLowerCase()
  const updated = { ...leadData }

  for (const keyword of serviceKeywords) {
    if (lower.includes(keyword)) {
      updated.projectType = keyword
      updated.details = input
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
  if (leadData.projectType) score += 20
  if (leadData.timeline) score += 15
  if (leadData.budget) score += 15
  if (leadData.zip) score += 15
  if (leadData.email) score += 20
  if (leadData.phone) score += 15

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
    replies.add('Kitchen remodel')
    replies.add('Bathroom remodel')
  }

  return Array.from(replies)
}

function buildPrompt(conversation, userInput) {
  return `You are Atlas, an AI concierge for KMJK Home Improvement serving kitchen, bathroom, handyman, TV mounting, and epoxy flooring projects along Florida's Treasure Coast.

Current lead data: ${JSON.stringify(conversation.leadData)}
Qualification score: ${conversation.qualificationScore}
Intake questions asked: ${conversation.intake.askedQuestions.join(', ') || 'none'}
Visitor just said: "${userInput}"

Goals:
- Gather name, phone/email, service type, location, timeline, budget, project details.
- Keep responses to 2-3 sentences, natural and friendly.
- Always acknowledge their prior message before asking the next question.
- If contact info is missing, ask for it conversationally.
- Offer to schedule a consultation when enough info is gathered.
- Encourage sharing site photos or inspiration.
- If they mention areas outside Palm City, Sailfish Point, Sewall's Point, or Hutchinson Island, confirm if they are on the Treasure Coast.
- If qualification score >= 60 and you have contact info, wrap up and promise a call/text within 1 business day.
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
    return response.data?.text || "I'm here to help with your remodel! Let's talk details."
  } catch (error) {
    clearTimeout(timeout)
    console.error('[KMJK Chat] OpenAI error:', error)
    return "I'm having trouble reaching the rest of the team. Could you share a few more project details while I reconnect?"
  }
}

async function notifyNewLead(conversation) {
  try {
    await axios.post(LEAD_EMAIL_ENDPOINT, {
      leadData: conversation.leadData,
      qualificationScore: conversation.qualificationScore,
      conversationId: conversation.id,
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
  updatedConversation.qualificationScore = updateQualificationScore(updatedConversation.leadData)

  const chatMessages = updatedConversation.messages
    .filter((msg) => msg.content?.trim())
    .map((msg) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }))

  const systemPrompt = buildPrompt(updatedConversation, userInput)
  const responseText = await requestOpenAI(chatMessages, systemPrompt)

  const assistantMessage = {
    id: `msg_assistant_${Date.now()}`,
    role: 'assistant',
    content: responseText,
    timestamp: new Date(),
    quickReplies: generateQuickReplies(updatedConversation.leadData),
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
