#!/usr/bin/env node
// Cut the press-release-flow raw take into a watchable preview reel.
// Same approach as website-demo-slots/capture/assemble.mjs (elapsed-time
// labels at every cut, silent mp4 + poster) but at the take's native 1080p.
//   node cut-preview.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const FF = require("ffmpeg-static");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const FONT = "/System/Library/Fonts/Helvetica.ttc";
const src = path.join(OUT, "press-release-flow-raw.webm");
const outBase = path.join(OUT, "press-release-flow-preview");

// segments chosen from press-release-flow-actions.json marks
const segments = [
  { from: 11, to: 22 },    // templates page, New Press Release, editor opens
  { from: 30, to: 42 },    // KB: 5 items found, submitted
  { from: 80, to: 89 },    // interview question, Event selected
  { from: 92, to: 100 },   // typing the announcement (human speed)
  { from: 115, to: 123 },  // form submit, fields committing
  { from: 156, to: 163 },  // typing date/headline/spokesperson via chat
  { from: 188, to: 196 },  // brief recap locked, Continue to Research
  { from: 216, to: 224 },  // Drive scan: seeded press release attached
  { from: 228, to: 243 },  // draft composing, scroll through it
  { from: 268, to: 275 },  // hold on the finished draft
];
const poster = 270;

const tmp = fs.mkdtempSync(path.join(OUT, "asm-"));
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}\\:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const parts = [];
segments.forEach((seg, i) => {
  const part = path.join(tmp, `part${i}.mp4`);
  const filters = ["scale=1920:1080:force_original_aspect_ratio=decrease", "pad=1920:1080:(ow-iw)/2:(oh-ih)/2", "fps=30", "format=yuv420p"];
  if (i > 0) {
    filters.push(`drawtext=fontfile=${FONT}:text='${mmss(seg.from)} elapsed':fontsize=30:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=10:x=w-tw-28:y=h-th-24:enable='lt(t,1.2)'`);
  }
  execFileSync(FF, ["-y", "-ss", String(seg.from), "-to", String(seg.to), "-i", src, "-vf", filters.join(","), "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "18", part], { stdio: "pipe" });
  parts.push(part);
});
const list = path.join(tmp, "list.txt");
fs.writeFileSync(list, parts.map((p) => `file '${p}'`).join("\n"));
execFileSync(FF, ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", `${outBase}.mp4`], { stdio: "pipe" });
execFileSync(FF, ["-y", "-ss", String(poster), "-i", src, "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease", "-frames:v", "1", "-q:v", "2", `${outBase}-poster.jpg`], { stdio: "pipe" });
fs.rmSync(tmp, { recursive: true, force: true });
const dur = segments.reduce((a, s) => a + (s.to - s.from), 0);
console.log(`Assembled ${outBase}.mp4 (${dur}s) and poster`);
