# Findings: Academy Lessons

Studios raises these; it fixes none of them in the siblings.

## Canon findings (for bemo-os)

| Date | Finding | Raised |
|---|---|---|
| 2026-08-03 | **The message map's Academy row cites uncleared proof.** `ga-message-map.md` (Academy row) quotes Patti Connolly ("exactly the kind of on-ramp that nonprofit boards need right now"), but there is no entry for her in `docs/customer-stories/00-overview.md`. Either the clearance exists and needs recording there, or the quote should not be cited in the map. **Not a blocker for this series** (Becky, 2026-08-04): lessons carry no customer proof by design, so nothing here waits on it. Stays open purely as canon hygiene for bemo-os. | Open, non-blocking |
| 2026-08-03 | **The SME-partner lesson marketplace is direction, not canon.** Becky's presenter decision for this series names a future in which subject-matter-expert partners present their product areas, toward a full marketplace of expert-led lessons. Nothing in bemo-os records that direction. Standing note: before it shapes external claims, partner conversations, or on-screen copy, it needs ratifying into bemo-os (product suite or an initiative doc). Until then it exists only as the reason the generic avatar is a placeholder. | Open |

## Product findings (for Lee)

| Date | Finding | Raised |
|---|---|---|
| 2026-08-04 | **`/academy` renders a blank page in the live app.** Direct navigation to `app.bemointel.ai/academy` with a valid session serves the URL (no redirect) but paints nothing: empty body, zero links, white full-page screenshot (`capture/out/academy/00-landing.png`). Either the route is an unguarded empty shell and Academy lives at a different path, or the section does not render headless. Blocks the lesson probe until the real click path is known. | Open |
| 2026-08-05 | **No path exists to attach finished lesson videos to their Academy courses in-product.** The course player has Reading, Key Takeaways, Practice Exercise, Knowledge Check, and download blocks, but no video slot, and no admin/bulk-import surface is visible from Becky's account. Ask: a video field per course plus a bulk attach path (API endpoint or import keyed by course code). With that, Studios automates the last mile: the roster already maps every finished mp4 to its course code, so publishing all 270 becomes one scripted pass. Until then, delivery is Drive links. | Open |
| 2026-08-04 | **Capture sessions do not survive browser restarts unless "Remember me" is checked at login.** Root cause found by evidence screenshot after several failed hypotheses (token rotation was wrong): without Remember me, the app issues a session-only cookie that the browser discards on quit. That is why any single long-running launch worked (the 25-minute catalog crawl) while every relaunch bounced to `/auth/login`. Fix on our side: `capture/login.mjs` now tells the operator to check Remember me. For Lee: consider whether a session-only default is intended for this app; the ~1h in-browser expiry from the 8/3 findings is a separate, real limit. | Open |
