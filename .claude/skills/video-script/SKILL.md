---
name: video-script
description: Write or revise a video script and its shot list from a ratified brief, grounded in bemo-os canon, with a claim trace and a clock check. Use after a production brief is ratified.
---

# Video Script

Turns a ratified brief into `script.md` and `shot-list.md`. These are written together, in one pass, because narration written without knowing what is on screen produces shots nobody can capture.

## Gate

**Do not start if the brief is not ratified.** Check `brief.md` for `RATIFIED`. If it says DRAFT, say so and stop. This is the gate that saves the most work.

## Steps

### 1. Read

- The production's `brief.md`, closely. The "must say" and "must not say" sections are the spec.
- The canon named in `CLAUDE.md`, all of it, every time. Do not work from memory of a previous session: the message map changes, and so do permissions.
- The live website copy in `../bemo-website/content/` for the pages this video's message overlaps. A stranger who watches the reel and lands on the site should hear one voice. Where the live site and `../bemo-os/docs/initiatives/website/ga-website-edits-v2.md` disagree, name the conflict rather than silently picking one.
- Any prior version of this script, plus its change log.

### 2. Find the opening

Do this before writing anything else, and spend real time on it. The first three seconds carry the video.

The opening states a problem the viewer already feels. Not the product, not the category, not a logo. From the narrative arc: feel it, name it, see it differently, discover something exists for it. The video is the compressed version of that sequence, and if the first beat is not "feel it," the rest does not land.

Test: read the first line to someone who has never heard of BeMo. If their reaction is "yes, that happens," it works. If it is "what is this," rewrite.

Openings that fail on sight: "Introducing BeMo." "Meet BeMo." "Nonprofits face many challenges." Anything that begins with the company.

### 3. Write the two columns together

Fill the table in `templates/script.md`: time, narration, on screen, shot ID.

- Each row is one beat. A beat is one idea.
- The narration column is what gets read aloud. Nothing else goes in it.
- The on-screen column is specific enough to build a shot from: which screen, what the user is doing, what changes.
- Assign shot IDs as you go, S1 upward.

**Language rules, applied as you write, not in a cleanup pass:**

- No em dashes. Ever.
- No AI tells. The banned list in `../bemo-os/CLAUDE.md` applies in full.
- Spoken register, not written register. Short sentences. Contractions. Read every line aloud as you write it, and if you would not say it to a person, cut it.
- Nothing that only makes sense to someone who works here. "Coordination collapse" is internal diagnostic language and must not pull through to external copy.
- Say what the viewer gets, not what the system is. Deliverable claims.

### 4. Extract the shot list

Build `shot-list.md` from the on-screen column. For every `screen` shot, fill the **app path** column with enough specificity that a capture script can be written from that column alone: the route, the state, the interaction.

Order shots for capture efficiency, not for the edit. Shots on the same screen get grouped, because each context switch in a capture run is a place the run can break.

### 5. Clock check

Count the narration words. About 150 words per minute at BeMo's pace, which is deliberately unhurried.

- 60 seconds is roughly 140 words
- 90 seconds is roughly 210 words

Then actually read it aloud against a timer, because word count lies about pauses. If it only fits when rushed, it is too long. Cut a beat rather than speeding up: a rushed BeMo video contradicts the tone in `16-voice-and-tone.md`.

### 6. Claim trace

Fill the claim trace table. Every assertion in the narration gets a row and a source.

An assertion with no source is one of two things. Either it is a claim that needs ratifying into bemo-os first, in which case flag it and stop rather than shipping it in a video. Or it is filler, in which case cut it and the script gets better.

Then run the `brand-review` skill from bemo-os against the script.

### 7. Log findings

If writing the script produced language sharper than the message map, that is a finding for bemo-os, not a quiet upgrade here. Write it to `findings.md` and tell the user. Studios does not author canon.

### 8. Hand back

Report: runtime, word count, the read-aloud time you measured, any claim that did not trace, and any finding logged. Do not mark the script LOCKED. That happens when VO is generated.
