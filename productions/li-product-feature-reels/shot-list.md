# Shot List: LinkedIn product feature reels

**Capture state:** IN PROGRESS (FunderStorm complete; remaining reels per script)
**Last run:** 2026-08-16 (FunderStorm rows verified against footage on disk; capture itself ran earlier in the website-demo-slots production)
**Build captured against:** live app via the Cottage 2 harness, Common Table demo organization

Check off each shot when usable footage exists. The capture gate is every row checked.

## FunderStorm (Tuesday, August 18 slot)

| ID | What is on screen | Type | Duration | App path | Captured |
|---|---|---|---|---|---|
| F1 | Open card: "The grant report is due. Again. Where did last cycle's answers go?" | title | 0:03.2 | n/a, rendered by the rig | [x] |
| F2 | Grant Progress Report editor saving interview answers, collected-facts rail at eleven | screen | 0:05.5 | FunderStorm > Templates > Grant Progress Report > interview stage 2 of 5; `funderstorm-cycle-raw.webm` @ 221.5s | [x] |
| F3 | The reopened document: twelve facts standing, reporting period supplied, brief summary completes | screen | 0:05.5 | Same document reopened in a later session; `funderstorm-pickup-raw.webm` @ 11.5s | [x] |
| F4 | Lead message card, verbatim from message map 3.2 | title | 0:03.0 | n/a | [x] |
| F5 | Quote card: Maryellen Duggan, "Love that the 'chats' are saved to come back to later." | title | 0:05.6 | n/a | [x] |
| F6 | Identity card: FunderStorm. One of four apps that share the same memory. | title | 0:02.8 | n/a | [x] |
| F7 | Standing close: logo, "Where missions gain momentum.", bemointel.ai | title | 0:04.4 | n/a, `capture/out/close-anim/` | [x] |

**Type** is one of:
- `screen` — real product, captured by the automation
- `title` — text card, built by the rig
- `b-roll` — anything else, including founder footage

## Capture notes

- Seeded demo org used: Common Table Food Pantry (standing universe). The grant on screen (Bright Harbor Foundation, Mobile Pantry, the deferred second Saturday route and the paid driver) is that organization's own record, consistent with the Amplify appeal footage.
- Anything that had to be redacted: nothing.
- Shots that needed more than one take, and why: none for this reel; the two beats deliberately come from two takes (cycle and pickup) because the session boundary is the story.

## Findings

UI problems noticed during capture. These go to Lee as product findings, not fixed in the edit.

- The Grant Progress Report editor's generated prose uses em dashes throughout (see `findings.md`, 2026-08-16). Ships as captured, per the Week 30 guardrail.
- The document stays "Untitled Document" through the whole flow, including after the brief completes (see `findings.md`).
