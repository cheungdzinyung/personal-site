// Server-side news fetchers. Every source is fetched on the server with
// ISR (15 min) — visitors' browsers never contact a third party, so the
// CSP connect-src stays 'self'. Each fetcher fails independently and
// returns [] so one broken source never takes down the page.

export type SourceId = "hn" | "devto" | "tldr";

export type Story = {
  id: string;
  title: string;
  url: string;
  source: SourceId;
  points?: number;
  comments?: number;
  publishedAt: string;
};

export const SOURCES: { id: SourceId; label: string }[] = [
  { id: "hn", label: "Hacker News" },
  { id: "devto", label: "DEV Community" },
  { id: "tldr", label: "TLDR" },
];

// Cloudflare Workers' fetch sends no User-Agent by default, and some
// APIs (dev.to among them) reject UA-less requests as bot traffic —
// identify ourselves on every outbound request.
const REVALIDATE = {
  next: { revalidate: 900 },
  headers: {
    "User-Agent": "andrewcheung.dev news aggregator (hello@andrewcheung.dev)",
    Accept: "application/json, application/xml, text/xml;q=0.9",
  },
} satisfies RequestInit & { next: { revalidate: number } };

type HnHit = {
  objectID: string;
  title: string;
  url: string | null;
  points: number;
  num_comments: number;
  created_at: string;
};

async function fetchHackerNews(): Promise<Story[]> {
  try {
    const res = await fetch(
      "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=20",
      REVALIDATE,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { hits?: HnHit[] };
    return (data.hits ?? []).map((h) => ({
      id: `hn-${h.objectID}`,
      title: h.title,
      url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
      source: "hn" as const,
      points: h.points,
      comments: h.num_comments,
      publishedAt: h.created_at,
    }));
  } catch {
    return [];
  }
}

type DevToArticle = {
  id: number;
  title: string;
  url: string;
  positive_reactions_count: number;
  comments_count: number;
  published_timestamp: string;
};

async function fetchDevTo(): Promise<Story[]> {
  try {
    const res = await fetch(
      "https://dev.to/api/articles?top=7&per_page=20",
      REVALIDATE,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as DevToArticle[];
    return data.map((a) => ({
      id: `devto-${a.id}`,
      title: a.title,
      url: a.url,
      source: "devto" as const,
      points: a.positive_reactions_count,
      comments: a.comments_count,
      publishedAt: a.published_timestamp,
    }));
  } catch {
    return [];
  }
}

function rssItems(xml: string): { title: string; link: string; pubDate: string }[] {
  const out: { title: string; link: string; pubDate: string }[] = [];
  const cdata = (s: string) =>
    s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
  const field = (block: string, tag: string) => {
    const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    return m ? cdata(m[1]) : "";
  };
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const block = m[1];
    const title = field(block, "title");
    const link = field(block, "link");
    if (title && link) out.push({ title, link, pubDate: field(block, "pubDate") });
  }
  return out;
}

async function fetchTldr(): Promise<Story[]> {
  try {
    const res = await fetch("https://tldr.tech/api/rss/tech", REVALIDATE);
    if (!res.ok) return [];
    const items = rssItems(await res.text()).slice(0, 20);
    return items.map((it) => ({
      id: `tldr-${it.link}`,
      title: it.title,
      url: it.link,
      source: "tldr" as const,
      publishedAt: it.pubDate ? new Date(it.pubDate).toISOString() : "",
    }));
  } catch {
    return [];
  }
}

export async function fetchAllStories(): Promise<Story[]> {
  const [hn, devto, tldr] = await Promise.all([
    fetchHackerNews(),
    fetchDevTo(),
    fetchTldr(),
  ]);
  return [...hn, ...devto, ...tldr];
}
