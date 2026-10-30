import type { ChromeTier } from '../ui/mockData';

/**
 * muse-reword client: runtime reading-level paraphrase for flavor
 * lines (visit greetings) via the Supabase Edge Function. The
 * browser never holds the model key — the function reads
 * META_API_KEY server-side and vetoes meaning drift (kept terms
 * must survive verbatim). Grades never depend on this output:
 * any failure — missing env, timeout, veto echo — resolves to
 * the input text with live: false, so the offline demo completes
 * untouched.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export interface RewordResult {
  text: string;
  live: boolean;
  /** Ticker fodder: ms for the call, and why-not when local. */
  latencyMs: number;
  note: string;
}

export interface RewordOpts {
  url?: string;
  key?: string;
  timeoutMs?: number;
}

/** Shape guard for the function response (unit-tested). */
export function isRewordResponse(v: unknown): v is { text: string; fallback: boolean } {
  if (typeof v !== 'object' || v === null) return false;
  const r = v as Record<string, unknown>;
  return typeof r.text === 'string' && typeof r.fallback === 'boolean';
}

export async function reword(
  text: string,
  tier: ChromeTier,
  keep: readonly string[],
  context: string,
  opts: RewordOpts = {},
): Promise<RewordResult> {
  const local = (note: string, latencyMs: number): RewordResult => ({
    text,
    live: false,
    latencyMs,
    note,
  });
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) return local('offline', 0);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 8000);
  const started = Date.now();
  try {
    const res = await fetch(`${url}/functions/v1/muse-reword`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, tier, keep, context }),
      signal: ctrl.signal,
    });
    const ms = Date.now() - started;
    if (!res.ok) return local(`http ${res.status}`, ms);
    const data: unknown = await res.json();
    if (!isRewordResponse(data)) return local('shape', ms);
    if (data.fallback) {
      const reason = (data as { reason?: unknown }).reason;
      return local(typeof reason === 'string' ? reason : 'veto', ms);
    }
    return { text: data.text, live: true, latencyMs: ms, note: 'ok' };
  } catch {
    return local('down', Date.now() - started);
  } finally {
    clearTimeout(timer);
  }
}
