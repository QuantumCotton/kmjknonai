# Cloudinary Setup for KMJK Chatbot Images

## 🌩️ Cloudinary is MUCH Easier than AWS!

### Step 1: Create Free Account (2 minutes)
1. Go to: **https://cloudinary.com/users/register/free**
2. Fill out the form (free plan = 25GB storage + 25GB bandwidth)
3. Verify your email

### Step 2: Get Your Credentials (1 minute)
1. Login to Cloudinary dashboard
2. Click your avatar (top right) → **Dashboard**
3. Look for **Account Details** → you'll see:
   - **Cloud Name:** `abc123xyz` (copy this)
   - **API Key:** `123456789012345` (copy this)
   - **API Secret:** (click "Show" and copy this)

### Step 3: Add to Netlify (2 minutes)
1. Go to your Netlify site: **Site settings** → **Environment variables**
2. Add these 3 variables:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here  
CLOUDINARY_API_SECRET=your_api_secret_here
```

3. Click **Save**

### Step 4: Deploy (automatic)
- Netlify will redeploy automatically when you save the variables
- Takes about 2-3 minutes

---

## ✅ That's It! No AWS, No CORS, No Headaches!

### What You Get:
- ✅ **Free:** 25GB storage + 25GB bandwidth/month
- ✅ **Simple:** Just 3 environment variables
- ✅ **Fast:** Images upload in seconds
- ✅ **Secure:** All images stored in your Cloudinary account
- ✅ **Optimized:** Cloudinary automatically optimizes images

### How It Works:
1. User clicks paperclip 📎 in chatbot
2. Selects photo (JPG, PNG, WebP, HEIC up to 5MB)
3. Photo uploads to your Cloudinary account
4. Photo appears in chat with "View full size" link
5. When chat ends, photo URLs are sent to:
   - ✅ Slack notification
   - ✅ Web3Forms email

---

## 🧪 Test It

After Netlify finishes deploying:

1. Open your KMJK website
2. Click the gold chat bubble
3. Click the paperclip 📎
4. Select a photo
5. Photo should upload and appear in chat!

---

## 🔍 Check Your Images

All uploaded photos will be in your Cloudinary dashboard:
- Go to **Media Library** → **kmjk-chat** folder
- You'll see all chatbot photos organized by conversation

---

## 🎉 You're Done!

No more AWS confusion! Cloudinary handles everything automatically.

**Questions? Just ask - this is way simpler than AWS!**
