# BeMo Studios

BeMo's video production system.

It turns the canon in `bemo-os` into finished video: the sizzle reel, the six core videos from the narrative arc, and demo captures. Scripts, shot lists, and capture automation live here. Media files live in Google Drive.

## Setup

Studios reads two sibling repos. Both need to be checked out beside it:

```
Repositories/
├── bemo-os/        github.com/agoraengine/bemo-os       canon, voice, claims, permissions
├── bemo-website/   github.com/agoraengine/bemo-website  live copy, design system, capturable pages
└── bemo-studios/
```

Studios reads both and commits to neither.

Read access is granted in [.claude/settings.json](.claude/settings.json) via `permissions.additionalDirectories`. Without it, Claude Code refuses to read outside the project root and every canon lookup fails. If you move or rename either sibling, update that file.

Check it is working by asking Claude Code to read `../bemo-os/docs/organization/16-voice-and-tone.md`. If that fails, nothing else in this repo will work correctly.

Then open this folder in Claude Code. `CLAUDE.md` carries the operating context.

MCP servers are declared in `.mcp.json`: Playwright for capture, HeyGen for voiceover. HeyGen needs a one-time OAuth sign-in that has to be done interactively. See [docs/01-pipeline.md](docs/01-pipeline.md) for what each one does and what it costs.

## Start a video

In Claude Code:

```
/new-production
```

It asks what the video is for, scaffolds `productions/<slug>/`, and writes the brief. Everything after that is gated on the brief being ratified.

## Where things are

| | |
|---|---|
| [CLAUDE.md](CLAUDE.md) | The boundary, the canon to read, the hard rules |
| [docs/00-overview.md](docs/00-overview.md) | What Studios is and why it is a separate repo |
| [docs/01-pipeline.md](docs/01-pipeline.md) | The five stages, the tooling, the gates |
| [docs/02-production-standards.md](docs/02-production-standards.md) | Specs: length, format, captions, safe areas, naming |
| [productions/](productions/) | One folder per video |
| [templates/](templates/) | Blank brief, script, shot list, asset manifest |

## Current productions

| Production | Serves | State |
|---|---|---|
| [ga-sizzle-reel](productions/ga-sizzle-reel/) | GA Launch Wave 0, then debuts in Wave 2 | Script locked (v1.2); 60s and 30s cuts rendered with VO and music |
| [linkedin-sizzle-series](productions/linkedin-sizzle-series/) | Pre-GA teasers, then the Wave 2 spine; open-ended 30s reel series on the narrative arc | Reel 1 final v5 (Aug 3); awaiting Drive upload and posting week |
| [wrenfield-kb-load](productions/wrenfield-kb-load/) | Raw app footage: the Wrenfield KB load and board-member ask, captured from the live app | Footage captured (Aug 3); feeds super-demo-60 |
| [super-demo-60](productions/super-demo-60/) | The warm-intro super demo (Bill/Tiffany Aug 10, then the standing ace-in-the-hole send) | Review cut rendered (Aug 3); Becky records finals by Aug 8 |
