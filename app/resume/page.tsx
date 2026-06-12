import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Andrew Cheung — frontend engineer. Experience and skills.",
};

export default function Resume() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-sm tracking-wider text-accent no-print">{"// resume"}</p>
      <h1 className="mt-4 text-4xl font-medium">Andrew Cheung</h1>
      <p className="mt-2 text-ink-muted">
        Frontend Engineer — React, ecommerce, CMS &amp; martech integration
      </p>

      <section aria-labelledby="experience-heading" className="mt-12">
        <h2 id="experience-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          experience
        </h2>
        <ol className="mt-6 space-y-8 border-l border-line pl-6">
          <li>
            <h3 className="font-medium">Frontend Engineer — ecommerce</h3>
            <p className="font-mono text-xs text-ink-faint">current</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-ink-muted">
              <li>CMS integration and merchandising component design and implementation for a high-traffic ecommerce platform.</li>
              <li>Adobe + Google services integration: Analytics, Target, Launch, GAM, AdSense, GA4 — implemented without degrading Core Web Vitals.</li>
            </ul>
          </li>
          <li>
            <h3 className="font-medium">Full-stack Developer — agency &amp; enterprise (Hong Kong)</h3>
            <p className="font-mono text-xs text-ink-faint">earlier</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-ink-muted">
              <li>Enterprise onboarding platform for CITIC Pacific — React CMS, Express + PostgreSQL API, Nginx deployment.</li>
              <li>Luxury retail campaign sites (Puyi Optical: Gucci, Gentle Monster, David Beckham Eyewear), bilingual EN/TC.</li>
              <li>Full-stack web apps for SMEs — ecommerce, payments, real-time event systems (Socket.IO).</li>
            </ul>
          </li>
        </ol>
      </section>

      <section aria-labelledby="skills-heading" className="mt-12">
        <h2 id="skills-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          skills
        </h2>
        <dl className="mt-6 space-y-4 text-sm">
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-8">
            <dt className="font-medium">Frontend</dt>
            <dd className="text-ink-muted">React, TypeScript, Next.js, design systems, Web Vitals, WCAG 2.2</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-8">
            <dt className="font-medium">Martech</dt>
            <dd className="text-ink-muted">Adobe Analytics, Target, Launch, GAM, AdSense, GA4</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-8">
            <dt className="font-medium">Backend</dt>
            <dd className="text-ink-muted">Node.js, PostgreSQL (earlier experience)</dd>
          </div>
        </dl>
      </section>

      <p className="no-print mt-12 text-sm text-ink-faint">
        This page has a print stylesheet — print to PDF for a clean, light copy.
      </p>
    </div>
  );
}
