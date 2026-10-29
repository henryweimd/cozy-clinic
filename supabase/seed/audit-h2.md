# H2 veto + distribution audit (2026-10-29)

Seed: 12 patients (3 age bands x 4 conditions), depth-2 trees via
`seed-patients` (one patient per call — a 12-patient single call
hit WORKER_RESOURCE_LIMIT and was wiped + reseeded cleanly).

## Counts (read back over anon REST)

- patients: 12, trajectory_nodes: 204, trajectory_edges: 192
- treatment_classes: 4, learning_resources: 4 (all URLs curl-200
  verified: medlineplus.gov asthma/dehydration/commoncold/
  highbloodpressure), visit_records: 4 (Mabel visits 1-4)
- Per patient: 17 nodes (1 root + 4 L1 + 12 L2), 16 edges

## Veto rate: 0 / 204 (0%)

No node fell back to engine copy. Spot-check (Mabel root + L1):
third-person narrator voice, stage-faithful (stage-2 wheezy ->
stage-1 steadier), one health fact per teaching line, no brands,
no dosing, no diagnoses beyond the given stage.

## Distribution check

- Stages stay in 0..3 (DB CHECK + engine clamp); L1/L2 deltas
  computed by the REAL engine in the driver, never by the model.
- Blocked (DANGEROUS) actions are leaves: state unchanged,
  animation_cue 'worried', Nora step-in line preserved.
- Moods/vitals/animation cues are engine outputs; the model
  authored narrative + teaching only (structural fields from the
  model are ignored by construction).

## Cost

12 model calls (~2k tokens each) — a few cents of Meta API usage.
Ledger (image spend) unchanged at ~$0.3144.
