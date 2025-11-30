# Fix Git Push Issue - Step by Step

## Problem
The remote repository has commits that your local repository doesn't have. You need to pull first.

## Solution

### Step 1: Open Terminal in Replit
Click the "Shell" tab at the bottom of Replit

### Step 2: Run These Commands

```bash
# Navigate to your workspace
cd ~/workspace

# Pull the latest changes from GitHub
git pull origin main

# Now push your vercel.json changes
git push origin main
```

### If you get a lock error:

```bash
# Remove the lock file
rm -f ~/.config/git/index.lock

# Then try pulling again
git pull origin main

# Push your changes
git push origin main
```

## What This Does

1. **`git pull`** - Downloads the latest commits from GitHub and merges them with your local code
2. **`git push`** - Uploads your vercel.json changes to GitHub

## After This

Your Vercel deployment will be updated automatically:
1. Go to https://vercel.com/dashboard
2. Click your Portfolio project
3. Redeploy by clicking "..." → "Redeploy"
4. Visit https://portfolio-9ndc.vercel.app/ to verify it works!

## If You Get Conflicts

If there are merge conflicts, let me know and I'll help you resolve them.

---

**TL;DR:** Copy & paste this in the Replit terminal:
```bash
cd ~/workspace && git pull origin main && git push origin main
```

Done! ✅
