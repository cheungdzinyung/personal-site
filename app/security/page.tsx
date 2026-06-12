import type { Metadata } from "next";
import HeadersGrade from "@/components/security/headers-grade";
import RateLimitDemo from "@/components/security/rate-limit-demo";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How this site defends itself — live header grading, rate limiting, and an OWASP Top 10 mapping.",
};

const owasp = [
  {
    risk: "A01 Broken access control",
    mitigation:
      "No auth surface at all — no sessions, no cookies, no admin routes. The smallest attack surface is the one that doesn't exist.",
  },
  {
    risk: "A02 Cryptographic failures",
    mitigation:
      "HTTPS-only with HSTS preload (2-year max-age, includeSubDomains). No secrets shipped to the client.",
  },
  {
    risk: "A03 Injection",
    mitigation:
      "Nonce-based CSP with strict-dynamic, React's output encoding, zod validation on every API input.",
  },
  {
    risk: "A04 Insecure design",
    mitigation:
      "Rate limiting on all API routes (try the demo below), generic error responses, Retry-After honoured.",
  },
  {
    risk: "A05 Security misconfiguration",
    mitigation:
      "Strict security headers on every response (graded live below), x-powered-by stripped, frame-ancestors 'none'.",
  },
  {
    risk: "A06 Vulnerable components",
    mitigation:
      "Committed lockfile, Dependabot alerts, npm audit in CI before every deploy.",
  },
  {
    risk: "A08 Integrity failures",
    mitigation:
      "No third-party scripts on the critical path; CSP blocks unapproved script sources entirely.",
  },
  {
    risk: "A09 Logging & monitoring failures",
    mitigation:
      "Errors return generic bodies — no stack traces or internals leak to the client.",
  },
];

export default function Security() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-sm tracking-wider text-accent">{"// security"}</p>
      <h1 className="mt-4 text-4xl font-medium">How this site defends itself</h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Security claims are easy to make. These demos run against this site&apos;s
        own live infrastructure — open devtools and verify everything.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <HeadersGrade />
        <RateLimitDemo />
      </div>

      <section aria-labelledby="owasp-heading" className="mt-16">
        <h2 id="owasp-heading" className="text-2xl font-medium">
          OWASP Top 10 — this site&apos;s mitigations
        </h2>
        <details className="group mt-4">
          <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-3 gap-y-1 py-2 font-mono text-xs [&::-webkit-details-marker]:hidden">
            <span className="text-accent">
              {`// ${owasp.length} risks mapped to live defences`}
            </span>
            <span className="ml-auto text-ink-faint transition-colors group-hover:text-ink">
              <span className="group-open:hidden">show mitigations +</span>
              <span className="hidden group-open:inline">hide −</span>
            </span>
          </summary>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {owasp.map((o) => (
              <div key={o.risk} className="grid gap-2 py-5 sm:grid-cols-[240px_1fr] sm:gap-8">
                <dt className="font-mono text-sm text-ink">{o.risk}</dt>
                <dd className="text-sm leading-relaxed text-ink-muted">{o.mitigation}</dd>
              </div>
            ))}
          </dl>
        </details>
      </section>
    </div>
  );
}
