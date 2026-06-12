import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

const links = [
  { href: "/work", label: "work" },
  { href: "/news", label: "news" },
  { href: "/security", label: "security" },
  { href: "/resume", label: "resume" },
];

export default function Nav() {
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-mono text-sm" aria-label="Andrew Cheung — home">
          ac<span className="text-accent" aria-hidden="true">_</span>
        </Link>
        <div className="flex items-center gap-4">
          {/* Desktop nav — hidden on mobile, where the bottom dock takes over */}
          <nav aria-label="Main" className="hidden sm:block">
            <ul className="flex items-center gap-4 text-sm text-ink-muted">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block px-1 py-2 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.04]"
          >
            contact
          </Link>
        </div>
      </header>

      {/* Mobile bottom dock — app-style tab bar, better thumb reach than a
          hamburger and nothing is hidden behind a toggle. display:none on
          desktop removes it from the a11y tree, so "Main" never duplicates. */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 backdrop-blur sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex items-stretch justify-around">
          {links.map((l) => (
            <li key={l.href} className="flex-1">
              <Link
                href={l.href}
                className="block px-1 py-4 text-center font-mono text-[11px] text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
