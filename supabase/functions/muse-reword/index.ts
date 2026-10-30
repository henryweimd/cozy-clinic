import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * muse-reword: runtime reading-level paraphrase for flavor lines
 * (visit greetings). The model rewords ONLY — meaning, names, and
 * complaint terms are vetoed server-side; grades never depend on
 * this output. Any failure echoes the input with fallback: true,
 * so the game always runs (offline demo completes untouched).
 *
 * Key: Supabase secret META_API_KEY, server-side only.
 */

const META_URL = "https://api.meta.ai/v1/chat/completions";
const MODEL = "muse-spark-1.3";

const VOICE: Record<string, string> = {
  gentle:
    "a 7-year-old child. Use only short plain everyday words. No medical terms at all.",
  steady:
    "an educated adult. Warm plain language, no jargon, no abbreviations.",
  clinical:
    "a healthcare worker who is not a physician. Proper clinical words are fine but spell everything out — no abbreviations.",
  expert:
    "a physician. Concise clinical language is fine, but keep it to one friendly line.",
};

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
  const text = body.text;
  const tier = body.tier;
  if (typeof text !== "string" || text.trim().length === 0 || text.length > 500) {
    return json({ error: "bad text" }, 400);
  }
  if (typeof tier !== "string" || !(tier in VOICE)) {
    return json({ error: "bad tier" }, 400);
  }
  const rawKeep = Array.isArray(body.keep) ? body.keep : [];
  const keep = rawKeep
    .filter((k): k is string => typeof k === "string" && k.length > 0)
    .slice(0, 8);
  const context = typeof body.context === "string" ? body.context.slice(0, 40) : "line";
  const echo = { text, fallback: true };

  const key = Deno.env.get("META_API_KEY");
  if (!key) return json({ ...echo, reason: "no key" });

  const system = [
    `Reword one cozy clinic game line for ${VOICE[tier as string]}`,
    "Rules: keep the exact same meaning, people, and feelings.",
    "Keep these terms EXACTLY as written if present:",
    keep.length > 0 ? keep.map((k) => `"${k}"`).join(", ") : "(none)",
    "Never add new medical claims, diagnoses, or advice.",
    "One line only, no quotes around it, no markup.",
    'Reply ONLY as JSON: {"text": "..."}',
  ].join(" ");

  try {
    const res = await fetch(META_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `[${context}] ${text}` },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        // Muse always reasons and bills it against max_tokens —
        // minimal effort + headroom so content survives.
        reasoning_effort: "minimal",
        max_tokens: 2048,
      }),
    });
    if (!res.ok) return json({ ...echo, reason: `meta ${res.status}` });
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data?.choices?.[0]?.message?.content ?? "";
    // Tolerant extraction: plain JSON, fenced block, or the
    // first {...} span — then the veto still applies.
    let out: unknown = null;
    const candidates = [
      content,
      content.replace(/```json|```/g, ""),
      ...Array.from(content.matchAll(/\{[^{}]*"text"[^{}]*\}/g)).map((m) => m[0]),
    ];
    for (const c of candidates) {
      try {
        out = JSON.parse(c) as unknown;
        break;
      } catch {
        /* next candidate */
      }
    }
    if (out === null) return json({ ...echo, reason: "unparseable" });
    const t = (out as { text?: unknown }).text;
    // Server-side veto: shape, length, kept terms, no markup.
    if (typeof t !== "string" || t.trim().length === 0) {
      return json({ ...echo, reason: "empty" });
    }
    const trimmed = t.trim();
    if (trimmed.length > text.length * 2 + 40 || trimmed.length < 3) {
      return json({ ...echo, reason: "length" });
    }
    const low = trimmed.toLowerCase();
    if (!keep.every((k) => low.includes(k.toLowerCase()))) {
      return json({ ...echo, reason: "dropped term" });
    }
    if (/[<>]/.test(trimmed) || trimmed.split("\n").length > 1) {
      return json({ ...echo, reason: "format" });
    }
    return json({ text: trimmed, fallback: false });
  } catch {
    return json({ ...echo, reason: "error" });
  }
});
