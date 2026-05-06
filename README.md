#  Astra — Astrological Consulting Website

A premium, multi-page astrological consulting website built with pure HTML, CSS, and vanilla JavaScript. Designed with a custom light yellow aesthetic, smooth animations, and a fully validated consultation booking form.

---

##  Features

- **Animated starfield background** — multi-layered CSS star animations for an immersive cosmic atmosphere
- **Responsive navigation** — hamburger menu for mobile, sticky navbar with scroll effects
- **Hero section** — animated headline with staggered reveal animations
- **Services grid** — four advisory service cards (Natal, Synastry, Predictive, Electional) with hover interactions
- **Zodiac marquee** — smooth infinite scrolling banner of all 12 zodiac signs
- **Consultation booking form** — fully validated with real-time inline error messages including:
  - Full Name, Email, Date of Birth, Time of Birth
  - Place of Birth (City / State / Country)
  - Three preference questions (focus area, current situation, elemental quality)
- **Smart recommendation engine** — maps form answers to a suggested service
- **4-step methodology timeline** — animated process walkthrough
- **Animated metrics counter** — counts up to key stats (10k+ charts, 98% satisfaction, 15+ years)
- **Dedicated Testimonies Page** — separate page (`testimonies.html`) with text, image, and video integrations for client stories
- **Responsive footer** — brand tagline and navigation columns

---

##  Project Structure

```
Astra-Astrology/
├── index.html          # Main landing page
├── testimonies.html    # Dedicated case studies & testimonies page
├── styles.css          # All styling — design tokens, animations, responsive layout
├── script.js           # Form validation, scroll reveals, counter animations
└── README.md       # This file
```

---

##  Getting Started

This project requires **no build tools or dependencies**. Just open it in a browser.

### Option 1 — Open directly
Double-click `index.html` to open it in your default browser.

### Option 2 — Local development server (recommended)
Use any static file server to avoid potential CORS issues with Google Fonts:

```bash
# Python (built-in)
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then visit `http://localhost:8080`.

---
##  Design System

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#c9a84c` | Primary accent, CTAs, highlights |
| `--gold-light` | `#e8c97a` | Hover states, shimmer effects |
| `--deep-navy` | `#09090f` | Primary dark background |
| `--midnight` | `#0f0f1a` | Card backgrounds |
| `--card-border` | `#1e1e2e` | Subtle borders |
| `--text-primary` | `#f0ede6` | Main body text |
| `--text-muted` | `#8a8590` | Secondary/muted text |

**Fonts:** [Cinzel](https://fonts.google.com/specimen/Cinzel) (headings, logo) · [Inter](https://fonts.google.com/specimen/Inter) (body text)

---

##  Form Validation

The consultation form (`#audit-form`) enforces the following rules client-side:

| Field | Rule |
|---|---|
| Full Name | Required, minimum 2 characters |
| Email | Required — validated against RFC-style regex |
| Date of Birth | Required, must not be a future date |
| Time of Birth | Required |
| City / State / Country | All three required |
| Focus Area | Required (dropdown) |
| Current Situation | Required (dropdown) |
| Elemental Quality | Required (dropdown) |

Errors display inline beneath each field with red accent styling. On success, the form is replaced by a personalised service recommendation card.

---

##  Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `> 768px` | Full horizontal nav, multi-column service grid, side-by-side form rows |
| `≤ 768px` | Hamburger dropdown nav, single-column grid, stacked form fields |

---

##  Customisation

### Updating content
All text content lives directly in `index.html` — services, case studies, methodology steps, and footer links can be edited there.

### Changing the colour palette
Design tokens are defined as CSS custom properties at the top of `styles.css` inside `:root`. Update these to retheme the entire site.

### Adding new services
Duplicate a `.service-card` block in `index.html` and add the corresponding reveal animation delay class (e.g. `delay-5`).

### Modifying the recommendation logic
The mapping from form answers to service recommendations lives in the `getRecommendation()` function inside `script.js`.

---

##  Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Mobile (iOS / Android) | ✅ Responsive |

---

##  License

This project is intended for personal / portfolio use. All rights reserved © 2026 Astra Astrological Consulting.
