# Demo org: Common Table Food Pantry

The fictitious organization the public website already lives in, made loadable as a BeMo Knowledge Base. The site's assembly animation, app anchors, and demo briefs (`bemo-website/DEMOS.md`, `lib/demos.ts`) all show Common Table on screen; loading the same universe into the real app means captured footage and the site's composed animations tell one story with the same names and numbers. That is the point: the marketing visual and the product visual stay the same thing.

**Everything in this folder is invented.** Common Table is never a customer, never proof, and never presented as real. Hard rules 3 and 4 govern every capture that uses it: the real app doing real work on fictitious content is allowed; implying the org is real is not.

## How this org differs from Wrenfield

Wrenfield's fact sheet is self-contained fiction. Common Table's is **derived**: the website publishes part of this universe already, so `fact-sheet.md` marks which facts are **[published]** on the site or in the bemo-os reference mockups. Those facts are upstream: this sheet extends them, never contradicts them, and follows them when the site changes. Before any capture that will sit next to site copy, re-read the site surfaces the footage overlaps (the same rule Studios already applies to canon).

## What is in this folder

| Path | What it is | Upload? |
|---|---|---|
| `fact-sheet.md` | Master source of truth; [published] tags mark site-anchored facts | **No.** Internal only |
| `upload/01` to `13` | The documents that get loaded into the Knowledge Base | Yes, in order |

## The workflow

Same as Wrenfield's (see `../wrenfield/README.md` for the full step-by-step): reset or isolate the KB, load `upload/` in order, confirm extracted items as they appear, answer the app's frontier prompts **from the fact sheet only**, then verify before capture. The automated load lives in `productions/common-table-kb-load/capture/run.mjs`.

Load order and the trunks each document feeds:

| Order | Document | KB trunks |
|---|---|---|
| 01 | Mission, vision, values | identity |
| 02 | FY2025 year in review | identity, programs, funding, learnings |
| 03 | ED bio (Dana Merritt) | people |
| 04 | Board of directors | people |
| 05 | Staff and volunteers | people, operations |
| 06 | Mobile Pantry program profile | programs |
| 07 | Teen Kitchen program profile | programs |
| 08 | Board minutes, March 2026 | strategy, funding, operations |
| 09 | Strategic priorities 2026 to 2027 | strategy |
| 10 | Funder relationships | funding |
| 11 | Harvest Supper | funding, communications |
| 12 | Press release, July 2026 (Teen Kitchen graduation) | communications, programs |
| 13 | Boilerplate and voice guide | communications, identity |

## Verify before capture (Common Table specifics)

On top of Wrenfield's step 5 checks:

- The KB's answers must match what the site shows on screen. Spot-check the load against the published anchors: $60,000 over two years (Jul 2025), renewal report due Aug 15, 41,600 meals year to date at Q2 2026, roughly forty families each Saturday in Lincoln Park, June giving $18,240 from 34 donors, "by the end of 2027, no single funder over half of revenue."
- Search the KB for Wrenfield leakage before capture: Wrenfield, Kessler, Whitaker, Copperline, Prairie Light, Hartwell. None should exist.
- Search for real cleared names as always: Meg, Poe, AEA, Jennifer, Allen, Saratoga.
