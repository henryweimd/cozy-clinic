# CHECKPOINT.md — long-horizon run: G3 + G4 + WS-E + WS-A

- Phases (all shipped this run, all on `main`, tree clean):
  - G3 (`b2e87a1`): ticker, tool tray, living chart, learn list
    modules + chrome theme + 4 tests (were unwired).
  - G4 (`2fd3338`): modules wired into the scene; live cast
    reads (Supabase -> fallback); encounters on stored futures;
    background tree growth; geometry re-audited (0 findings).
  - WS-E (`b8f6167`): Care Coins wallet + 10-move undo (pure,
    tested, unwired — submenu wiring next integration).
  - WS-A (`34b2c4d`): June + Milo idle portraits, validated +
    manifest-attested, live on the deploy (wiring next).
- Test result: `npm test` 48/48; `npm run build` green every
  phase (benign chunk warning only).
- Deployment URL: `https://cozy-clinic.vercel.app/` — live 200;
  portraits byte-verified (june 50465, milo 44315).
- Playtest result: NOT playtested (no browser in sandbox) —
  operator phone playtest pending: ticker row, tray handle,
  nametag chart, book button, stored-flesh lines.
- Spend: images $0.02 this run (2 portraits); ledger ~$0.3344
  (STOP >= $120; operator cap $20).
- Ops note: Vercel needs VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
  env for live reads in prod (else silent fallback — by design).
- Next: portrait/blink/happy sets for June/Milo, wallet/undo +
  V1 asset-browser wiring, encounter roster growth, D demos.

STOP.
