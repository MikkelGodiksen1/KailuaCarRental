# Godik.ai — Build Log

This file is updated after every iteration. It tracks what has been built, what decisions were made, and what is in/out of scope.

---

## Current State

**Status:** v1 — Live on branch `claude/build-godik-website-imdn1`
**Deploy target:** Vercel (zero config, push → deploy)

---

## What We've Built

### v1 — Initial site (2026-03-04)

**Stack**
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Inter via Google Fonts (loaded via `<link>` tag in `layout.tsx`)

**Sections**

| Section | File | Notes |
|---------|------|-------|
| Navbar | `components/Navbar.tsx` | Fixed, blurs on scroll, CTA button |
| Hero | `components/Hero.tsx` | Full-viewport, gradient headline, badge, dual CTA |
| Services | `components/Services.tsx` | 2 cards: Websites + Automations |
| About | `components/About.tsx` | Copy + 3 stat blocks |
| Contact | `components/Contact.tsx` | Form with service selector + success state |
| Footer | `components/Footer.tsx` | Minimal one-liner |

**Design decisions**
- Dark `#0a0a0a` base — always dark, no light mode toggle
- Violet/indigo/cyan accent gradients
- 64px grid background on Hero
- Linear.app-inspired: sparse, sharp, minimal

**Contact form**
- Currently mocks submission (800ms delay → success state)
- Wire up by replacing `handleSubmit` in `Contact.tsx` with Resend / Formspree / API route

---

## In Scope

- Single-page marketing site
- 4 sections: Hero, Services, About, Contact
- Mobile responsive
- Dark mode only
- Vercel deploy-ready

## Out of Scope

- Blog / CMS
- Auth / user accounts
- Analytics (add Vercel Analytics or Plausible yourself — one line)
- Multi-language
- Light mode
- Animations beyond CSS transitions (no Framer Motion)

---

## File Structure

```
├── app/
│   ├── globals.css       # Global styles + Tailwind theme
│   ├── layout.tsx        # Root layout, metadata, font
│   └── page.tsx          # Assembles all sections
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/               # Static assets
├── BUILDLOG.md           # This file
└── README.md             # Setup + deploy instructions
```

---

## Next Steps (if needed)

- [ ] Wire contact form to real email service
- [ ] Add OG image (`/public/og.png` + meta tag in `layout.tsx`)
- [ ] Add favicon (replace `/app/favicon.ico`)
- [ ] Custom domain on Vercel

---

*Updated: 2026-03-04 — v1 initial build*
