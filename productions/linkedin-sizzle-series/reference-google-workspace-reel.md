# Reference: Google Workspace "Work faster with Gemini" reel

**Status:** Reference analysis, 2026-08-12. Becky flagged this as a reel to model after.
**Source:** [LinkedIn post by Google Workspace](https://www.linkedin.com/posts/googleworkspace_work-faster-with-gemini-activity-7432419532884844544-ERwU), posted ~March 2026, 105 reactions.
**Format facts** (from the video file itself): 15.0 seconds, 720x720 square (1:1), 30fps, burned-in captions. Google's internal filename labels it a direct-response, suite-level cut ("GEM-Suite-Level-DR ... 15s_With_Sub_1x1"). Analyzed from extracted frames; the video file stays out of git per the media rule.

**Post copy:** "Get efficient and empower your team with Gemini. Get easy-to-use AI in Workspace apps like NotebookLM, Meet, and Drive." (Note: "empower" is on our banned list. The structure is worth noting, the voice is not.)

## Shot-by-shot

Seven beats in 15 seconds, roughly 2 seconds each. White background throughout, everything center-composed, a small gray "Google Workspace" watermark top-left in every frame, and a gray caption pill bottom-center mirroring the VO.

| Time | Beat | On screen | Caption |
|---|---|---|---|
| 0:00 | Brand bumper | "Google Workspace with Gemini" lockup on white | (none) |
| 0:01 | Icon constellation | Nine app icons (Gmail, Drive, Docs, Sheets, Slides, Meet, Chat, Calendar, NotebookLM) orbiting the Gemini spark | (none) |
| 0:02 | Promise card | "Skip the busywork" in large type; "the" flashes yellow, then "busywork" flashes green, word by word | Skip the busywork |
| 0:04 | Vignette 1: Meet | A dark rounded card standing in for a meeting window, Meet icon plus Gemini pencil badge above it, "Delegate note-taking with Gemini" inside, an animated pen drawing a scribble line | Delegate note-taking with Gemini in Meet |
| 0:06 | Vignette 2: NotebookLM | Small NotebookLM logo as a label, "Find insights faster" headline, greeked gray text lines that fill with a blue gradient highlight (insight-finding, abstracted) | or find insights faster with NotebookLM |
| 0:09 | Suite promise | Inside a greeked gray document, the words "Our AI / helps you / focus / on the / work that matters most" drop in cluster by cluster between the gray lines | Our AI helps you focus on the work that matters most |
| 0:11 | Tagline | "Make work easier" large type; "work" flashes yellow | Get AI that makes work easier with Google Workspace |
| 0:13 | End card | "Google Workspace with Gemini" lockup plus "Get started" CTA | Get AI that makes work easier with Google Workspace |

## The grammar worth taking

1. **One idea per beat, one line per beat.** Never two thoughts on screen at once. Seven beats, seven lines, each readable in under two seconds. Our 30-second reels have twice the room, but the discipline transfers: every beat is one line plus one motion, nothing else.
2. **Sound-off first, literally.** The captions are a near-verbatim mirror of the on-screen type; the VO adds only connective tissue ("or find insights faster..."). The video argues entirely in type, which is our brief's muted-autoplay constraint executed all the way down.
3. **Verb-first benefit lines.** Skip, Delegate, Find, Focus, Make. No feature nouns in the headlines. The app name appears only as a small logo-plus-wordmark label above the benefit line: attribution, not subject.
4. **Word-level accent color as the emphasis system.** A single word flashes to an accent color on the beat ("the" yellow, "busywork" green, "work" yellow). Cheap to build in our HTML scene system, and it gives the type cards a pulse without adding motion the website register would not allow. One accent per reel still holds; the flash uses the reel's accent.
5. **The vignette card.** Each app gets one abstract card: label on top, benefit line, one small looping animation (the pen scribble, the blue highlight fill). This maps cleanly onto our screenshot house-frame: same object, ours filled with real product instead of abstraction.
6. **Brand bookends and a persistent watermark.** Lockup open, lockup-plus-CTA close, tiny wordmark in the corner throughout so any shared clip stays attributed. We already standardized the brand close; the corner wordmark is worth considering for the series.

## Where it conflicts with our rules (do not copy)

- **It opens on brand, not problem.** Beats 1 and 2 are lockup and icon parade before any promise. That breaks hard rule 2 (problem first, product second) and the Aug 10 ruling that opens name the work. We keep our problem-first open; what we borrow is the economy of everything after their open.
- **It abstracts the product.** The "meeting window" is a black rounded rectangle; the "document" is gray pills. Google can afford that because everyone already knows their apps; nobody knows BeMo's. And hard rule 4 means our product beats are real capture in the one 16:10 window. Abstraction stays permitted only for problem scenes, as the treatment already codes.
- **1:1 square.** Becky retired verticals and ratified 16:9-only on Aug 3. Noted, not adopted.
- **15 seconds.** Their cut is a paid-placement length. Our ratified length is 30 seconds, which is what lets us keep the problem-first open and still land two proof beats.

## Net effect on the series

Nothing in the ratified brief changes. The treatment's three-ingredient grammar already matches this reel's shape (type cards carrying the argument, one accent, calm motion). The concrete adoptions to try in the next render: word-level accent flashes on the type cards, verb-first headline discipline in beat lines, app-label-above-benefit-line composition for product beats, and tighter per-beat economy (one line, one motion, cut).

**Audition rendered 2026-08-12:** reel 1, 30s, tag v14 (`capture/out/bemo-linkedin-sizzle-series-r1-30s-v14.mp4`), for A/B against v13. It carries the two adoptions that fit reel 1 without touching the locked VO timing: accent flashes timed to the spoken word (zero, knowledge, never, One, all in the reel's green) and the persistent corner wordmark, faded out before the brand close. Verb-first beat lines and label-above-benefit wait for reel 2 scripting, and tighter beat economy needs a VO re-time, so neither is in this audition. The template changes sit in `capture/source-template.html` and re-render the 60s cut the same way if wanted; if Becky passes on the variant, revert the template and run.mjs with git.
