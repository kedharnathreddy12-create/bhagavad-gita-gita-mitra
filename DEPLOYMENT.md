# Deployment Guide

The Krishna Bhagavad Gita platform is fully optimized for Vercel deployment. It leverages Next.js App Router, Turbopack, static site generation, and Edge-compatible API routes.

## Prerequisites
- A GitHub/GitLab/Bitbucket account with your code pushed to a repository.
- A Vercel account.
- A Google Gemini API Key.

## Vercel Deployment Steps

1. **Import Project**
   - Log into Vercel and click **"Add New Project"**.
   - Import your Git repository containing the code.
   - Vercel will automatically detect that this is a Next.js project.

2. **Configure Environment Variables**
   - In the "Environment Variables" section before deploying, add:
     - Name: `GEMINI_API_KEY`
     - Value: `[Your Actual API Key]`

3. **Deploy**
   - Click **Deploy**.
   - Vercel will automatically run `npm install` and `npm run build`.
   - Wait for the build to complete (usually < 2 minutes).

4. **Verify Deployment**
   - Click the generated Vercel domain to visit your live site.
   - Test the chatbot to ensure the `GEMINI_API_KEY` is working correctly in production.
   - Navigate to `/sitemap.xml` to ensure your sitemap has been generated correctly based on the Vercel URL.
     - *Note: You should update the `baseUrl` inside `app/sitemap.ts` to your actual custom domain once you have one.*

## Post-Deployment Actions
- Submit your `https://your-domain.com/sitemap.xml` to Google Search Console to speed up indexing.
- When you add new slokas or stories to the `data/` folder and push to `main`, Vercel will automatically trigger a new deployment and rebuild the static pages.
