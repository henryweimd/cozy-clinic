import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// extend-trajectory: grows one pre-computed tree forward after a
// visit. Same law as seed-patients: the CALLER (running the real
// engine) sends full child STRUCTURE and the model authors ONLY
// flesh. Vetoed flesh falls back to engine copy; the game keeps
// reading already-stored futures instantly — nothing ever waits
// on a model call mid-tap.

const META_URL = "https://api.meta.ai/v1/chat/completions";
const MODEL = "muse-spark-1.3";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = [
  'You write cozy educational game narration for "Little Lives: Cozy Clinic".',
  "Voice: warm third-person narrator, gentle and plain (a kid can follow).",
  "Return ONLY JSON: {\"flesh\": {\"<key>\": {\"narrative\": \"...\", \"teaching\": \"...\"}}}.",
  "Rules: narrative <= 60 words, third person, present tense, matches the given",
  "stage/vitals exactly (never invent symptoms or improvement); teaching <= 40",
  "words, one real health fact tied to the choice. Never diagnose, never dose,",
  "never name a real drug brand. Blocked beats say a helper steps in",
  "(never name them — no NPC doctors exist yet); no scene-setting",
  "filler — stay on the patient. Cover EVERY child key given.",
].join(" ");

interface ChildSpec {
  key: string;
  depth: number;
  stageIndex: number;
  vitals: { energy: number; comfort: number; breathing: number };
  mood: string;
  memory: string;
  animationCue: string;
  kind: "decision" | "time";
  choiceLabel?: string;
  grade?: string;
  blocked?: boolean;
  engineNarrative: string;
  engineTeaching: string;
}

interface ExtendRequest {
  patientId: string;
  fromNodeId: string;
  children: ChildSpec[];
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const apiKey = Deno.env.get("META_API_KEY");
    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!apiKey || !url || !serviceKey) {
      return json(500, { error: "server secrets not configured" });
    }
    const body = (await req.json()) as ExtendRequest;
    if (
      typeof body.patientId !== "string" ||
      typeof body.fromNodeId !== "string" ||
      !Array.isArray(body.children) || body.children.length === 0 ||
      body.children.length > 24
    ) {
      return json(400, { error: "patientId + fromNodeId + children[1..24] required" });
    }
    const sb = createClient(url, serviceKey);
    const { data: parent, error: pErr } = await sb
      .from("trajectory_nodes")
      .select("id, patient_id, narrative")
      .eq("id", body.fromNodeId)
      .eq("patient_id", body.patientId)
      .single();
    if (pErr || !parent) {
      return json(400, { error: "fromNodeId not found for patient" });
    }
    let flesh: Record<string, { narrative: string; teaching: string }> = {};
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const res = await fetch(META_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: "system", content: SYSTEM },
              {
                role: "user",
                content: JSON.stringify({
                  parentNarrative: parent.narrative,
                  children: body.children.map((c) => ({
                    key: c.key,
                    stageIndex: c.stageIndex,
                    vitals: c.vitals,
                    mood: c.mood,
                    kind: c.kind,
                    choiceLabel: c.choiceLabel ?? null,
                    grade: c.grade ?? null,
                    blocked: c.blocked ?? false,
                    draftNarrative: c.engineNarrative,
                    draftTeaching: c.engineTeaching,
                  })),
                }),
              },
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
          }),
        });
        if (!res.ok) throw new Error(`meta ${res.status}`);
        const data = await res.json();
        const content: string = data?.choices?.[0]?.message?.content ?? "";
        const parsed = JSON.parse(content) as {
          flesh?: Record<string, { narrative: unknown; teaching: unknown }>;
        };
        for (const [k, v] of Object.entries(parsed.flesh ?? {})) {
          if (
            typeof v?.narrative === "string" &&
            typeof v?.teaching === "string" &&
            v.narrative.trim().length > 0 && v.teaching.trim().length > 0
          ) {
            flesh[k] = {
              narrative: v.narrative.slice(0, 400),
              teaching: v.teaching.slice(0, 300),
            };
          }
        }
        break;
      } catch {
        flesh = {};
      }
    }
    const nodeIds: string[] = [];
    const vetoed: string[] = [];
    for (const c of body.children) {
      const f = flesh[c.key];
      if (!f) vetoed.push(c.key);
      const { data: node, error: nErr } = await sb
        .from("trajectory_nodes")
        .insert({
          patient_id: body.patientId,
          depth: c.depth,
          stage_index: c.stageIndex,
          vitals: c.vitals,
          mood: c.mood,
          narrative: f?.narrative ?? c.engineNarrative,
          teaching: f?.teaching ?? c.engineTeaching,
          animation_cue: c.animationCue,
          memory: c.memory,
        })
        .select("id")
        .single();
      if (nErr || !node) {
        return json(500, { error: `node insert: ${nErr?.message}` });
      }
      const { error: eErr } = await sb.from("trajectory_edges").insert({
        patient_id: body.patientId,
        from_node_id: body.fromNodeId,
        to_node_id: node.id,
        kind: c.kind,
        choice_label: c.choiceLabel ?? null,
        grade: c.grade ?? null,
      });
      if (eErr) return json(500, { error: `edge insert: ${eErr.message}` });
      nodeIds.push(node.id);
    }
    return json(200, { nodeIds, vetoed });
  } catch (e) {
    return json(500, { error: String(e?.message ?? e) });
  }
});
