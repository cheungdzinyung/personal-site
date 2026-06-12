"use client";

import { useState } from "react";

type Check = { name: string; present: boolean; value: string | null };
type Grade = { origin: string; score: number; total: number; results: Check[] };

export default function HeadersGrade() {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function run() {
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/headers");
      if (!res.ok) throw new Error();
      setGrade(await res.json());
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <h3 className="font-medium">Header self-grade</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
        An API route fetches this site&apos;s own homepage and reports which
        security headers are actually served — not which ones are claimed.
      </p>
      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="mt-4 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.03] disabled:opacity-50"
      >
        {busy ? "Grading…" : "Grade this site"}
      </button>
      <div aria-live="polite">
        {error && (
          <p className="mt-4 font-mono text-xs text-red-400">
            Could not reach /api/headers
          </p>
        )}
        {grade && (
          <>
            <p className="mt-4 font-mono text-sm">
              <span className="text-accent">{grade.score}</span>
              <span className="text-ink-muted">/{grade.total} headers present</span>
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-xs">
              {grade.results.map((r) => (
                <li key={r.name} className="flex gap-2">
                  <span className={r.present ? "text-accent" : "text-red-400"}>
                    {r.present ? "✓" : "✗"}
                  </span>
                  <span className="text-ink-muted">{r.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
