// Atlas AI Service - Conversation Engine & Lead Qualification
import { CONTRACTOR_ACQUISITION_PROMPT } from './geminiService';

type ServiceVertical =
  | 'remodeling'
  | 'cleaning'
  | 'detailing'
  | 'mechanic'
  | 'landscaping'
  | 'hvac'
  | 'plumbing'
  | 'electrical'
  | 'roofing'
  | 'solar'
  | 'painting'
  | 'concrete'
  | 'fencing'
  | 'flooring'
  | 'pool'
  | 'handyman'
  | 'pressure_washing'
  | 'other';

type WrapUpReason = 'user_exit' | 'inactivity' | 'submit' | 'quick_limit';

const OPENAI_ENDPOINT = '/.netlify/functions/atlas-openai';
const LEAD_EMAIL_ENDPOINT = '/.netlify/functions/send-atlas-lead';
const OPENAI_TIMEOUT_MS = 60000; // 60 seconds for GPT-5 reasoning models
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;

const AFFIRMATIVE_KEYWORDS = ['yes', 'yep', 'yeah', 'looks good', 'sounds good', 'all good', 'go ahead', 'submit it', 'send it', 'that works'];
const EDIT_KEYWORDS = ['change', 'edit', 'adjust', 'tweak', 'update', 'add', 'fix', 'modify'];
const SUMMARY_KEYWORDS = ['summary', 'recap', 'show summary', 'share summary', 'send summary'];

const inactivityTimers = new Map<string, ReturnType<typeof setTimeout>>();

type KeywordDescriptor = {
  label: string;
  keywords: string[];
};

const MARKETING_CHANNEL_CLUES: KeywordDescriptor[] = [
  { label: 'Paid social ads (Facebook/Instagram)', keywords: ['facebook', 'instagram', 'meta ads', 'paid social'] },
  { label: 'Google Ads / PPC', keywords: ['google ads', 'ppc', 'adwords', 'search ads'] },
  { label: 'Door hangers / print', keywords: ['door hanger', 'flyer', 'print ads', 'mailers'] },
  { label: 'HomeAdvisor / Angi / Thumbtack', keywords: ['homeadvisor', 'angi', 'thumbtack', 'leads service'] },
  { label: 'Referrals / word of mouth', keywords: ['referral', 'word of mouth', 'repeat clients'] }
];

const SALES_PROCESS_CLUES: KeywordDescriptor[] = [
  { label: 'Dedicated sales reps', keywords: ['sales rep', 'sales team', 'closer'] },
  { label: 'Owner-led sales', keywords: ['i handle sales', 'i close', 'owner sells'] },
  { label: 'Inbound consults / appointments', keywords: ['appointments', 'consultation', 'booked calls', 'calendar'] }
];

const FINANCING_CLUES: KeywordDescriptor[] = [
  { label: 'Offers financing', keywords: ['financing', 'payment plan', 'same-as-cash'] },
  { label: 'No financing yet', keywords: ['no financing', 'don’t finance', "don't offer financing"] }
];

const CAPITAL_NEEDS_KEYWORDS = ['funding', 'capital', 'loan', 'credit line', 'cash flow', 'working capital'];
const DREAM_VISION_KEYWORDS = ['goal', 'vision', 'dream', 'plan', 'next level', 'scale to'];
const PAIN_POINT_KEYWORDS = ['struggling', 'hard', 'challenge', 'problem', 'bottleneck', 'stuck'];

const STATE_ABBREVIATIONS = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

type SpecialtyDescriptor = {
  vertical: ServiceVertical | 'any';
  label: string;
  keywords: string[];
};

