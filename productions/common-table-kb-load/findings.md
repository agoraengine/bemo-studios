# Findings: Common Table KB Load

Raised while deriving `demo-org/common-table/fact-sheet.md` from the published website universe (2026-08-03). Studios raises these; it fixes none of them in the siblings.

## Website findings (for whoever owns the pages)

| Date | Finding | Raised |
|---|---|---|
| 2026-08-03 | **Meridian Fund vs Meridian Trust.** The live site says "Meridian Fund" everywhere (ProductMockup, anchors, labs); the bemo-os reference build (`ga-reference-build.html`, `ga-website-mockup.html`) says "the Meridian Trust application is in review." Same fictional funder, two names. The KB follows the live site (Meridian Fund). | Open |
| 2026-08-03 | **Did Bright Harbor launch the Mobile Pantry or fund it?** Live site (Assembly WikiCard): awarded "$60,000 over two years in July 2025 **to fund** the Mobile Pantry," and the FunderStorm anchor says the pantry is "on pace with last year," implying it predates the award. The reference build says the award "**launched** the Mobile Pantry, which has served 41,600 meals since," while the live spreadsheet fragment says 41,600 is "year to date." The KB reconciles with the live site: routes since 2022, the 2025 award funded the van and the three-site schedule, 41,600 = Jan to Jun 2026. If the reference build copy ever ships, the numbers will contradict the animation. | Open |
| 2026-08-03 | **ProductMockup blends two universes in one frame.** The FunderStorm mock's question is about "our early-childhood policy work" (the Erin / ConversationFrame org) but the results show Bright Harbor, Common Table's funder, chipped "Early childhood · Policy." A visitor who reads closely meets a food pantry whose flagship funder is tagged for a different org's sector. The Common Table KB records Bright Harbor as a food-security and youth funder, so real captures will not match that frame's chips. | Open |
| 2026-08-03 | **The `ask-with-sources` demo question says "gala"; the universe now says it never would.** DEMOS.md and `lib/demos.ts` spec the question as "What did the board decide about the gala budget?", but Common Table's voice guide (a deliberate house fact) insists the Harvest Supper is a community dinner, not a gala. When that demo unblocks, the question should become Supper-phrased ("Where does the Harvest Supper stand this year?" is the phrasing that works in the real product today). | Open |
| 2026-08-03 | **The home page carries two fictional orgs.** ConversationFrame (Erin, Executive Director; early-childhood policy; expansion to OR and WA; Meridian $185K in Nov 2023) is a different organization from Common Table, on the same page as "One week at Common Table." Deliberate or drift? DEMOS.md's rule is "do not invent a second fictional org." | Open |

## Product findings (for Lee)

| Date | Finding | Raised |
|---|---|---|
| 2026-08-03 | **Narrow "what did the board decide about X" questions do not trigger KB retrieval.** Asked "What did the board decide about the gala budget?" and "What did the board decide in March about the Harvest Supper budget?": the chat answered "I don't have access to your board minutes" without consulting the KB, even though the Harvest Supper item holds the budget facts. Broad questions (the board-member catch-up) and status phrasings ("Where does the Harvest Supper stand this year?") retrieve correctly, the latter with a visible "Let me check your knowledge base" beat. Looks like question classification gates the KB tool. Matters directly for the website's `ask-with-sources` demo, which is specced as exactly this kind of narrow factual question. | Open |
| 2026-08-03 | **Board-minutes decisions did not survive extraction.** The March 2026 minutes upload committed cleanly, but the KB items carry the event facts (date, budget, venue) and not the resolutions (the concentration objective wording, the deferral reasoning). The app itself said "specific board sign-off details... not captured." Decisions may deserve their own extraction target; for now, demo-org practice is to repeat load-bearing decisions in multiple upload docs (the strategic-priorities doc carries the concentration objective too). | Open |
| 2026-08-03 | **No clickable source chips in chat answers.** Both good takes answer from the KB but render no source chips to click. DEMOS.md's own constraint applies: the `ask-with-sources` demo waits until sources are clickable in the product. | Open (site demo waits) |
| 2026-08-03 | **App sessions expire after roughly an hour**, which forced two mid-pipeline re-logins today. Any capture session longer than an hour needs a human sign-in in the middle, which is a real constraint for captures Becky runs solo. A longer-lived session or a "remember me" that sticks would remove it. | Open |

## Demo-org findings (this repo, deliberately not fixed)

| Date | Finding | Status |
|---|---|---|
| 2026-08-03 | **Whitfield appears in both demo universes.** Elena Whitfield (Meridian's program officer, published by the site) and Rev. James Whitfield (Wrenfield board). Wrenfield's board is already loaded in the app and on the Aug 3 footage, so renaming now would desync the fact sheet from captured reality. If Wrenfield's KB is ever reloaded fresh, rename the reverend then. | Deferred |
| 2026-08-03 | **Dana / Marcus / Priya first names are shared across Wrenfield and Common Table** (Wrenfield reused the site's first names when it was built). Same deferral logic; the new `demo-org/README.md` rule prevents this going forward. | Deferred |
