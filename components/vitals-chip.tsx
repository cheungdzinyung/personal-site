"use client";

import { fmtVital, useVitals } from "@/components/use-vitals";

// Compact hero variant of the vitals readout — above the fold where the
// "fast" claim is made, so it can't be missed. The footer strip remains
// the persistent readout on every page.
export default function VitalsChip() {
  const vitals = useVitals();

  return (
    <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-[11px]">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="text-ink-faint">live vitals, your device</span>
      {(["LCP", "CLS", "INP"] as const).map((k) => (
        <span key={k} className="text-ink-muted">
          {k} <span className="text-accent">{fmtVital(k, vitals[k])}</span>
        </span>
      ))}
    </p>
  );
}
