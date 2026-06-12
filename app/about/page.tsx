import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Andrew Cheung — frontend engineer.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-sm tracking-wider text-accent">{"// about"}</p>
      <h1 className="mt-4 text-4xl font-medium">About</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
        <p>
          I&apos;m Andrew — a frontend developer working on ecommerce at
          scale. My day job is CMS-driven merchandising: designing and building
          the component systems that let merchandising teams ship campaigns
          without engineers in the loop, and integrating the Adobe and Google
          stacks (Analytics, Target, Launch, GAM, GA4) without sacrificing Web
          Vitals. Before that I built for agencies and enterprise clients in
          Hong Kong — onboarding platforms, luxury retail campaign sites, and
          full-stack products on Node and PostgreSQL.
        </p>
        <p>
          This site is how I work in miniature: performance, accessibility and
          security treated as features with receipts, not checkboxes. Off the
          clock I run a small home lab in Ajax, Ontario — a Synology NAS doing
          more jobs than it was sold for, self-hosted services behind a reverse
          proxy, and a retro gaming setup with save files that sync better than
          most production systems I&apos;ve seen.
        </p>
      </div>
    </div>
  );
}
