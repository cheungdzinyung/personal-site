import Link from "next/link";
import HeroReveal from "@/components/hero-reveal";
import DotGrid from "@/components/dot-grid";
import VitalsChip from "@/components/vitals-chip";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="relative py-24 sm:py-32">
        <DotGrid />
        <div className="relative">
          <p className="mb-6 font-mono text-sm tracking-wider text-accent">
            {"// senior frontend engineer — react, commerce, scale"}
          </p>
          <HeroReveal
            text="Interfaces that are fast, accessible, and provably secure."
            highlight="provably"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            I build ecommerce frontends — CMS-driven merchandising systems, Adobe +
            Google marketing stack integration, and component systems that hold up
            under audit.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.03]"
            >
              See the work
            </Link>
            <Link
              href="/security"
              className="rounded-md border border-line-strong bg-bg/60 px-6 py-3 text-sm transition-colors hover:border-ink-faint"
            >
              How this site defends itself →
            </Link>
          </div>
          <div className="mt-8">
            <VitalsChip />
          </div>
        </div>
      </section>

      <section aria-labelledby="proof-heading" className="border-t border-line py-16">
        <h2 id="proof-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          {"// claims, with receipts"}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg border border-line bg-surface p-6">
            <h3 className="font-medium">Performant</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              The live vitals chip above is this page&apos;s real LCP, CLS and
              INP — measured on your device, right now. Every page repeats it
              in the footer.
            </p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-6">
            <h3 className="font-medium">Accessible</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              WCAG 2.2 AA throughout — keyboard-first, visible focus, reduced
              motion respected. Try tabbing through this page.
            </p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-6">
            <h3 className="font-medium">Secure</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Nonce-based CSP, strict headers, validated APIs.{" "}
              <Link href="/security" className="text-accent underline-offset-4 hover:underline">
                Watch the site grade itself
              </Link>
              .
            </p>
          </li>
        </ul>
      </section>
      <section aria-labelledby="stack-heading" className="border-t border-line py-10">
        <h2 id="stack-heading" className="sr-only">
          Built with
        </h2>
        <details className="group">
          <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-2 gap-y-1 py-2 font-mono text-xs [&::-webkit-details-marker]:hidden">
            <span className="order-1 mr-1 text-accent">{"// built with"}</span>
            <span className="order-3 basis-full text-ink-muted sm:order-2 sm:basis-auto sm:flex-1">
              {stack.map((s) => s.name).join(" · ")}
            </span>
            <span className="order-2 ml-auto text-ink-faint transition-colors group-hover:text-ink sm:order-3">
              <span className="group-open:hidden">show receipts +</span>
              <span className="hidden group-open:inline">hide −</span>
            </span>
          </summary>
          <ul className="mt-4 divide-y divide-line border-t border-line font-mono text-xs">
            {stack.map((s) => (
              <li
                key={s.name}
                className="grid gap-y-1 py-3 sm:grid-cols-[8.5rem_1fr_auto] sm:items-baseline sm:gap-x-4"
              >
                <span className="text-ink">{s.name}</span>
                <span className="text-ink-faint">{s.why}</span>
                {s.href ? (
                  <Link
                    href={s.href}
                    className="justify-self-start text-accent underline-offset-4 hover:underline sm:justify-self-end"
                  >
                    receipt: {s.receipt} →
                  </Link>
                ) : (
                  <span className="text-accent">receipt: {s.receipt}</span>
                )}
              </li>
            ))}
          </ul>
        </details>
      </section>
    </div>
  );
}

const stack = [
  {
    name: "next@15",
    why: "RSC keeps client JS lean",
    receipt: "/resume ships ~0 JS",
    href: "/resume",
  },
  {
    name: "typescript",
    why: "strict mode, no escape hatches",
    receipt: "the repo",
    href: null,
  },
  {
    name: "tailwindcss@4",
    why: "design tokens, one tiny CSS file",
    receipt: "view-source",
    href: null,
  },
  {
    name: "motion",
    why: "WAAPI animation, reduced-motion aware",
    receipt: "the hero you just watched",
    href: null,
  },
  {
    name: "zod",
    why: "every API input validated",
    receipt: "hammer /api/ping",
    href: "/security",
  },
  {
    name: "web-vitals",
    why: "live LCP / CLS / INP, your device",
    receipt: "footer, right now",
    href: null,
  },
  {
    name: "canvas 2d",
    why: "dot grid — chose this over three.js",
    receipt: "~150KB not shipped",
    href: null,
  },
];
