import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

// OWASP showcase: every input validated (zod), rate-limited per IP,
// generic error bodies — no stack traces, no internals.
const Body = z.object({
  echo: z.string().trim().max(80).optional(),
});

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { ok, remaining, retryAfter, limit } = rateLimit(`ping:${ip}`);

  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  let raw: unknown = {};
  try {
    raw = await request.json();
  } catch {
    // empty/invalid JSON body is allowed — fields are optional
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  return NextResponse.json(
    { pong: true, echo: parsed.data.echo ?? null, at: new Date().toISOString() },
    {
      headers: {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
      },
    },
  );
}
