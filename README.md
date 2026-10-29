# Little Lives: Cozy Clinic

**A cozy clinic game where patients remember you** — every encounter changes
a persistent patient, and that patient's story follows them across clinicians.

## Who it is for

Cozy Clinic is a game for everyone — kids discovering what medicine is,
adults who never got a clear explanation of their own health. It exists
because low health literacy and medical misinformation cause real harm;
this game teaches real medicine the way it actually sticks: by caring for
patients you grow attached to, making real clinical decisions, and living
with the consequences.

> Operator's firsthand-domain paragraph: to be written by the operator
> before submission — never shipped without their approval.

## Run it

```bash
npm install
npm test        # clinical engine suite — must pass
npm run dev     # serves at http://localhost:5173 — open in a browser
npm run build   # production build into dist/
```

Copy `.env.example` to `.env` when Supabase wiring lands (Milestone 3);
the operator creates the real `.env` locally — it is never committed.

## What is here (Milestone 1)

- Warm clinic room, Mabel (rose-taupe nurse-helper in a pink cap) arriving as the
  first patient, tap-to-see-complaint interaction.
- Deterministic clinical engine (`src/clinical/`): asthma, viral
  respiratory illness, dehydration, hypertension as tested state
  transitions. The engine is authoritative — model output never
  overrides it.
- `MockAIProvider` fallback (`src/ai/`) so the demo path completes
  fully offline. The live Edge Function path is a Milestone 3 contract
  (`docs/AI_PROXY.md`).
- Art law in [`ART_BIBLE.md`](./ART_BIBLE.md); progression data-model
  sketch in [`docs/PROGRESSION.md`](./docs/PROGRESSION.md).

## Educational simulation — not medical advice

This is an **educational simulation with fictional patients**, not a
medical advice tool, not a diagnostic tool for real people, and not a
chatbot. There is no free-text clinical input. Real conditions are
taught through gentle consequences with cozy bounds; patients never die
and setbacks always carry a recovery path. Never real patient data.
