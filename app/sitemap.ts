import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";

const BASE = "https://andrewcheung.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/news", "/security", "/resume", "/about", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() })),
    ...caseStudies.map((cs) => ({
      url: `${BASE}/work/${cs.slug}`,
      lastModified: new Date(),
    })),
  ];
}
