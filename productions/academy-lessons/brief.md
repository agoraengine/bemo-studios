# Brief: Academy Lessons (series)

**Status:** DRAFT
**Owner:** Becky
**Target length:** 45-90s per lesson (workflow/feature row in `docs/02-production-standards.md`); a lesson that genuinely needs more gets its own ceiling decision, not silent overrun
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

- Nothing that presents the AI presenter as a recording of Becky. Every lesson carries the on-screen disclosure (treatment.md specifies placement). This is condition 2 of the Academy exception in `docs/01-pipeline.md`.
- Nothing testimonial or first-person-experience in the twin's mouth. The twin teaches; it never testifies (condition 3 of the exception).
- No product claims beyond the claim map. No roadmap features shown or implied as shipped.
- No customer names, quotes, or numbers: nothing is currently cleared for this series (see Proof).
- Sizzle doctrine does not apply here (these viewers are already in the product), but the problem-first rule still shapes each open: the lesson opens on the job to be done, not the feature.

## Series-level decisions (ratified with this brief)

| Decision | Resolution |
|---|---|
| Presenter | **By product area** (Becky, 2026-08-03). Amplify lessons: Becky's digital twin. All other lessons: one generic stock avatar, chosen once for the series, as a deliberate placeholder until subject-matter-expert partners clear the same consent bar and present their own areas (the marketplace direction). Governed by the four conditions of the Academy exception in `docs/01-pipeline.md`: twins only with the person's own consent, the generic avatar is nobody, on-screen AI disclosure in every lesson, teach-never-testify. |
| Voice | **Each presenter's own matched voice.** The twin's voice from twin setup for Amplify; the generic avatar's stock voice elsewhere. Not the sizzle clone (`7fa742e991de4771a83eb35b53515833`), which stays reserved for founder/brand narration; Becky's voice never comes out of the generic presenter. |
| Gating at scale | **Batch review.** This brief and treatment.md are ratified once. Lesson scripts are written in batches of 3-5 and Becky ratifies a batch at a time; generation, capture, and assembly then run unattended for that batch. The pilot lesson goes through alone first. |
| Twin identifiers (Amplify) | avatar_id: _pending twin setup_ / voice_id: _pending twin setup_ (recorded here after the one-time interactive HeyGen consent + digital twin flow) |
| Generic avatar (all other products) | avatar_id: _pending: Becky picks one stock avatar from HeyGen's library, with its matched voice, at pilot time_ / voice_id: _pending_ |

## Proof available

Nothing is cleared. The message map's Academy row cites Patti Connolly ("exactly the kind of on-ramp that nonprofit boards need right now"), but she has no entry in `../../../bemo-os/docs/customer-stories/00-overview.md`, so the quote is unusable until a clearance is recorded there. Logged in `findings.md`. Lessons need no customer proof to do their job.

| Proof | Source | Permission |
|---|---|---|
| None | | Re-check `customer-stories/00-overview.md` at each batch's script time |

## Success looks like

A user who watches a lesson video does the thing without asking chat how. Lee sees Academy engagement move. Operationally: the pipeline produces a shippable lesson video from a ratified script with no per-lesson human production work beyond the batch review.

## Open questions

- Lesson count and structure: unknown until `node capture/academy-probe.mjs` runs against the live app (needs `node capture/login.mjs` first). The roster is seeded from its output.
- Which lesson pilots first: Becky picks from the seeded roster.
- Twin setup scheduling: the HeyGen consent + footage recording is the long-lead item, same as the ga-sizzle voice clone was. It only gates Amplify lessons now; non-Amplify batches can run on the generic avatar first. Fallback if either presenter disappoints: that presenter's lessons ship voice-over-screen-capture (drop the avatar track from each lesson's plan.json).
- Which looks carry the two seats: settled by an **audition round** before any pilot (Becky, 2026-08-03). One short sample passage, the same text for every candidate, rendered across a few variants of her twin (different looks from the twin's avatar group) and a few stock avatars with their matched voices. Becky reviews the finished renders side by side, not descriptions of them, and ratifies one twin look and one generic presenter. The picks land in the decision table above and never vary within the series.
- The SME-partner marketplace is direction, not canon. If it starts shaping external claims or partner conversations, it needs ratifying into bemo-os first; logged in `findings.md` as a standing note.
