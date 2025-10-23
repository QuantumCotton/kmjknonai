// Atlas AI Service - Conversation Engine & Lead Qualification
import { CONTRACTOR_ACQUISITION_PROMPT } from './geminiService';

const OPENAI_ENDPOINT = '/.netlify/functions/atlas-openai';
const LEAD_EMAIL_ENDPOINT = '/.netlify/functions/send-atlas-lead';
const OPENAI_TIMEOUT_MS = 60000; // 60 seconds for GPT-5 reasoning models

export type ConversationMode = 'askAround' | 'intake';
export type IntakeQuestionKey =
  | 'name'
  | 'contact'
  | 'projectType'
  | 'timeline'
  | 'budget'
  | 'zip'
  | 'services'
  | 'financing'
  | 'details';

export interface AtlasMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  leadData?: Partial<LeadData>;
  qualificationScore?: number;
}

export interface AtlasServiceResponse {
  message: AtlasMessage;
  conversation: AtlasConversation;
}

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  projectType?: 'kitchen' | 'bathroom' | 'other';
  timeline?: string;
  budget?: string;
  propertyType?: string;
  currentStatus?: string;
  details?: string;
}

export interface AtlasConversation {
  id: string;
  startedAt: Date;
  messages: AtlasMessage[];
  leadData: LeadData;
  qualificationScore: number; // 0-100
  stage: ConversationStage;
  isQualified: boolean;
  transferredToHuman: boolean;
  mode: ConversationMode;
  intake: {
    active: boolean;
    estimatedQuestions: number;
    askedQuestions: IntakeQuestionKey[];
    preference?: 'quick' | 'full';
    maxQuestions?: number;
    questionCount: number;
  };
  leadNotificationSent: boolean;
}

export type ConversationStage = 
  | 'greeting'
  | 'discovery'
  | 'qualification'
  | 'scheduling'
  | 'completed'
  | 'disqualified';

// Conversation state machine
class AtlasEngine {
  private conversation: AtlasConversation;

  constructor(conversationId: string) {
    this.conversation = {
      id: conversationId,
      startedAt: new Date(),
      messages: [],
      leadData: {},
      qualificationScore: 0,
      stage: 'greeting',
      isQualified: false,
      transferredToHuman: false,
      mode: 'askAround',
      intake: {
        active: false,
        estimatedQuestions: 6,
        askedQuestions: [],
        preference: undefined,
        maxQuestions: undefined,
        questionCount: 0
      },
      leadNotificationSent: false
    };
    
    // Add initial greeting
    this.addMessage({
      role: 'assistant',
      content: `Hey there! I'm Atlas, your friendly concierge at Elite Service Hub. 🤖✨

Before we dive in, what name should I use for you, and what's the best contact to follow up (email or phone)? Are you a contractor looking to grow, or just checking things out?`,
      quickReplies: [
        "I'm a contractor",
        'Just browsing today',
        'What is Elite Service Hub?',
        'Sure, my name is...',
        'Here is my email',
        'Here is my phone number'
      ]
    });
  }

  private addMessage(msg: Omit<AtlasMessage, 'id' | 'timestamp'>) {
    const message: AtlasMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    this.conversation.messages.push(message);
  }

