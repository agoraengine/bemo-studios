# Shot List: Website Demo Slot Clips

**Capture state:** IN PROGRESS (two of six slots capturable today; four wait, reasons below)
**Last run:** 2026-08-03
**Build captured against:** app.bemointel.ai production, Common Table KB loaded 2026-08-03

Each clip is one continuous recorded session, cut to length in assembly. Elapsed time is burned in at every cut per DEMOS.md.

## Clip 1: `funderstorm-cycle` (12s loop, 16:10, 1920x1200)

| ID | What is on screen | Type | Duration (source) | App path | Captured |
|---|---|---|---|---|---|
| F1 | FunderStorm Templates page, Grant Progress Report tile clicked | screen | ~8s | /funderstorm/templates | [ ] |
| F2 | New document; "Here's what I found in your knowledge base"; input selected; Submit | screen | ~20s | template detail > New Grant Progress Report | [ ] |
| F3 | Interview: the app collects the cycle's facts, the brief accumulates in Collected Facts | screen | ~3min | same doc, Interviewing 2 of 5 | [ ] |
| F4 | The app's recap brief: funder, grant, year-one numbers, challenge, year two, and the one new thing (Marcus's three donor quotes) marked as a production note | screen | ~20s | same doc | [ ] |
| F5 | Draft stage reached; document body visible with Collected Facts panel | screen | ~1min | same doc, later stages | [ ] |

The 12s cut: F1 (2s) > F2 (3s) > F3 one question-and-answer beat (3s) > F4 recap (2.5s) > F5 draft (1.5s). Poster: F4 recap frame if it reads, else F2.

## Clip 2: `knows-whats-missing` (12s loop, 16:10, 1920x1200)

| ID | What is on screen | Type | Duration (source) | App path | Captured |
|---|---|---|---|---|---|
| K1 | New chat; the Harvest Supper status question typed at human speed | screen | ~15s | /funderstorm/templates > New chat (never Home) | [ ] |
| K2 | "Let me check your knowledge base"; the answer lists what is recorded, then names what is not, and invites adding it | screen | ~30s | same chat | [ ] |
| K3 | Reply typed: the board sign-off fact from the March 12 meeting; sent | screen | ~15s | same chat | [ ] |
| K4 | The app confirms the fact is added to the Knowledge Base | screen | ~30s | same chat | [ ] |

The 12s cut: K1 (2s) > K2 (5s, the heart of it) > K3 (2.5s) > K4 (2.5s). Poster: K2, the frame where the gap is named and invited.

## The four slots that wait (do not capture, do not fake)

| Slot | Why it waits | Unblocks when |
|---|---|---|
| `first-run` | Needs a genuinely empty org: wiping the loaded Common Table KB is destructive, reload takes a staged session with a mid-run re-login (sessions expire ~1h), and whether one typed sentence creates visibly-sourced KB entries is untested. | A staged session with Becky present, or Lee provisions a scratch org. |
| `ask-with-sources` | Chat answers carry no clickable source chips (product finding, 2026-08-03). Spec's own constraint: this demo waits. | Source chips ship. |
| `cross-app-handoff` | No handoff affordance exists in chat (the scissors icon is a slice tool). Spec requires one continuous motion between apps. | The handoff ships. |
| `academy-in-flow` | Academy today is a course library; no lesson surfaces against a document mid-task. Spec: "If a course library appears on screen, the demo has failed." | In-flow lessons ship. |

## Frame hygiene (hard rules for every take)

- **Never show Home.** The In Flight list carries real work products (a Caigh It Forward board agenda with a real chair line).
- **Never show the KB table or Drive panels.** The KB table's Owner column reads "Becky Kern" (a real person on a fictional org's screen); Drive lists real documents.
- **Never reuse the existing in-flight Grant Progress Report doc** (doc_UicwqbWIPUYRzMlo): its collected facts froze "Caigh It Forward" before the KB wipe. Always start fresh from the template.
- Start every take at /funderstorm/templates, not /.

## Capture notes

- Seeded demo org used: Common Table Food Pantry (`demo-org/common-table/`), loaded 2026-08-03, verified clean (organization-name item holds "Common Table Food Pantry").
- All interview answers come from `demo-org/common-table/fact-sheet.md`. The one soft extension (year-one spend on budget) is recorded in the fact sheet.
- Session constraint: takes must run within ~1 hour of `node capture/login.mjs`.

## Findings

Recorded in `findings.md`, not here.
