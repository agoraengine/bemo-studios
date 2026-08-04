#!/usr/bin/env node
// Plan-driven cutter for Academy lesson videos. Generalizes the segment cutter
// from website-demo-slots with an avatar track, PiP compositing, the
// AI-presenter disclosure chip, caption burn, and loudnorm.
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
//     { "type": "avatar", "src": "avatar/m1.mp4" },                    // full-frame twin, own audio
//     { "type": "screen", "src": "../../capture/out/kb-basics/take-raw.webm",
//       "from": 2.0, "to": 34.0,
//       "pip": "avatar/m2.mp4", "pipFrom": 0 },                        // pip optional; its audio narrates
//     { "type": "avatar", "src": "avatar/m3.mp4" }
//   ]
// }
//
// The first avatar segment automatically gets the disclosure chip
// ("AI-generated presenter", >=3s) per the Academy exception in
// docs/01-pipeline.md; any segment may also set "disclose": true.
// Dropping avatar segments and pip keys yields the voice-over-capture fallback.
//
// Output: bemo-academy-<slug>-primary-v<version>.mp4 (1920x1080, -16 LUFS)
// next to the plan file, plus -poster.jpg when poster is set.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const FF = require("ffmpeg-static");
const FONT = "/System/Library/Fonts/Helvetica.ttc";
const W = 1920, H = 1080, FPS = 30;
const PIP_W = Math.round(W * 0.22);

const planPath = path.resolve(process.argv[2] ?? "");
if (!fs.existsSync(planPath)) {
  console.error("usage: node assemble.mjs <path/to/plan.json>");
  process.exit(1);
}
const HERE = path.dirname(planPath);
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const rel = (p) => path.resolve(HERE, p);
const tmp = fs.mkdtempSync(path.join(HERE, "asm-"));

const FIT = `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},format=yuv420p`;
const AUDIO = ["-ar", "48000", "-ac", "2", "-c:a", "aac", "-b:a", "192k"];
const chip = (enable) =>
  `drawtext=fontfile=${FONT}:text='AI-generated presenter':fontsize=28:fontcolor=0x1b2437:box=1:boxcolor=white@0.85:boxborderw=12:x=48:y=h-th-44:enable='${enable}'`;

let disclosed = false;
const parts = [];
plan.segments.forEach((seg, i) => {
  const part = path.join(tmp, `part${i}.mp4`);
  const src = rel(seg.src);
  const trim = seg.from != null ? ["-ss", String(seg.from), "-to", String(seg.to)] : [];

  if (seg.type === "avatar") {
    const filters = [FIT];
    if (!disclosed || seg.disclose) {
      filters.push(chip("lt(t,3.5)"));
      disclosed = true;
    }
    execFileSync(FF, [
      "-y", ...trim, "-i", src,
      "-vf", filters.join(","), "-c:v", "libx264", "-preset", "medium", "-crf", "18", ...AUDIO, part,
    ], { stdio: "inherit" });
  } else {
    const dur = (seg.to - seg.from).toFixed(3);
    if (seg.pip) {
      const pipFrom = seg.pipFrom ?? 0;
      execFileSync(FF, [
        "-y", ...trim, "-i", src,
        "-ss", String(pipFrom), "-t", dur, "-i", rel(seg.pip),
        "-filter_complex",
        `[0:v]${FIT}[bg];[1:v]scale=${PIP_W}:-2,fps=${FPS}[pip];[bg][pip]overlay=W-w-40:H-h-40:eval=init[v]`,
        "-map", "[v]", "-map", "1:a", "-t", dur,
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", ...AUDIO, part,
      ], { stdio: "inherit" });
    } else {
      // silent screen segment: synthesize a matching silent track so concat stays uniform
      execFileSync(FF, [
        "-y", ...trim, "-i", src,
        "-f", "lavfi", "-t", dur, "-i", "anullsrc=r=48000:cl=stereo",
        "-map", "0:v", "-map", "1:a", "-vf", FIT, "-t", dur,
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", ...AUDIO, part,
      ], { stdio: "inherit" });
    }
  }
  parts.push(part);
});

const list = path.join(tmp, "list.txt");
fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join("\n"));
const joined = path.join(tmp, "joined.mp4");
execFileSync(FF, ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", joined], { stdio: "inherit" });

// final pass: captions burned from the locked script's .srt, loudnorm to -16 LUFS
const out = path.join(HERE, `bemo-academy-${plan.slug}-primary-v${plan.version ?? 1}.mp4`);
const vf = plan.captions ? ["-vf", `subtitles='${rel(plan.captions)}'`] : [];
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
    "-vf", FIT.replace(`,fps=${FPS},format=yuv420p`, ""), "-frames:v", "1", "-q:v", "2",
    out.replace(/\.mp4$/, "-poster.jpg"),
  ], { stdio: "inherit" });
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Assembled ${out}`);
console.log("Standards check before Drive upload: docs/02-production-standards.md");
