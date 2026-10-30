import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// seed-patients: plants the persistent cast + their pre-computed
// trajectory trees. The CALLER (seed driver, running the real
// clinical engine) sends full tree STRUCTURE — stages, vitals,
// moods, grades, edges — and the model authors ONLY narrative
// flesh (narrative + teaching per node). Anything the model
// returns outside that shape is vetoed and falls back to the
// engine's own copy. Engine is physics, Muse is author.
//
// Recorded Meta contract (dev.meta.ai/docs, 2026-10-29):
// POST https://api.meta.ai/v1/chat/completions, Bearer key,
// OpenAI-compatible JSON.

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
  "Return ONLY JSON: {\"flesh\": {\"<nodeKey>\": {\"narrative\": \"...\", \"teaching\": \"...\"}}}.",
  "Rules: narrative <= 60 words, third person, present tense, matches the given",
  "stage/vitals exactly (never invent symptoms or improvement); teaching <= 40",
  "words, one real health fact tied to the choice. Never diagnose, never dose,",
  "never name a real drug brand. Blocked beats name the intervener Dr. Nora",
  "(never 'a helper'/'a grown-up'); no scene-setting filler — stay on the",
  "patient. Cover EVERY node key given.",
].join(" ");

interface SeedNode {
  key: string;
  depth: number;
  stageIndex: number;
  vitals: { energy: number; comfort: number; breathing: number };
  mood: string;
  memory: string;
  animationCue: string;
  kind: "root" | "child";
  choiceLabel?: string;
  grade?: string;
  blocked?: boolean;
  engineNarrative: string;
  engineTeaching: string;
}

interface SeedEdge {
  fromKey: string;
  toKey: string;
  kind: "decision" | "time";
  choiceLabel?: string;
  grade?: string;
}

interface RosterEntry {
  name: string;
  conditionId: string;
  ageBand: string;
  persona: string;
  furShade: string;
  facialFeatures?: string;
  accessories?: string;
  startStage?: number;
}

interface SeedRequest {
  roster: RosterEntry[];
  trees: Record<string, { nodes: SeedNode[]; edges: SeedEdge[] }>;
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

async function modelFlesh(
  apiKey: string,
  patient: RosterEntry,
  nodes: SeedNode[],
): Promise<Record<string, { narrative: string; teaching: string }>> {
  const slim = nodes.map((n) => ({
    key: n.key,
    stageIndex: n.stageIndex,
    vitals: n.vitals,
    mood: n.mood,
    kind: n.kind,
    choiceLabel: n.choiceLabel ?? null,
    grade: n.grade ?? null,
    blocked: n.blocked ?? false,
    draftNarrative: n.engineNarrative,
    draftTeaching: n.engineTeaching,
  }));
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
            patient: {
              name: patient.name,
              conditionId: patient.conditionId,
              ageBand: patient.ageBand,
              persona: patient.persona,
            },
            nodes: slim,
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
  const out: Record<string, { narrative: string; teaching: string }> = {};
  for (const [k, v] of Object.entries(parsed.flesh ?? {})) {
    if (typeof v?.narrative === "string" && typeof v?.teaching === "string") {
      out[k] = { narrative: v.narrative, teaching: v.teaching };
    }
  }
  return out;
}

/** Veto pass: model flesh must be non-empty strings; else engine copy. */
function resolveFlesh(
  node: SeedNode,
  flesh: Record<string, { narrative: string; teaching: string }>,
): { narrative: string; teaching: string; vetoed: boolean } {
  const f = flesh[node.key];
  if (
    f && f.narrative.trim().length > 0 && f.teaching.trim().length > 0
  ) {
    return {
      narrative: f.narrative.slice(0, 400),
      teaching: f.teaching.slice(0, 300),
      vetoed: false,
    };
  }
  return {
    narrative: node.engineNarrative,
    teaching: node.engineTeaching,
    vetoed: true,
  };
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
    const body = (await req.json()) as SeedRequest;
    if (
      !Array.isArray(body.roster) || body.roster.length === 0 ||
      body.roster.length > 24 || typeof body.trees !== "object"
    ) {
      return json(400, { error: "roster[1..24] + trees required" });
    }
    const sb = createClient(url, serviceKey);
    const report: Array<{
      name: string;
      id: string;
      nodes: number;
      edges: number;
      vetoed: string[];
    }> = [];
    let modelCalls = 0;
    for (const p of body.roster) {
      const tree = body.trees[p.name];
      if (!tree || !Array.isArray(tree.nodes) || tree.nodes.length === 0) {
        return json(400, { error: `missing tree for ${p.name}` });
      }
      // One model call per patient; a total failure retries once,
      // then every node falls back to engine copy (vetoed).
      let flesh: Record<string, { narrative: string; teaching: string }> = {};
      let fleshOk = false;
      for (let attempt = 0; attempt < 2 && !fleshOk; attempt += 1) {
        try {
          modelCalls += 1;
          flesh = await modelFlesh(apiKey, p, tree.nodes);
          fleshOk = true;
        } catch {
          flesh = {};
        }
      }
      const root = tree.nodes.find((n) => n.kind === "root") ?? tree.nodes[0];
      const { data: patient, error: pErr } = await sb
        .from("patients")
        .insert({
          name: p.name,
          condition_id: p.conditionId,
          age_band: p.ageBand,
          persona: p.persona,
          fur_shade: p.furShade,
          facial_features: p.facialFeatures ?? null,
          accessories_clothing: p.accessories ?? null,
          start_stage: p.startStage ?? root.stageIndex,
        })
        .select("id")
        .single();
      if (pErr || !patient) {
        return json(500, { error: `patient insert: ${pErr?.message}` });
      }
      const keyToId = new Map<string, string>();
      const vetoed: string[] = [];
      for (const n of tree.nodes) {
        const r = resolveFlesh(n, flesh);
        if (r.vetoed) vetoed.push(n.key);
        const { data: node, error: nErr } = await sb
          .from("trajectory_nodes")
          .insert({
            patient_id: patient.id,
            depth: n.depth,
            stage_index: n.stageIndex,
            vitals: n.vitals,
            mood: n.mood,
            narrative: r.narrative,
            teaching: r.teaching,
            animation_cue: n.animationCue,
            memory: n.memory,
          })
          .select("id")
          .single();
        if (nErr || !node) {
          return json(500, { error: `node insert: ${nErr?.message}` });
        }
        keyToId.set(n.key, node.id);
      }
      let edgeCount = 0;
      for (const e of tree.edges) {
        const fromId = keyToId.get(e.fromKey);
        const toId = keyToId.get(e.toKey);
        if (!fromId || !toId) continue; // veto: dangling edge dropped
        const { error: eErr } = await sb.from("trajectory_edges").insert({
          patient_id: patient.id,
          from_node_id: fromId,
          to_node_id: toId,
          kind: e.kind,
          choice_label: e.choiceLabel ?? null,
          grade: e.grade ?? null,
        });
        if (eErr) return json(500, { error: `edge insert: ${eErr.message}` });
        edgeCount += 1;
      }
      report.push({
        name: p.name,
        id: patient.id,
        nodes: tree.nodes.length,
        edges: edgeCount,
        vetoed,
      });
    }
    return json(200, { patients: report, modelCalls });
  } catch (e) {
    return json(500, { error: String(e?.message ?? e) });
  }
});
