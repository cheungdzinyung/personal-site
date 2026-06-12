# personal-site ("Signal") — andrewcheung.dev

Employer-facing personal site for Andrew Cheung. Dark, expressive, and
self-demonstrating: live Web Vitals HUD, a /security page that grades its own
headers and rate-limits a live API, WCAG 2.2 AA throughout.

Full design spec: `~/SynologyDrive/Obsidian/personal-website-plan.md`

## Stack

Next.js 15 (App Router) · TypeScript strict · Tailwind v4 · Motion · zod · web-vitals

## Run

```bash
npm install
npm run dev
```

## Key paths

- `middleware.ts` — nonce-based CSP (strict-dynamic)
- `next.config.ts` — HSTS, XCTO, Referrer-Policy, Permissions-Policy
- `app/api/ping` — zod-validated, rate-limited demo endpoint
- `app/api/headers` — the site grading its own response headers
- `components/vitals-hud.tsx` — live LCP/CLS/INP in the footer
- `lib/rate-limit.ts` — sliding window; swap Map for Cloudflare KV in prod

## Deploy

Domain: andrewcheung.dev (purchased). Target: Cloudflare Workers via
`@opennextjs/cloudflare` — move DNS to Cloudflare for automatic domain
connection. Not yet configured.

## TODO

Search for `[TODO` — real case studies, resume history, about copy, LinkedIn
URL. Domain decided: andrewcheung.dev.
