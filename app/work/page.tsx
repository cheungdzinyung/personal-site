import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies, earlierWork } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies — enterprise CMS, luxury retail campaign sites, real-time event apps.",
};

export default function Work() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-sm tracking-wider text-accent">{"// work"}</p>
      <h1 className="mt-4 text-4xl font-medium">Case studies</h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Problem, role, approach, outcome — written for the people who review
        portfolios before interviews.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {caseStudies.map((cs) => (
          <li key={cs.slug} className="rounded-lg border border-line bg-surface">
            <Link
              href={`/work/${cs.slug}`}
              className="block h-full p-6 transition-colors hover:border-ink-faint"
            >
              <p className="font-mono text-xs text-ink-faint">{cs.client}</p>
              <h2 className="mt-2 text-lg font-medium">{cs.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{cs.summary}</p>
              <p className="mt-4 font-mono text-xs text-accent">read case study →</p>
            </Link>
          </li>
        ))}
      </ul>

      <section aria-labelledby="earlier-heading" className="mt-16">
        <h2 id="earlier-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          {"// earlier — agency years"}
        </h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {earlierWork.map((w) => (
            <li
              key={w.name}
              className="grid gap-y-1 py-3.5 text-sm sm:grid-cols-[240px_1fr] sm:gap-x-8"
            >
              <span className="font-medium">{w.name}</span>
              <span className="text-ink-muted">{w.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
