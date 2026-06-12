import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Andrew Cheung.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-sm tracking-wider text-accent">{"// contact"}</p>
      <h1 className="mt-4 text-4xl font-medium">Let&apos;s talk</h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        No contact form — a smaller attack surface, and email is faster anyway.
      </p>
      <ul className="mt-10 space-y-4 font-mono text-sm">
        <li>
          <a
            href="mailto:hello@andrewcheung.dev"
            className="inline-block py-2 text-accent underline-offset-4 hover:underline"
          >
            hello@andrewcheung.dev
          </a>
        </li>
        <li>
          <a
            href="https://github.com/cheungdzinyung"
            className="inline-block py-2 text-accent underline-offset-4 hover:underline"
          >
            github.com/cheungdzinyung
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/dzinyungandrewcheung/"
            className="inline-block py-2 text-accent underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
