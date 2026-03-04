# Godik.ai

> We build websites and automations.

A sharp, minimal personal website for [Godik.ai](https://godik.ai) — built with Next.js 15 and Tailwind CSS, designed to deploy instantly on Vercel.

---

## Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Font**: [Geist](https://vercel.com/font) via `next/font`
- **Language**: TypeScript
- **Deploy**: [Vercel](https://vercel.com)

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Headline, subtext, dual CTA buttons |
| **Services** | Websites + Automations cards |
| **About** | Who we are + key stats |
| **Contact** | Contact form with service selector |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/godik-ai.git
cd godik-ai

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## Deploy on Vercel

The fastest way to go live:

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Click **Deploy** — no configuration needed

Vercel auto-detects Next.js and handles everything.

---

## Customization

| File | What to change |
|------|---------------|
| `app/layout.tsx` | Site title, meta description, OG tags |
| `components/Hero.tsx` | Headline, subtext, CTA links |
| `components/Services.tsx` | Service cards content |
| `components/About.tsx` | About text, stats |
| `components/Contact.tsx` | Form submission handler (wire to Resend / Formspree / your API) |
| `components/Footer.tsx` | Footer links, copyright |
| `app/globals.css` | Global styles, grid background |

### Wiring up the contact form

The form in `components/Contact.tsx` currently simulates a submission. To make it real, replace the `handleSubmit` function with a `fetch` call to your preferred email service:

- [Resend](https://resend.com) — recommended, developer-friendly
- [Formspree](https://formspree.io) — no backend needed
- Custom Next.js API route at `app/api/contact/route.ts`

---

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles + Tailwind config
│   ├── layout.tsx        # Root layout, metadata
│   └── page.tsx          # Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx        # Sticky nav with scroll effect
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services cards
│   ├── About.tsx         # About + stats
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Footer
├── public/               # Static assets
├── next.config.ts
├── tailwind.config.ts    # (auto-configured via Tailwind v4)
└── tsconfig.json
```

---

## License

MIT — use it, ship it, make it yours.
