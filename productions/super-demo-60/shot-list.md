# Shot List: Super Demo 60

**Capture state:** COMPLETE (selects from existing footage; two cards to render)
**Last run:** 2026-08-03 (footage captured in `../wrenfield-kb-load/`)
**Build captured against:** live app.bemointel.ai, Wrenfield fictitious demo org, 1920x1080

Source timecodes come from the capture action logs (`../wrenfield-kb-load/capture/out/actions.json` and `ask-actions.json`). Run 1 = `wrenfield-kb-load-doc01.mp4`, run 2 = `wrenfield-kb-load-docs02-13.mp4`, ask = `wrenfield-ask-board-member.mp4`.

| ID | What is on screen | Type | Duration | App path / source | Captured |
|---|---|---|---|---|---|
| D1 | Title card, then empty KB with the demo-org chip overlaid | title + screen | 0:07 | Card rendered from `capture/cards.html`; empty KB from run 2 t 0-7s | [x] footage, [ ] card |
| D2 | Import dialog, file chosen, Upload, extracting spinner | screen | 0:09 | Run 1 t 7-24s (import start to facts found), mild speed-up on the spinner | [x] |
| D3 | Review panel: facts found, confidence, citations, approve, commit | screen | 0:10 | Run 2 t 30.7-37.5s (annual report review, richest facts); hold on two fact cards before approve | [x] |
| D4 | KB table filling, timelapse to the full Wrenfield KB | screen | 0:08 | Run 2, the between-import table returns (t 37-270s) at 10-14x, ending on `kb-final.png` state | [x] |
| D5 | New chat, question typed at human speed, sent | screen | 0:08 | Ask t 13.6-23s; keep real typing, trim the middle if needed | [x] |
| D6 | Answer streaming; slow scroll over team, gala numbers, read-first list | screen | 0:11 | Ask t 23-50s at 2.5-3x with a hold on the final answer | [x] |
| D7 | Disclosure card, then brand close (wordmark, tagline, URL) | title | 0:07 | Rendered from `capture/cards.html` (series close style, Geist + serif, sapphire) | [ ] |

Speed-ups are visible-time compression, never hidden cuts; UI text untouched per standards.

## Capture notes

- Seeded demo org used: The Wrenfield Alliance (fictitious; `demo-org/wrenfield/fact-sheet.md` is the source of truth)
- Anything that had to be redacted: nothing; sidebar shows only generic chat titles, verified frame-checked
- Shots that needed more than one take, and why: run 1 stalled after doc 01 (modal close handling, fixed); run 2 completed clean

## Findings

UI problems noticed during capture. These go to Lee as product findings, not fixed in the edit.

- The import success state requires a manual Close before the next import; a "import another" affordance would smooth repeated seeding (minor UX note for Lee).
