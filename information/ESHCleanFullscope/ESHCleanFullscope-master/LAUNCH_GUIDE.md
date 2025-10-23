# 🚀 Elite Service Hub - Local Launch Guide

## Quick Start

### 1. Install Dependencies (Already Done! ✅)
```bash
npm install
```

### 2. Set Up Supabase Credentials (Required for Forms)
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (or create one)
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon/public** key
5. Create a `.env` file (or edit the existing one):

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Launch the Dev Server
```bash
npm run dev
```

The site will open at: **http://localhost:5173**

---

## What You'll See 👀

### Current Features ✅
- **Hero Section** with your gold ESH logo
- **Value Proposition** cards (4 benefits)
- **Application Form** (saves to Supabase when configured)
- Black/gold luxury aesthetic
- Mobile responsive
- Smooth animations

### Note 📝
- Form submissions won't work until you add real Supabase credentials
- Email notifications are set up to send to **Chris@TheEliteServiceHub.com**
- Phone number **(650) 501-7659** is kept private (not displayed publicly)

---

## Taking Screenshots 📸

### Desktop View
1. Open **http://localhost:5173** in your browser
2. Use browser dev tools (F12) to test responsive views
3. Take full-page screenshots with browser extensions

### Mobile View
1. In dev tools, toggle device toolbar (Ctrl+Shift+M)
2. Select device (iPhone, Android, etc.)
3. Take screenshots

### Recommended Screenshot Sections
- [ ] Hero with logo
- [ ] Value proposition cards
- [ ] Application form (top)
- [ ] Application form (bottom sections)
- [ ] Mobile view

---

## File Structure 📁

```
public/
  images/
    logos/
      esh-dark-bg.png     ← Your gold logo on black
      esh-light-bg.png    ← Your gold logo on white

src/
  components/
    Hero.tsx              ← Hero with logo
    ValueProposition.tsx  ← 4 benefit cards
    ApplicationForm.tsx   ← Contractor application
  lib/
    supabase.ts          ← Database connection
  App.tsx                ← Main app component
  index.css             ← Global styles + fonts
```

---

## Next Steps After Screenshots 🎯

1. **Add Real Supabase Credentials** (so forms work)
2. **Review Revision Plan** for Phase 0-5 roadmap
3. **Build Chatbot** (Atlas for website, Cotton for backend)
4. **Build Dashboard** with work orders & shortcuts
5. **Multi-page Site** (routing, navigation, footer)

---

## Troubleshooting 🔧

### Port Already in Use
```bash
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <process_id> /F
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Errors
- Check your `.env` file has correct credentials
- Verify Supabase project is active
- Check browser console for error messages

---

**Ready to ship! 🚀**

Need help? Email Chris@TheEliteServiceHub.com
