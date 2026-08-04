# Production Standards

Specs every production meets. These are checkable, which is the point: the assemble gate is a pass over this file.

## Length

| Video type | Target | Hard ceiling |
|---|---|---|
| Sizzle reel | 60-75 seconds | 90 |
| Core video set (the six) | 60-90 seconds | 120 |
| Workflow or feature capture | 45-90 seconds | 120 |
| Founder POV | 60-120 seconds | 180 |
| Vertical cutdown | 30-45 seconds | 60 |
| Academy lesson | 4-6 minutes | 8 minutes |

The narrative arc set the 60-90 second range for the core videos and it holds. Anything running long is usually trying to do two videos' work.

The Academy lesson row is the deliberate outlier (Becky, August 4, 2026): a lesson is a college-lecture register, watched by a signed-in user who chose it, and it earns the length by changing frame every 20-40 seconds and giving the viewer something to read as well as hear. The series treatment (`productions/academy-lessons/treatment.md`) holds that grammar. A lesson over 8 minutes is two lessons.

## Format and delivery

Every production exports at least the primary. Add variants only when a wave actually needs them.

| Variant | Resolution | Aspect | Use |
|---|---|---|---|
| Primary | 1920x1080 | 16:9 | LinkedIn feed, website, email, sending to a prospect |
| Vertical | 1080x1920 | 9:16 | Reels, TikTok, LinkedIn vertical |
| Square | 1080x1080 | 1:1 | Feed fallback where vertical is wrong |

- H.264, mp4, 30fps.
- Capture at 2560x1440 so the primary has crop and push-in room.
- Target under 200MB for the primary. LinkedIn is happier and so is email.

## Captions

**Burned-in captions on every video, no exceptions.** Most of the audience watches muted, and the sector skews toward people scrolling between meetings.

- Generated from the locked script, never auto-transcribed. The script is the record and auto-transcription introduces errors nobody proofreads.
- Two lines maximum, centered, bottom third, inside the safe area.
- Also ship an `.srt` sidecar. Platforms that accept it index it, which is worth something for discoverability.

## Safe areas

Platform UI covers the edges, and vertical is the worst offender.

- **16:9:** keep text and key UI inside the middle 90%.
- **9:16:** keep everything important inside the middle 80% vertically. The bottom 20% is buried under captions and platform chrome on every vertical platform.
- Never put a critical product detail in a corner. If a shot only works because the viewer reads a corner, reframe or push in.

## On-screen text

- Same voice rules as everything else: no em dashes, no AI tells, no feature-first language.
- Sentence case, not title case.
- One idea per card. Two lines maximum.
- Minimum four seconds on screen, and longer for anything over five words. Read it aloud twice at a relaxed pace; that is the floor.
- Product UI text is never edited in post. If the UI says something wrong, that is a product finding, logged in the production's `findings.md`, not a fix in the edit.

## Audio

- Narration normalized to about -16 LUFS.
- Music bed sits 18-20 dB under narration, and ducks rather than fights.
- No stock music with a drop. The tone is calm, grounded, confident, per the arc's design principles, and a drop reads as hype.
- Two seconds of room at the head and tail. Platforms clip the edges.

## The opening three seconds

The single highest-leverage constraint, so it gets its own section.

- **Never open on a logo.** The logo goes at the end.
- Open on the problem, stated plainly, or on a moment of the work being hard.
- No "introducing." No "meet BeMo." No countdown, no title card.
- The viewer should be able to tell you what the video is about after three seconds, and it should not be "a software company made a video."

## The closing

- One call to action, never two.
- For sizzle sent by Jon or an affiliate: the CTA is a conversation, not a signup. Amendment 2 is explicit that the video opens the door and the live session walks through it.
- For sizzle posted publicly in Wave 2: the CTA is the free tier.
- Logo and URL, held four seconds. That is the whole end card.

## File naming

```
bemo-<production-slug>-<variant>-v<n>.mp4
```

For example `bemo-ga-sizzle-reel-primary-v3.mp4`, `bemo-ga-sizzle-reel-vertical-v3.mp4`.

Version numbers increment on any change that leaves the repo. Never `final`, never `FINAL-v2`, never a date in the filename. The date is in Drive and in the assets manifest.

## The standards check

Before a cut leaves Studios, walk this list:

- [ ] Under the hard ceiling for its type
- [ ] Opens on the problem, not a logo or a feature
- [ ] Captions burned in, generated from the locked script, inside the safe area
- [ ] Every claim traces to the message map or the claim map
- [ ] Only cleared proof, checked per story in `../../bemo-os/docs/customer-stories/`
- [ ] Real product on screen, seeded data, no roadmap features shown as shipped
- [ ] No em dashes and no AI tells in narration or on-screen text
- [ ] One CTA
- [ ] Audio normalized, two seconds of head and tail room
- [ ] Named to the convention, uploaded to Drive, linked in `assets.md`
