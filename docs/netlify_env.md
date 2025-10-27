# Netlify Environment Variables

Copy these key/value pairs into **Site settings → Build & deploy → Environment → Edit variables** in Netlify. Replace any placeholder text (values wrapped in `< >`) with your actual secrets before saving.

```bash
# OpenAI / Atlas
OPENAI_API_KEY=<paste-openai-api-key>
OPENAI_MODEL=gpt-5-nano
OPENAI_FALLBACK_MODELS=gpt-4o-mini

# Resend lead notifications
RESEND_API_KEY=<paste-resend-api-key>
KMJK_LEAD_FROM=atlas@kmjk.pro
KMJK_LEAD_RECIPIENTS=info@kmjk.pro

# AWS S3 image uploads
AWS_ACCESS_KEY_ID=<paste-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<paste-aws-secret-access-key>
KMJK_S3_BUCKET=kmjk.pro
KMJK_S3_REGION=us-west-1
```

After saving, trigger a redeploy so the updated environment is available to all Netlify functions.
