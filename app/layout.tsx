import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
