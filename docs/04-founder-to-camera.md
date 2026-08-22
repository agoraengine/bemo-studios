# Founder to Camera

**Opened August 21, 2026**, out of the Week 31 Field Notes video. Covers a founder speaking straight to camera: Field Notes, founder POV, anything where the subject is a person talking rather than the product working. Product capture is `01-pipeline.md`. Academy lessons are `03-academy-lesson-videos.md`.

The whole reason this file exists: the Week 31 take needed a 27 dB audio rescue, a colour correction, and two rounds of caption rework, and every one of those was a setting that could have been right before the record button. Repair is possible. Capture is cheaper.

## Before you record

Six things, about ninety seconds total. Five of the six were wrong on the first Week 31 take.

| Check | Where | Why |
|---|---|---|
| **Input volume 75 to 85** | System Settings, Sound, Input | The single most expensive miss. See below |
| **Quality: Maximum** | QuickTime, the arrow next to the record button | "High" silently records 720p. "Maximum" records the camera's native resolution |
| **Camera** | Same menu | An iPhone on Continuity Camera beats every built-in option, and propping it higher fixes eyeline in the same move |
| **Microphone: the Mac's own** | Same menu | Never the webcam's. The C920 mic runs at 16 kHz and sounds it |
| **Studio Light on** | Control Centre, Video Effects | Brightens the face, drops the background. The correction done before the pixels exist, which is always cleaner than doing it after. FaceTime camera only |
| **Windows in front, not behind** | The chair | Free key light. Backlit means the face survives on ambient bounce |

**QuickTime has no input gain control.** The slider under the record button is monitoring volume, it pipes the mic to the speakers and does nothing to the recorded level. People keep it low to avoid feedback and assume they are set. The real control is System Settings, Sound, Input, with a live meter. Talk at recording volume and push until the meter peaks about two thirds across.

## Targets, measured not eyeballed

Every number here is checkable with `ffmpeg -af loudnorm` or `-vf signalstats`, which means the assemble gate can be a pass over this table.

| Property | Target | Week 31 as recorded |
|---|---|---|
| Integrated loudness | -14 LUFS | **-41.3** |
| True peak | under -1.5 dBTP | -20.3 |
| Face luma (YAVG) | 138 to 145 | **120.8** |
| Face shadow side (YLOW) | above 100 | 86 |
| White reference U / V | 128 / 128 | **117 / 135** |
| Face red (VAVG) | 135 to 140 | 148 ungraded |
| Peak highlight (YMAX) | under 250 | fine |
| Resolution | 1920x1080 | **1280x720** |

Sample the face with a crop rather than the whole frame. A full-frame average is dominated by the room. `crop=300:380:480:180` was the Week 31 face box at 720p; move it to suit the framing.

For the white reference, pick something actually white and actually in shot. Window trim and door frames work. Do not pick a wall, because "warm cream" and "white under a warm cast" are the same numbers.

## Framing

Eyeline about a third down the frame. Week 31 landed at 53%, dead centre, which reads as sitting low with a lot of ceiling. Raising the laptop three or four inches fixes it, and cropping to fix it afterwards costs resolution the take cannot spare.

Keep the safe area: text and anything critical inside the middle 90% for 16:9, per `02-production-standards.md`.

## The post chain

Order is not cosmetic. Getting it wrong cost two full rounds on Week 31.

```
1. exposure lift      curves, luma
2. white balance      colortemperature
3. diffusion          screen-blended blur
4. captions           overlay cards
5. audio repair       highpass, denoise, two-pass loudnorm, limiter
```

**Brightness before white balance, always.** Correcting colour and then brightening re-warms everything the correction just removed. On Week 31, applying `eq=gamma=1.15` after the white balance pushed the face from V=135 back to V=143, which is where the orange had been in the first place. The lift has to happen upstream so the balance lands on the finished image.

**Diffusion, not skin blur.** A screen-blended gaussian at low opacity is what an optical diffusion filter does on a real lens: it lifts the shadow out of creases and softens texture while edges stay sharp. `smartblur` and friends cannot tell skin from eyes, and take the eyes, the hair edge, and the glasses with them. That is the look people now read as AI-generated, which is a bad thing for a founder-to-camera video to look like, and a worse thing for BeMo specifically.

**Denoise before you lift the level.** Raising a -41 LUFS track by 27 dB raises the room with it. A gentle `afftdn` first keeps the noise floor down.

**One encode.** Trim, grade, caption, and repair audio in a single ffmpeg pass from the camera master. Week 31 briefly shipped a file that had been through three generations of H.264 for no reason.

Reusable implementation: `../capture/lib/talking-head.mjs`.

## Captions

The rule in `02-production-standards.md` stands: burned in, no exceptions, generated from the locked script, two lines maximum, inside the safe area, plus an `.srt` sidecar. Two additions from Week 31.

**Verify the take against the script before generating captions.** Week 31's delivery diverged from its locked script in five of six lines, including an unscripted sentence that spent a beat the week's plan had deliberately held back for the next day's article. Nobody noticed until the take was transcribed. A caption that contradicts the speaker's mouth is the most visible error a video can carry, so this check is not optional and it belongs before the caption build, not after.

