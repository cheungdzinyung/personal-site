// Sliding-window rate limiter.
// In-memory Map works per-isolate (fine for dev and for the demo);
// swap the store for Cloudflare KV / a rate-limit binding in production.

const WINDOW_MS = 10_000;
const LIMIT = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(key, recent);

  const ok = recent.length <= LIMIT;
  const remaining = Math.max(0, LIMIT - recent.length);
  const retryAfter = ok ? 0 : Math.ceil((recent[0] + WINDOW_MS - now) / 1000);

  return { ok, remaining, retryAfter, limit: LIMIT };
}