const SERVICE_SPECIALTIES: SpecialtyDescriptor[] = [
  { vertical: 'detailing', label: 'Mobile/Fleet Detailing', keywords: ['mobile', 'fleet', 'on-site', 'on site'] },
  { vertical: 'detailing', label: 'Ceramic Coating', keywords: ['ceramic', 'coating', 'graphene'] },
  { vertical: 'cleaning', label: 'Commercial Cleaning', keywords: ['commercial', 'office', 'janitorial'] },
  { vertical: 'cleaning', label: 'Residential Cleaning', keywords: ['residential', 'homes', 'houses'] },
  { vertical: 'mechanic', label: 'Mobile Mechanic', keywords: ['mobile mechanic', 'roadside', 'fleet service'] },
  { vertical: 'mechanic', label: 'Fleet Contracts', keywords: ['fleet', 'fleet contract', 'fleet clients'] },
  { vertical: 'landscaping', label: 'Commercial Grounds', keywords: ['commercial grounds', 'commercial properties'] },
  { vertical: 'landscaping', label: 'Residential Lawn Care', keywords: ['residential lawns', 'homeowners'] },
  { vertical: 'hvac', label: 'Residential HVAC', keywords: ['residential', 'homes', 'homeowners'] },
  { vertical: 'hvac', label: 'Commercial HVAC', keywords: ['commercial', 'buildings'] },
  { vertical: 'roofing', label: 'Insurance Restoration', keywords: ['insurance', 'restoration', 'storm damage'] },
  { vertical: 'solar', label: 'Residential Solar', keywords: ['residential solar', 'roof mount'] },
  { vertical: 'solar', label: 'Commercial Solar', keywords: ['commercial solar', 'solar farm'] },
  { vertical: 'pressure_washing', label: 'Soft Wash Specialist', keywords: ['soft wash', 'softwash'] },
  { vertical: 'other', label: 'Commercial Services', keywords: ['commercial'] },
  { vertical: 'other', label: 'Residential Services', keywords: ['residential'] }
];

const collectDescriptorLabels = (input: string, descriptors: KeywordDescriptor[]): string[] => {
  const normalized = normalizeForKeywordSearch(input.toLowerCase());
  const labels = new Set<string>();
  descriptors.forEach(descriptor => {
    descriptor.keywords.forEach(keyword => {
      if (normalized.includes(normalizeForKeywordSearch(keyword.toLowerCase()))) {
        labels.add(descriptor.label);
      }
    });
  });
  return Array.from(labels);
};

const findFirstDescriptorLabel = (input: string, descriptors: KeywordDescriptor[]): string | undefined => {
  return collectDescriptorLabels(input, descriptors)[0];
};

const collectSpecialties = (input: string, vertical: ServiceVertical | undefined): string[] => {
  const normalized = normalizeForKeywordSearch(input.toLowerCase());
  const labels = new Set<string>();
  SERVICE_SPECIALTIES.forEach(descriptor => {
    if (descriptor.vertical !== 'any' && vertical && descriptor.vertical !== vertical) {
      return;
    }
    descriptor.keywords.forEach(keyword => {
      if (normalized.includes(normalizeForKeywordSearch(keyword.toLowerCase()))) {
        labels.add(descriptor.label);
      }
    });
  });
  return Array.from(labels);
};

const mergeListIntoString = (existing: string | undefined, additions: string[]): string => {
  const existingParts = existing ? existing.split(/\s*[|,]\s*/).filter(Boolean) : [];
  const combined = new Set<string>(existingParts);
  additions.forEach(addition => {
    if (addition.trim()) {
      combined.add(addition.trim());
    }
  });
  return Array.from(combined).join(', ');
};

const findStateMention = (input: string): string | undefined => {
  const upper = input.toUpperCase();
  for (const state of STATE_ABBREVIATIONS) {
    if (upper.includes(` ${state} `) || upper.endsWith(` ${state}`)) {
      return state;
    }
  }
  return undefined;
};

const extractNumericDetail = (input: string, pattern: RegExp): string | undefined => {
  const match = input.match(pattern);
  return match ? match[1]?.trim() || match[0] : undefined;
};

const extractServiceArea = (input: string): string | undefined => {
  const match = input.match(/(?:serving|service area(?: includes)?|we cover|operate in)\s+([^.,]+)/i);
  return match ? match[1].trim() : undefined;
};

const extractCity = (input: string): string | undefined => {
  const match = input.match(/(?:in|around|based in|out of)\s+([A-Z][A-Za-z\s]+?)(?:,|\b)/);
  if (match) {
    return match[1].trim();
  }
  return undefined;
};

const VERTICAL_FIELD_OVERRIDES: Partial<Record<ServiceVertical, IntakeQuestionKey[]>> = {
  detailing: ['services', 'serviceArea', 'teamSize', 'marketingChannels', 'financingOffers'],
  cleaning: ['services', 'serviceArea', 'teamSize', 'marketingChannels', 'monthlyVolume'],
  mechanic: ['services', 'teamSize', 'serviceArea', 'marketingChannels', 'financingOffers'],
  landscaping: ['services', 'teamSize', 'serviceArea', 'marketingChannels'],
  hvac: ['services', 'teamSize', 'serviceArea', 'financingOffers'],
  roofing: ['services', 'serviceArea', 'teamSize', 'financingOffers'],
  solar: ['services', 'serviceArea', 'financingOffers', 'teamSize'],
  pressure_washing: ['services', 'teamSize', 'marketingChannels']
};

