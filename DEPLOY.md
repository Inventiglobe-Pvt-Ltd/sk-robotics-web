# SK Robotics & VR Science Labs — Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- A GitHub account
- A Vercel account (free hobby tier)
- A Resend account (free, no credit card needed)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the project root:

```
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_WHATSAPP_NUMBER=918501924576
NEXT_PUBLIC_SITE_URL=https://skrobotics.in
```

### Getting a Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up (free, no credit card)
3. Go to API Keys → Create API Key
4. Copy the key and paste it into `.env.local`

## Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SK Robotics website"
   git remote add origin https://github.com/YOUR_USERNAME/sk-robotics-web.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables**
   - In the Vercel dashboard, go to Settings → Environment Variables
   - Add:
     - `RESEND_API_KEY` = your Resend API key
     - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `918501924576`
     - `NEXT_PUBLIC_SITE_URL` = your production URL

4. **Add Custom Domain** (optional)
   - Go to Settings → Domains
   - Add `skrobotics.in` (or your chosen domain)
   - Update DNS records as instructed

5. **Done!**
   - Vercel auto-deploys on every `git push` to `main`

## Image Replacement

All images in the site are currently placeholders. Replace these files in `/public/images/`:

- `hero-students.jpg` — Students using VR headset
- `vr-lab.jpg` — VR lab in action
- `ar-class.jpg` — AR learning session
- `ai-session.jpg` — AI/coding class
- `robotics.jpg` — Robotics workshop
- `gallery-1.jpg` through `gallery-6.jpg` — Various lab photos
- `about-story.jpg` — Team setting up lab

Recommended image dimensions:
- Hero: 900×600px
- Program images: 700×500px
- Gallery: 600×450px (or square 600×600px)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Fonts**: Syne + Plus Jakarta Sans (Google Fonts)
- **Deployment**: Vercel