  async processUserMessage(userInput: string): Promise<AtlasMessage> {
    // Record user message for transcript and context
    const userMessage: AtlasMessage = {
      id: `msg_user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };
    this.conversation.messages.push(userMessage);

    // Analyze user input and extract data
    await this.analyzeInput(userInput);

    // Update intake state based on user intent
    this.detectModeSwitch(userInput);
    this.updateIntakeProgress();
    
    // Update qualification score
    this.updateQualificationScore();
    
    // Generate appropriate response based on stage
    const response = await this.generateResponse(userInput);
    
    // Add assistant message
    this.addMessage(response);
    this.recordIntakeQuestion(response);

    const lastMessage = this.conversation.messages[this.conversation.messages.length - 1];

    if (this.shouldTriggerLeadNotification()) {
      await this.notifyNewLead();
    }

    return {
      ...lastMessage,
      leadData: { ...this.conversation.leadData },
      qualificationScore: this.conversation.qualificationScore
    };
  }

  private async analyzeInput(input: string): Promise<void> {
    const lowerInput = input.toLowerCase();

    // Extract service/project type - capture ANY service mentioned
    if (!this.conversation.leadData.projectType) {
      // Check for any service type mentioned
      const serviceTypes = [
        'kitchen', 'bathroom', 'remodeling', 'plumbing', 'electrical', 'roofing', 
        'hvac', 'solar', 'flooring', 'painting', 'fencing', 'concrete', 'landscaping',
        'pool', 'detailing', 'cleaning', 'mechanic', 'snow', 'handyman', 'pressure',
        'window', 'gutter', 'deck', 'drywall', 'tile', 'carpet'
      ];
      
      for (const service of serviceTypes) {
        if (lowerInput.includes(service)) {
          this.conversation.leadData.projectType = 'other'; // Use 'other' for non-kitchen/bath
          this.conversation.leadData.details = input; // Store the actual service type in details
          break;
        }
      }
    }

    // Extract name cues
    if (!this.conversation.leadData.name) {
      const nameMatch = input.match(/(?:my name is|this is|i'm|i am)\s+([A-Za-z][A-Za-z\s'.-]{1,40})/i);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        if (name.split(' ').length <= 4) {
          this.conversation.leadData.name = name;
        }
      }
    }

    // Extract timeline
    if (!this.conversation.leadData.timeline) {
      if (lowerInput.includes('asap') || lowerInput.includes('immediately') || lowerInput.includes('soon')) {
        this.conversation.leadData.timeline = 'ASAP';
      } else if (lowerInput.match(/\d+\s*(month|week)/)) {
        this.conversation.leadData.timeline = input;
      }
    }

    // Extract budget signals
    if (!this.conversation.leadData.budget) {
      const budgetMatch = lowerInput.match(/\$?\d+[k,]?\d*k?/);
      if (budgetMatch) {
        this.conversation.leadData.budget = budgetMatch[0];
      } else if (lowerInput.includes('flexible') || lowerInput.includes('depends')) {
        this.conversation.leadData.budget = 'Flexible';
      }
    }

    // Extract contact info
    const emailMatch = input.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch && !this.conversation.leadData.email) {
      this.conversation.leadData.email = emailMatch[0];
    }

    const phoneMatch = input.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch && !this.conversation.leadData.phone) {
      this.conversation.leadData.phone = phoneMatch[0];
    }

    const zipMatch = input.match(/\b\d{5}\b/);
    if (zipMatch && !this.conversation.leadData.zip) {
      this.conversation.leadData.zip = zipMatch[0];
    }
  }

  private updateQualificationScore(): void {
    let score = 0;
    const data = this.conversation.leadData;
    const inServiceArea = data.zip ? this.checkServiceArea(data.zip) : true;

    // Scoring criteria
    if (data.projectType) score += 15;
    if (data.timeline) score += 10;
    if (data.budget) score += 20;
    if (data.zip) score += 15;
    if (data.email) score += 20;
    if (data.phone) score += 20;
    if (!inServiceArea) {
      score -= 10;
    }

    // Bonus for high-value indicators
    if (data.budget && (data.budget.includes('50') || data.budget.includes('75') || data.budget.includes('100'))) {
      score += 10;
    }

    if (data.timeline === 'ASAP') {
      score += 5;
    }

    this.conversation.qualificationScore = Math.min(Math.max(score, 0), 100);
    this.conversation.isQualified = this.conversation.qualificationScore >= 60 && inServiceArea;
  }

  private async generateResponse(userInput: string): Promise<Omit<AtlasMessage, 'id' | 'timestamp'>> {
    const { leadData, qualificationScore } = this.conversation;
    const { intake } = this.conversation;
    const questionsAsked = intake.questionCount;
    const maxQuestionsSetting = intake.maxQuestions;
    const fallbackEstimate = intake.estimatedQuestions ?? 0;
    const limitForCalc = typeof maxQuestionsSetting === 'number' ? maxQuestionsSetting : fallbackEstimate;
    const questionsRemaining = Math.max(limitForCalc - questionsAsked, 0);
    const limitLabel = typeof maxQuestionsSetting === 'number' ? maxQuestionsSetting : 'not set';
    const quickLimitReached = intake.preference === 'quick' && typeof maxQuestionsSetting === 'number' && questionsAsked >= maxQuestionsSetting;
    const ambitionCue = this.detectAmbitiousNumbers(userInput, leadData);

    if (this.conversation.transferredToHuman) {
      return {
        role: 'assistant',
        content: "Perfect. I'll package this up for our growth team and they'll reach out shortly. If there's anything else you'd like us to know, just drop it here and I'll add it to your file.",
        quickReplies: undefined
      };
    }

    if (quickLimitReached) {
      this.conversation.transferredToHuman = true;
      this.conversation.intake.active = false;
      return {
        role: 'assistant',
        content: "Awesome—that gives me everything I need from the quick intake. I'll pass this to our concierge team and they'll follow up with next steps. If you want to add any final notes, you can drop them here.",
        quickReplies: undefined
      };
    }

    const chatMessages: { role: 'user' | 'assistant'; content: string }[] = this.conversation.messages
      .filter(msg => msg.role !== 'system' && msg.content?.trim())
      .map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));

    // Add current context to system prompt
    const contextPrompt = `${CONTRACTOR_ACQUISITION_PROMPT}

CURRENT CONVERSATION CONTEXT:
- Mode: ${this.conversation.mode}
- Intake Active: ${this.conversation.intake.active}
- Intake Progress: ${this.conversation.intake.askedQuestions.join(', ') || 'none'}
- Collected Data: ${JSON.stringify(leadData)}
- Qualification Score: ${qualificationScore}/100
- Intake Preference: ${this.conversation.intake.preference || 'unset'}
- Max Questions Allowed: ${limitLabel}
- Questions Captured: ${questionsAsked}
- Questions Remaining: ${questionsRemaining}
- Submission Requested: ${this.conversation.transferredToHuman}
- User just said: "${userInput}"
- Ambition Cue: ${ambitionCue || 'none'}

You must always respect the current mode:
- If mode is "askAround", keep things light, ask one question at a time, learn how much time the visitor wants to spend chatting, and offer to start a full intake when appropriate.
- If mode is "intake" and they haven't set preferences, first ask: "How many questions are you comfortable answering? We can do 3-5 quick ones, or go through the full Growth Canvas intake (about 10-12 questions)."
- CRITICAL: Before starting intake, ALWAYS ensure you have their name and at least one contact method (email or phone). If missing, say something natural like "Sorry, I didn't catch your name—what should I call you?" or "What's the best way to reach you—email or phone number?" Do NOT just show buttons; ask conversationally.
- If intake preference is "quick", you may ask at most ${this.conversation.intake.maxQuestions ?? 5} questions in total. You've already captured ${questionsAsked}. If questionsRemaining is 0, stop asking new questions, thank them, and confirm we'll follow up.
- If intake preference is "full", pace the conversation but stay focused on Growth Canvas fields. If they seem overwhelmed, remind them they can submit what you have.
- Adapt your questions to their specific service type (e.g., for car detailing ask about fleet/mobile setup; for cleaning ask about commercial vs residential focus)
- If conversation seems long, offer: "Would you like to submit what we have so far? I can pass this to our team and they'll reach out with the rest."
- Focus on Growth Canvas fields: revenue goals, service area, team size, current marketing, average ticket, volume, expansion plans
- When they mention ANY service type, enthusiastically confirm: "Perfect! We work with [their service] businesses and have great success helping them grow."
- Mirror the visitor's tone and greeting style. If they say "howdy brotha," you can echo that warmth ("howdy" / "hey friend") while staying professional.
- Use contractions and natural phrasing so it feels like a human teammate chatting. Light humor or encouragement is welcome if it matches the visitor's vibe.
- When someone quotes unusually large numbers (multi-million targets or five-figure average tickets), acknowledge with a playful human touch—celebrate the ambition, gently sanity-check, and keep it fun.
- If asked whether you're real, be transparent that you're Atlas, an AI guide working alongside the Elite Service Hub team.
- Always keep responses concise (2-3 sentences) and end with a question.
- If Submission Requested is true, stop asking new questions. Thank them, confirm a human teammate will reach out, and invite any final notes if they wish.

Based on what you know, respond naturally and progress toward qualification.`;

    const aiResponse = await this.requestOpenAI(chatMessages, contextPrompt);

    // Determine if we should provide quick replies based on context
    const quickReplies = this.generateQuickReplies(leadData);

    return {
      role: 'assistant',
      content: aiResponse,
      quickReplies
    };
  }

  private async requestOpenAI(
    chatMessages: { role: 'user' | 'assistant'; content: string }[],
    prompt: string
  ): Promise<string> {
    try {
      const payload = { messages: chatMessages, systemPrompt: prompt };
      console.log('[Atlas] Sending to OpenAI:', JSON.stringify(payload, null, 2));
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);
      const response = await fetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('[Atlas] OpenAI response:', data);
    
    // Check if we got an error response
    if (data?.error) {
      console.error('[Atlas] OpenAI error in response:', data);
      // Return a user-friendly error message
      return "I'm having trouble processing your request right now. Our team has been notified. Please try again in a moment.";
    }
    
    if (data?.text) {
      return data.text;
    }
    
    throw new Error('OpenAI response missing text: ' + JSON.stringify(data));
  } catch (error) {
    console.error('[Atlas] OpenAI error:', error);
    throw error;
  }
}

  private generateQuickReplies(leadData: LeadData): string[] | undefined {
    if (this.conversation.transferredToHuman) {
      return undefined;
    }

    const intake = this.conversation.intake;

    if (!intake.active) {
      return ['Start full intake evaluation', 'Just browsing'];
    }

    const hasContactInfo = Boolean(leadData.email || leadData.phone);
    const hasBasicInfo = Boolean(leadData.name || leadData.projectType || leadData.timeline);
    const maxQuestions = intake.maxQuestions;
    const askedCount = intake.questionCount;
    const questionsRemaining = typeof maxQuestions === 'number' ? Math.max(maxQuestions - askedCount, 0) : undefined;

    if (!leadData.name || !hasContactInfo) {
      return undefined;
    }

    if (questionsRemaining === 0) {
      if (hasContactInfo) {
        return ['Submit what we have'];
      }
      return ['Here is my email', 'Here is my phone number'];
    }

    if (hasContactInfo && hasBasicInfo && askedCount > 2) {
      if (!leadData.name) {
        return ['Sure, my name is...', 'Prefer to stay anonymous', 'Submit what we have'];
      }
      if (!leadData.timeline) {
        return ['ASAP', '1-3 months', '3-6 months', 'Submit what we have'];
      }
      return ['Continue with questions', 'Submit what we have'];
    }

    if (!leadData.name) {
      return ['Sure, my name is...', 'Prefer to stay anonymous'];
    }

    if (!hasContactInfo) {
      return ['Here is my email', 'Here is my phone number'];
    }

    if (!leadData.projectType) {
      if (!intake.preference) {
        return ['3-5 quick questions', 'Full intake (10-12 questions)', 'Just browsing'];
      }
      return ['I focus on remodeling', 'I run a service business', 'Submit what we have'];
    }

    if (!leadData.timeline) {
      return ['ASAP', '1-3 months', '3-6 months'];
    }

    return undefined;
  }

  private recordIntakeQuestion(message: Omit<AtlasMessage, 'id' | 'timestamp'>): void {
    const intake = this.conversation.intake;
    if (!intake.active) {
      return;
    }
    if (this.conversation.mode !== 'intake') {
      return;
    }
    if (this.conversation.transferredToHuman) {
      return;
    }
    if (!message?.content?.trim()) {
      return;
    }
    if (!message.content.includes('?')) {
      return;
    }

    intake.questionCount += 1;
  }

  private detectAmbitiousNumbers(userInput: string, leadData: LeadData): string | null {
    const sources = [
      userInput,
      leadData.budget,
      leadData.timeline,
      leadData.details,
      leadData.currentStatus
    ].filter(Boolean) as string[];

    if (!sources.length) {
      return null;
    }

    let biggest = 0;
    let rawMatch: string | null = null;

    for (const source of sources) {
      const matches = source.match(/\d[\d,]*(?:\.\d+)?/g);
      if (!matches) continue;
      for (const match of matches) {
        const value = Number(match.replace(/,/g, ''));
        if (!Number.isFinite(value)) continue;
        if (value > biggest) {
          biggest = value;
          rawMatch = match;
        }
      }
    }

    if (biggest >= 1_000_000) {
      return `visitor mentioned a huge number (${rawMatch})`;    
    }

    if (biggest >= 50_000) {
      return `visitor mentioned a very high ticket (${rawMatch})`;
    }

    return null;
  }

  private checkServiceArea(zip: string): boolean {
    const serviceZips = ['34945', '34946', '34947', '34948', '34949', '34950', '34951', '34952', '34953', '34954', '34955', '34956', '34957'];
    return serviceZips.includes(zip);
  }

  private shouldTriggerLeadNotification(): boolean {
    const { intake, leadData, transferredToHuman, leadNotificationSent } = this.conversation;
    const hasContact = Boolean(leadData.email || leadData.phone);

    if (leadNotificationSent) {
      return false;
    }

    if (transferredToHuman) {
      return true;
    }

    if (!intake.active) {
      return false;
    }

    if (hasContact && intake.askedQuestions.includes('name')) {
      return true;
    }

    if (intake.preference === 'quick' && typeof intake.maxQuestions === 'number' && intake.questionCount >= intake.maxQuestions) {
      return true;
    }

    return false;
  }

  private async notifyNewLead(): Promise<void> {
    try {
      const hasContactInfo = Boolean(this.conversation.leadData.email || this.conversation.leadData.phone);

      const payload = {
        conversationId: this.conversation.id,
        leadData: this.conversation.leadData,
        qualificationScore: this.conversation.qualificationScore,
        startedAt: this.conversation.startedAt,
        mode: this.conversation.mode,
        intake: this.conversation.intake,
        missingContactInfo: !hasContactInfo,
        transcript: this.conversation.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp
        }))
      };

      await fetch(LEAD_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      this.conversation.leadNotificationSent = true;
    } catch (error) {
      console.error('[Atlas] Failed to send lead email', error);
    }
  }

  private detectModeSwitch(input: string) {
    const lower = input.toLowerCase();

    // Handle early submission
    if (lower.includes('submit what we have') || lower.includes('submit now') || lower.includes('lets submit') || (lower.includes('submit') && !lower.includes('submit a'))) {
      this.conversation.transferredToHuman = true; // Mark as ready to submit
      this.conversation.intake.active = false;
      return;
    }

    // Handle intake preferences
    if (lower.includes('3-5 quick') || lower.includes('quick questions')) {
      this.conversation.mode = 'intake';
      this.conversation.intake.active = true;
      this.conversation.intake.preference = 'quick';
      this.conversation.intake.maxQuestions = 3;
      this.conversation.intake.questionCount = 0;
      this.conversation.intake.estimatedQuestions = Math.min(this.conversation.intake.estimatedQuestions, 5);
      return;
    }

    if (lower.includes('full intake') || lower.includes('10-12 questions')) {
      this.conversation.mode = 'intake';
      this.conversation.intake.active = true;
      this.conversation.intake.preference = 'full';
      this.conversation.intake.maxQuestions = 12;
      this.conversation.intake.questionCount = 0;
      this.conversation.intake.estimatedQuestions = Math.max(this.conversation.intake.estimatedQuestions, 12);
      return;
    }

    if (lower.includes('start full intake evaluation')) {
      this.conversation.mode = 'intake';
      this.conversation.intake.active = true;
      this.conversation.intake.preference = undefined;
      this.conversation.intake.maxQuestions = undefined;
      this.conversation.intake.questionCount = 0;
      this.conversation.intake.estimatedQuestions = Math.max(this.conversation.intake.estimatedQuestions, 10);
      return;
    }

    if (this.conversation.mode === 'askAround') {
      const contractorSignals = ['contractor', 'builder', 'service', 'business'];
      if (contractorSignals.some(signal => lower.includes(signal))) {
        this.conversation.mode = 'askAround';
      }

      const readinessSignals = ['sign me up', 'get started', 'apply', 'yes let\'s do intake'];
      if (readinessSignals.some(signal => lower.includes(signal))) {
        this.conversation.mode = 'intake';
        this.conversation.intake.active = true;
      }
    }

    if (this.conversation.mode === 'intake' && (lower.includes('later') || lower.includes('not now'))) {
      this.conversation.mode = 'askAround';
      this.conversation.intake.active = false;
      this.conversation.intake.questionCount = 0;
    }
  }

  private updateIntakeProgress() {
    if (!this.conversation.intake.active) {
      return;
    }

    const dataMap: Array<[IntakeQuestionKey, unknown]> = [
      ['name', this.conversation.leadData.name],
      ['contact', this.conversation.leadData.email || this.conversation.leadData.phone],
      ['projectType', this.conversation.leadData.projectType],
      ['timeline', this.conversation.leadData.timeline],
      ['budget', this.conversation.leadData.budget],
      ['zip', this.conversation.leadData.zip],
      ['services', this.conversation.leadData.propertyType],
      ['financing', this.conversation.leadData.currentStatus],
      ['details', this.conversation.leadData.details]
    ];

    const asked: IntakeQuestionKey[] = [];
    dataMap.forEach(([key, value]) => {
      if (value) {
        asked.push(key);
      }
    });
    this.conversation.intake.askedQuestions = asked;

    // Adjust estimated question count based on missing fields
    const pending = this.getPendingIntakeKeys();
    let estimated = Math.max(asked.length + pending.length, asked.length + 1);
    const maxQuestions = this.conversation.intake.maxQuestions;
    if (typeof maxQuestions === 'number') {
      estimated = Math.min(estimated, maxQuestions);
    }
    this.conversation.intake.estimatedQuestions = estimated;
  }

  private getPendingIntakeKeys(): IntakeQuestionKey[] {
    const required: IntakeQuestionKey[] = ['name', 'contact'];
    const optional: IntakeQuestionKey[] = ['projectType', 'timeline', 'budget', 'zip', 'services', 'financing', 'details'];
    const missing: IntakeQuestionKey[] = [];

    required.forEach(key => {
      if (!this.conversation.intake.askedQuestions.includes(key)) {
        missing.push(key);
      }
    });

    optional.forEach(key => {
      if (!this.conversation.intake.askedQuestions.includes(key)) {
        missing.push(key);
      }
    });

    return missing;
  }
  private snapshotConversation(): AtlasConversation {
    return {
      ...this.conversation,
      messages: this.conversation.messages.map(msg => ({ ...msg })),
      leadData: { ...this.conversation.leadData },
      intake: {
        ...this.conversation.intake,
        askedQuestions: [...this.conversation.intake.askedQuestions]
      }
    };
  }

  getConversation(): AtlasConversation {
    return this.snapshotConversation();
  }
}

// Active conversations
const conversations = new Map<string, AtlasEngine>();

// Start new conversation
export const startConversation = async (): Promise<AtlasConversation> => {
  const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const engine = new AtlasEngine(conversationId);
  conversations.set(conversationId, engine);
  return engine.getConversation();
};

// Send message to conversation
export const sendMessage = async (
  conversationId: string,
  userInput: string
): Promise<AtlasServiceResponse> => {
  let engine = conversations.get(conversationId);
  
  if (!engine) {
    // Restore conversation if not in memory
    engine = new AtlasEngine(conversationId);
    conversations.set(conversationId, engine);
  }
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const message = await engine.processUserMessage(userInput);
  return {
    message,
    conversation: engine.getConversation()
  };
};

// Get conversation status
export const getConversation = (conversationId: string): AtlasConversation | null => {
  const engine = conversations.get(conversationId);
  return engine ? engine.getConversation() : null;
};

// Temporary stub for admin page until Supabase integration is complete
export const getAllLeads = (): any[] => {
  return [];
};
