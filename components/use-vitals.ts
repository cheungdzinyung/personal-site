"use client";

import { useEffect, useState } from "react";
import { onCLS, onINP, onLCP, type Metric } from "web-vitals";

export type Vitals = Partial<Record<"LCP" | "CLS" | "INP", number>>;

export function useVitals(): Vitals {
  const [vitals, setVitals] = useState<Vitals>({});

  useEffect(() => {
    const report = (m: Metric) =>
      setVitals((v) => ({ ...v, [m.name]: m.value }));
    // reportAllChanges: defaults only report when the metric is final
    // (on interaction / tab hide) — too late for a live readout.
    onLCP(report, { reportAllChanges: true });
    onCLS(report, { reportAllChanges: true });
    onINP(report, { reportAllChanges: true });
  }, []);

  return vitals;
}

export function fmtVital(name: keyof Vitals, value?: number): string {
  if (value === undefined) return "—";
  if (name === "CLS") return value.toFixed(2);
  return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(1)}s`;
}