Local transcription, nothing leaving the machine:

```
uv tool install mlx-whisper
mlx_whisper take.wav --model mlx-community/whisper-large-v3-turbo \
  --language en --word-timestamps True --output-format json
```

`mlx_whisper` shells out to `ffmpeg` on PATH. There is no system ffmpeg on these machines, so symlink `node_modules/ffmpeg-static/ffmpeg` into a directory on PATH first. It also mishears "BeMo" as "BMO", which the card builder repairs.

**When the take wins, caption the take.** If the delivery is better than the script, or simply already recorded and good, generate captions from a verified transcript instead and record the divergence in the asset plan. The standard's concern is unproofread transcription error, so the transcript gets read against the locked script line by line before it is used. The general rule does not loosen. The narrower rule: captions match the mouth.

### Caption cards

libass draws one box per line, so a two-line caption gets a ragged right edge and no control over corner radius or padding. Cards get rendered in Chromium instead and composited as timed overlays, which also buys the real brand font, since libass cannot load the variable `.woff2` and a browser can.

| Property | Value |
|---|---|
| Face | Schibsted Grotesk, weight 500 |
| Size | 34px at 720p, about 4.7% of frame height |
| Colour | Deep Sapphire `#05347E` |
| Panel | White at 93%, 14px radius, 16/27/18 padding |
| Position | Centred, 46px off the bottom |
| Card shape | Two lines maximum, 42 characters a line, balanced |

**Judge caption size at feed width, not full screen.** Everything looks oversized on a laptop, because the audience sees the video roughly three times smaller. Downscale a frame to 380px wide, which is about a LinkedIn feed video on a phone, and decide there. Week 31 went 38px, then 34px, on that test. Below 30px it stops being readable on a phone.

**Split cards on sentence boundaries first**, then break only the long ones, at commas where possible and into even pieces where not. Filling greedily to a character count puts two half-sentences on one card and orphans "on them." onto its own.

Implementation: `../capture/lib/captions.mjs`, driven by `../capture/talking-head-post.mjs`.

## Failure log

**Week 31 Field Notes, August 20 and 21, 2026.** First take unusable, second take shipped after repair.

1. Input gain at 27/100 produced -41.3 LUFS across both takes, because the setting was never found between them. Recoverable in post, but the signal-to-noise ceiling is set at capture and cannot be raised later.
2. QuickTime Quality on "High" recorded 720p on a machine whose cameras all shoot 1080p. Never spotted during either session.
3. Mixed lighting, warm ceiling bulbs against daylight, left a colour cast the camera split the difference on. `saturation=1.05` in the first grade made it worse and produced the note "they look a bit orange."
4. Colour corrected before brightening, so the brightening undid the correction. Two rounds lost.
5. Captions built from the locked script without checking the delivery. Fifteen cards had to be rebuilt from a transcript.
6. On-screen text and the title card were cut in review as redundant against the captions and too manufactured for a to-camera piece. Worth asking whether a to-camera video wants them at all before building them.
7. The Desktop syncs to iCloud, so files trashed from it land in `~/Library/Mobile Documents/.Trash` and not `~/.Trash`. A cleanup swept two files that were meant to be kept and they were not where anyone looked first.
8. **The same thing happened again on August 22**, from the other direction: a cleanup used `mv` to `~/.Trash` on Desktop folders, which is worse than the Finder's own delete because it bypasses iCloud entirely. The moved items were not recoverable from either trash afterwards. Nothing was lost that time, because every file had been checked onto Drive first, but the mechanism is the lesson. **Deleting Desktop files: check the destination first, then use the Finder, or move to a holding folder rather than any `.Trash` path.** Never `mv` to `~/.Trash` here.

## Aspect, and what LinkedIn does to it

**The delivered 16:9 file letterboxes in the LinkedIn feed.** The player pads a landscape
video into a taller container, so a viewer sees black above and below the picture. This is
the player, not the file: the Week 31 master is 1280x720 with the image filling the frame
edge to edge and no bars baked in.

It matters more than it looks, because a Field Notes video runs on LinkedIn and nowhere
else. Its only destination is the one surface that pads it, and on a phone the padding
costs roughly half the vertical space the post could occupy while autoplaying muted.

**A square cut solves it without a re-record.** A centred 1:1 crop of the 16:9 master keeps
the speaker centred and, importantly, keeps the burned-in caption plate fully inside the
frame with margin. Check that before committing to it: captions are laid out for the 16:9
width, and 4:5, the tallest ratio LinkedIn accepts, clips the rounded ends off the plate.
1:1 is the ratio that survives.

```
ffmpeg -i <master>.mp4 -vf "crop=720:720:280:0,scale=1080:1080:flags=lanczos" \
  -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart <out>.mp4
```

Sample the crop at four or five points across the take before rendering, because a fixed
centre crop has no tolerance for the speaker drifting. Note that `02-production-standards.md`
calls square the "feed fallback where vertical is wrong", so shipping square here is a
deliberate departure and belongs in the week's close record. The 16:9 master stays the file
for YouTube and for sending to anyone directly.
