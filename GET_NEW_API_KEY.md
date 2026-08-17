# 🔑 Get a New OpenAI API Key

## ❌ Current Issue:
The API key is invalid or expired. You need to get a fresh one.

---

## ✅ SOLUTION: Get a New API Key

### Step 1: Go to OpenAI Platform
**Visit**: https://platform.openai.com/api-keys

### Step 2: Sign In
- Use your OpenAI account (same as ChatGPT)
- Or create a new account if you don't have one

### Step 3: Create New Secret Key
1. Click the green **"+ Create new secret key"** button
2. Give it a name (e.g., "System Design Builder")
3. Click **"Create secret key"**
4. **IMPORTANT**: Copy the key immediately! (It starts with `sk-proj-` or `sk-`)
5. Save it somewhere safe - you can't see it again!

### Step 4: Add to Vercel
1. Go to: https://vercel.com/ajmul-s-projects/ai-system-design-builder/settings/environment-variables
2. Look for `NEXT_PUBLIC_OPENAI_API_KEY`
3. If it exists, click the **3 dots (•••)** → **Edit**
4. If not, click **"Add New"**
5. Paste your new API key
6. Save

### Step 5: Redeploy
1. Go to: https://vercel.com/ajmul-s-projects/ai-system-design-builder
2. Click **"Deployments"** tab
3. Click **3 dots (•••)** on latest deployment
4. Click **"Redeploy"**

---

## 💰 Billing Setup (Required!)

OpenAI now requires a payment method even for API usage:

1. Go to: https://platform.openai.com/settings/organization/billing
2. Click **"Add payment method"**
3. Add a credit/debit card
4. Set a usage limit (e.g., $5/month) to control costs

**Don't worry about costs!**
- GPT-4o-mini is extremely cheap: ~$0.15 per 1 million tokens
- Average conversation: $0.001 - $0.01 (less than a penny!)
- You can set a $5 limit and it'll last months

---

## 🆓 FREE Alternative: Google Gemini

If you don't want to pay for OpenAI, use Google Gemini (FREE):

1. Get free API key: https://makersuite.google.com/app/apikey
2. I can switch the code back to use Gemini instead
3. Completely free, no credit card needed!

---

## 📝 Which Do You Prefer?

**Option A**: Get new OpenAI key + add payment method → Best AI quality
**Option B**: Switch to free Google Gemini → No cost, still good quality

Let me know which you prefer and I'll help you set it up!

---

## 🔗 Quick Links:

- **Get OpenAI Key**: https://platform.openai.com/api-keys
- **Add Billing**: https://platform.openai.com/settings/organization/billing
- **Get Gemini Key (Free)**: https://makersuite.google.com/app/apikey
- **Vercel Settings**: https://vercel.com/ajmul-s-projects/ai-system-design-builder/settings/environment-variables
