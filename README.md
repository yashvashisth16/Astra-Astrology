#  Parasharr Dynasty Astrology

A premium, full-stack astrological consulting platform built with **Next.js**, React, TypeScript, and **Auth.js** (Google Login). Designed with a custom light yellow aesthetic, smooth animations, and a fully functional authenticated consultation booking system.

---

##  Features

- **Full-Stack Next.js Architecture** — Server-side rendering and static optimization.
- **Google Authentication** — Secure login via `next-auth`.
- **User Profiles** — Onboarding flow to save Date of Birth, Time, and Location permanently.
- **Smart Booking System** — Automatically hides personal detail fields for logged-in users.
- **Animated starfield background** — CSS star animations for an immersive cosmic atmosphere.
- **Testimonies System** — Protected route for authenticated users to submit their case studies.
- **Responsive navigation** — Hamburger menu for mobile, dynamic user login state.

---

##  Project Structure

```text
Astra-Astrology/
├── public/
│   └── testinomy/              # Static media (images, videos)
├── src/
│   ├── app/
│   │   ├── api/auth/           # NextAuth Google provider endpoints
│   │   ├── login/              # Login page route
│   │   ├── onboarding/         # User profile setup route
│   │   ├── testimonies/        # Case studies page route
│   │   │   └── submit/         # Protected testimony submission route
│   │   ├── layout.tsx          # Global wrapper (Navbar, Footer, Providers)
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Global design tokens and styles
│   └── components/
│       ├── ConsultationBookingForm.tsx
│       ├── Navbar.tsx
│       └── ...                 # Modular React components
└── legacy_static/              # Archive of original HTML/JS files
```

---

##  Getting Started

This project uses Next.js and requires Node.js to be installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your Google Cloud credentials to enable Authentication:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a_random_secure_string
```

### 3. Run the Development Server
```bash
npm run dev
```
Then visit `http://localhost:3000` in your browser.

---
##  Design System

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#c9a84c` | Primary accent, CTAs, highlights |
| `--gold-light` | `#e8c97a` | Hover states, shimmer effects |
| `--deep-navy` | `#09090f` | Primary dark background |
| `--midnight` | `#0f0f1a` | Card backgrounds |

**Fonts:** [Cinzel](https://fonts.google.com/specimen/Cinzel) (headings, logo) · [Inter](https://fonts.google.com/specimen/Inter) (body text)
