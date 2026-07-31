---
name: new-production
description: Open a new BeMo Studios video production. Scaffolds productions/<slug>/ from templates and drafts the brief against bemo-os canon. Use when starting any new video, sizzle reel, core video, or demo capture.
---

# New Production

Opens a video production. The output is a scaffolded folder and a drafted brief, nothing more. Scripts do not get written in this skill.

## Steps

### 1. Establish what the video is for

Ask the user, unless they already said:

- What job does this video do? (the job, not the content)
- Which launch wave or arc phase does it serve?
- Who watches it, in what moment?
- Target length?

If they name something already specified in bemo-os (one of the six core videos, the GA sizzle reel), read that spec first and bring it to the conversation instead of asking questions it already answers.

### 2. Read the canon

Required every time:

- `../bemo-os/docs/internal/initiatives/ga-message-map.md`
- `../bemo-os/docs/internal/initiatives/messaging-assets-v1.md`
- `../bemo-os/docs/organization/16-voice-and-tone.md`
- `../bemo-os/docs/organization/18-anti-patterns.md`

Conditional on what the video is:

- Top-of-funnel or sales-facing: `../bemo-os/docs/initiatives/ga-launch/00-overview.md`, especially Amendment 2
- Part of the core set: `../bemo-os/docs/communications/narrative-arc/04-core-video-set.md`
- Onboarding or in-product: `../bemo-os/docs/organization/20-first-user-experience.md`
- Carries proof: `../bemo-os/docs/customer-stories/` and `../bemo-os/docs/initiatives/trust-framework/05-claim-map.md`

### 3. Pick a slug

Short, kebab-case, describes the video not the date. `ga-sizzle-reel`, `orientation`, `before-after`. No version numbers, no dates.

### 4. Scaffold

```
productions/<slug>/
├── brief.md          from templates/brief.md
├── script.md         from templates/script.md
├── shot-list.md      from templates/shot-list.md
├── assets.md         from templates/assets.md
├── findings.md       empty; product and canon findings collected during production
└── capture/          empty until the script exists
```

Copy the templates verbatim, then fill in `brief.md`. Leave `script.md` and `shot-list.md` as untouched templates: writing them now would jump the gate.

### 5. Draft the brief

Fill every section. Two get particular care:

**What it must not say.** This is where doctrine gets enforced per-video. For anything BeMo-produced and top-of-funnel, it includes the Amendment 2 constraint: this video does not attempt the personalized wow, because the wow is the prospect's own organization on screen and that only exists live.

**Proof available.** Go read `../bemo-os/docs/customer-stories/00-overview.md` and the individual story files. Do not work from memory: clearances change, and as of July 31 2026 two of them changed in one day. Record the actual status per person, including how far it goes.

Blanket approval is not a blank cheque. It covers using someone's name and words. It does not cover recombining quotes into something they did not say, and it does not make a person's record say something it does not. Someone whose documented experience was mostly friction is a named user, not a success story, no matter how broad the permission.

### 6. Register it

Add a row to the current productions table in `README.md`.

### 7. Hand back

Tell the user the brief is drafted and awaiting ratification. Name the open questions that need a founder decision. Do not offer to write the script yet: the gate is real, and a script written against an unratified brief gets rewritten.
