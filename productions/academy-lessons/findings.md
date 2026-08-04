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
| 2026-08-04 | **Capture sessions die far faster than the ~1h previously logged, and the pattern points at token rotation.** A fresh login survived one or two headless browser launches (seconds apart), then the app revoked it and bounced to `/auth/login`. Suspect: refresh-token rotation racing when sequential launches each try to refresh; the second reuse revokes the family. Consequence for capture: one browser launch per login, all steps chained inside a single session; no verify-then-probe double launches. | Open |
