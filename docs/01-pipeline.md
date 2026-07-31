# The Pipeline

Five stages, gated in order. Each gate exists because skipping it produces work that gets thrown away.

```
1. BRIEF      what this video is for, who sees it, what it must say
      ↓  gate: Becky ratifies. Nothing below starts first.
2. SCRIPT     narration, on-screen text, beat timings, shot list
      ↓  gate: claim check passes, script read aloud against the clock
3. CAPTURE    scripted run against the real app, recorded
      ↓  gate: footage covers every shot in the list
4. AUDIO      voiceover, music bed
      ↓  gate: VO matches the locked script word for word
5. ASSEMBLE   edit, captions, titles, export
      ↓  gate: standards check in 02-production-standards.md
   → Drive, and a link in the production's assets.md
```

## 1. Brief

One page. What the video is for, which launch wave or arc phase it serves, who watches it and in what context, what it must say, what it must not say, and its length target.

The "must not say" section is not decoration. For the sizzle reel it is the demo doctrine: this video does not attempt the personalized wow.

**Gate:** Becky ratifies the brief. Scripts written against unratified briefs get rewritten.

## 2. Script

Use the `video-script` skill. It reads the brief plus the canon listed in `CLAUDE.md`, then produces `script.md` and `shot-list.md` together, because narration written without knowing what is on screen produces shots nobody can capture.

The script is a two-column document: narration on the left, what is on screen on the right, with a running timecode. The shot list is the right column extracted and ordered for capture, with each shot given an ID that the capture script references.

**Gate, two parts:**
- **Claim check.** Every assertion in the narration traces to the message map or the claim map. Run the `brand-review` skill from bemo-os against the script.
- **Clock check.** Read the narration aloud and time it. Narration runs about 150 words per minute at BeMo's pace, which is deliberately unhurried. A 60-second video is roughly 140 words, not 180. Scripts that only fit when rushed are too long.

## 3. Capture

Scripted browser automation against the real app, recorded to video. This is the stage that most justifies the tooling.

The reason to script capture rather than screen-record by hand: **the run is repeatable.** No fumbled cursor, no mistyped field, no "let me start that again." When the UI changes, re-run the script and get clean footage instead of rebooking a recording session. Given that the app is mid-build, the footage *will* be recaptured, probably more than once.

Each production keeps its capture script at `productions/<slug>/capture/run.mjs`. Shared helpers (viewport setup, cursor smoothing, pacing, redaction) live in `capture/lib/`.

**Practical notes:**

- Capture at 2560x1440 and downscale on export. Capturing at delivery resolution leaves no room to crop or push in.
- Pace deliberately. Real UI moves faster than a viewer can read. `capture/lib/pacing.mjs` holds the standard dwell times.
- Use seeded demo data, never a real customer's workspace. Rule 4 in `CLAUDE.md`, and the honest reason: a real org's data on screen is a permission problem waiting to happen.
- Capture more than the shot list asks for. Extra b-roll of the same flow costs one extra run and saves a reshoot.

**Gate:** every shot ID in the shot list has usable footage. Check it off in the shot list itself.

## 4. Audio

Voiceover through the HeyGen MCP, or recorded by a founder if the video is founder POV.

The choice is not automatic. Synthetic VO is right for the sizzle reel and the workflow videos, where the voice is the product's, not a person's. Founder POV videos are recorded by the founder, because a synthetic Becky introducing herself fails the trust framework badly.

**Gate:** VO matches the locked script word for word. If the VO reads better with a change, change the script first and regenerate. The script is the record.

## 5. Assemble

The thinnest tooling. There is no good first-party MCP for timeline editing, and there probably should not be. Assembly is a human job in a normal editor, and it is fast once the pieces are right.

`capture/lib/` holds ffmpeg helpers for the mechanical parts: concatenating takes, burning captions from the script, normalizing audio levels, exporting the delivery variants in `02-production-standards.md`.

**Gate:** the standards check. Then export, upload to Drive, and record the links in `assets.md`.

---

## Tooling

Declared in `.mcp.json`. Approve on first run.

### Playwright MCP (capture)

Browser automation with video recording. Drives the real app through a scripted path and records it.

Configured as the official `@playwright/mcp`. Video recording tools were added to the official server; if the version you get does not expose them, the fallback is the community `@playwright/record-mcp`, which provides `browser_record_start` and `browser_record_stop` with mp4 or webm output. Verify which you have before writing a capture script, because the tool names differ.

Free. Runs locally.

### HeyGen MCP (voiceover)

Official remote server at `https://mcp.heygen.com/mcp/v1/`. OAuth, no API key, and it bills against the HeyGen plan Becky already has rather than adding a vendor.

**One-time setup, and it has to be done interactively.** The OAuth flow cannot run in a headless session. Add the connector, sign in to HeyGen, approve access. After that it just works.

**Use the voice side, not the avatar side.** HeyGen's headline product is talking-head avatars, and that is the wrong tool for these videos, for two reasons:

1. **It fights the footage.** These are screen-capture videos. An avatar in the corner competes with the product for attention, and the product is the point.
2. **It is a trust problem.** BeMo's entire positioning is trust-first. A synthetic avatar of a real founder, presented as that founder, is exactly the kind of thing that costs more than it gains if anyone notices. A synthetic *voice* reading product narration is unremarkable; a synthetic *person* is not. If a video needs a founder on camera, the founder gets on camera.

ElevenLabs is the fallback if HeyGen's voice quality does not hold up under a full read. It has an official MCP and a 10k credit free tier. Do not add it unless HeyGen actually fails, per the standing rule that paid tools get added when the work requires them, not in advance.

### Canva MCP (titles, end cards, thumbnails)

Already configured in the bemo-os workflow for carousels. Same server, used here for branded frames rather than a whole design pass. Not declared in `.mcp.json` because the existing configuration is user-level; if it is missing, configure it the way it was set up for the carousel workflow.

### What is deliberately not tooled

Timeline editing, music selection, and final color. These are judgment calls that go faster by hand than by prompt, and automating them would produce video that looks automated.
