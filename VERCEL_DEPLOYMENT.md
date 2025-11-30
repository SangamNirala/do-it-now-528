# Deploy to Vercel - Step by Step Guide

## Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub repository already pushed (✅ Done)

## Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel:**
   - Visit https://vercel.com/dashboard
   - Sign in with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Find and select: `SangamNirala/Portfolio`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Other (or leave blank)
   - **Build Command:** `npm run build` ✓
   - **Output Directory:** `dist` ✓
   - **Install Command:** `npm install` ✓

4. **Environment Variables (if needed):**
   - Add any optional env vars:
     - `DATABASE_URL` (if using database)
     - `GEMINI_API_KEY` (if using AI chat)
     - `SESSION_SECRET` (if using sessions)

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-5 minutes for deployment
   - You'll get a live URL automatically!

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```
   - Follow the authentication steps

3. **Deploy:**
   ```bash
   vercel
   ```
   - Select your project
   - Choose deployment settings
   - Follow prompts

4. **Get Your URL:**
   - Vercel will give you a live URL
   - Example: `https://portfolio.vercel.app`

## Option 3: Deploy via GitHub (Recommended)

1. **Connect Vercel to GitHub:**
   - Go to https://vercel.com/import
   - Click "From Git Repository"
   - Authorize Vercel with GitHub

2. **Select Your Repository:**
   - Choose `SangamNirala/Portfolio`

3. **Auto-Deploy:**
   - Vercel will automatically deploy on every push to `main` branch
   - You can see deployments at https://vercel.com/dashboard

## After Deployment

### Your Portfolio Will Be Live At:
```
https://your-project-name.vercel.app
```

### Test the Live Site:
- ✅ Hero section loads
- ✅ Animations work smoothly
- ✅ All sections scroll properly
- ✅ Download resume works
- ✅ Social links work
- ✅ Contact form works

### Custom Domain (Optional):
1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

## Vercel Features You Get:

✅ **Free HTTPS** - Automatic SSL certificates  
✅ **Auto-scaling** - Handles traffic automatically  
✅ **Global CDN** - Fast delivery worldwide  
✅ **Preview URLs** - Test before deploying  
✅ **Analytics** - See visitor stats  
✅ **Automatic Deployments** - Deploy on every push to GitHub  
✅ **Environment Variables** - Secure secrets management  

## Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Run `npm run build` locally to test

**Page shows 404?**
- vercel.json is configured for SPA fallback
- If issues persist, check Vercel function configuration

**Slow deployment?**
- First deployment takes longer
- Subsequent deployments are faster

## Monitoring Your Deployment

1. **View Logs:**
   - Go to your Vercel project dashboard
   - Click "Deployments"
   - Select a deployment to see logs

2. **Set Up Monitoring:**
   - Enable "Web Analytics" in Vercel dashboard
   - Monitor Core Web Vitals

## Next Steps

- [ ] Create Vercel account (https://vercel.com)
- [ ] Connect GitHub repository
- [ ] Deploy your portfolio
- [ ] Test all features
- [ ] Set up custom domain (optional)
- [ ] Share your live URL!

## Your Current Deployment Links

**GitHub:** https://github.com/SangamNirala/Portfolio  
**Replit:** https://sangam-portfolio.replit.dev (currently running)  
**Vercel:** Coming soon! 🚀

---

## Quick Start (Most Recommended Way)

1. Go to: https://vercel.com/new
2. Click "GitHub"
3. Search for "Portfolio"
4. Select your repository
5. Click "Import"
6. Click "Deploy"
7. **Done!** 🎉

Vercel will automatically detect your configuration and deploy!

---

Need help? Check Vercel docs: https://vercel.com/docs
