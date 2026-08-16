// Music-only bed remix for the feature slate, per Becky's August 16 ruling:
// the 30-second parents ride bed P2 (confident) and the 15-second cores ride
// bed P1 (saas demo), replacing bed A. Same discipline as the voiced mixer:
// beds at native length, static measured gain to the house target, no
// dynamic loudness normalization.
//
//   node productions/li-product-feature-reels/capture/mix-beds.mjs

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const run = (a) => execFileSync(FF, ["-y", ...a], { stdio: ["ignore", "ignore", "inherit"] });
const measureI = (file) => {
  const r = spawnSync(FF, ["-i", file, "-map", "0:a", "-af", "loudnorm=print_format=json", "-f", "null", "-"], { encoding: "utf8" });
  const m = (r.stderr || "").match(/"input_i"\s*:\s*"(-?[\d.]+)"/);
  return m ? parseFloat(m[1]) : null;
};
const dur = (file) => {
  const r = spawnSync(FF, ["-i", file], { encoding: "utf8" });
  const m = (r.stderr || "").match(/Duration: 00:00:([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
};

// [picture, bed, output]; the target is the shipped finish, about -15.8 LUFS.
// Current jobs are the behavior-only parents (Becky's Aug 16 ruling: quote
// cards leave the 30s parents; proof lives in post copy, anchors, and stills)
// plus the 15s cores. The with-quote v2/v3/v4 mixes are superseded.
const JOBS = [
  ["bemo-funderstorm-feature-30s-v4.mp4", "P2-confident-30s.wav", "bemo-funderstorm-feature-30s-v4-final.mp4"],
  ["bemo-funderstorm-feature-15s-core-v1.mp4", "P1-saas-demo-16s.wav", "bemo-funderstorm-feature-15s-core-v3-final.mp4"],
  ["bemo-amplify-feature-30s-v5.mp4", "P2-confident-30s.wav", "bemo-amplify-feature-30s-v5-final.mp4"],
  ["bemo-amplify-feature-30s-v6-letter.mp4", "P2-confident-30s.wav", "bemo-amplify-feature-30s-v6-letter-final.mp4"],
  ["bemo-amplify-feature-15s-core-v1.mp4", "P1-saas-demo-16s.wav", "bemo-amplify-feature-15s-core-v3-final.mp4"],
];

for (const [pic, bed, out] of JOBS) {
  const PIC = path.join(OUT, pic), BED = path.join(OUT, "music", bed), FINAL = path.join(OUT, out);
  const D = dur(PIC);
  const fadeOut = Math.min(1.5, D - 0.1);
  // bed at native length: trim to the picture, pad if the picture runs longer
  run(["-i", PIC, "-i", BED, "-filter_complex",
      `[1:a]atrim=0:${D},apad=whole_dur=${D},afade=t=in:st=0:d=0.6,afade=t=out:st=${(D - fadeOut).toFixed(2)}:d=${fadeOut}[a]`,
      "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", String(D), FINAL]);
  const I = measureI(FINAL);
  const trim = I === null ? 0 : (-15.8 - I);
  if (Math.abs(trim) > 0.3) {
    const TMP = FINAL.replace(".mp4", "-trim.mp4");
    run(["-i", FINAL, "-map", "0:v", "-map", "0:a", "-c:v", "copy",
        "-af", `volume=${trim.toFixed(1)}dB,alimiter=limit=0.85:level=false`, "-c:a", "aac", "-b:a", "192k", TMP]);
    fs.renameSync(TMP, FINAL);
  }
  console.log(`${out}: ${D.toFixed(2)}s, program ${I} LUFS, trimmed ${trim.toFixed(1)} dB`);
}
console.log("done");
