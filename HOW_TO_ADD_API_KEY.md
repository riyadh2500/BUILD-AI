# How to Add OpenAI API Key

## ✅ Your app is live at: https://ai-system-design-builder.vercel.app

## 🔑 To Enable AI Assistant:

### Step 1: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Add to Vercel (For Live Website)
1. Go to https://vercel.com/dashboard
2. Click on your project "ai-system-design-builder"
3. Go to **Settings** tab
4. Click **Environment Variables** in sidebar
5. Click "Add New"
6. Fill in:
   - **Name**: `NEXT_PUBLIC_OPENAI_API_KEY`
   - **Value**: Your API key (sk-...)
   - **Environments**: Check all (Production, Preview, Development)
7. Click **Save**
8. Go to **Deployments** tab
9. Click the three dots on latest deployment
10. Click **Redeploy**

### Step 3: Test It!
1. Visit https://ai-system-design-builder.vercel.app
2. Click AI Assistant button (bottom right)
3. It should now work! Ask "How to design a scalable ML system?"

## 💰 Cost:
- GPT-4 Turbo: ~$0.01-0.03 per 1000 words
- Average chat: $0.01-0.05
- Very affordable for personal use!

## 🆓 Free Alternative (Google Gemini):
If you want to use the FREE Google Gemini instead:
1. Get key from https://makersuite.google.com/app/apikey
2. Add environment variable: `NEXT_PUBLIC_GEMINI_API_KEY`
3. Modify `lib/ai-service.js` to use Gemini

---

**That's it!** Your AI assistant will be powered by GPT-4 🚀
