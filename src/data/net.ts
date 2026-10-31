/**
 * Tiny Supabase REST helper: every call carries an abort
 * timeout, so a hung backend resolves instead of stalling
 * boot, background loads, or outbox flushes. Callers keep
 * their silent-fallback / throw-to-outbox contracts.
 */

export interface NetOpts {
  url?: string;
  key?: string;
  timeoutMs?: number;
}

async function withTimeout<T>(
  run: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number,
): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await run(ctrl.signal);
  } finally {
    clearTimeout(timer);
  }
}

export async function getJson<T>(
  path: string,
  key: string,
  url: string,
  timeoutMs: number,
): Promise<T> {
  return withTimeout(async (signal) => {
    const res = await fetch(`${url}${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal,
    });
    if (!res.ok) throw new Error(`${path}: ${res.status}`);
    return (await res.json()) as T;
  }, timeoutMs);
}

export async function postJson<T>(
  path: string,
  body: unknown,
  key: string,
  url: string,
  timeoutMs: number,
): Promise<T> {
  return withTimeout(async (signal) => {
    const res = await fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal,
    });
    if (!res.ok) throw new Error(`${path}: ${res.status}`);
    return (await res.json()) as T;
  }, timeoutMs);
}
