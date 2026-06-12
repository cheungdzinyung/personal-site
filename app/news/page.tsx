import type { Metadata } from "next";
import { fetchAllStories } from "@/lib/news";
import NewsExplorer from "@/components/news-explorer";

export const metadata: Metadata = {
  title: "Dev news",
  description:
    "Hacker News, DEV Community and TLDR — aggregated server-side, regenerated every 15 minutes.",
};

export const revalidate = 900;

export default async function News() {
  const stories = await fetchAllStories();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-sm tracking-wider text-accent">{"// news"}</p>
      <h1 className="mt-4 text-4xl font-medium">Dev news</h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Three sources, aggregated on the server and statically regenerated every
        15 minutes (ISR). Filtering and search run entirely in your browser —
        no third-party requests leave this page.
      </p>

      <NewsExplorer stories={stories} />
    </div>
  );
}
