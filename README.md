# Greg — Landing Page

Robinhood-themed landing page for Greg, a 20-year-old TikTok investing creator. Single-page site with light/dark toggle, qualification form (Resend), and 7 sections.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + CSS variables (theme toggle)
- Framer Motion (animations)
- Resend (form submissions)

## Local Setup

```bash
npm install
cp .env.example .env.local   # if not already done
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Key | Purpose |
|-----|---------|
| `RESEND_API_KEY` | Resend API key (get from resend.com) |
| `RESEND_FROM_EMAIL` | Verified sender domain (e.g. `leads@yourdomain.com`) |
| `RESEND_TO_EMAIL` | Greg's email — where leads are sent |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the deployed site |

If Resend keys are missing or set to placeholder values, the form will succeed visually and log submissions to the server console (dev mode).

## Placeholders to Replace
- Profile photo in [Hero.tsx](src/components/sections/Hero.tsx) — currently a green circle with "G"
- TikTok URL in [SocialStrip.tsx](src/components/sections/SocialStrip.tsx)
- Email address in [SocialStrip.tsx](src/components/sections/SocialStrip.tsx)
- Resend env keys + verified domain

## Deploy
Push to GitHub, import in Vercel, set env vars, deploy.
