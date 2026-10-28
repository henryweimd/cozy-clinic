# CHECKPOINT.md — Phase 01 (Milestone 1 chunk)

- Phase: 01 — scaffold, engine, clinic scene, first deploy (deploy pending).
- Files: package.json, vite.config.ts, tsconfig.ts, index.html, README.md,
  .gitignore, .env.example, ART_BIBLE.md, PROGRESS.md, src/main.ts,
  src/scenes/ClinicScene.ts, src/clinical/{types,conditions,engine,index}.ts,
  src/clinical/engine.test.ts, src/ai/{provider,mockProvider,index}.ts,
  docs/{PROGRESSION,AI_PROXY}.md, public/assets/characters/mochi-{idle,blink}.png,
  art/{manifest.json,contact-sheets/mochi-contact-sheet.png}.
- Tests: `npm test` 28/28 pass; `npm run build` succeeds.
- Ledger: studio ledger file absent (no prior spend file); image spend this
  phase $0.02 (2 images). $20 gate not reached.
- Deployment URL: NONE — no Vercel linkage/CLI in this session; operator
  deploys next. Chunk acceptance NOT fully ticked (deploy + operator feel
  gate outstanding); nothing merged around it — work committed on `main`
  as first production-ready state, deploy is the operator's next step.
- Playtest: headless Chrome phone viewport, load + tap path, 60.3 FPS,
  zero console errors; tap bubble, blink, bounce verified in screenshots
  (pre-fix screenshots viewed; post-fix state verified by script run only).
- Defects fixed: bubble cutoff, shadow gap, favicon 404. No failures ×3.
- STOP. Do not continue to Milestone 2.
