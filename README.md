# SkyLogic Corporate Portfolio & Admin Management System

SkyLogic is an ultra-premium, dynamic corporate portfolio website and content management platform engineered with Next.js 15, TypeScript, TailwindCSS, Framer Motion, Prisma ORM, real-time visitor telemetry, passwordless 6-digit OTP authentication, and an interactive "Leave Your Mark" corkboard.

---

## Key Highlights & Features

1. **Public Website (100% Dynamic - Zero Hardcoded Data)**
   - **Hero Section**: Exact visual layout matching Image 1 with top navigation links (`Services`, `Feature Projects`, center logo `SkyLogic` with yellow dot accent, `Tools`, `How It Works`, `🌐 ID`), dark rounded container, ambient glowing 3D geometric objects, text layout, and CTA.
   - **Leave Your Mark (Interactive Corkboard)**: Exact sticky note & corkboard matching Images 2 & 3. Includes handwritten font style, color swatches (Yellow, Light Blue, Light Green, Soft Pink, Cream), 84-character countdown, pushpins, and pinned note board.
   - **Projects**: Category filtering (`Website`, `Mobile`, `AI`, `Cyber Security`, `UI/UX`, `Automation`, `Internal Tools`), featured badges, tech stack pills, and detail modal.
   - **Tech Stack**: 9-category grouped showcase (`Programming Language`, `Framework`, `Library`, `Database`, `Cloud`, `DevOps`, `Security`, `Design`, `Tools`).
   - **About Team**: Dynamic member cards, bios, avatars, and social links.
   - **Services & Contact**: Interactive service cards, contact channels, and Google Maps iframe integration.

2. **Passwordless OTP Login**
   - Username/Email submission -> 6-digit OTP code generated & sent via Nodemailer (or logged in console/dev mode) -> OTP verification -> Secure HTTP-only JWT Cookie session.

3. **Admin Dashboard (Vercel + Linear + Notion Aesthetic)**
   - Minimalist dark sidebar, top search bar, real-time visitor telemetry without page refresh.
   - Modules for Dashboard, Hero, About Team, Projects, Services, Stack, Media, Contact, Leave Your Mark, Analytics, SEO, Settings, and Profile.

---

## Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Migration & Seeding
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```

Visit the app at `http://localhost:3000`.

---

## Admin Login

1. Go to `http://localhost:3000/login`.
2. Input Username: `admin` or Email: `admin@skylogic.id`.
3. Click **Send OTP**.
4. Check server console output or SMTP for the 6-digit OTP code.
5. Input OTP and click **Verify & Access Dashboard**.
