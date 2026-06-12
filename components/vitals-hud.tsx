"use client";

import { fmtVital, useVitals } from "@/components/use-vitals";

export default function VitalsHud() {
  const vitals = useVitals();

  return (
    <div className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-6 py-3 font-mono text-[11px]">
        <p className="text-ink-faint">live vitals — this page, your device</p>
        <dl className="flex gap-5">
          {(["LCP", "CLS", "INP"] as const).map((k) => (
            <div key={k} className="flex gap-1.5">
              <dt className="text-ink-muted">{k}</dt>
              <dd className="text-accent">{fmtVital(k, vitals[k])}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
