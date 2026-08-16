// VO mix, second generation. The voice is the master track; the bed ducks
// under it via sidechain compression. No dynamic loudness normalization
// anywhere in the signal path: static gains from a measurement pass, then a
// limiter, then one static trim to the house target.
//
//   node productions/li-product-feature-reels/capture/mix-vo2.mjs P1 15
//   node productions/li-product-feature-reels/capture/mix-vo2.mjs P2 30

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const VO = path.join(OUT, "vo15");
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const run = (a) => { execFileSync(FF, ["-y", ...a], { stdio: ["ignore", "ignore", "inherit"] }); };
const measureI = (file, extra = []) => {
  const r = spawnSync(FF, ["-i", file, ...extra, "-af", "loudnorm=print_format=json", "-f", "null", "-"], { encoding: "utf8" });
  const m = (r.stderr || "").match(/"input_i"\s*:\s*"(-?[\d.]+)"/);
  return m ? parseFloat(m[1]) : null;
};

const BED = (process.argv[2] || "P1") === "P2" ? "P2-confident-30s.wav" : "P1-saas-demo-16s.wav";
const CUT = process.argv[3] === "30" ? "30" : "15";
const CORE = CUT === "30" ? path.join(OUT, "bemo-amplify-feature-30s-v2-letter.mp4") : path.join(OUT, "bemo-amplify-feature-15s-core-v1.mp4");
const FINAL = path.join(OUT, `bemo-amplify-feature-${CUT}s-vo-${process.argv[2] || "P1"}.mp4`);
const D = CUT === "30" ? 30.93 : 16.43;

const PLACEMENTS = {
  "15": [["l1", 0.1], ["l2", 4.3], ["l3", 9.8], ["l4", 13.0]],
  "30": [["l1", 0.3], ["l2", 4.6], ["l3", 10.4], ["l5b", 13.4], ["l6", 18.6], ["l4", 26.7]],
};
const LINES = PLACEMENTS[CUT];

// static per-line gain toward -17 LUFS, measured once, applied as plain volume
const gains = {};
for (const [l] of LINES) {
  const wav = path.join(VO, l + ".wav");
  if (!fs.existsSync(wav)) run(["-i", path.join(VO, l + ".mp4"), "-vn", "-ar", "48000", wav]);
  const I = measureI(wav);
  gains[l] = I === null ? 0 : Math.max(-12, Math.min(18, -17 - I));
  console.log(`${l}: measured ${I} LUFS, static gain ${gains[l].toFixed(1)} dB`);
}

// refuse to mix overlapping voice lines: measure real durations first
{
  let prevEnd = 0, prevName = "";
  for (const [l, at] of LINES) {
    const wav = path.join(VO, l + ".wav");
    if (!fs.existsSync(wav)) run(["-i", path.join(VO, l + ".mp4"), "-vn", "-ar", "48000", wav]);
    const r = spawnSync(FF, ["-i", wav], { encoding: "utf8" });
    const m = (r.stderr || "").match(/Duration: 00:00:([\d.]+)/);
    const dur = m ? parseFloat(m[1]) : 0;
    if (at < prevEnd - 0.15) {
      console.error(`OVERLAP: ${l} starts at ${at}s but ${prevName} runs to ${prevEnd.toFixed(2)}s`);
      process.exit(1);
    }
    if (at + dur > D + 0.1) {
      console.error(`OVERRUN: ${l} (${dur.toFixed(2)}s) at ${at}s ends past the cut (${D}s)`);
      process.exit(1);
    }
    prevEnd = at + dur; prevName = l;
  }
}

function bedChain() {
  if (BED.startsWith("P1") && CUT === "15") return `[1:a]atempo=${(16.0 / D).toFixed(4)},atrim=0:${D}`;
  if (BED.startsWith("P2") && CUT === "30") return `[1:a]atrim=0:${D},apad=whole_dur=${D}`;
  return `[1:a]atrim=0:${D}`;
}

const inputs = ["-i", CORE, "-i", path.join(OUT, "music", BED)];
LINES.forEach(([l]) => inputs.push("-i", path.join(VO, l + ".wav")));
const voChain = LINES.map(([l, at], i) =>
  `[${i + 2}:a]volume=${gains[l].toFixed(1)}dB,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[v${i}]`).join(";");
const voMix = LINES.map((_, i) => `[v${i}]`).join("") + `amix=inputs=${LINES.length}:normalize=0,apad=whole_dur=${D}[vo]`;

// the two-track behaviour, in one deliverable track: voice untouched on top,
// bed ducked 7dB under speech by sidechain, 400ms release so it breathes back
const FILTER =
  `${voChain};${voMix};[vo]asplit[voKey][voMix];` +
  `${bedChain()},afade=t=in:st=0:d=0.3,afade=t=out:st=${(D - 0.9).toFixed(2)}:d=0.9,volume=-13dB[bedpre];` +
  `[bedpre][voKey]sidechaincompress=threshold=0.015:ratio=9:attack=8:release=420:makeup=1[bed];` +
  `[bed][voMix]amix=inputs=2:normalize=0,alimiter=limit=0.83:level=false[a]`;

run([...inputs, "-filter_complex", FILTER, "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", String(D), FINAL]);

// one static trim to the -16 LUFS house target, no dynamic processing
const I = measureI(FINAL, ["-map", "0:a"]);
const trim = I === null ? 0 : (-16 - I);
if (Math.abs(trim) > 0.5) {
  const TMP = FINAL.replace(".mp4", "-trim.mp4");
  run(["-i", FINAL, "-map", "0:v", "-map", "0:a", "-c:v", "copy", "-af", `volume=${trim.toFixed(1)}dB,alimiter=limit=0.85:level=false`, "-c:a", "aac", "-b:a", "192k", TMP]);
  fs.renameSync(TMP, FINAL);
}
console.log(`wrote: ${FINAL} (program ${I} LUFS, trimmed ${trim.toFixed(1)} dB)`);
