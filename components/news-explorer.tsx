"use client";

import { useMemo, useState } from "react";
import { SOURCES, type SourceId, type Story } from "@/lib/news";

type Filter = SourceId | "all";

function timeAgo(iso: string): string {
  if (!iso) return "";
  const mins = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
}

const sourceLabel = (id: SourceId) =>
  SOURCES.find((s) => s.id === id)?.label ?? id;

const PER_PAGE = 10;

export default function NewsExplorer({ stories }: { stories: Story[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const c = new Map<SourceId, number>();
    for (const s of stories) c.set(s.source, (c.get(s.source) ?? 0) + 1);
    return c;
  }, [stories]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = stories;
    // Search always spans every source; the pill scopes browsing only.
    if (q) {
      list = list.filter((s) => s.title.toLowerCase().includes(q));
    } else if (filter !== "all") {
      list = list.filter((s) => s.source === filter);
    }
    if (filter === "all" || q) {
      list = [...list].sort(
        (a, b) => Date.parse(b.publishedAt || "0") - Date.parse(a.publishedAt || "0"),
      );
    }
    return list;
  }, [stories, filter, query]);

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = results.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by source">
        <button
          type="button"
          onClick={() => {
            setFilter("all");
            setPage(1);
          }}
          aria-pressed={filter === "all"}
          className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
            filter === "all"
              ? "border-accent bg-accent text-accent-ink"
              : "border-line-strong text-ink-muted hover:border-ink-faint hover:text-ink"
          }`}
        >
          all ({stories.length})
        </button>
        {SOURCES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setFilter(s.id);
              setPage(1);
            }}
            aria-pressed={filter === s.id}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
              filter === s.id
                ? "border-accent bg-accent text-accent-ink"
                : "border-line-strong text-ink-muted hover:border-ink-faint hover:text-ink"
            }`}
          >
            {s.label.toLowerCase()} ({counts.get(s.id) ?? 0})
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <label htmlFor="news-search" className="font-mono text-xs text-ink-faint">
          search
        </label>
        <input
          id="news-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="across all sources…"
          className="w-full max-w-sm rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint"
        />
      </div>

      <p className="mt-4 font-mono text-xs text-ink-faint" aria-live="polite" role="status">
        {results.length} {results.length === 1 ? "story" : "stories"}
        {query.trim() ? ` matching “${query.trim()}” across all sources` : ""}
        {totalPages > 1 ? ` · page ${safePage} of ${totalPages}` : ""}
      </p>

      {results.length === 0 ? (
        <p className="mt-8 font-mono text-sm text-ink-faint">
          {stories.length === 0
            ? "No feeds available right now — try again shortly."
            : "No matches."}
        </p>
      ) : (
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {paged.map((s) => (
            <li key={s.id} className="py-4">
              <a
                href={s.url}
                className="font-medium underline-offset-4 hover:text-accent hover:underline"
                rel="noopener noreferrer"
              >
                {s.title}
              </a>
              <p className="mt-1 font-mono text-xs text-ink-faint">
                <span className="text-ink-muted">{sourceLabel(s.source)}</span>
                {typeof s.points === "number" && ` · ${s.points} points`}
                {typeof s.comments === "number" && ` · ${s.comments} comments`}
                {s.publishedAt && ` · ${timeAgo(s.publishedAt)}`}
              </p>
            </li>
          ))}
        </ol>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, safePage - 1))}
            disabled={safePage === 1}
            className="rounded-md border border-line-strong px-4 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-ink-faint hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← prev
          </button>
          <span className="font-mono text-xs text-ink-faint">
            {safePage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, safePage + 1))}
            disabled={safePage === totalPages}
            className="rounded-md border border-line-strong px-4 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-ink-faint hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            next →
          </button>
        </nav>
      )}
    </div>
  );
}
