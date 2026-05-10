# Parasharr Divine Astrology

A premium, full-stack astrological consulting platform built with **Next.js**, React, TypeScript, **Prisma (PostgreSQL)**, and **Auth.js** (Google Login). Designed with a custom elegant, celestial-themed aesthetic, smooth animations, an interactive Learning Management System (LMS), and a fully functional authenticated consultation booking system.

---

## ✨ Features

- **Full-Stack Next.js Architecture** — Server-side rendering, API routes, and static optimization.
- **PostgreSQL Database** — Managed via Prisma ORM for reliable, type-safe data persistence.
- **Google Authentication** — Secure login via `next-auth` for seamless client access.
- **User Profiles & Onboarding** — Onboarding flow to save Date of Birth, Time, and Location permanently.
- **Smart Booking System** — Automatically hydrates consultation forms using the authenticated user's saved data.
- **Learning Management System (LMS)** — A dedicated `/courses` route showcasing premium astrology courses with detailed curriculum, pricing, and dynamic detail pages (`/courses/[id]`).
- **Interactive Testimonial Carousel** — A custom, flex-based interactive carousel on the homepage displaying the most recent 4+ star client reviews.
- **Zodiac Infinite Marquee** — A seamless, continuously scrolling marquee featuring all 12 astrological signs.
- **Admin Approval System** — Protected `/admin/testimonies` dashboard for reviewing and approving user-submitted case studies.

---

## 📂 Project Structure

```text
Astra-Astrology/
├── prisma/
│   └── schema.prisma           # PostgreSQL Database Models (User, Testimony, Course, Lesson)
├── public/
│   └── testinomy/              # Static media (images, videos)
├── src/
│   ├── app/
│   │   ├── admin/testimonies/  # Admin approval dashboard
│   │   ├── api/auth/           # NextAuth Google provider endpoints
│   │   ├── courses/            # LMS: Astrology Courses listing
│   │   │   └── [id]/           # LMS: Individual Course detail & checkout page
│   │   ├── login/              # Login page route
│   │   ├── onboarding/         # User profile setup route
│   │   ├── testimonies/        # Client testimonies viewing page
│   │   │   └── submit/         # Protected testimony submission route
│   │   ├── layout.tsx          # Global wrapper (Navbar, Footer, Providers)
│   │   ├── page.tsx            # Main landing page (Marquees, Carousel, Services)
│   │   └── globals.css         # Global design tokens and styles
│   └── components/
│       ├── TestimonialCarousel.tsx
│       ├── ConsultationBookingForm.tsx
│       ├── CourseCard.tsx
│       └── ...                 # Modular React components
└── legacy_static/              # Archive of original HTML/JS files
```

---

## 🚀 Getting Started

This project uses Next.js and requires Node.js to be installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Google Cloud credentials and Supabase database URLs:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a_random_secure_string

DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"
```

### 3. Generate Database Client
```bash
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```
Then visit `http://localhost:3000` in your browser.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--accent-gold` | `#b5852a` | Primary accent, CTAs, highlights, icons |
| `--bg-main` | `rgba(243, 243, 151, 0.85)` | Primary page background |
| `--bg-card` | `#fdfbf7` | Card backgrounds (Testimonials, Courses, Services) |
| `--text-main` | `#1a1a1a` | Primary text color |

**Fonts:** [Cinzel](https://fonts.google.com/specimen/Cinzel) (headings, logo) · [Inter](https://fonts.google.com/specimen/Inter) (body text)
