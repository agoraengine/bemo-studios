# Brief: Website Demo Slot Clips

**Status:** RATIFIED (inherited: the specs are already ratified in `bemo-website/DEMOS.md` and `bemo-website/lib/demos.ts`, checked into the site; Becky directed production 2026-08-03)
**Owner:** Becky
**Target length:** six clips, 10 to 15 seconds each
**Opened:** 2026-08-03

## What this video is for

Fill the six empty DemoSlot placements on the GA website so the site shows the product visibly doing something instead of only arguing. The job per slot is written in `lib/demos.ts` as a `proves:` line; the clip exists to make that one claim visible, not to tour features. Attio is the structural reference: a site where roughly a dozen sections show the product moving.

## Where it serves

Wave 1, the Front Door (`../bemo-os/docs/initiatives/ga-launch/00-overview.md`). The site is the surface every later wave drives traffic to. Spec source: `../bemo-website/DEMOS.md`, briefs in `../bemo-website/lib/demos.ts`, slot component `../bemo-website/components/DemoSlot.tsx`.

## Who watches it, and in what context

A stranger on the website, mid-scroll, probably not pressing play. Autoplay is unreliable, so every clip's poster frame must carry the idea alone. Most viewers watch two seconds; the thing being proved must be legible by second three.

## What it must say

Each clip proves exactly one thing (the `proves:` line in its spec):

1. `first-run` (home): an empty BeMo becomes useful in one sitting, from one sentence a person actually typed.
2. `ask-with-sources` (home): BeMo answers from the organization's own record and shows where every part of the answer came from. `knows-whats-missing` (/platform): the Knowledge Base tells you what it does not know. Traces to "BeMo tells you when it doesn't know" (ratified behavior claim, GA message map 2.3) and the KB row in 3.2.
3. `cross-app-handoff` (/platform): work moves between apps with its grounding intact, nothing retyped. `funderstorm-cycle` (/products/funderstorm): the next grant cycle starts where the last one ended (pillar: Stop Starting Over). `academy-in-flow` (/products/academy): learning happens inside the work, not beside it (product row, message map 3.2).

## What it must not say

- No personalized wow (Amendment 2): these are teaser-shape clips of the product on a fictional org, never a prospect's own organization.
- No speed-ups. Cutting dead time is allowed; playing the product faster than it runs is a performance claim we have not earned. Elapsed time goes on screen at every cut.
- No music, no burned-in captions, no cursor highlighting, no voiceover.
- No number on how long a first conversation takes (removed in the claims sweep); the on-screen elapsed time is the only time statement.
- No real person, organization, or data in any frame. Common Table Food Pantry is the only universe: Dana (ED), Marcus (staff), Bright Harbor Foundation (funder), Sarah Chen (program officer).
- Gaps in the KB render as invitations ("Not yet known. Add it."), never as warnings, red states, or to-do counts.
- No mockups presented as product; the real app only. If a behavior the spec needs is not in the product yet (e.g. clickable sources), that clip waits rather than fakes it.

## Proof available

No customer names, quotes, or numbers appear in any clip. Common Table is fictional and labeled as such by the site. Permissions ledger checked 2026-08-03 (`../bemo-os/docs/customer-stories/00-overview.md`): Jennifer Allen and MaryEllen O'Donohue hold blanket approval, Meg Poe per-use; none are used here. The Maryellen gap-behavior quote appears elsewhere on the site, so `knows-whats-missing` must look like what she described, without quoting her.

| Proof | Source | Permission |
|---|---|---|
| None used | | n/a |

## Success looks like

The six dashed slot boxes on home, /platform, and the two product pages are replaced by real clips with poster frames, each passing its spec's constraints, and the site reads as screenshots + graphics + moving product rather than argument alone.

## Open questions

- `first-run` needs a genuinely empty org and a real first session, and `knows-whats-missing` needs a gap filled live: both write data into the app. Confirm with Lee whether Becky may create/reset a scratch org, or whether Lee stages it.
- `ask-with-sources` is gated on sources being clickable in the real product. If they are not, that slot ships later.
- `academy-in-flow` requires a lesson surfacing against a real document mid-task; confirm the product does this today. If a course library is the only capturable surface, the demo has failed by its own spec and waits.
