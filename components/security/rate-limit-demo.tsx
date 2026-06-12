"use client";

import { useState } from "react";

type Hit = {
  status: number;
  remaining: string | null;
  retryAfter: string | null;
};

export default function RateLimitDemo() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);

  async function hammer() {
    setBusy(true);
    setHits([]);
    for (let i = 0; i < 8; i++) {
      const res = await fetch("/api/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ echo: `hit ${i + 1}` }),
      });
      setHits((h) => [
        ...h,
        {
          status: res.status,
          remaining: res.headers.get("X-RateLimit-Remaining"),
          retryAfter: res.headers.get("Retry-After"),
        },
      ]);
    }
    setBusy(false);
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <h3 className="font-medium">Rate limiting, live</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
        Fires 8 rapid requests at a zod-validated API route limited to 5 per
        10-second window. Watch the 429s arrive with a Retry-After header.
      </p>
      <button
        type="button"
        onClick={hammer}
        disabled={busy}
        className="mt-4 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.03] disabled:opacity-50"
      >
        {busy ? "Hammering…" : "Hammer the API"}
      </button>
      <ol className="mt-4 space-y-1 font-mono text-xs" aria-live="polite">
        {hits.map((h, i) => (
          <li key={i} className={h.status === 429 ? "text-red-400" : "text-accent"}>
            #{i + 1} → {h.status}
            {h.status === 429
              ? ` (Retry-After: ${h.retryAfter}s)`
              : ` (remaining: ${h.remaining})`}
          </li>
        ))}
      </ol>
    </div>
  );
}
