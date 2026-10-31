/**
 * knottin-design client: custom peptide designs for the trial
 * path (c-diff et al.) via the Supabase Edge Function. The
 * browser never holds the peptide key — the proxy reads
 * COZY_PEPTIDE_KEY server-side and vetoes malformed designs.
 * Any failure — missing env, timeout, veto echo — resolves to
 * the cached demo design with live: false, so the offline demo
 * completes untouched.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export interface KnottinDesign {
  target: string;
  sequence: string;
  topology: string;
  charge: number;
  therapeutic_index: number | null;
  safety_index: number | null;
  yeast_chassis: string;
  proposer_model: string | null;
}

export interface KnottinResult {
  design: KnottinDesign;
  live: boolean;
  /** Ticker fodder: ms for the call, and why-not when cached. */
  latencyMs: number;
  note: string;
}

export interface KnottinOpts {
  url?: string;
  key?: string;
  timeoutMs?: number;
  mechanism?: string;
  charge_target?: number;
  modality?: string;
}

/**
 * Cached demo design (the documented C. difficile example):
 * what the lab shows offline or whenever the proxy is down.
 */
export const CACHED_DESIGN: KnottinDesign = {
  target: 'Clostridioides difficile colonization in the gut',
  sequence: 'CPRVTCSNDTVCKVRTSKCSVCRISVNTC',
  topology: 'C1-C4, C2-C5, C3-C6 ICK',
  charge: 4,
  therapeutic_index: 76.37,
  safety_index: 88.6,
  yeast_chassis: 'Saccharomyces boulardii (ATCC MYA-796)',
  proposer_model: 'Meta-Spark-1.3-Contributor',
};

const SEQ_RE = /^[ACDEFGHIKLMNPQRSTVWY]{10,100}$/;

/**
 * Trial targets by condition: the ONLY conditions whose
 * treatment set carries the knottin trial arm (opensLab).
 * Pure + unit-tested; unknown conditions get no lab.
 */
const TRIAL_TARGETS: Record<string, string> = {
  'c-diff-colitis': 'Clostridioides difficile colonization in the gut',
  'travelers-diarrhea': 'Enterotoxigenic E. coli gut infection',
};

/** Pure: the trial target for a condition, or null (unit-tested). */
export function trialTargetFor(conditionId: string): string | null {
  return TRIAL_TARGETS[conditionId] ?? null;
}

/** Shape guard for the proxy response (unit-tested). */
export function isKnottinResponse(v: unknown): v is {
  fallback: boolean;
  design?: KnottinDesign;
} {
  if (typeof v !== 'object' || v === null) return false;
  const r = v as Record<string, unknown>;
  if (typeof r.fallback !== 'boolean') return false;
  if (r.fallback) return true;
  const d = r.design as Record<string, unknown> | undefined;
  return (
    typeof d === 'object' &&
    d !== null &&
    typeof d.target === 'string' &&
    typeof d.sequence === 'string' &&
    SEQ_RE.test(d.sequence) &&
    typeof d.topology === 'string' &&
    typeof d.charge === 'number' &&
    (typeof d.therapeutic_index === 'number' || d.therapeutic_index === null) &&
    (typeof d.safety_index === 'number' || d.safety_index === null) &&
    typeof d.yeast_chassis === 'string' &&
    (typeof d.proposer_model === 'string' || d.proposer_model === null)
  );
}

export async function designPeptide(
  target: string,
  opts: KnottinOpts = {},
): Promise<KnottinResult> {
  const cached = (note: string, latencyMs: number): KnottinResult => ({
    design: CACHED_DESIGN,
    live: false,
    latencyMs,
    note,
  });
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) return cached('offline', 0);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 110000);
  const started = Date.now();
  try {
    const res = await fetch(`${url}/functions/v1/knottin-design`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target,
        ...(opts.mechanism ? { mechanism: opts.mechanism } : {}),
        ...(opts.charge_target !== undefined ? { charge_target: opts.charge_target } : {}),
        ...(opts.modality ? { modality: opts.modality } : {}),
      }),
      signal: ctrl.signal,
    });
    const ms = Date.now() - started;
    if (!res.ok) return cached(`http ${res.status}`, ms);
    const data: unknown = await res.json();
    if (!isKnottinResponse(data)) return cached('shape', ms);
    if (data.fallback || data.design === undefined) {
      const reason = (data as { reason?: unknown }).reason;
      return cached(typeof reason === 'string' ? reason : 'veto', ms);
    }
    return { design: data.design, live: true, latencyMs: ms, note: 'ok' };
  } catch {
    return cached('down', Date.now() - started);
  } finally {
    clearTimeout(timer);
  }
}
