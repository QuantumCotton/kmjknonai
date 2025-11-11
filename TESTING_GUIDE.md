# Atlas Chatbot Testing Guide

## Quick Start - Run Live Tests

### 1. Upgrade Complete ✅
- Model upgraded from **gpt-5-nano** → **gpt-5-mini**
- All conversation improvements active
- Ready to test!

### 2. Start Netlify Dev Server

**First, you need the dev server running:**

```bash
netlify dev
```

Leave this running and open a **second terminal**.

### 3. Run the Test Suite

In the second terminal, run:

```bash
node test-chatbot.js
```

This will automatically run **4 different conversation scenarios**:

1. **Frustrated Kitchen Owner** - Tests emotion detection
2. **Excited Bathroom Remodeler** - Tests energy matching  
3. **Budget-Conscious Handyman Client** - Tests empathy with price concerns
4. **Vague Vision Explorer** - Tests guidance and idea contribution

### 3. What You'll See

The test script will show:
- 🎨 **Color-coded conversations** (User in cyan, Atlas in green)
- 📊 **Real-time metrics** (Stage, turn count, qualification score)
- 😊 **Emotion detection** (When Atlas detects frustration, excitement, etc.)
- ✅ **Final summary** (Success rate, average scores, leads captured)

### Example Output:

```
════════════════════════════════════════════════════════════════════════════
SCENARIO: Frustrated Kitchen Owner
Persona: Sarah - Overwhelmed homeowner with outdated kitchen
════════════════════════════════════════════════════════════════════════════

[ATLAS] Hey there! I'm Atlas with KMJK Home Improvement...

[USER] I'm so frustrated with my old kitchen, I don't even know where to start

[ATLAS] I totally get how frustrating that must be. Let's transform it into 
        something you'll love. What's your first name?
  Stage: greeting | Turn: 1 | Score: 0
  Emotion detected: frustrated

[USER] Sarah. The cabinets are falling apart...

[ATLAS] Nice to meet you, Sarah! So it's the cabinets and countertops that 
        need a refresh—that'll completely transform the space...
  Stage: dreaming | Turn: 1 | Score: 35
```

### 4. What Gets Tested

Each scenario tests different aspects:

✅ **Emotion Recognition** - Detects frustrated, excited, overwhelmed, nervous  
✅ **Empathy Responses** - Responds with appropriate empathy first  
✅ **Phrase Variation** - Uses different conversational transitions  
✅ **Stage Progression** - greeting → dreaming (min 3 turns) → logistics → wrap_up  
✅ **Turn Counting** - Enforces minimum 3 turns in dreaming phase  
✅ **Info Gathering** - Captures name, contact, project, vision, timeline, budget  
✅ **Qualification Scoring** - Calculates lead quality score  
✅ **CTA Delivery** - Proposes specific appointment times in wrap_up  

### 5. Expected Results

**Good Performance:**
- ✅ Average qualification score: 60-80/100
- ✅ All conversations should capture lead data
- ✅ Minimum 3 turns in dreaming phase (enforced)
- ✅ Emotion detection in scenarios 1-2
- ✅ Natural, varied phrasing throughout
- ✅ Specific scheduling CTA in wrap_up

**What to Watch For:**
- Does Atlas respond empathetically to "frustrated"?
- Does it avoid asking budget/timeline in dreaming phase?
- Do responses feel natural and varied (not robotic)?
- Does wrap_up include "Tuesday or Wednesday? 2pm or 4pm?"

---

## Alternative: Manual Testing (Chat Widget)

If you want to test the actual chat widget UI:

### 1. Start Local Dev Server

```bash
npm run dev
# or
netlify dev
```

### 2. Open in Browser

Navigate to: `http://localhost:8888` (or whatever port it shows)

### 3. Click the Chat Widget

Test the same scenarios manually by typing them in.

---

## Understanding the Metrics

### Conversation Stages
- **greeting** - Initial connection, get name & project type
- **dreaming** - Explore vision, style, materials (min 3 turns)
- **logistics** - Ask timeline, budget, location
- **wrap_up** - Summarize & schedule appointment

### Qualification Score (0-100)
- **0-39:** Low quality (missing critical info)
- **40-59:** Medium quality (some key details)
- **60-79:** High quality (most info captured)
- **80-100:** Excellent (complete lead, ready to close)

Scoring breakdown:
- Project type: +20
- Timeline: +15
- Budget: +15
- Zip code: +15
- Email: +20
- Phone: +15
- Scope notes: +10

### Turn Counts
- `turnCount` - Total exchanges in conversation
- `stageTurnCount` - Exchanges in current stage
- Dreaming phase requires minimum 3 turns before advancing

---

## Troubleshooting

### "Cannot find module" error
Make sure you're in the project root directory:
```bash
cd e:\Projects\websites\ElegantKmjk\kmjknonai
```

### Tests run but no OpenAI responses
1. Check your `.env` file has `OPENAI_API_KEY`
2. Verify Netlify functions are deployed
3. Try running: `netlify dev` first

### Want to add more scenarios?
Edit `test-chatbot.js` and add to the `scenarios` array:

```javascript
{
  name: 'Your Scenario Name',
  persona: 'Description of the test persona',
  messages: [
    "First user message",
    "Second user message",
    // etc.
  ],
}
```

---

## Next Steps After Testing

1. **Review Results** - Check if all scenarios performed well
2. **Identify Issues** - Note any unnatural responses or missed detections
3. **Deploy** - If satisfied, push changes to production
4. **Monitor** - Watch real user conversations for feedback

---

## Files Modified for GPT-5-mini

✅ `netlify/functions/kmjk-openai.js` - Updated DEFAULT_MODEL to 'gpt-5-mini'

---

**Happy testing! 🚀**

If you see issues, let me know and we can tweak the prompts or logic.
