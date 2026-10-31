import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * knottin-design: server-side proxy for the Cozy Peptide API
 * (operator-run at cozy-peptide.vercel.app). The browser never
 * holds the peptide key — the function reads COZY_PEPTIDE_KEY
 * server-side, validates the request, and forwards it with a
 * timeout. Any failure returns a veto-style echo
 * ({ fallback: true, reason }) so the game falls back to its
 * cached demo design and the offline demo completes untouched.
 *
 * Upstream contract: POST /api/generate-peptide with
 * { target, mechanism?, charge_target?, modality? } and a
 * Bearer key; 200 carries candidate.mature_sequence plus the
 * symbolic audit and lab handoff.
 */

const PEPTIDE_URL = "https://cozy-peptide.vercel.app/api/generate-peptide";

const MODALITIES = new Set([
  "knottin-6c",
  "disulfide-4c",
  "disulfide-2c",
  "linear",
]);

const SEQ_RE = /^[ACDEFGHIKLMNPQRSTVWY]{10,100}$/;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "bad json" }, 400);
  }
  const target = body.target;
  if (typeof target !== "string" || target.trim().length === 0 || target.length > 200) {
    return json({ error: "bad target" }, 400);
  }
  const mechanism = typeof body.mechanism === "string" ? body.mechanism.slice(0, 200) : undefined;
  const charge = body.charge_target;
  if (charge !== undefined && !(typeof charge === "number" && [1, 2, 3, 4].includes(charge))) {
    return json({ error: "bad charge" }, 400);
  }
  const modality = body.modality === undefined ? "knottin-6c" : body.modality;
  if (typeof modality !== "string" || !MODALITIES.has(modality)) {
    return json({ error: "bad modality" }, 400);
  }
  const echo = { fallback: true };

  const key = Deno.env.get("COZY_PEPTIDE_KEY");
  if (!key) return json({ ...echo, reason: "no key" });

  try {
    const res = await fetch(PEPTIDE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: target.trim(),
        ...(mechanism ? { mechanism } : {}),
        ...(charge !== undefined ? { charge_target: charge } : {}),
        modality,
      }),
      signal: AbortSignal.timeout(50000),
    });
    if (!res.ok) return json({ ...echo, reason: `peptide ${res.status}` });
    const data = (await res.json()) as Record<string, unknown>;
    // Server-side veto: success flag, a plausible amino-acid
    // sequence, and a passed symbolic audit — else the echo.
    const candidate = data?.candidate as Record<string, unknown> | undefined;
    const seq = candidate?.mature_sequence;
    const audit = data?.symbolic_audit as Record<string, unknown> | undefined;
    const handoff = data?.lab_handoff as Record<string, unknown> | undefined;
    const provenance = data?.neurosymbolic_provenance as Record<string, unknown> | undefined;
    if (
      data?.success !== true ||
      typeof seq !== "string" ||
      !SEQ_RE.test(seq) ||
      audit?.passed !== true ||
      typeof audit?.charge !== "number" ||
      typeof candidate?.topology !== "string" ||
      typeof handoff?.yeast_chassis !== "string"
    ) {
      return json({ ...echo, reason: "shape" });
    }
    return json({
      fallback: false,
      design: {
        target: data.target,
        sequence: seq,
        topology: candidate.topology,
        charge: audit.charge,
        therapeutic_index: audit.therapeutic_index ?? null,
        safety_index: audit.safety_index ?? null,
        yeast_chassis: handoff.yeast_chassis,
        proposer_model: provenance?.proposer_model ?? null,
      },
    });
  } catch {
    return json({ ...echo, reason: "error" });
  }
});
