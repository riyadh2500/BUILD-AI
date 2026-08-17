# Deployment Guide - AI System Design Builder

## 🚀 Deploy to Vercel (Recommended - FREE)

Vercel is the easiest way to deploy Next.js applications. It's free and takes just a few minutes.

### Step 1: Prepare Your Project

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com/signup
   - Create a free account

2. **Install Git** (if not already installed)
   - Check if Git is installed: Open terminal and type `git --version`
   - If not installed, download from: https://git-scm.com/downloads

3. **Initialize Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name: `ai-system-design-builder`
   - Keep it Public
   - Don't initialize with README
   - Click "Create repository"

5. **Push your code to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-system-design-builder.git
   git branch -M main
   git push -u origin main
   ```
   (Replace YOUR_USERNAME with your actual GitHub username)

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit: https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find your `ai-system-design-builder` repository
   - Click "Import"

3. **Configure Your Project**
   - Project Name: `ai-system-design-builder` (or your preferred name)
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `./` (keep as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add these variables:
   
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_APP_NAME=AI System Design Builder
   NEXT_PUBLIC_APP_VERSION=1.0.0
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a URL like: `https://ai-system-design-builder.vercel.app`

### Step 3: Share Your App

Your app is now live! 🎉

- **Your URL**: `https://your-project-name.vercel.app`
- Share this URL with anyone - they can access it from anywhere!
- Every time you push code to GitHub, Vercel will automatically redeploy

### Step 4: Custom Domain (Optional)

If you want a custom domain like `myapp.com`:

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

---

## Option 2: Deploy to Netlify (Alternative - FREE)

1. **Build your app**
   ```bash
   npm run build
   ```

2. **Create `netlify.toml` file**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy**
   - Go to https://app.netlify.com/drop
   - Drag and drop your project folder
   - Or connect your GitHub repository

---

## Option 3: Deploy to Your Own Server

If you have your own server:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Start in production mode**
   ```bash
   npm start
   ```

3. **Use PM2 to keep it running**
   ```bash
   npm install -g pm2
   pm2 start npm --name "ai-design-builder" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx (reverse proxy)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📋 Pre-Deployment Checklist

- [ ] Remove console.log statements (optional)
- [ ] Add your Gemini API key to environment variables
- [ ] Test the build locally: `npm run build && npm start`
- [ ] Ensure .env.local is in .gitignore (never commit API keys!)
- [ ] Update README.md with your project information

---

## 🔒 Security Notes

1. **Never commit API keys to GitHub**
   - .env.local should be in .gitignore
   - Always use environment variables in production

2. **API Key Security**
   - Your Gemini API key is exposed in the client (NEXT_PUBLIC_*)
   - Consider adding rate limiting
   - For production, create an API route to proxy Gemini requests

3. **Environment Variables**
   - Always use environment variables for sensitive data
   - Different variables for development and production

---

## 🎯 Post-Deployment

After deployment:

1. **Test your live app**
   - Try all features
   - Test drag and drop
   - Test AI Assistant (if API key is configured)
   - Test on mobile devices

2. **Monitor Performance**
   - Vercel provides built-in analytics
   - Check load times and errors

3. **Share your app**
   - Social media
   - Portfolio
   - LinkedIn

---

## 🆘 Troubleshooting

### Build Fails

**Error: "Module not found"**
- Run `npm install` to ensure all dependencies are installed
- Check package.json for missing dependencies

**Error: "Command failed: npm run build"**
- Test build locally first: `npm run build`
- Check for TypeScript errors or linting issues

### App Works Locally But Not After Deploy

**Environment Variables**
- Ensure all NEXT_PUBLIC_* variables are set in Vercel/Netlify
- Restart the deployment after adding variables

**API Errors**
- Check your API key is correct
- Verify API quotas haven't been exceeded

### Drag and Drop Not Working

- Check browser console for errors
- Clear browser cache
- Ensure all dependencies are installed correctly

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Netlify Deploy](https://docs.netlify.com/)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/domains)

---

## ✅ You're Done!

Your AI System Design Builder is now live on the internet! 🎉

Share your URL and let people create amazing architecture diagrams!
