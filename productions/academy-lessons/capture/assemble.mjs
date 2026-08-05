#!/usr/bin/env node
// Plan-driven cutter for Academy lesson videos: the college-lesson grammar from
// treatment.md. Avatar full screen for welcome and handle; the body alternates
// split screen and a circular presenter bubble over full-bleed content, with
// key lines building on screen as the narration lands.
//
//   node assemble.mjs <path/to/plan.json>
//
// plan.json (paths relative to the plan file's directory):
// {
//   "slug": "kb-basics",
//   "version": 1,
//   "captions": "captions.srt",              // optional; burned + kept as sidecar
//   "poster": { "segment": 1, "at": 2.0 },   // optional poster frame
//   "segments": [
//     { "type": "avatar", "src": "avatar/m1.mp4" },                    // full screen, own audio
//     { "type": "split", "src": "slides/outline-1.png",                // content left, avatar right
//       "avatar": "avatar/m2.mp4", "avatarFrom": 0, "duration": 24,
//       "text": [ { "from": 2, "text": "Start from the funder page" } ] },
//     { "type": "screen", "src": "../../capture/out/kb-basics/take-raw.webm",
//       "from": 2.0, "to": 34.0,
//       "bubble": "avatar/m2.mp4", "bubbleFrom": 24,                   // circular presenter bubble
//       "text": [ { "from": 1, "to": 8, "text": "Facts are cited to the page" } ] },
//     { "type": "avatar", "src": "avatar/m3.mp4" }
//   ]
// }
//
// Notes:
// - "src" may be a video (trimmed with from/to) or a still image (.png/.jpg,
//   held for "duration" seconds); still slides render from HTML the way
//   super-demo-60/capture/render-cards.mjs does.
// - "text" items are the reading layer: each line appears at its "from"
//   (segment-relative seconds) and persists to "to" (default: segment end),
//   stacked in order as the running outline.
// - The first avatar segment automatically gets the disclosure chip
//   ("AI-generated presenter", >=3s) per the Academy exception in
//   docs/01-pipeline.md; any segment may also set "disclose": true.
// - Omitting bubble/avatar keys (and avatar segments) yields the
//   voice-over-capture fallback with no other change.
//
// Output: bemo-academy-<slug>-primary-v<version>.mp4 (1920x1080, -16 LUFS)
// next to the plan file, plus -poster.jpg when poster is set.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const FF = require("ffmpeg-static");
const FONT = "/System/Library/Fonts/Helvetica.ttc";
const W = 1920, H = 1080, FPS = 30;
const HALF = W / 2;
const BUBBLE = 340; // diameter, px

const planPath = path.resolve(process.argv[2] ?? "");
if (!fs.existsSync(planPath)) {
  console.error("usage: node assemble.mjs <path/to/plan.json>");
  process.exit(1);
}
const HERE = path.dirname(planPath);
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const rel = (p) => path.resolve(HERE, p);
const tmp = fs.mkdtempSync(path.join(HERE, "asm-"));

const FIT = (w, h) => `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=${FPS}`;
const AUDIO = ["-ar", "48000", "-ac", "2", "-c:a", "aac", "-b:a", "192k"];
const VID = ["-c:v", "libx264", "-preset", "medium", "-crf", "18"];
const isImage = (p) => /\.(png|jpe?g)$/i.test(p);
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/'/g, "\u2019").replace(/:/g, "\\:").replace(/,/g, "\\,").replace(/%/g, "\\%");

const chip = (enable) =>
  `drawtext=fontfile=${FONT}:text='AI-generated presenter':fontsize=28:fontcolor=0x1b2437:box=1:boxcolor=white@0.85:boxborderw=12:x=48:y=h-th-44:enable='${enable}'`;

// the reading layer: each line appears at its time and persists, stacked as the outline
const readingLayer = (items, dur) =>
  (items ?? []).map((it, i) =>
    `drawtext=fontfile=${FONT}:text='${esc(it.text)}':fontsize=34:fontcolor=0x1b2437:box=1:boxcolor=white@0.88:boxborderw=14:x=64:y=${96 + i * 78}:enable='between(t,${it.from ?? 0},${it.to ?? dur})'`
  );

// content input args: still images loop for the duration, video gets trimmed
function contentInput(seg, dur) {
  const src = rel(seg.src);
  if (isImage(src)) return ["-loop", "1", "-t", String(dur), "-i", src];
  const trim = seg.from != null ? ["-ss", String(seg.from), "-to", String(seg.to)] : ["-t", String(dur)];
  return [...trim, "-i", src];
}

function segDuration(seg) {
  if (seg.duration != null) return seg.duration;
  if (seg.from != null) return seg.to - seg.from;
  throw new Error(`segment needs duration or from/to: ${JSON.stringify(seg)}`);
}

