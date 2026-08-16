// Mixes the VO'd 15-second Amplify audition: four Avatar V lines over the
// core cut, punchy bed underneath, mastered to the house standard.
//
//   node productions/li-product-feature-reels/capture/mix-amplify15-vo.mjs P1
//   (P1 = the 16s SaaS-demo bed, P2 = the confident 30s bed)

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const VO = path.join(OUT, "vo15");
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const ff = (a) => execFileSync(FF, ["-y", ...a], { stdio: ["ignore", "ignore", "inherit"] });

const BED = (process.argv[2] || "P1") === "P2" ? "P2-confident-30s.wav" : "P1-saas-demo-16s.wav";
const CUT = process.argv[3] === "30" ? "30" : "15";
const CORE = CUT === "30"
  ? path.join(OUT, "bemo-amplify-feature-30s-v1.mp4")
  : path.join(OUT, "bemo-amplify-feature-15s-core-v1.mp4"); // picture only
const FINAL = path.join(OUT, `bemo-amplify-feature-${CUT}s-vo-${process.argv[2] || "P1"}.mp4`);

// line placement per cut. The 30 leaves the quote section instrumental on
// purpose: the quotes are read, not spoken, and a voice over them would double.
const PLACEMENTS = {
  "15": [["l1.wav", 0.1], ["l2.wav", 4.3], ["l3.wav", 9.8], ["l4.wav", 13.0]],
  "30": [["l1.wav", 0.3], ["l2.wav", 4.6], ["l3.wav", 10.2], ["l4.wav", 25.9]],
};
const LINES = PLACEMENTS[CUT];

// per-line prep: plain extraction, then trailing-silence trim via the reverse
// idiom (trim leading silence of the reversed track), then a fixed 0.2s pad.
for (const [w] of LINES) {
  const src = path.join(VO, w.replace(".wav", ".mp4"));
  ff(["-i", src, "-vn", "-ar", "48000", path.join(VO, w)]); // never trim speech
}

const D = CUT === "30" ? 30.13 : 16.43;

// The bed chain per case. P1 is a 16-second track with a baked outro, so it
// must never loop raw: stretched slightly for the 16-second cut, and joined
// to itself with a long crossfade for the 30. P2 is 30 seconds and only needs
// a hair of stretch for the long cut.
function bedChain() {
  if (BED.startsWith("P1") && CUT === "15")
    return `[1:a]atempo=${(16.0 / D).toFixed(4)},atrim=0:${D}`;
  if (BED.startsWith("P1") && CUT === "30")
    return `[1:a]asplit[ba][bb];[ba]atrim=0:15.2[b1];[bb]atrim=0:16,asetpts=PTS-STARTPTS[b2];[b1][b2]acrossfade=d=1.6,atrim=0:${D}`;
  if (BED.startsWith("P2") && CUT === "30")
    return `[1:a]atempo=${(30.0 / D).toFixed(4)},atrim=0:${D}`;
  return `[1:a]atrim=0:${D}`;
}
const inputs = ["-i", CORE, "-i", path.join(OUT, "music", BED)];
LINES.forEach(([w]) => inputs.push("-i", path.join(VO, w)));

const voChain = LINES.map((_, i) => `[${i + 2}:a]adelay=${Math.round(LINES[i][1] * 1000)}|${Math.round(LINES[i][1] * 1000)},loudnorm=I=-18:TP=-2:LRA=9[v${i}]`).join(";");
const voMix = LINES.map((_, i) => `[v${i}]`).join("") + `amix=inputs=${LINES.length}:normalize=0[vo]`;

ff([...inputs,
  "-filter_complex",
  `${bedChain()},afade=t=in:st=0:d=0.3,afade=t=out:st=${(D - 0.9).toFixed(2)}:d=0.9,volume=-11dB[bed];` +
  `${voChain};${voMix};` +
  `[bed][vo]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[a]`,
  "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", FINAL]);
console.log("wrote:", FINAL);
