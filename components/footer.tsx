import VitalsHud from "@/components/vitals-hud";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-xs text-ink-faint">
        <p>© {new Date().getFullYear()} Andrew Cheung</p>
        <ul className="flex gap-5">
          <li>
            <a
              className="inline-block py-2 transition-colors hover:text-ink"
              href="https://github.com/cheungdzinyung"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="inline-block py-2 transition-colors hover:text-ink"
              href="https://www.linkedin.com/in/andrewcheungdzinyung"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="inline-block py-2 transition-colors hover:text-ink"
              href="mailto:cheungdzinyung@gmail.com"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
      <VitalsHud />
    </footer>
  );
}
