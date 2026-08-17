# 🔧 FIX: Add API Key to Vercel Dashboard

The AI is not working because Vercel needs the API key added through its dashboard.

## 📋 COPY THIS API KEY:
```
YOUR_OPENAI_API_KEY_HERE
```

## 🎯 STEP-BY-STEP:

### Step 1: Open Vercel Settings
**Click this link**: https://vercel.com/ajmul-s-projects/ai-system-design-builder/settings/environment-variables

### Step 2: Add New Variable
1. Click the **"Add New"** button
2. You'll see a form with 3 fields

### Step 3: Fill in the Form
```
Name (Field 1):
NEXT_PUBLIC_OPENAI_API_KEY

Value (Field 2):
YOUR_OPENAI_API_KEY_HERE

Environments (Field 3):
☑️ Check all three:
   ✓ Production
   ✓ Preview  
   ✓ Development
```

### Step 4: Save
Click the **"Save"** button

### Step 5: Redeploy
1. Go to: https://vercel.com/ajmul-s-projects/ai-system-design-builder
2. Click **"Deployments"** tab at the top
3. Find the most recent deployment (top of the list)
4. Click the **3 dots (•••)** on the right side
5. Click **"Redeploy"**
6. Wait about 1 minute

### Step 6: Test Again
1. Visit: https://ai-system-design-builder.vercel.app
2. Click the AI Assistant (purple robot)
3. Ask: "Design a scalable system"
4. **It should work now!** ✅

---

## 🎥 VISUAL GUIDE:

**Environment Variables page looks like:**
```
┌─────────────────────────────────────────────┐
│  Environment Variables                       │
├─────────────────────────────────────────────┤
│  [Add New] button  ← Click this             │
│                                              │
│  Then fill:                                  │
│  Name: NEXT_PUBLIC_OPENAI_API_KEY           │
│  Value: sk-proj-Lvhb... (paste full key)    │
│  □ Production  □ Preview  □ Development     │
│              [Save]                          │
└─────────────────────────────────────────────┘
```

---

## ⚡ QUICK LINKS:

1. **Add Variable**: https://vercel.com/ajmul-s-projects/ai-system-design-builder/settings/environment-variables
2. **Redeploy**: https://vercel.com/ajmul-s-projects/ai-system-design-builder

---

## ✅ After This:

Your AI Assistant will work with GPT-4 on the live site! 🚀

The error happens because environment variables need to be in Vercel's dashboard, not just in files.
