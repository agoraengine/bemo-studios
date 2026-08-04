#!/usr/bin/env node
// Assemble a demo-slot clip from a raw take: cut segments, burn the source
// elapsed time at each cut (DEMOS.md: the compression must be visible), export
// a silent mp4 plus its poster frame.
//
//   node assemble.mjs <plan.json>
//
// plan.json:
// {
//   "src": "out/funderstorm-cycle-raw.webm",
//   "out": "out/funderstorm-cycle",           // .mp4 and -poster.jpg appended
//   "poster": 34.5,                            // source second for the poster
//   "segments": [ { "from": 2.0, "to": 4.0 }, ... ]  // first gets no marker
// }
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const FF = require("ffmpeg-static");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const FONT = "/System/Library/Fonts/Helvetica.ttc";

const plan = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const src = path.resolve(HERE, plan.src);
const outBase = path.resolve(HERE, plan.out);
const tmp = fs.mkdtempSync(path.join(HERE, "out", "asm-"));

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}\\:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const parts = [];
plan.segments.forEach((seg, i) => {
  const part = path.join(tmp, `part${i}.mp4`);
  const segSrc = seg.src ? path.resolve(HERE, seg.src) : src;
  // labelSeconds lets a pickup segment carry true wall-clock elapsed time from
  // the take's start rather than its own file position
  const labelAt = seg.labelSeconds ?? seg.from;
  const filters = ["scale=1920:1200:force_original_aspect_ratio=decrease", "pad=1920:1200:(ow-iw)/2:(oh-ih)/2", "fps=30", "format=yuv420p"];
  if (i > 0) {
    // elapsed source time, bottom right, first 1.2s after the cut
    filters.push(
      `drawtext=fontfile=${FONT}:text='${mmss(labelAt)} elapsed':fontsize=30:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=10:x=w-tw-28:y=h-th-24:enable='lt(t,1.2)'`
    );
  }
  execFileSync(FF, [
    "-y", "-ss", String(seg.from), "-to", String(seg.to), "-i", segSrc,
    "-vf", filters.join(","),
    "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "18", part,
  ], { stdio: "inherit" });
  parts.push(part);
});

const list = path.join(tmp, "list.txt");
fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join("\n"));
execFileSync(FF, ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", `${outBase}.mp4`], { stdio: "inherit" });

// poster (posterSrc lets the poster come from a pickup file)
const posterSrc = plan.posterSrc ? path.resolve(HERE, plan.posterSrc) : src;
execFileSync(FF, [
  "-y", "-ss", String(plan.poster), "-i", posterSrc,
  "-vf", "scale=1920:1200:force_original_aspect_ratio=decrease,pad=1920:1200:(ow-iw)/2:(oh-ih)/2",
  "-frames:v", "1", "-q:v", "2", `${outBase}-poster.jpg`,
], { stdio: "inherit" });

fs.rmSync(tmp, { recursive: true, force: true });
const dur = plan.segments.reduce((a, s) => a + (s.to - s.from), 0);
console.log(`Assembled ${outBase}.mp4 (${dur.toFixed(1)}s) and ${outBase}-poster.jpg`);