const FIELD_QUESTION_HINTS: Partial<Record<IntakeQuestionKey, string>> = {
  name: "What's your name so I can address you properly?",
  contact: "What's the best email or phone for follow-up?",
  company: "What's your company called?",
  serviceVertical: "Which service do you specialize in?",
  serviceArea: "What areas do you primarily serve?",
  city: "Which city are you based out of?",
  state: "Which state do you operate in?",
  zip: "What's your primary business ZIP code?",
  timeline: "When are you hoping to tackle this growth push?",
  budget: "Do you have a budget range earmarked for growth or marketing?",
  teamSize: "How big is your crew or team right now?",
  yearsInBusiness: "How long have you been in business?",
  revenueCurrent: "About how much revenue are you doing annually today?",
  revenueGoal12: "What's the 12-month revenue target you're chasing?",
  revenueGoal36: "Where would you love to be in 3 years?",
  averageTicket: "What's the average ticket size for your jobs?",
  monthlyVolume: "Roughly how many jobs or installs do you handle per month?",
  marketingChannels: "What marketing channels are working for you right now?",
  salesProcess: "How do leads move through your sales process today?",
  financingOffers: "Do you currently offer financing or payment plans?",
  capitalNeeds: "Are you looking for any capital or funding support?",
  dreamVision: "Paint the dream—what does success look like when we nail this?",
  painPoints: "What's the biggest bottleneck slowing you down right now?",
  services: "What specific services or packages are you leading with?",
  details: "Anything else you'd like us to know about the business?"
};

export type ConversationMode = 'askAround' | 'intake';

const INTAKE_FIELD_KEYS = [
  'name',
  'contact',
  'company',
  'serviceVertical',
  'serviceArea',
  'city',
  'state',
  'zip',
  'timeline',
  'budget',
  'teamSize',
  'yearsInBusiness',
  'revenueCurrent',
  'revenueGoal12',
  'revenueGoal36',
  'averageTicket',
  'monthlyVolume',
  'marketingChannels',
  'salesProcess',
  'financingOffers',
  'capitalNeeds',
  'dreamVision',
  'painPoints',
  'services',
  'details'
] as const;

export type IntakeQuestionKey = typeof INTAKE_FIELD_KEYS[number];

const CORE_FIELDS: IntakeQuestionKey[] = [
  'name',
  'contact',
  'company',
  'serviceVertical',
  'serviceArea',
  'city',
  'state',
  'zip'
];

const GROWTH_FIELDS: IntakeQuestionKey[] = [
  'timeline',
  'budget',
  'teamSize',
  'yearsInBusiness',
  'revenueCurrent',
  'revenueGoal12',
  'revenueGoal36',
  'averageTicket',
  'monthlyVolume'
];

const MARKETING_FIELDS: IntakeQuestionKey[] = [
  'marketingChannels',
  'services',
  'salesProcess',
  'financingOffers',
  'details'
];

const VISION_FIELDS: IntakeQuestionKey[] = ['capitalNeeds', 'dreamVision', 'painPoints'];

const FIELD_PRIORITY: IntakeQuestionKey[] = [
  ...CORE_FIELDS,
  ...GROWTH_FIELDS,
  ...MARKETING_FIELDS,
  ...VISION_FIELDS
];

const FIELD_LABELS: Record<IntakeQuestionKey, string> = {
  name: 'Primary Contact',
  contact: 'Contact Info',
  company: 'Company',
  serviceVertical: 'Service Vertical',
  serviceArea: 'Service Area',
  city: 'City',
  state: 'State',
  zip: 'ZIP',
  timeline: 'Timeline',
  budget: 'Budget',
  teamSize: 'Team Size',
  yearsInBusiness: 'Years in Business',
  revenueCurrent: 'Current Revenue',
  revenueGoal12: '12-Month Goal',
  revenueGoal36: '36-Month Goal',
  averageTicket: 'Average Ticket',
  monthlyVolume: 'Monthly Volume',
  marketingChannels: 'Marketing Channels',
  salesProcess: 'Sales Process',
  financingOffers: 'Financing Offers',
  capitalNeeds: 'Capital Needs',
  dreamVision: 'Dream Vision',
  painPoints: 'Pain Points',
  services: 'Service Mix',
  details: 'Additional Details'
};

