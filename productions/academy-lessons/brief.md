# Brief: Academy Lessons (series)

**Status:** DRAFT
**Owner:** Becky
**Target length:** about 5 minutes per lesson (4-6 min, 8 min ceiling; the Academy lesson row in `docs/02-production-standards.md`). The register is a college lesson, not a promo: the viewer listens, reads, and watches. A lesson that genuinely needs more gets its own ceiling decision, not silent overrun.
**Opened:** 2026-08-03

This is a series brief: it is ratified once and governs every lesson video. Per-lesson scripts are approved in batches (see Gating below), not re-briefed.

## What this video series is for

Turn the lessons already built in the app's Academy section into short videos a user can watch instead of, or before, reading. The job: a new user, staff member, or board member who opens Academy leaves able to do the thing the lesson teaches, and associates learning with the flow of their real work. The videos are the lessons made watchable; they invent no new curriculum.

## Where it serves

The Academy product surface. Message map anchor: `../../../bemo-os/docs/internal/initiatives/ga-message-map.md`, Academy row: "Learning embedded in real work. Supports every pillar." Signature line: "Learning that happens inside the work, not beside it."

## Who watches it, and in what context

A signed-in user inside the product (or linked from onboarding), at the moment they need the skill: a new hire in week one, a board member catching up, an ED learning a product area. Not top-of-funnel, not cold LinkedIn. They chose to be here; the video respects that by teaching immediately, not selling.

## What it must say

1. What this lesson teaches and why it matters to the viewer's real work (the lesson's own content is the source; the probe dump at `capture/out/academy/lessons.json` quotes it).
2. Learning happens inside the work, not beside it (message map, Academy row) where the lesson's subject allows it to be shown, not just said.
3. Nothing beyond what the lesson itself asserts. A lesson video's claims trace to the lesson content first, and to the message/claim map for anything about BeMo itself.

## What it must not say

- Nothing that presents the AI presenter as a real person, a BeMo employee, or a named expert. Every lesson carries the on-screen disclosure (treatment.md specifies placement), per the Academy exception in `docs/01-pipeline.md`.
- Nothing testimonial or first-person-experience in the presenter's mouth. The presenter teaches; it never testifies.
- No product claims beyond the claim map. No roadmap features shown or implied as shipped.
- No customer names, quotes, or numbers: nothing is currently cleared for this series (see Proof).
- Sizzle doctrine does not apply here (these viewers are already in the product), but the problem-first rule still shapes each open: the lesson opens on the job to be done, not the feature.

## Series-level decisions (ratified with this brief)

| Decision | Resolution |
|---|---|
| Presenter | **A cast of stock avatars, one per product category** (Becky, 2026-08-04; supersedes the single-generic decision from earlier the same day, which itself superseded the 8/3 twin split). Each category gets its own look and voice, mixing female and male presenters across the cast; a category never changes presenters mid-series. No founder twin. Every seat is a deliberate placeholder until a subject-matter-expert partner clears the consent bar and takes over that category (the marketplace direction; the cast is the marketplace's shape drawn in advance). Governed by the four conditions of the Academy exception in `docs/01-pipeline.md`. Becky's stated preference for a lead seat: the library avatar **Daphne** (group `c1926d821b4d43d6a5f07f2985bb5cd1`), category assigned at ratification. |
| Voice | **Each cast member's own matched voice, and every one must be American English** (Becky, 2026-08-04): no British or other non-US accent. HeyGen's voice metadata does not record accent, so the accent screen happens by ear on the audition renders; set `locale: en-US` where a voice supports it. Not the sizzle clone (`7fa742e991de4771a83eb35b53515833`), which stays reserved for founder/brand narration; Becky's voice never comes out of any cast member. |
| Format | **College-lesson grammar** (Becky, 2026-08-04): the presenter opens full screen for the welcome, then drops to a split screen or a corner bubble while the lesson's text and the app build on screen; the viewer listens, reads, and watches at once. Specified in treatment.md. |
| Gating at scale | **Batch review.** This brief and treatment.md are ratified once. Lesson scripts are written in batches of 3-5 and Becky ratifies a batch at a time; generation, capture, and assembly then run unattended for that batch. The pilot lesson goes through alone first. |
| Cast table | One row per product category, filled at audition: Category / Cast name / avatar_id / voice_id. All _pending the audition round_; Daphne holds Becky's stated preference for one seat. The probe's roster seeding tells us which categories actually have lessons, so the cast is sized to reality, not to the product list. |

## Proof available

Nothing is cleared, and nothing is needed: lessons carry no customer proof by design, so nothing in this series waits on clearances (Becky, 2026-08-04). One canon-hygiene note, logged in `findings.md` and not a gate: the message map's Academy row cites Patti Connolly, who has no entry in `../../../bemo-os/docs/customer-stories/00-overview.md`; that mismatch is bemo-os's to resolve.

| Proof | Source | Permission |
|---|---|---|
| None | | Re-check `customer-stories/00-overview.md` at each batch's script time |

## Success looks like

A user who watches a lesson video does the thing without asking chat how. Lee sees Academy engagement move. Operationally: the pipeline produces a shippable lesson video from a ratified script with no per-lesson human production work beyond the batch review.

## Open questions

- Lesson count and structure: unknown until `node capture/academy-probe.mjs` runs against the live app (needs `node capture/login.mjs` first). The roster is seeded from its output.
- Which lesson pilots first: Becky picks from the seeded roster.
- Who carries each seat: settled by an **audition round** before any pilot. One short sample passage, the same text for every candidate, rendered across the candidate pool: Daphne (Becky's stated preference; the name collision with the marketing intern is acceptable, Becky 2026-08-04), plus female and male candidates (from the library shortlist: Caroline, Annie, Emery; Brandon, Luca, Nico, Bryce). Every candidate must clear the American English accent screen; a voice that reads British is out regardless of look. Becky reviews the finished renders side by side, not descriptions of them, and assigns one presenter per category into the cast table. With no twin to record, nothing long-lead gates the audition: it can run as soon as this brief is ratified. Fallback if any cast member disappoints: that category ships voice-over-screen-capture (drop the avatar track from its lessons' plan.json) or recasts before its batch opens.
- The SME-partner marketplace is direction, not canon. If it starts shaping external claims or partner conversations, it needs ratifying into bemo-os first; logged in `findings.md` as a standing note.
