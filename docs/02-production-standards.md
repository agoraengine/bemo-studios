# Production Standards

Specs every production meets. These are checkable, which is the point: the assemble gate is a pass over this file.

## Length

| Video type | Target | Hard ceiling |
|---|---|---|
| Sizzle reel | 60-75 seconds | 90 |
| Core video set (the six) | 60-90 seconds | 120 |
| Product feature video | 30 seconds | 45 |
| Product feature cutdown | 15 seconds | 20 |
| Workflow capture (multi-feature) | 45-90 seconds | 120 |
| Founder POV | 60-120 seconds | 180 |
| Vertical cutdown | 30-45 seconds | 60 |
| Academy lesson | 4-6 minutes | 8 minutes |

The narrative arc set the 60-90 second range for the core videos and it holds. Anything running long is usually trying to do two videos' work.

The product feature row is Becky's ruling (2026-08-10, from the press-release 30s cutdown): a single product feature gets 30 seconds, in the motion-cut grammar, over the series' 30-second upbeat bed. Four beats: the problem named, the feature doing its work on real capture, the payoff, the standing close. The 30s bed is the one exception to the calm-bed default below; it is the series' own approved track, not stock hype, and it still carries no drop. **Beds updated (Becky, 2026-08-16, from the August 15 audition): the feature slate's 30-second parents ride bed P2 (confident) and the 15-second cores ride bed P1 (saas demo), both in `productions/li-product-feature-reels/capture/out/music/`; bed A and the press-release bed are superseded for new feature renders.**

The product feature cutdown row is Becky's ruling (2026-08-11, adopting advisor guidance on LinkedIn product and feature reels): 15 seconds is a cutdown tier of the 30-second feature video, never a separate format. Every feature reel is scripted at 30 with a marked 15-second core, so one capture yields both. The cutdown carries no VO: captions and on-screen text with the music bed only, which the muted-first discipline already supports. Three beats survive the cut: the problem named, the feature doing its work, the brand close. Not every reel gets a cutdown; the 15 exists for the reels that earn one. ~~Whether the no-VO treatment extends to the 30-second parents of this slate is an open question on the li-product-feature-reels brief, not yet a standard.~~ **Closed (Becky, 2026-08-16): the 30-second parents stay music-only too; the voiced builds remain a separate variant, not the format. Same ruling, posting shape: the 15-second cutdown is the LinkedIn feed asset and the 30-second parent posts to YouTube. Second ruling the same day: quote cards leave the feature reels entirely. The reels run on the demo organization, and a real tester's words sharing a reel with demo footage blurs prop and proof; the parents are behavior-only (landing near the slate's 24-second shape) and proof lives in post copy, anchors, and stills.**

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

**The reference mix chain (ratified by Becky, August 9, 2026, with the hero vH18 final).** New renders use the chain in `productions/linkedin-sizzle-series/capture/run-hero.mjs`, not the older dynaudnorm pipelines, so every track sounds like one recording:

- Per-segment gains match **speech-median momentary loudness** (ebur128 frames within 12 LU of the segment's own peak), never whole-file integrated loudness, which silence padding skews. A second measurement pass trims each segment through the shared bus chain until the post-chain medians agree (the reel 8H bar: within ~0.1 LU).
- The VO bus is one uniform chain for every segment: highpass 75 Hz, one compressor (threshold 0.05, ratio 2, attack 6 ms, release 150 ms), a +2.5 dB low shelf at 220 Hz after the compressor (restores the body compression shaves; vH13's frame-leveler used to add it by accident), and a true-peak-safe limiter. **No dynaudnorm**: per-frame leveling boosts each segment's breaths and noise floor by different amounts, which reads as spliced-together recordings.
- The master is a **probe-measured fixed gain** plus limiter to the delivery target, never dynamic loudnorm, whose time-varying gain drifts upward after quiet passages and silently reshapes scored music moves.
- Score the music envelope explicitly (lifts, ducks, swells written into the volume expression); never let mastering create them. Keep the swell off the spoken close: the voice rides clear of the bed, and the swell lands after the last word.
- The close line is the fresh Avatar V read `out/vo/becky/hgh-l8.wav` ("BeMo. Where missions gain momentum.", tilt matched to the track); the reel 1 `hg-r1-l8` splice is archive, its second sentence measures 4 LU thin.

The appcut and v2cut pipelines still carry the old chain and adopt this one before any re-render (logged in the linkedin-sizzle-series findings).

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

## Voiced cuts (added August 15, 2026, from the Amplify VO build)

Voice-first mixing is the standard for any cut with narration: the voice is the master track, the bed sidechain-ducks under speech, no dynamic loudness normalization anywhere in the chain, static measured gains to the -16 LUFS house target. Speech is never trimmed; placements derive from measured read lengths and the mixer of record (`productions/li-product-feature-reels/capture/mix-vo2.mjs`) refuses to render overlapping or overrunning lines. Beds run at native length only. QA is visual: a rendered waveform reviewed end to end plus a speech-over-bed differential of at least 10dB, before anything goes to review. Quotes on screen are read in silence; narration introduces them but never speaks another person's first-person words.