const SERVICE_KEYWORDS: Record<ServiceVertical, string[]> = {
  remodeling: ['remodel', 'renovation', 'kitchen', 'bathroom', 'basement'],
  cleaning: ['cleaning', 'maid', 'janitorial', 'housekeeping'],
  detailing: ['detail', 'detailing', 'auto detail', 'car wash', 'ceramic coat'],
  mechanic: ['mechanic', 'auto repair', 'garage', 'fleet service'],
  landscaping: ['landscape', 'lawn', 'yard', 'garden', 'tree service'],
  hvac: ['hvac', 'heating', 'cooling', 'air conditioning'],
  plumbing: ['plumb', 'pipe', 'sewer', 'drain'],
  electrical: ['electric', 'wiring', 'panel', 'lighting'],
  roofing: ['roof', 'shingle', 'gutters'],
  solar: ['solar', 'photovoltaic', 'pv'],
  painting: ['paint', 'coating', 'stain'],
  concrete: ['concrete', 'cement', 'flatwork'],
  fencing: ['fence', 'gate'],
  flooring: ['floor', 'tile', 'hardwood', 'carpet install'],
  pool: ['pool', 'spa', 'hot tub'],
  handyman: ['handyman', 'repair', 'odd jobs'],
  pressure_washing: ['pressure wash', 'power wash', 'soft wash'],
  other: []
};

const SERVICE_VERTICAL_LABELS: Record<ServiceVertical, string> = {
  remodeling: 'Remodeling',
  cleaning: 'Cleaning Services',
  detailing: 'Auto Detailing',
  mechanic: 'Mobile/Auto Mechanic',
  landscaping: 'Landscaping',
  hvac: 'HVAC',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  roofing: 'Roofing',
  solar: 'Solar',
  painting: 'Painting',
  concrete: 'Concrete',
  fencing: 'Fencing',
  flooring: 'Flooring',
  pool: 'Pool & Spa',
  handyman: 'Handyman',
  pressure_washing: 'Pressure Washing',
  other: 'Service Business'
};

const EXIT_KEYWORDS = ['bye', 'goodbye', 'see ya', 'thats all', "that's all", 'done for now', 'talk later', 'thank you bye'];

const normalizeForKeywordSearch = (value: string) => ` ${value.replace(/[^a-z0-9]+/g, ' ')} `;

const matchesAnyKeyword = (input: string, keywords: string[]) => {
  if (!keywords.length) return false;
  const normalizedInput = normalizeForKeywordSearch(input.toLowerCase());
  return keywords.some(keyword => normalizedInput.includes(normalizeForKeywordSearch(keyword.toLowerCase())));
};

