import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CHECKS = [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
] as const;

// The site grades itself: fetch our own homepage and report
// which security headers are actually being served.
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const res = await fetch(origin, { method: "HEAD", cache: "no-store" });

  const results = CHECKS.map((name) => ({
    name,
    present: res.headers.has(name),
    value: res.headers.get(name),
  }));

  return NextResponse.json({
    origin,
    score: results.filter((r) => r.present).length,
    total: CHECKS.length,
    results,
  });
}
