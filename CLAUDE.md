# BeMo Studios

BeMo's video production system. This repo holds the machinery that turns BeMo's canon into finished video: briefs, scripts, shot lists, capture automation, and pointers to the media files.

**This repo is tooling, not knowledge.** Nothing here is a source of truth about what BeMo is, what it claims, or how it sounds. All of that lives in `bemo-os` and is read from there. If you find yourself writing a positioning statement in this repo, stop: it belongs in bemo-os, and this repo should be quoting it.

## The Boundary (read this before adding anything)

| Lives where | What |
|---|---|
| **bemo-os** | Positioning, voice, claims, permissions, the narrative arc, the message map, what a video is *for* |
| **bemo-website** | The live public copy and design system the video stays consistent with, and a capturable surface |
| **BeMo Studios** (here) | Briefs, scripts, shot lists, capture scripts, production standards, asset manifests |
| **Google Drive** | Every media file: raw captures, VO audio, edited cuts, exports, thumbnails |
| **BeMo (the product)** | Eventually: content workflow state, per `bemo-os/docs/initiatives/dogfooding/05-narrative-arc-system.md` |

The Drive boundary is inherited from the dogfooding spec: finished graphics and edited video are work products, not knowledge. **No media files in git.** `assets.md` in each production holds Drive links and nothing else.

The BeMo row matters. Studios is deliberately scoped to video production so it does not become a second system of record for content state. When the Plan milestone lands and content weeks move in-product, Studios still owns capture and render; it does not own status.

## Sibling repos

Studios reads from two sibling repos and writes to neither. All three are checked out side by side:

```
Repositories/
├── bemo-os/          github.com/agoraengine/bemo-os       canon and permissions
├── bemo-website/     github.com/agoraengine/bemo-website  the public surface
└── bemo-studios/     this repo
```

Read with relative paths. Never copy from either repo into this one: quote it, cite the path, and re-read it each time, because both change.

### bemo-os: canon and permissions

The source of truth for what BeMo is, what it claims, how it sounds, and who has cleared their name. Read before writing any script. The specific files are listed below.

Permission status is the part most likely to be stale in your head. Always re-read `../bemo-os/docs/customer-stories/00-overview.md` at script time rather than trusting a previous session, because clearances change and using someone's name on last week's understanding is the failure that cannot be undone after a video ships.

### bemo-website: the public surface

Two reasons Studios reads it.

**Consistency.** The website and the video are the same front door, and a stranger who watches the reel and then lands on the site should hear one voice. Before locking a script, read the live copy for the pages the video's message overlaps:

- `../bemo-website/content/` (MDX page copy)
- `../bemo-website/DESIGN.md` (the design system the video's titles and end cards should not contradict)
- `../bemo-website/PRODUCT.md`

The website's in-flight copy direction lives in `../bemo-os/docs/initiatives/website/ga-website-edits-v2.md`. Where the live site and that doc disagree, the doc is where the thinking is and the site is what a viewer will actually see. Name the conflict rather than silently picking one.

**Capture.** The website is capturable today, which the product largely is not. For shots that need the site rather than the app, run against a local build:

```
cd ../bemo-website && npm run dev
```

Capturing a local build means footage never depends on what is deployed, and it can be recaptured against a branch before that branch ships.

### Writing back

Studios does not commit to either repo. Findings go in the production's `findings.md` and get raised: canon findings to bemo-os, site copy inconsistencies to whoever owns the page. If a fix genuinely belongs in bemo-os or bemo-website, say so and let the user make it there.

## Canon to read before writing any script

Always:
- `../bemo-os/docs/internal/initiatives/ga-message-map.md` and `messaging-assets-v1.md` (what every asset must say)
- `../bemo-os/docs/organization/16-voice-and-tone.md` (how BeMo speaks)
- `../bemo-os/docs/organization/18-anti-patterns.md` (how BeMo must never be described)
- `../bemo-os/docs/initiatives/trust-framework/05-claim-map.md` and `09-overclaim-risk.md` (what we may claim)
- `../bemo-os/docs/customer-stories/00-overview.md` (who has cleared their name, and how far the clearance goes)

For a specific production, also:
- `../bemo-os/docs/communications/narrative-arc/04-core-video-set.md` (the six foundation videos and their arc phases)
- `../bemo-os/docs/initiatives/ga-launch/00-overview.md` (which wave the video serves, and Amendment 2 on sizzle)
- `../bemo-website/content/` and `../bemo-website/DESIGN.md` (the surface a viewer lands on after watching)

## Hard rules

These are production rules, not preferences. A script that breaks one gets rewritten, not shipped.

1. **Sizzle is a teaser, never the wow.** Per the July 27 demo doctrine and Amendment 2: BeMo-produced video shows the *shape* of the product and the problem it solves. It does not attempt the personalized wow, because the wow is the prospect's own organization on screen and that only exists live. Send the video to get the meeting, never in place of the meeting.
2. **Problem first, product second.** Never open on a feature. The narrative arc's governing principle applies to video: feel it, name it, see it differently, discover something exists for it.
3. **Only cleared proof.** Customer names, quotes, and numbers appear only if cleared in `../bemo-os/docs/customer-stories/`. Re-read the permission status every time; do not trust a previous session. Blanket approval covers use, not recombination: quotes stay as written, never composited. Permission to name someone is not permission to imply an outcome their record does not support.
4. **Real product only.** Capture the real app, or the real website. No mockups presented as product, no faked data that implies a customer, no roadmap features shown as shipped.
5. **No em dashes.** Anywhere. Scripts, docs, on-screen text. Use a comma, colon, parentheses, or restructure.
6. **No AI tells.** The banned list in `../bemo-os/CLAUDE.md` applies to narration and on-screen copy: delve, crucial, leverage as a verb, comprehensive, robust, seamless, unlock, empower, foster, game-changer, and the rest. Write like a sharp human.
7. **Every claim traces.** If narration asserts something, it maps to a line in the message map or the claim map. If it does not, cut it or get it ratified into bemo-os first.

## Structure

```
docs/            The system: pipeline, boundaries, production standards
templates/       Blank brief, script, shot list, asset manifest
productions/     One folder per video. This is where the work happens.
capture/         Playwright capture helpers shared across productions
.claude/skills/  new-production, video-script, capture-run
```

## Working here

Start a video with the `new-production` skill. It scaffolds the folder from `templates/` and writes the brief.

The pipeline is five stages and they are gated in order. Do not skip forward: a script written before the brief is ratified is a script that gets thrown away. See `docs/01-pipeline.md`.

## Who operates this

Becky runs productions. Lee is needed only for capture against local builds and for anything touching the app's data. Write instructions in this repo so Becky can run them without Lee present.
