# OpenAI GPT-4 Setup Guide

This app now uses **OpenAI GPT-4** for the best AI-powered system design assistance.

## 🔑 Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-`)

## ⚙️ Configure API Key

### Option 1: Local Development

1. Open `.env.local` file in the project root
2. Add your API key:
   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   ```
3. Save the file
4. Restart your dev server: `npm run dev`

### Option 2: Vercel Deployment

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `NEXT_PUBLIC_OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environments**: Production, Preview, Development
5. Click "Save"
6. Redeploy your app

## 💰 Pricing

OpenAI GPT-4 Turbo pricing:
- **Input**: $0.01 per 1K tokens (~750 words)
- **Output**: $0.03 per 1K tokens (~750 words)

**Example costs:**
- 100 AI messages: ~$0.50 - $2.00
- 1000 AI messages: ~$5.00 - $20.00

## 🎯 What GPT-4 Provides

### Superior Architecture Analysis
- Deep understanding of system design patterns
- Industry best practices and recommendations
- Security and scalability insights

### AI/ML Expertise
- ML pipeline design (training, inference, serving)
- Feature store and model registry recommendations
- Real-time vs batch processing guidance

### Data Engineering
- ETL pipeline optimization
- Stream processing architecture
- Data lake vs data warehouse guidance

### Cloud Architecture
- Multi-region deployment strategies
- Cost optimization recommendations
- High availability patterns

## 🆓 Free Alternative: Google Gemini

If you want to use the free Gemini API instead:

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
   ```
3. Modify `lib/ai-service.js` to use Gemini instead of OpenAI

## ⚠️ Security Tips

- **Never commit** your API key to GitHub
- Keep `.env.local` in `.gitignore`
- Use environment variables for deployment
- Rotate keys regularly
- Monitor usage in OpenAI dashboard

## 🔧 Troubleshooting

### "API key not configured" error
- Check `.env.local` file exists
- Verify key is correct (starts with `sk-`)
- Restart dev server after adding key

### "Quota exceeded" error
- Check your OpenAI billing dashboard
- Add payment method if needed
- Verify usage limits

### Rate limiting
- GPT-4 Turbo: 10,000 requests/minute
- Should be sufficient for normal usage

## 📊 Monitor Usage

Track your API usage:
1. Visit [OpenAI Usage Dashboard](https://platform.openai.com/usage)
2. View costs per day/month
3. Set spending limits

## 🚀 Ready to Use

Once configured, the AI assistant will provide:
- Architecture recommendations
- Component suggestions
- Security analysis
- Scalability advice
- AI/ML pipeline design
- Data flow optimization

Enjoy building with the world's most powerful AI! 🎉
