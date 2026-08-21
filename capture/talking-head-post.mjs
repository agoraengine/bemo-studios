#!/usr/bin/env node
// One pass from camera master to finished founder-to-camera cut: trim, grade,
// white balance, diffusion, caption cards, audio repair. One encode, because
// stacking generations of H.264 for the sake of tidy intermediate files is a
// cost with no benefit.
//
// Get a transcript first. See docs/04-founder-to-camera.md for why, and for the
// mlx-whisper invocation.
//
//   node capture/talking-head-post.mjs \
//     --in "master.mov" --out "final.mp4" --transcript take.json \
//     --ss 0.5 --to 56.1 --kelvin 8500 --face 300:380:480:180
//
// --transcript may be omitted to render the picture and audio with no captions.

import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FF, ENCODE, TARGETS, pictureChain, measureLoudness, audioChain, stats } from "./lib/talking-head.mjs";
import * as caps from "./lib/captions.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };

const SRC = arg("in"), OUT = arg("out");
if (!SRC || !OUT) { console.error("need --in and --out"); process.exit(1); }
const ss = arg("ss"), to = arg("to");
const transcript = arg("transcript");
const kelvin = +arg("kelvin", 8500);
const strength = +arg("strength", 0.635);
const glow = +arg("glow", 0.12);
const face = arg("face", "300:380:480:180");
const work = arg("work", path.join(path.dirname(OUT), ".talking-head"));

const seek = [...(ss ? ["-ss", ss] : []), ...(to ? ["-to", to] : [])];

console.log("measuring loudness");
const measured = measureLoudness(SRC, { ss, to });
console.log(`  in ${measured.input_i} LUFS, peak ${measured.input_tp} dBTP`);

let cards = [], files = [];
if (transcript) {
  cards = caps.cards(caps.words(transcript));
  const srt = caps.writeSrt(cards, OUT.replace(/\.[^.]+$/, ".srt"));
  console.log(`${cards.length} caption cards, sidecar at ${path.basename(srt)}`);
  const fontFile = path.join(HERE, "..", "productions", "linkedin-sizzle-series", "capture", "fonts", caps.STYLE.font);
  files = await caps.render(cards, { outDir: path.join(work, "cards"), fontFile });
}

const { inputs, parts, outLabel } = transcript
  ? caps.overlay(cards, files)
  : { inputs: [], parts: [], outLabel: "bg" };

const graph = [`[0:v]${pictureChain({ strength, kelvin, glow })}[bg]`, ...parts, `[0:a]${audioChain(measured)}[a]`];

console.log("encoding");
const r = spawnSync(FF, ["-hide_banner", "-loglevel", "error", ...seek, "-i", SRC, ...inputs,
  "-filter_complex", graph.join(";"), "-map", `[${outLabel}]`, "-map", "[a]", ...ENCODE, OUT, "-y"],
  { encoding: "utf8", stdio: ["ignore", "inherit", "inherit"] });
if (r.status !== 0) process.exit(r.status ?? 1);

// ------------------------------------------------------------------- QC -----
const [lo, hi] = TARGETS.faceYAVG;
console.log("\nQC against docs/04-founder-to-camera.md");
const loud = spawnSync(FF, ["-hide_banner", "-i", OUT, "-af", "loudnorm=I=-14:TP=-1.5:print_format=summary", "-f", "null", "-"], { encoding: "utf8" }).stderr;
console.log("  " + (loud.match(/Input Integrated:.*/)?.[0] ?? "loudness unread"));
console.log("  " + (loud.match(/Input True Peak:.*/)?.[0] ?? ""));
let ok = true;
for (const at of [5, 20, 35, 50]) {
  const s = stats(OUT, { at, crop: face });
  if (s.YAVG == null) continue;
  const pass = s.YAVG >= lo && s.YAVG <= hi;
  ok &&= pass;
  console.log(`  t=${String(at).padStart(2)}s face YAVG ${s.YAVG.toFixed(1)} V ${s.VAVG?.toFixed(1)} ${pass ? "ok" : `OUT OF BAND (${lo}-${hi})`}`);
}
console.log(ok ? "\nface exposure in band across the take" : "\nface exposure out of band, adjust --strength");
console.log(`wrote ${OUT}`);
