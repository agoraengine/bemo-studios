# Findings: Website Demo Slot Clips

Raised 2026-08-03 while producing clips for the six DemoSlot placements in bemo-website. Studios raises these; it fixes none of them in the siblings.

## Product findings (for Lee)

| Date | Finding | Raised |
|---|---|---|
| 2026-08-03 | **Pre-wipe collected facts survive in old documents.** The in-flight Grant Progress Report (doc_UicwqbWIPUYRzMlo, created before the 8/3 KB wipe) carries "Organization Name: Caigh It Forward" in its Collected Facts even though the KB now says Common Table. Old in-flight documents on Home also include a real Caigh It Forward board agenda with a real chair name. Consequence for capture: Home and any pre-wipe document are permanently un-filmable in the Common Table universe; every take starts a fresh document. A per-document provenance display or a workspace reset that also clears in-flight docs would remove the trap. | Open |
| 2026-08-03 | **The Grant Progress Report template finds only one KB item** ("Organization name") at the Choose-KB-inputs step, although the loaded KB holds the funder relationship, program profiles, and Harvest Supper items. The template's declared KB keys appear narrow, so "your next cycle starts where the last one ended" currently depends on the interview rather than on retrieval, and the interview re-collects facts the KB already holds (award amount, sites, meal counts). | Open |
| 2026-08-03 | **Session expiry (~1h) confirmed again**: expired mid-dry-run. Same finding as common-table-kb-load 2026-08-03. | Open (repeat) |
| 2026-08-03 | **The KB table's Owner column shows the real account name** ("Becky Kern") with no way to display a persona for a demo workspace. Blocks any KB-table frame in Common Table footage. A workspace display name, or hiding Owner for Personal scope, would unblock it. | Open |
| 2026-08-03 | **Product copy uses em dashes** in chat answers ("gala budget decision — nothing in..."). Not Studios's to fix; noting because on-camera product text is also brand surface. | Open |
| 2026-08-03 | **The Grant Progress Report flow does not auto-advance into drafting.** After all required fields are collected and the app is told "Yes, continue," it locks the brief and asks the user to click a "Continue to Research" button rather than proceeding on its own. The captured `funderstorm-cycle` clip therefore ends on the locked recap, not an actual document draft; there was no further stage to film without a second manual click and an unknown additional wait. | Open |

## Website findings (for whoever owns DEMOS.md / lib/demos.ts)

| Date | Finding | Raised |
|---|---|---|
| 2026-08-03 | **Four of the six demo specs describe product that does not exist yet.** `ask-with-sources` (no clickable source chips; the spec's own wait-condition triggers), `cross-app-handoff` (no handoff affordance between apps), `academy-in-flow` (Academy is a course library today; the spec says a library on screen is failure), and `knows-whats-missing` as specced (no wiki-style funder page with a "Not yet known. Add it." frontier; that surface is the two-surfaces build). The captured `knows-whats-missing` clip therefore shows the behavior in its real current form: chat checks the KB, answers what it holds, names what it lacks, and offers to record it. If that variant is not acceptable, the slot should wait for two-surfaces instead. | Open |
| 2026-08-03 | **`funderstorm-cycle`'s third beat ("the funder page gaining a history entry") has no capturable surface**: there are no funder pages in the current KB. The clip ends on the locked recap with collected facts instead (see the matching product finding on manual advancement). | Open |
| 2026-08-03 | **`first-run` is gated on operations, not just product**: it needs a genuinely empty org, and the only path today is wiping the loaded standing universe and reloading it afterwards (a staged session with a mid-run human re-login, per the session-expiry finding). A scratch org or org reset would make this clip cheap. Whether one typed sentence creates visibly-sourced KB entries (the spec's core beat) is untested. | Open |

## Demo-org findings (this repo)

| Date | Finding | Status |
|---|---|---|
| 2026-08-03 | Fact-sheet extension recorded for the interview: year-one Bright Harbor spending "on budget" against the $30,000 year-one allocation, refrigerated van as largest line item; year-two intent phrased as recruiting the paid driver to launch the deferred second Saturday site. Added to `demo-org/common-table/fact-sheet.md`. | Done |