let disclosed = false;
const parts = [];
plan.segments.forEach((seg, i) => {
  const part = path.join(tmp, `part${i}.mp4`);

  if (seg.type === "avatar") {
    const needChip = !disclosed || seg.disclose;
    if (needChip) disclosed = true;
    if (seg.bg) {
      // transparent-webm presenter composited onto a background image at a
      // controllable x offset, so scene elements (the logo) stay visible
      // (Becky, 2026-08-05). seg.x shifts the presenter layer; positive = right.
      const xShift = seg.x ?? 260;
      const post = needChip ? "," + chip("lt(t,3.5)") : "";
      execFileSync(FF, [
        "-y", "-loop", "1", "-i", rel(seg.bg),
        "-c:v", "libvpx-vp9", "-i", rel(seg.src),
        "-filter_complex",
        `[0:v]${FIT(W, H)}[bg];[1:v]scale=${W}:${H},fps=${FPS}[fg];[bg][fg]overlay=${xShift}:0,format=yuv420p${post}[v]`,
        "-map", "[v]", "-map", "1:a", "-shortest",
        ...VID, ...AUDIO, part,
      ], { stdio: "inherit" });
    } else {
      const trim = seg.from != null ? ["-ss", String(seg.from), "-to", String(seg.to)] : [];
      const filters = [FIT(W, H), "format=yuv420p"];
      if (needChip) filters.push(chip("lt(t,3.5)"));
      execFileSync(FF, [
        "-y", ...trim, "-i", rel(seg.src),
        "-vf", filters.join(","), ...VID, ...AUDIO, part,
      ], { stdio: "inherit" });
    }

  } else if (seg.type === "split") {
    // content left, presenter right; audio from the presenter. With avatarBg,
    // the presenter is a transparent webm composited onto that background
    // inside the pane (center crop), same logo-safe logic as full screens.
    const dur = String(segDuration(seg));
    const text = readingLayer(seg.text, segDuration(seg));
    const leftChain = [FIT(HALF, H), ...text].join(",");
    if (seg.avatarBg) {
      execFileSync(FF, [
        "-y", ...contentInput(seg, dur),
        "-c:v", "libvpx-vp9", "-ss", String(seg.avatarFrom ?? 0), "-t", dur, "-i", rel(seg.avatar),
        "-loop", "1", "-i", rel(seg.avatarBg),
        "-filter_complex",
        `[0:v]${leftChain}[left];[2:v]${FIT(HALF, H)}[abg];` +
        `[1:v]scale=${W}:${H},fps=${FPS},crop=${HALF}:${H}:${seg.avatarCropX ?? 700}:0[fg];` +
        `[abg][fg]overlay=0:0[right];[left][right]hstack,format=yuv420p[v]`,
        "-map", "[v]", "-map", "1:a", "-t", dur, ...VID, ...AUDIO, part,
      ], { stdio: "inherit" });
    } else {
      execFileSync(FF, [
        "-y", ...contentInput(seg, dur),
        "-ss", String(seg.avatarFrom ?? 0), "-t", dur, "-i", rel(seg.avatar),
        "-filter_complex",
        `[0:v]${leftChain}[left];[1:v]${FIT(HALF, H)}[right];[left][right]hstack,format=yuv420p[v]`,
        "-map", "[v]", "-map", "1:a", "-t", dur, ...VID, ...AUDIO, part,
      ], { stdio: "inherit" });
    }

  } else {
    // full-bleed content, optional circular presenter bubble; audio from the
    // bubble source when present, else silence
    const dur = String(segDuration(seg));
    const text = readingLayer(seg.text, segDuration(seg));
    const bgChain = [FIT(W, H), ...text].join(",");
    if (seg.bubble) {
      const r = BUBBLE / 2;
      execFileSync(FF, [
        "-y", ...contentInput(seg, dur),
        "-ss", String(seg.bubbleFrom ?? 0), "-t", dur, "-i", rel(seg.bubble),
        "-filter_complex",
        `[0:v]${bgChain}[bg];` +
        `[1:v]crop='min(iw\\,ih)':'min(iw\\,ih)',scale=${BUBBLE}:${BUBBLE},fps=${FPS},format=yuva420p,` +
        `geq=lum='lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)':a='if(lte(hypot(X-${r},Y-${r}),${r}),255,0)'[pip];` +
        `[bg][pip]overlay=W-w-48:H-h-48,format=yuv420p[v]`,
        "-map", "[v]", "-map", "1:a", "-t", dur, ...VID, ...AUDIO, part,
      ], { stdio: "inherit" });
    } else {
      execFileSync(FF, [
        "-y", ...contentInput(seg, dur),
        "-f", "lavfi", "-t", dur, "-i", "anullsrc=r=48000:cl=stereo",
        "-map", "0:v", "-map", "1:a", "-vf", `${bgChain},format=yuv420p`, "-t", dur,
        ...VID, ...AUDIO, part,
      ], { stdio: "inherit" });
    }
  }
  parts.push(part);
});

const list = path.join(tmp, "list.txt");
fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join("\n"));
const joined = path.join(tmp, "joined.mp4");
execFileSync(FF, ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", joined], { stdio: "inherit" });

// final pass: captions burned from the locked script's .srt, loudnorm to -16 LUFS.
// Caption style is the sizzle standard (Becky, 2026-08-05): Geist, brand ink
// (Deep Sapphire) on a soft white box. Fonts ship in capture/fonts/.
const out = path.join(HERE, `bemo-academy-${plan.slug}-primary-v${plan.version ?? 1}.mp4`);
const FONTS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "fonts");
const CAPSTYLE = "FontName=Geist,FontSize=13,PrimaryColour=&H007E3405,BackColour=&H26FFFFFF,BorderStyle=4,Outline=0,Shadow=0,Bold=0,MarginV=34";
const vf = plan.captions ? ["-vf", `subtitles='${rel(plan.captions)}':fontsdir='${FONTS}':force_style='${CAPSTYLE}'`] : [];
execFileSync(FF, [
  "-y", "-i", joined, ...vf,
  "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
  "-c:v", "libx264", "-preset", "medium", "-crf", "20", ...AUDIO,
  "-movflags", "+faststart", out,
], { stdio: "inherit" });

if (plan.poster) {
  const seg = plan.segments[plan.poster.segment ?? 0];
  execFileSync(FF, [
    "-y", "-ss", String((seg.from ?? 0) + plan.poster.at), "-i", rel(seg.src),
    "-vf", FIT(W, H), "-frames:v", "1", "-update", "1", "-q:v", "2",
    out.replace(/\.mp4$/, "-poster.jpg"),
  ], { stdio: "inherit" });
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Assembled ${out}`);
console.log("Standards check before Drive upload: docs/02-production-standards.md");
