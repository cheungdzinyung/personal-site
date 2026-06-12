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

## Deploy — Cloudflare Workers via OpenNext

Configured: `wrangler.jsonc`, `open-next.config.ts` (R2 incremental cache for
/news ISR), `public/_headers`, robots + sitemap.

One-time setup:

1. Push this repo to GitHub (`gh repo create personal-site --private --source=. --push`).
2. Move andrewcheung.dev DNS to Cloudflare: add site in dashboard (free plan),
   swap nameservers at Namecheap (Domain List → Manage → Custom DNS).
3. Create the ISR cache bucket: `npx wrangler r2 bucket create personal-site-cache`
   (needs `npx wrangler login` first).
4. Cloudflare dashboard → Workers & Pages → Create → import the GitHub repo.
   Build command: `npx opennextjs-cloudflare build` · Deploy command:
   `npx opennextjs-cloudflare deploy`.
5. Worker → Settings → Domains & Routes → add `andrewcheung.dev`.

Every push to `main` then deploys automatically. Manual alternative:
`npm run deploy` (after `wrangler login`). Local Workers-runtime preview:
`npm run preview`.

Post-launch (from the spec): Cloudflare Web Analytics + GA4 w/ Consent Mode,
Search Console submission.
