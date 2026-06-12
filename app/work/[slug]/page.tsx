import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  return cs
    ? { title: cs.title, description: cs.summary }
    : { title: "Case study" };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    description: cs.summary,
    author: { "@type": "Person", name: "Andrew Cheung" },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="font-mono text-sm tracking-wider text-accent">{"// case study"}</p>
      <h1 className="mt-4 text-4xl font-medium">{cs.title}</h1>
      <p className="mt-2 font-mono text-sm text-ink-faint">{cs.client}</p>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{cs.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
        {cs.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-ink-muted"
          >
            {t}
          </li>
        ))}
      </ul>

      <section aria-labelledby="role-heading" className="mt-12">
        <h2 id="role-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          my role
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{cs.role}</p>
      </section>

      <section aria-labelledby="problem-heading" className="mt-10">
        <h2 id="problem-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          the problem
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{cs.problem}</p>
      </section>

      <section aria-labelledby="build-heading" className="mt-10">
        <h2 id="build-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          what I built
        </h2>
        <ul className="mt-3 space-y-3">
          {cs.build.map((b) => (
            <li key={b} className="flex gap-3 leading-relaxed text-ink-muted">
              <span className="select-none text-accent" aria-hidden="true">
                →
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="outcome-heading" className="mt-10">
        <h2 id="outcome-heading" className="font-mono text-sm tracking-wider text-ink-faint">
          outcome
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{cs.outcome}</p>
      </section>

      <p className="mt-14">
        <Link
          href="/work"
          className="font-mono text-sm text-accent underline-offset-4 hover:underline"
        >
          ← all work
        </Link>
      </p>
    </article>
  );
}
