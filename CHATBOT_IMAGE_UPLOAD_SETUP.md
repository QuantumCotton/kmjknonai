# KMJK Chatbot Image Upload Setup

## ✅ Code Changes Complete

Image upload has been re-enabled in the chatbot! Users can now tap the paperclip 📎 to upload project photos.

## 🔐 Required Environment Variables

You need to configure these in your Netlify dashboard to enable S3 uploads:

### 1. Go to Netlify Dashboard
- Navigate to: **Site settings** → **Environment variables**

### 2. Add These Variables

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `KMJK_S3_BUCKET` | Your AWS S3 bucket name | `kmjk-chat-uploads` |
| `KMJK_S3_REGION` | AWS region where bucket is located | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret access key | `wJalrXUtnFEMI/K7MDENG/...` |

### 3. Optional Configuration

| Variable Name | Default | Description |
|--------------|---------|-------------|
| `KMJK_ALLOWED_MIME` | `image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif` | Allowed file types |
| `KMJK_UPLOAD_MAX_BYTES` | `5242880` (5MB) | Max file size in bytes |

---

## 🪣 AWS S3 Bucket Setup

### Create S3 Bucket

1. **Login to AWS Console** → S3
2. **Create bucket** with a unique name (e.g., `kmjk-chat-uploads`)
3. **Region:** Choose closest to your users (e.g., `us-east-1`)
4. **Block Public Access:** Keep default settings (block all public access)
   - We'll use signed URLs instead of public access
5. **Create bucket**

### Configure CORS

Add this CORS configuration to your bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": [
      "https://kmjk.pro",
      "https://www.kmjk.pro",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    "ExposeHeaders": ["ETag"]
  }
]
```

**How to add CORS:**
1. Go to your bucket → **Permissions** tab
2. Scroll to **Cross-origin resource sharing (CORS)**
3. Click **Edit** and paste the JSON above
4. Save changes

---

## 👤 AWS IAM User Setup

### Create IAM User for Uploads

1. **AWS Console** → **IAM** → **Users** → **Create user**
2. **User name:** `kmjk-chatbot-uploader`
3. **Permissions:** Attach policies directly
4. **Create and attach this custom policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::kmjk-chat-uploads/*"
    }
  ]
}
```

5. **Create user**
6. **Create access key:**
   - User → **Security credentials** → **Create access key**
   - Use case: **Application running outside AWS**
   - Copy the **Access Key ID** and **Secret Access Key**
   - ⚠️ Save these securely - you won't see the secret again!

---

## 🚀 Deploy and Test

### 1. Commit and Push Changes

```bash
git add src/components/ChatWidget.jsx
git commit -m "Re-enable chatbot image uploads with S3"
git push origin main
```

### 2. Add Environment Variables to Netlify

1. Go to your Netlify site dashboard
2. **Site settings** → **Environment variables**
3. Add all 4 required variables listed above
4. Click **Save**

### 3. Trigger Redeploy

Netlify should auto-deploy when you push. If not:
- **Deploys** tab → **Trigger deploy** → **Deploy site**

### 4. Test It!

1. Open your KMJK website
2. Click the chat bubble
3. Click the paperclip 📎 icon
4. Select a photo (JPG, PNG, WebP, HEIC)
5. Photo should upload and appear in the chat
6. When conversation ends, photo URLs will be in both:
   - ✅ Slack notification
   - ✅ Web3Forms email

---

## 📊 What Gets Uploaded

- **Stored in:** `s3://your-bucket/chat-uploads/{conversationId}/{filename}-{uuid}.jpg`
- **Access:** Signed URLs valid for 7 days
- **Included in notifications:** Photo URLs sent to both Slack and Web3Forms
- **Security:** Files are private, accessible only via signed URLs

---

## 🔍 Troubleshooting

### "Missing S3 configuration" error
- Make sure `KMJK_S3_BUCKET` and `KMJK_S3_REGION` are set in Netlify

### "Access Denied" errors
- Check IAM user has correct S3 permissions
- Verify bucket name matches the one in IAM policy

### Upload button does nothing
- Check browser console for errors
- Verify CORS configuration in S3 bucket

### Photos don't appear in notifications
- Photos are added to `leadData.photos` array
- Check Slack message and Web3Forms email for photo URLs

---

## ✅ Success Criteria

When working correctly:
- ✅ Paperclip button is enabled (not grayed out)
- ✅ Clicking it opens file picker
- ✅ Selected image uploads with progress indicator
- ✅ Image appears in chat thread
- ✅ "View full size" link works
- ✅ Photo URL appears in Slack notification
- ✅ Photo URL appears in Web3Forms email
