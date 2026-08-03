# Demo org: The Wrenfield Alliance

A complete fictitious organization for loading the BeMo Knowledge Base before demo capture. Built from the August 3, 2026 founders call decision: populate the KB with a fictitious org rather than live organization data, so Super Demo and Fable captures show completed work.

**Everything in this folder is invented.** The organization, people, funders, and numbers are fiction written to fit BeMo's ICP (a small nonprofit with a lean team, active grant-seeking, real execution pressure, per `../../bemo-os/docs/organization/08-target-market-and-personas.md`). It exists so the product can be shown working on realistic content. It is never a customer, never proof, and never appears in anything that presents it as a real organization.

## What is in this folder

| Path | What it is | Upload? |
|---|---|---|
| `fact-sheet.md` | Master source of truth for every name and number | **No.** Internal only |
| `upload/01` to `13` | The documents that get loaded into the Knowledge Base | Yes, in order |

The upload set is written to feed the KB's eight trunks (identity, strategy, programs, funding, communications, people, operations, learnings, per `../../bemo-os/docs/product/knowledge-base-canon.md`) and should yield the 30 to 50 confirmed items Lee suggested on the call.

## The one rule

**`fact-sheet.md` is the single source of truth.** Every number and proper noun in every upload document must trace to it. To change or add a fact: edit the fact sheet first, then update the documents that mention it. Never let a document invent a number the sheet does not have; that is how a demo org drifts into contradicting itself on screen.

## The workflow

### Step 0: prerequisites

- Super Demo subscription reactivated (Becky's action item from the call).
- Logged into the BeMo app with the profile you will demo from.
- These documents ready as files the app can ingest. They are markdown; if the uploader wants PDF or docx, convert with `pandoc upload/02-annual-report-fy2025.md -o annual-report.pdf` (repeat per file, or ask Claude to batch it).

### Step 1: reset the Knowledge Base

Per Lee on the call: use your existing profile and delete all existing knowledge base items, so the fictitious org is the only thing the KB believes. Do this in the app before loading anything.

### Step 2: adjust the fiction (optional, careful)

If you want a different sector, name, or numbers, that is fine, but two guardrails:

1. **Collision check.** Before adding any new proper noun (org, funder, person, town), web-search it. On 2026-08-03 these names were verified clean: Wrenfield, The Wrenfield Alliance, Copperline Foundation, Prairie Light Foundation, Hartwell Regional Bank. A fictitious funder that turns out to be a real foundation is the failure that cannot be walked back after a video ships.
2. **Stay clear of cleared names.** Nothing in the demo org may resemble the real cleared customers in `../../bemo-os/docs/customer-stories/` (Meg Poe / Autoimmune Encephalitis Alliance, Jennifer Allen / Saratoga Springs Public Library). Different sector, different geography, different names. That separation is deliberate: fictitious demo content and real cleared proof must never blur.

To regenerate or extend documents, prompt Claude with:

> Read `demo-org/fact-sheet.md`. Draft [document] for The Wrenfield Alliance consistent with every fact on that sheet. Fictitious names only; web-search any new proper noun for collisions and add it to the fact sheet. No em dashes anywhere. Avoid the banned AI-tell words in `../bemo-os/CLAUDE.md`. Write like a sharp nonprofit staffer, not a brochure.

### Step 3: load the documents, in order

Upload one at a time and confirm the extracted items as they appear (the KB is human-vetted; nothing counts until you confirm it). The order matters: identity first so later extractions land in a shaped tree.

| Order | Document | KB trunks it feeds |
|---|---|---|
| 01 | Mission, vision, values | identity |
| 02 | Annual report FY2025 | identity, programs, funding, people, learnings |
| 03 | ED bio | people |
| 04 | Board of directors | people |
| 05 | Staff roster | people, operations |
| 06 | After the Bell program profile | programs |
| 07 | Pantry Route program profile | programs |
| 08 | Home Base program profile | programs |
| 09 | Strategic plan 2025 to 2027 | strategy |
| 10 | Funder relationships | funding |
| 11 | Gala and events | funding, communications |
| 12 | Press release (May 2026) | communications, programs |
| 13 | Boilerplate and voice guide | communications, identity |

### Step 4: fill the gaps in chat

After loading, the app will surface what it still expects (empty slots on the trellis). Answer those prompts in the shell chat, **from the fact sheet only**. If the app asks for something the sheet does not cover, invent it on the sheet first, then answer. This step is worth capturing on video: it demonstrates the frontier behavior Lee described.

### Step 5: verify before capture

- Spot-check ten confirmed items against `fact-sheet.md`. Any contradiction: fix the KB item, then check whether an upload doc caused it.
- Search the KB for any real-world name that should not be there (Meg, Poe, AEA, Jennifer, Allen, Saratoga).
- Count items. Target: 30 to 50 confirmed.

### Step 6: capture

Screenshot stability, per Lee on the call: **document editor shots are stable; Knowledge Base shots age quickly** while KB 2.0 and the homepage are in flight. So capture document-editor and chat footage freely, and treat KB-view shots as disposable (recapture them last, closest to the edit). Video capture runs through the `capture-run` skill as usual; the demo production folder owns its shot list.

## Boundaries (why this lives here and what it must never do)

- This is production fixture data, not knowledge. Nothing here says anything true about BeMo; it is a prop the product acts on. That keeps it on the right side of the Studios/bemo-os boundary.
- Hard rules 3 and 4 still govern every video that uses this org: the capture is the **real app** doing real work on fictitious content, which is allowed; presenting Wrenfield as a customer, a result, or proof is not. If a script implies Wrenfield is real, the script gets rewritten.
- No media in git. Captures and exports go to Drive; the production's `assets.md` holds the links.
