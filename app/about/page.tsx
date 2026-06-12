import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Andrew Cheung — senior frontend engineer.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-sm tracking-wider text-accent">{"// about"}</p>
      <h1 className="mt-4 text-4xl font-medium">About</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
        <p>
          [TODO: 2–3 paragraphs. Who you are, how you work, what you care about
          in frontend engineering. Mention the ecommerce/CMS/martech specialty
          and the performance + accessibility + security obsession this site
          demonstrates.]
        </p>
        <p>[TODO: something human — Ajax, ON; home lab; what you tinker with.]</p>
      </div>
    </div>
  );
}
