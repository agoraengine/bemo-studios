# Shot List: Website Demo Slot Clips

**Capture state:** clips 1-4 COMPLETE. 1-2 captured/wired 2026-08-03; 3-4 (compass, amplify) captured/wired 2026-08-04 (amplify needed a pickup for the draft stage, same pattern as funderstorm).
**Last run:** 2026-08-03
**Build captured against:** app.bemointel.ai production, Common Table KB loaded 2026-08-03

Each clip is one continuous recorded session, cut to length in assembly. Elapsed time is burned in at every cut per DEMOS.md.

## Clip 1: `funderstorm-cycle` (12s loop, 16:10, 1920x1200)

| ID | What is on screen | Type | Duration (source) | App path | Captured |
|---|---|---|---|---|---|
| F1 | FunderStorm Templates page, Grant Progress Report tile clicked | screen | ~8s | /funderstorm/templates | [x] |
| F2 | New document; "Here's what I found in your knowledge base"; input selected; Submit | screen | ~20s | template detail > New Grant Progress Report | [x] |
| F3 | Interview: the app collects the cycle's facts, the brief accumulates in Collected Facts | screen | ~3min | same doc, Interviewing 2 of 5 | [x] |
| F4 | The app's recap brief: funder, grant, year-one numbers, challenge, year two, and the one new thing (Marcus's three donor quotes) marked as a production note | screen | ~20s | same doc | [x] |
| F5 | "Continue to Research" reached; recap held with Collected Facts panel visible (the flow requires a manual click to actually enter drafting, which the clip does not show) | screen | ~1min | same doc, after "Yes, continue." | [x] |

The 12s cut: F1 (2s) > F2 (3s) > F3 one question-and-answer beat (3s) > F4 recap (2.5s) > F5 draft (1.5s). Poster: F4 recap frame if it reads, else F2.

## Clip 2: `knows-whats-missing` (12s loop, 16:10, 1920x1200)

| ID | What is on screen | Type | Duration (source) | App path | Captured |
|---|---|---|---|---|---|
| K1 | New chat; the Harvest Supper status question typed at human speed | screen | ~15s | /funderstorm/templates > New chat (never Home) | [x] |
| K2 | "Let me check your knowledge base"; the answer lists what is recorded, then names what is not, and invites adding it | screen | ~30s | same chat | [x] |
| K3 | Reply typed: the board sign-off fact from the March 12 meeting; sent | screen | ~15s | same chat | [x] |
| K4 | The app confirms the fact is added to the Knowledge Base | screen | ~30s | same chat | [x] |

The 12s cut: K1 (2s) > K2 (5s, the heart of it) > K3 (2.5s) > K4 (2.5s). Poster: K2, the frame where the gap is named and invited.

## Clip 3: `compass-in-flow` (12s loop, 16:10, 1920x1200) — added 2026-08-04, per Becky's product-parity direction

| ID | What is on screen | Type | Duration (source) | App path | Captured |
|---|---|---|---|---|---|
| C1 | New Compass chat; the second-Saturday-site decision question typed | screen | ~20s | /compass/templates > New chat (never Home) | [x] |
| C2 | The answer drawing on the KB: the 2024 pause, the March deferral, the renewal that could fund the driver | screen | ~40s | same chat | [x] |
| C3 | Follow-up ("If the renewal comes through, what should we line up first?") and its answer | screen | ~45s | same chat | [x] |

Risk noted: decision-phrased questions may bypass KB retrieval (findings, 2026-08-03). The question is phrased broad on purpose; if the take answers generically, rephrase toward status ("Where does the second Saturday site stand?") and re-run.

## Clip 4: `amplify-in-flow` (12s loop, 16:10, 1920x1200) — added 2026-08-04, same direction

| ID | What is on screen | Type | Duration (source) | App path | Captured |
|---|---|---|---|---|---|
| A1 | Amplify Templates page; a letter/release template opened | screen | ~15s | /amplify/templates | [x] |
| A2 | Fresh document; KB facts arriving before anyone types | screen | ~30s | new doc from template | [x] |
| A3 | One typed beat: Harvest Supper save-the-date facts (from the fact sheet) | screen | ~30s | same doc | [x] |
| A4 | The draft with a [NEEDS:] marker visible: the document naming what it does not know | screen | ~1min | same doc, later stage | [x] |

Academy stays parked by Becky's 2026-08-04 direction: its product-page slot will carry the avatar-presented Academy lesson video (academy-lessons production) once that ships, checked against the FunderStorm model.

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
