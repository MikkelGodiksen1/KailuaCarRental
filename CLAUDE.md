# CLAUDE.md — Godik.ai / KailuaCarRental

## Git-workflow (VIGTIGT)

- **Opret altid en ny branch** for hver ændring — push ALDRIG direkte til `main`
- Brug branch-navneformatet: `claude/<kort-beskrivelse>-<session-id>`
  - Eksempel: `claude/fix-hud-text-asyb4`
- Push altid med: `git push -u origin <branch-navn>`
- Mikkel laver derefter Pull Request til `main` på GitHub

```bash
# Typisk flow:
git checkout -b claude/<beskrivelse>-<session-id>
# ... lav ændringer ...
git add <specifikke filer>
git commit -m "Kort beskrivelse af hvad og hvorfor"
git push -u origin claude/<beskrivelse>-<session-id>
```

## Projektstruktur

- **Framework**: Next.js (App Router) + TypeScript + Tailwind CSS v4
- **Sprog**: Dansk
- **Deploy**: Vercel — `kailua-car-rental.vercel.app`
- **Hovedfil**: `app/page.tsx` — al UI er én fil med inline styles

## Scener (horizontal scroll)

| Scene | Label         | Farve     | Level    |
|-------|---------------|-----------|----------|
| 0     | HEJ           | `#e80010` | Intro    |
| 1     | HJEMMESIDER   | `#0038c8` | LEVEL 01 |
| 2     | AUTOMATISERING| `#008030` | LEVEL 02 |
| 3     | MARKEDSFØRING | `#6020c8` | LEVEL 03 |
| 4     | KONTAKT       | `#c08000` | LEVEL 04 |

## Vigtige designregler

- **Font**: Press Start 2P (pixel-font til labels/badges), Inter (brødtekst)
- **Stil**: Retro pixel-art, Mario-inspireret — hold den æstetik
- **Dekorative SVG-elementer** placeres med `zIndex: 5`, indhold med `z-20`
- **Mobilvenlig**: Brug `min(480px, 58vw)` til content `maxWidth` for at undgå overlap
- HUD-label i øverste højre: brug `fontSize: 8` — lange ord som "AUTOMATISERING" er for brede ved 10px

## Kontakt-API

- `app/api/contact/route.ts` — sender beskeder via Telegram-bot
- Env vars: `telegram` (bot token), `TELEGRAM_CHAT_ID`
