import type { Metadata } from "next";
import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://andrewcheung.dev"),
  title: {
    default: "Andrew Cheung — Frontend Engineer",
    template: "%s — Andrew Cheung",
  },
  description:
    "Interfaces that are fast, accessible, and provably secure. React, ecommerce, CMS-driven merchandising, Adobe + Google stack.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Force dynamic rendering: the nonce-based CSP requires Next to inject
  // the per-request nonce into its inline scripts, which only happens
  // during request-time rendering. Statically prerendered HTML has no
  // nonce, so the CSP would block hydration entirely (the launch bug).
  await headers();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg pb-16 font-sans text-ink antialiased sm:pb-0">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
