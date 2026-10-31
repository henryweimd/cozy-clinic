# DEMO_SCRIPT.md — the 2-minute judge path

> Every step below works on the live build today
> (<https://cozy-clinic.vercel.app/>, mobile portrait).
> Timings assume a first-time viewer; the narrator never waits
> on a network call — stored futures + fallback carry the demo
> even offline.

## Beat 1 — the hook (0:00–0:20)

Open the URL. Bram is already mid-visit ("visit #2") and
recognizes the player in the opening seconds. Say:

> "This is Cozy Clinic — patients remember you. Bram's back,
> and the game knows what happened last time."

Bram greets on arrival — no tap-teaching, no onboarding tour.

## Beat 2 — the 4-round visit (0:20–1:10)

Play Bram's tummy case straight through, narrating the accumulation:

1. **Ask** — pick the antibiotics-then-runs question. The
   panel reads the clue back.
2. **Examine** — pick the crampy-belly press. Diffuse
   cramping with fever lands: post-antibiotic, not focal.
3. **Diagnose** — pick C. Diff Colitis over the mimickers
   (plain tummy bug, appendix).
4. **Treat** — targeted antibiotics + fluids. Result modal
   praises the *player* ("Great work, Doctor! 4 of 4 right").

Say:

> "Four rounds — history, exam, diagnosis, treatment — and the
> clues stack. The game never asks the model what's wrong
> mid-visit; it traverses futures that were simulated and
> reviewed ahead of time."

## Beat 3 — the Living Chart (1:10–1:30)

Tap **Next patient**. Open the waiting list, reorder the queue,
tap into Nina (strep throat — the deliberate contrast case:
fever, NO cough). Say:

> "Same sore throat, different disease — the game teaches the
> difference, not the diagnosis screen."

## Beat 4 — learn + economy (1:30–1:50)

Tap **Learn**, open the Strep Throat card (art header, pre-read
summary), answer the inline prize quiz (+5). Open the **Shop**,
then **Profile**: slide Reading level Gentle → Expert and
return to the visit — same right answers, physician wording.

## Beat 5 — under the hood (1:50–2:00)

Tap the COZY CLINIC header 5 times, enter `MABEL`, tap `› DEMO`
for this script in-game, then the arch page (HOW IT RUNS):
cast counts, pre-computed futures, engine veto. Close:

> "Built by Muse, running on Muse — Spark simulates the
> futures, the engine owns the truth, and it all plays offline."

## Beat 6 — the Peptide Lab (+0:40, same take)

At Bram's Treat round, a flask tab lights up on the left rail
(never a choice card — trials don't compete with the cure).
Tap it: the full-screen lab pulls out — consent, the live
4-stage design pipeline (or the cached demo offline), result,
Back to visit; the quiz continues mid-round. Say:

> "Experimental care lives in trials — with consent, and
> proven care first. The design runs live through our own
> peptide API."

## If something fails live

- **No network**: keep going — the fallback pack (36 patients,
  612 futures) plays the identical path; say so, it's a feature.
- **Wrong tap**: every round is recoverable; undo lives in
  Profile; blocked moves show the rescue beat (pick the joke
  card on purpose — judges laugh).
- **Stuck**: RESET lives on the arch page.
