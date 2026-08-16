# Shot List: Foundational Demo Training Video

**Capture state:** IN PROGRESS (S17 captured; app shots waiting on a fresh login session)
**Last run:** 2026-08-13
**Build captured against:** S17: bemo-website local build at ce411c7. App shots: pending; the probe stamps the build when the session is restored

Check off each shot when usable footage exists. The capture gate is every row checked.

Shots are ordered for capture efficiency: all title cards build together, then one continuous app session in demo order (the session IS the shot sequence, so demo order and capture order coincide here; the run is captured as one take per segment with the cursor choreography below), then the website tab. Common Table capture org only, never Jon's practice workspace.

| ID | What is on screen | Type | Duration | App path | Captured |
|---|---|---|---|---|---|
| F1 | Card: "The foundational demo, the reference run" / sub "Universal mode, on Common Table" | title | 0:14 | | [ ] |
| F2 | Cards: prepared workspace is the real default; this run is the fallback and practice rig | title | 0:24 | | [ ] |
| F3 | Card: "This video never goes to a prospect", held alone | title | 0:14 | | [ ] |
| F4 | Card: "Six beats. Pricing. The close." with the six-beat list | title | 0:08 | | [ ] |
| S5 | Common Table Home, at rest, no interaction | screen | 0:25 | Log in to the Common Table capture org; land on Home. Hold with no cursor movement | [ ] |
| S6 | Home walkthrough: hover renewal item, Teen Kitchen story, giving trend; then hold | screen | 0:50 | Home surface. Cursor hovers, in order: the Bright Harbor renewal report item (due Aug 15), the Teen Kitchen graduation story (Jul 30), the June giving figure ($18,240, 34 donors). End on a still hold for the line to land | [ ] |
| S7 | Knowledge Base: Bright Harbor funder page, scrolled at reading pace | screen | 0:40 | Home > Knowledge Base > Funders > Bright Harbor Foundation. Scroll past award history ($60,000 over two years, Jul 2025) and renewal timeline (submitted Jul 14, call Aug 5, report due Aug 15). Confirm route with Lee | [ ] |
| S8 | A flagged gap in the KB, cursor resting on the flag; hold for the line to land | screen | 0:40 | A KB page with a visible gap flag. Candidate: the Bright Harbor year-one report's missing donor quotes, or whichever gap the current load surfaces. Verify with Lee which gap presents best in the live build | [ ] |
| S9 | Compass, empty chat, cursor in the input | screen | 0:10 | Navigate KB > Compass (or Home > Compass; confirm). New conversation, input focused, nothing typed | [ ] |
| S10 | The question typed live, sent, answer generating at real speed, then the full answer; cursor underlines the three recalled elements; hold | screen | 2:10 | Type verbatim: "Should we restart the second Saturday mobile pantry site?" Send. Do not cut the generation wait. On answer: cursor traces the March 2026 deferral, the 2024 pause, the Bright Harbor renewal connection. Best honest take; if thin, keep it and rely on S11 | [ ] |
| S11 | Click-through from the answer to the March 2026 board minutes in the KB | screen | 0:20 | From the Compass answer (citation link if the UI offers one, else navigate) to Knowledge Base > the March 2026 board minutes page showing the deferral decision. Confirm the click-through affordance with Lee | [ ] |
| S12 | FunderStorm funding view: Bright Harbor mid-renewal, Meridian LOI in review, invited Amberline application; cursor in narration order; hold | screen | 1:15 | Navigate to FunderStorm. The Common Table funding landscape. Cursor moves: Bright Harbor (renewal status) > Meridian Fund (in review, decision fall 2026) > Amberline (invited July, nothing submitted). Confirm the view name and route with Lee | [ ] |
| S13 | Amplify: new draft request typed and sent (donor thank-you, June's new donors) | screen | 0:25 | Navigate to Amplify. New draft. Type the request: a thank-you to June's nine first-time donors. Send | [ ] |
| S14 | Draft generates at real speed; slow scroll; click to the voice guide in the KB and back; long hold on the finished draft | screen | 1:40 | Do not cut the generation wait. Scroll the finished draft at reading pace. Click through to Knowledge Base > communications > boilerplate and voice guide, then back to the draft. Hold for the Jennifer Allen story and the line to land | [ ] |
| S15 | Academy, one screen, held | screen | 0:20 | Navigate to Academy. Landing view only, no deep navigation. Hold | [ ] |
| S16 | Return to Home, at rest | screen | 0:25 | Navigate back to Home. Still hold for "Four apps. One product." | [ ] |
| S17 | The live pricing page: four tiers, beta and grandfather language, scrolled at reading pace, then hold on the tier table | screen | 1:05 | Captured from the local build at ce411c7 (bemointel.ai still resolves to the old Wix site as of Aug 13 morning, /pricing 404s there; see findings). Scroll: tiers > beta posture copy > grandfather commitment. End holding the tier table | [x] |
| S18 | Back in the app, Home at rest, calm | screen | 0:20 | Switch back to the app tab, Home. No interaction | [ ] |
| C2 | Cards: "One next step, matched to the person" / "Start in the beta, today / or: a prepared workspace" / "Never both. Never pressure." | title | 0:35 | | [ ] |
| C3 | Cards: "Now run it: six beats, twice, no script" / "Drill beat 3 until the recovery path is boring" | title | 0:25 | | [ ] |
| C4 | End card: BeMo logo + "Training reference. Not for prospects." | title | 0:08 | | [ ] |

**Type** is one of:
- `screen` — real product, captured by the automation
- `title` — text card, built in Canva or the editor
- `b-roll` — anything else, including founder footage

## Capture notes

- Seeded demo org used: Common Table capture org (`productions/common-table-kb-load/capture/run.mjs` load; verify against `demo-org/common-table/fact-sheet.md` spot checks before rolling: $60,000 over two years, report due Aug 15, 41,600 meals YTD Q2, ~40 families Saturdays, June $18,240 from 34 donors). Search the KB for Wrenfield leakage and real cleared names per `demo-org/common-table/README.md` before capture.
- Capture at 2560x1440, 16:9, per standards; one browser profile, notifications off, no other tabs except the pricing page.
- S10 and S14 are live generations: capture the real wait, take the best honest take, never retry until it flatters. If S10 comes back thin, keep it; S11 is the scripted recovery and the script's S11 row already covers it.
- Anything that had to be redacted: nothing so far (S17 is the public pricing page)
- Shots that needed more than one take, and why: S17 one take
- S17 captured 2026-08-13 from the local website build (ce411c7) at 2560x1440; the four tiers, the "billing is off during open beta" note, and the GA-availability labels on Team and Enterprise all render as the script expects. `out/S17.webm`, final frame `out/S17-final.png`.

## Blockers before capture

1. **The saved session expired.** `node capture/verify-session.mjs` lands on the login page (checked Aug 13 morning). Becky: run `node capture/login.mjs`, sign in with "remember me" checked, close the window. One minute, then everything below unblocks.
2. **Probe run (scripted, no Lee needed).** `node productions/foundational-demo-training/capture/run.mjs --probe` maps the app on the restored session: which surfaces are live (Home front page, KB wiki, gap flags, Compass citation click-through), the routes for S7 to S15, org identity, and the fact-sheet spot checks. It writes `capture/out/probe/probe.json` plus screenshots; the SEL table in run.mjs gets corrected from it before the recording pass. Routes the probe cannot find get flagged, not guessed.
2. **VO generation.** Becky's approved voice setup (ElevenLabs settings per the August 10 pacing proof), from the locked script only. Lock waits on a read-aloud pass against the captured screen timings.

## Findings

UI problems noticed during capture. These go to Lee as product findings, not fixed in the edit.

-
