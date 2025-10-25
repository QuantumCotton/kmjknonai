import nodemailer from 'nodemailer';

interface LeadPayload {
  conversationId: string;
  startedAt: string | Date;
  qualificationScore: number;
  leadData: Record<string, unknown>;
  mode: string;
  intake: {
    active: boolean;
    estimatedQuestions: number;
    askedQuestions: string[];
  };
  transcript: Array<{
    role: string;
    content: string;
    timestamp: string | Date;
  }>;
}

const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASS',
  'EMAIL_FROM',
  'LEAD_EMAIL_TO'
];

function ensureEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}

function createTransporter() {
  ensureEnv();
  const port = Number(process.env.SMTP_PORT);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.isNaN(port) ? 465 : port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function formatLeadSummary(payload: LeadPayload): string {
  const { leadData = {}, conversationId, startedAt, qualificationScore, mode, intake } = payload;
  const lines: string[] = [];
  lines.push(`Conversation ID: ${conversationId}`);
  lines.push(`Started At: ${new Date(startedAt).toLocaleString()}`);
  lines.push(`Qualification Score: ${qualificationScore}`);
  lines.push(`Mode: ${mode}`);
  lines.push(`Intake Active: ${intake?.active ? 'Yes' : 'No'}`);
  lines.push(`Intake Progress: ${intake?.askedQuestions?.join(', ') || 'none'}`);
  lines.push('--- Lead Data ---');
  Object.entries(leadData).forEach(([key, value]) => {
    if (value) {
      lines.push(`${key}: ${value}`);
    }
  });
  return lines.join('\n');
}

function formatTranscript(payload: LeadPayload): string {
  if (!Array.isArray(payload.transcript)) {
    return 'No transcript available.';
  }
  return payload.transcript
    .map((entry) => {
      const ts = new Date(entry.timestamp).toLocaleString();
      return `[${ts}] ${entry.role.toUpperCase()}: ${entry.content}`;
    })
    .join('\n');
}

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing payload body' })
    };
  }

  let payload: LeadPayload;
  try {
    payload = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON payload' })
    };
  }

  try {
    const transporter = createTransporter();
    const summary = formatLeadSummary(payload);
    const transcript = formatTranscript(payload);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.LEAD_EMAIL_TO,
      subject: `[Atlas Lead] ${payload.leadData?.name ?? 'New Prospect'} (${payload.qualificationScore}/100)` ,
      text: `${summary}\n\n--- Conversation Transcript ---\n${transcript}`,
      html: `<pre style="font-family: 'Courier New', monospace; white-space: pre-wrap;">${summary}\n\n--- Conversation Transcript ---\n${transcript}</pre>`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('[Atlas Lead Email] Error sending notification', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send lead email' })
    };
  }
};
