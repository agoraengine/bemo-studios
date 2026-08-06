# Build plan: seeding the Harvest Supper press release in the app

This is the plan for the **seeding session** (building the real work product in the workspace). It is not the shipping capture: that waits on brief ratification, a script, and a shot list, per `docs/01-pipeline.md`. The seeding session may screen-record into `out/` (gitignored) for reference, and those recordings inform the shot list, but they are not the take.

## Prerequisite: a live session

The saved login expired (checked 2026-08-06, landed on `/auth/login`). Becky runs:

```
node capture/login.mjs
```

Log in, check **Remember Me**, close the window. Known constraint from prior productions: sessions expire after roughly an hour, so plan the build to fit inside one, or expect a mid-session re-login.

## The session, in order

1. **Verify**: `node capture/verify-session.mjs` lands on the app, not `/auth/login`.
2. **Discover the template surface.** List what the templates offer. Known to exist: Grant Progress Report, Donor Email. Unknown: a press release template. Record what is actually there in `findings.md`; the brief has an open question riding on it.
   - Press release template exists: use it.
   - No template: use the document editor's general drafting flow. The clip's story changes shape; note it for the script.
3. **Start a fresh document.** Never reuse an in-flight doc: pre-wipe documents carry another org's real facts (website-demo-slots finding, 2026-08-03) and are unfilmable.
4. **Let the KB lead.** The KB holds the Harvest Supper facts (`upload/11-harvest-supper.md`), the July press release, and the boilerplate/voice guide. At any Choose-KB-inputs step, note how many KB items the template finds; the narrow-template-keys finding (three instances so far) predicts few. Whatever the KB does not supply, answer in the interview **from the acceptance sheet only** (`../press-release-source.md`); nothing off-sheet gets typed into the app.
5. **Draft, then edit as the org.** Steer toward the reference draft's shape. Check the draft against the trace table and voice rules; make the corrections in the editor (gala language, em dashes, off-sheet facts). The editing is real work and is fine to have in the document's history.
6. **Leave it finished.** The document stays in the workspace as completed work product, titled as the org would title it (something like "Press release: Harvest Supper 2026"). It becomes set dressing for every future Common Table capture.
7. **Record findings.** Template inventory, KB retrieval behavior, any manual-advance walls (the Grant Progress Report needed a human click to reach drafting), session expiry events. Product findings go to Lee via `findings.md`.

## What must never appear on screen (also binds reference recordings)

- The KB table's Owner column (shows the real account name).
- Any pre-wipe document or Home view that includes one.
- Wrenfield anything (no-blur rule).