export interface AtlasMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  leadData?: Partial<LeadData>;
  qualificationScore?: number;
  metadata?: {
    finalizeReason?: WrapUpReason;
  };
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
  companyName?: string;
  city?: string;
  state?: string;
  yearsInBusiness?: string;
  teamSize?: string;
  serviceArea?: string;
  serviceVertical?: ServiceVertical;
  services?: string;
  revenueCurrent?: string;
  revenueGoal12?: string;
  revenueGoal36?: string;
  averageTicket?: string;
  monthlyVolume?: string;
  marketingChannels?: string;
  salesProcess?: string;
  financingOffers?: string;
  capitalNeeds?: string;
  dreamVision?: string;
  painPoints?: string;
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
  lastUserMessageAt: Date | null;
  lastAssistantMessageAt: Date | null;
  wrapUpRequested: boolean;
  summaryOffered: boolean;
  summaryAccepted: boolean;
  summaryConfirmed: boolean;
  wrapUpState: 'idle' | 'offer' | 'awaitingDecision' | 'showingSummary' | 'awaitingApproval' | 'complete';
  wrapUpReason?: WrapUpReason;
  summarySnapshot?: string;
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
      leadNotificationSent: false,
      lastUserMessageAt: null,
      lastAssistantMessageAt: null,
      wrapUpRequested: false,
      summaryOffered: false,
      summaryAccepted: false,
      summaryConfirmed: false,
      wrapUpState: 'idle',
      wrapUpReason: undefined,
      summarySnapshot: undefined
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

  private addMessage(msg: Omit<AtlasMessage, 'id' | 'timestamp'>): AtlasMessage {
    const message: AtlasMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    this.conversation.messages.push(message);
    if (message.role === 'assistant') {
      this.conversation.lastAssistantMessageAt = message.timestamp;
    }
    return message;
  }

  async processUserMessage(userInput: string): Promise<AtlasMessage> {
    const userMessage: AtlasMessage = {
      id: `msg_user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };
    this.conversation.messages.push(userMessage);
    this.conversation.lastUserMessageAt = userMessage.timestamp;
    this.clearInactivityTimer();

    await this.analyzeInput(userInput);
    this.detectModeSwitch(userInput);
    this.updateIntakeProgress();
    this.updateQualificationScore();

    const autoSummaryResponse = this.maybeAutoOfferSummary();
    if (autoSummaryResponse) {
      if (this.shouldTriggerLeadNotification()) {
        await this.notifyNewLead();
      }
      return {
        ...autoSummaryResponse,
        leadData: { ...this.conversation.leadData },
        qualificationScore: this.conversation.qualificationScore
      };
    }

    const summaryResponse = await this.handleSummaryRequest(userInput);
    if (summaryResponse) {
      if (this.shouldTriggerLeadNotification()) {
        await this.notifyNewLead();
      }
      return {
        ...summaryResponse,
        leadData: { ...this.conversation.leadData },
        qualificationScore: this.conversation.qualificationScore
      };
    }

    const exitResponse = await this.handleExitSignals(userInput);
    if (exitResponse) {
      return {
        ...exitResponse,
        leadData: { ...this.conversation.leadData },
        qualificationScore: this.conversation.qualificationScore
      };
    }

    if (this.conversation.transferredToHuman && this.conversation.wrapUpState === 'idle') {
      const finalMessage =
        (await this.finalizeConversation(
          'submit',
          "Awesome—that gives me everything I need. I'll pass this along to our concierge team and they'll follow up with next steps. If you'd like to add anything else, just drop it here and I'll include it."
        )) ?? this.conversation.messages[this.conversation.messages.length - 1];
      return {
        ...finalMessage,
        leadData: { ...this.conversation.leadData },
        qualificationScore: this.conversation.qualificationScore
      };
    }

    const response = await this.generateResponse(userInput);
    
    // Add assistant message
    const assistantMessage = this.addMessage(response);
    this.recordIntakeQuestion(assistantMessage);

    this.scheduleInactivityTimer();

    if (this.shouldTriggerLeadNotification()) {
      await this.notifyNewLead();
    }

    return {
      ...assistantMessage,
      leadData: { ...this.conversation.leadData },
      qualificationScore: this.conversation.qualificationScore
    };
  }

  private clearInactivityTimer() {
    const timer = inactivityTimers.get(this.conversation.id);
    if (timer) {
      clearTimeout(timer);
      inactivityTimers.delete(this.conversation.id);
    }
  }

  private scheduleInactivityTimer() {
    if (this.conversation.wrapUpState === 'complete') {
      return;
    }
    this.clearInactivityTimer();
    const timer = setTimeout(async () => {
      try {
        if (this.conversation.wrapUpState === 'complete') {
          return;
        }
        await this.finalizeConversation(
          'inactivity',
          "I'll go ahead and package what you shared so our concierge team can follow up. If you come back later, we can pick up right where we left off."
        );
        if (this.shouldTriggerLeadNotification()) {
          await this.notifyNewLead();
        }
      } catch (error) {
        console.error('[Atlas] Failed to handle inactivity wrap-up', error);
      }
    }, INACTIVITY_TIMEOUT_MS);
    inactivityTimers.set(this.conversation.id, timer);
  }

  private buildSummarySnapshot(): string {
    const lines: string[] = [];
    const data = this.conversation.leadData;

    const addLine = (key: IntakeQuestionKey, value: unknown) => {
      if (!value) return;
      const label = FIELD_LABELS[key] ?? key;
      lines.push(`${label}: ${typeof value === 'string' ? value : JSON.stringify(value)}`);
    };

    FIELD_PRIORITY.forEach(key => {
      if (key === 'serviceVertical' && data.serviceVertical) {
        addLine(key, SERVICE_VERTICAL_LABELS[data.serviceVertical] ?? data.serviceVertical);
        return;
      }
      addLine(key, (data as Record<string, unknown>)[key]);
    });

    if (!lines.length) {
      lines.push('Visitor shared their contact details and general interest in growth.');
    }

    return lines.join('\n');
  }

  private showSummaryMessage(): AtlasMessage {
    const summary = this.buildSummarySnapshot();
    this.conversation.summarySnapshot = summary;
    this.conversation.summaryOffered = true;
    this.conversation.wrapUpState = 'showingSummary';
    this.conversation.intake.active = false;

    return this.addMessage({
      role: 'assistant',
      content: `Here’s the recap I’ll send to our concierge team:\n\n${summary}\n\nDoes that capture everything correctly?`,
      quickReplies: ['Looks good', 'Make a change', 'Add one more detail']
    });
  }

  private maybeAutoOfferSummary(): AtlasMessage | null {
    if (this.conversation.wrapUpState !== 'idle') {
      return null;
    }
    if (this.conversation.summaryOffered) {
      return null;
    }
    if (!this.hasCoreSubmissionData()) {
      return null;
    }

    const { intake } = this.conversation;
    const quickAlmostDone =
      intake.preference === 'quick' &&
      typeof intake.maxQuestions === 'number' &&
      intake.questionCount >= Math.max(intake.maxQuestions - 1, 1);
    const fullProgress =
      intake.preference !== 'quick' &&
      intake.questionCount >= 6;
    const idleIntake = !intake.active && this.conversation.mode !== 'intake' && this.hasContactInfo();

    if (!quickAlmostDone && !fullProgress && !idleIntake) {
      return null;
    }

    const message = this.showSummaryMessage();
    this.scheduleInactivityTimer();
    return message;
  }

  private async finalizeConversation(reason: WrapUpReason, closingLine?: string): Promise<AtlasMessage | null> {
    if (this.conversation.wrapUpState === 'complete') {
      return null;
    }

    this.conversation.wrapUpReason = reason;
    this.conversation.wrapUpState = 'complete';
    this.conversation.transferredToHuman = true;
    this.conversation.intake.active = false;
    this.conversation.wrapUpRequested = true;
    this.conversation.summaryAccepted = reason !== 'quick_limit';
    this.conversation.summaryConfirmed = reason !== 'quick_limit';
    this.conversation.summarySnapshot = this.buildSummarySnapshot();

    this.clearInactivityTimer();

    const content = closingLine ??
      "Perfect. I'll hand this off to our concierge team and they'll reach out shortly with next steps.";

    const message: Omit<AtlasMessage, 'id' | 'timestamp'> = {
      role: 'assistant',
      content,
      quickReplies: undefined,
      metadata: { finalizeReason: reason }
    };
    this.addMessage(message);
    return this.conversation.messages[this.conversation.messages.length - 1];
  }

  private async handleSummaryRequest(userInput: string): Promise<AtlasMessage | null> {
    const lower = userInput.toLowerCase();
    const askedForSummary = matchesAnyKeyword(lower, SUMMARY_KEYWORDS);
    const approvedSummary = matchesAnyKeyword(lower, AFFIRMATIVE_KEYWORDS);
    const wantsEdit = matchesAnyKeyword(lower, EDIT_KEYWORDS);

    if (this.conversation.wrapUpState === 'showingSummary') {
      if (approvedSummary) {
        return await this.finalizeConversation(
          'submit',
          "Amazing. I'll send this over to our concierge team and they'll connect with you shortly."
        );
      }
      if (wantsEdit) {
        this.conversation.wrapUpState = 'awaitingDecision';
        this.conversation.intake.active = true;
        const message = this.addMessage({
          role: 'assistant',
          content:
            "No problem—tell me what you'd like me to tweak or add, and I'll refresh the summary before we submit it.",
          quickReplies: ['Update the budget', 'Adjust the service area', 'Add a note about financing']
        });
        this.scheduleInactivityTimer();
        return message;
      }
      if (!askedForSummary) {
        return null;
      }
    }

    if (this.conversation.wrapUpState === 'awaitingDecision') {
      if (askedForSummary || approvedSummary) {
        this.conversation.wrapUpState = 'showingSummary';
      } else {
        const message = this.addMessage({
          role: 'assistant',
          content: "Got it! Want me to show an updated summary before we wrap things up?",
          quickReplies: ['Yes, show summary', 'Looks good now']
        });
        this.scheduleInactivityTimer();
        return message;
      }
    }

    if (!askedForSummary && !(this.conversation.summaryOffered && approvedSummary)) {
      return null;
    }

    const summary = this.buildSummarySnapshot();
    this.conversation.summarySnapshot = summary;
    this.conversation.summaryOffered = true;
    this.conversation.wrapUpState = 'showingSummary';

    const message = this.showSummaryMessage();
    this.scheduleInactivityTimer();
    return message;
  }

  private async handleExitSignals(userInput: string): Promise<AtlasMessage | null> {
    const lower = userInput.toLowerCase();
    const isExit = matchesAnyKeyword(lower, EXIT_KEYWORDS) || lower.includes('done') || lower.includes("that's it") || lower.includes('no thanks') || lower.includes('talk soon');

    if (!isExit) {
      return null;
    }

    return (await this.finalizeConversation(
      'user_exit',
      "Sounds great. I'll bundle this up for our concierge team and they'll get in touch with next steps."
    ));
  }

  private detectServiceVertical(input: string): ServiceVertical | null {
    const normalized = normalizeForKeywordSearch(input);
    let bestMatch: ServiceVertical | null = null;
    let bestScore = 0;

    (Object.keys(SERVICE_KEYWORDS) as ServiceVertical[]).forEach(vertical => {
      const keywords = SERVICE_KEYWORDS[vertical];
      if (!keywords.length) {
        return;
      }
      const matches = keywords.filter(keyword =>
        normalized.includes(normalizeForKeywordSearch(keyword))
      );
      if (matches.length > bestScore) {
        bestScore = matches.length;
        bestMatch = vertical;
      }
    });

    return bestMatch;
  }

  private async analyzeInput(input: string): Promise<void> {
    const lowerInput = input.toLowerCase();

    if (!this.conversation.leadData.serviceVertical) {
      const detectedVertical = this.detectServiceVertical(lowerInput);
      if (detectedVertical) {
        this.conversation.leadData.serviceVertical = detectedVertical;
        const specialties = collectSpecialties(input, detectedVertical);
        const baseLabel = SERVICE_VERTICAL_LABELS[detectedVertical] ?? detectedVertical;
        this.conversation.leadData.services = mergeListIntoString(this.conversation.leadData.services ?? baseLabel, specialties);
        if (!this.conversation.leadData.details) {
          this.conversation.leadData.details = input;
        }
      }
    }

    if (this.conversation.leadData.serviceVertical) {
      const specialties = collectSpecialties(input, this.conversation.leadData.serviceVertical);
      if (specialties.length) {
        this.conversation.leadData.services = mergeListIntoString(this.conversation.leadData.services, specialties);
      }
    }

    const marketingMentions = collectDescriptorLabels(input, MARKETING_CHANNEL_CLUES);
    if (marketingMentions.length) {
      this.conversation.leadData.marketingChannels = mergeListIntoString(this.conversation.leadData.marketingChannels, marketingMentions);
    }

    const salesProcessMentions = collectDescriptorLabels(input, SALES_PROCESS_CLUES);
    if (salesProcessMentions.length) {
      this.conversation.leadData.salesProcess = mergeListIntoString(this.conversation.leadData.salesProcess, salesProcessMentions);
    }

    const financingMention = findFirstDescriptorLabel(input, FINANCING_CLUES);
    if (financingMention && !this.conversation.leadData.financingOffers) {
      this.conversation.leadData.financingOffers = financingMention;
    }

    if (!this.conversation.leadData.capitalNeeds && CAPITAL_NEEDS_KEYWORDS.some(keyword => lowerInput.includes(keyword))) {
      this.conversation.leadData.capitalNeeds = 'Interested in capital or funding support';
    }

    if (!this.conversation.leadData.dreamVision && DREAM_VISION_KEYWORDS.some(keyword => lowerInput.includes(keyword))) {
      this.conversation.leadData.dreamVision = input;
    }

    if (!this.conversation.leadData.painPoints && PAIN_POINT_KEYWORDS.some(keyword => lowerInput.includes(keyword))) {
      this.conversation.leadData.painPoints = input;
    }

    if (!this.conversation.leadData.serviceArea) {
      const area = extractServiceArea(input);
      if (area) {
        this.conversation.leadData.serviceArea = area;
      }
    }

    if (!this.conversation.leadData.city) {
      const city = extractCity(input);
      if (city) {
        this.conversation.leadData.city = city;
      }
    }

    if (!this.conversation.leadData.state) {
      const state = findStateMention(` ${input} `);
      if (state) {
        this.conversation.leadData.state = state;
      }
    }

    if (!this.conversation.leadData.teamSize) {
      const teamMatch = extractNumericDetail(input, /(\d+\s+(?:person|people|employee|employees|crew|crews|techs|installers|team(?: members)?))/i);
      if (teamMatch) {
        this.conversation.leadData.teamSize = teamMatch;
      }
    }

    if (!this.conversation.leadData.yearsInBusiness) {
      const yearsMatch = extractNumericDetail(input, /(\d+\s+(?:years|yrs)(?:\s+in\s+business)?)/i);
      if (yearsMatch) {
        this.conversation.leadData.yearsInBusiness = yearsMatch;
      }
    }

    if (!this.conversation.leadData.revenueCurrent) {
      const revenueMatch = extractNumericDetail(input, /(?:revenue|bring in|doing about|pull in|at around)\s+([$\d,\.]+(?:\s*(?:k|m|million|thousand))?)/i);
      if (revenueMatch) {
        this.conversation.leadData.revenueCurrent = revenueMatch;
      }
    }

    if (!this.conversation.leadData.averageTicket) {
      const avgTicketMatch = extractNumericDetail(input, /(?:average (?:ticket|job|deal|project)(?: is)?\s*)?([$\d,\.]+(?:\s*(?:k|m|million))?)/i);
      if (avgTicketMatch && lowerInput.includes('average')) {
        this.conversation.leadData.averageTicket = avgTicketMatch;
      }
    }

    if (!this.conversation.leadData.monthlyVolume) {
      const monthlyMatch = extractNumericDetail(input, /(\d+\s+(?:jobs|projects|installs|deals)\s+(?:per|a)\s+(?:month|mo))/i);
      if (monthlyMatch) {
        this.conversation.leadData.monthlyVolume = monthlyMatch;
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
    if (data.serviceVertical || data.services || data.projectType) score += 15;
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

  private hasContactInfo(): boolean {
    return Boolean(this.conversation.leadData.email || this.conversation.leadData.phone);
  }

  private hasCoreSubmissionData(): boolean {
    const lead = this.conversation.leadData;
    return Boolean(
      lead.name &&
      this.hasContactInfo() &&
      (lead.serviceVertical || lead.services || lead.details)
    );
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

    const prioritizedPendingFields = this.getPrioritizedPendingFields();
    const nextField = prioritizedPendingFields[0];
    const nextFieldLabel = nextField ? FIELD_LABELS[nextField] : 'none';
    const nextFieldHint = nextField ? FIELD_QUESTION_HINTS[nextField] ?? '' : '';

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
- Pending Fields (in priority order): ${prioritizedPendingFields.join(', ') || 'none'}
- Suggested Next Field: ${nextFieldLabel}
- Suggested Question Prompt: ${nextFieldHint || 'ask anything relevant to progress intake'}
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
    const hasBasicInfo = Boolean(leadData.name || leadData.serviceVertical || leadData.timeline);
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

    if (!leadData.serviceVertical) {
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

  private recordIntakeQuestion(message: AtlasMessage): void {
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

    const dataMap: Partial<Record<IntakeQuestionKey, unknown>> = {
      name: this.conversation.leadData.name,
      contact: this.conversation.leadData.email || this.conversation.leadData.phone,
      company: this.conversation.leadData.companyName,
      serviceVertical: this.conversation.leadData.serviceVertical,
      serviceArea: this.conversation.leadData.serviceArea,
      city: this.conversation.leadData.city,
      state: this.conversation.leadData.state,
      zip: this.conversation.leadData.zip,
      timeline: this.conversation.leadData.timeline,
      budget: this.conversation.leadData.budget,
      teamSize: this.conversation.leadData.teamSize,
      yearsInBusiness: this.conversation.leadData.yearsInBusiness,
      revenueCurrent: this.conversation.leadData.revenueCurrent,
      revenueGoal12: this.conversation.leadData.revenueGoal12,
      revenueGoal36: this.conversation.leadData.revenueGoal36,
      averageTicket: this.conversation.leadData.averageTicket,
      monthlyVolume: this.conversation.leadData.monthlyVolume,
      marketingChannels: this.conversation.leadData.marketingChannels,
      salesProcess: this.conversation.leadData.salesProcess,
      financingOffers: this.conversation.leadData.financingOffers,
      capitalNeeds: this.conversation.leadData.capitalNeeds,
      dreamVision: this.conversation.leadData.dreamVision,
      painPoints: this.conversation.leadData.painPoints,
      services: this.conversation.leadData.services,
      details: this.conversation.leadData.details
    };

    const asked: IntakeQuestionKey[] = INTAKE_FIELD_KEYS.filter(key => Boolean(dataMap[key]));
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
    return FIELD_PRIORITY.filter(key => !this.conversation.intake.askedQuestions.includes(key));
  }

  private getPrioritizedPendingFields(): IntakeQuestionKey[] {
    const pending = this.getPendingIntakeKeys();
    if (!pending.length) {
      return pending;
    }
    const vertical = this.conversation.leadData.serviceVertical;
    if (!vertical) {
      return pending;
    }
    const override = VERTICAL_FIELD_OVERRIDES[vertical];
    if (!override || !override.length) {
      return pending;
    }
    const overrideSet = new Set<IntakeQuestionKey>(override as IntakeQuestionKey[]);
    const prioritized: IntakeQuestionKey[] = [];
    override.forEach(key => {
      if (pending.includes(key)) {
        prioritized.push(key);
      }
    });
    pending.forEach(key => {
      if (!overrideSet.has(key)) {
        prioritized.push(key);
      }
    });
    return prioritized;
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
