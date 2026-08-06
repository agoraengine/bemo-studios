#!/usr/bin/env node
// Assembles Reel 1W, "the website in 60 seconds": windows of the filmed
// site take (site-tour.mjs) reordered into the story, with site-copy VO.
//   node run-website60.mjs --finish --outtag vW1
// Story order: hero hook -> assembly punchline -> why orgs stall ->
// one memory (What BeMo is + How BeMo works) -> conversation -> proof -> CTA.

import ffmpegPath from "ffmpeg-static";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const VO = path.join(OUT, "vo", "becky");
const SLUG = "bemo-linkedin-sizzle-series-r1w";
const DUR = 60;

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

// [takeIn, takeOut] -> output slots in order; durations sum to 58 + 2 tail hold on CTA
const CUTS = [
  [1.5, 11.6],   // hero settles                     -> 0.0-10.1
  [22.5, 31.0],  // assembly crawl (the punchline)   -> 10.1-18.6
  [33.5, 39.9],  // they stop remembering + network  -> 18.6-25.0
  [14.3, 18.2],  // what BeMo is (four cards)        -> 25.0-28.9
  [48.7, 56.4],  // how BeMo works (one memory hub)  -> 28.9-36.6
  [58.7, 68.0],  // no menus, no training, just ask  -> 36.6-45.9
  [41.8, 46.2],  // from the people using it         -> 45.9-50.3
  [70.3, 80.0],  // find out what your nonprofit knows -> 50.3-60.0
];

const MIX = [
  [path.join(VO, "hge-h1.wav"), 0.4],
  [path.join(VO, "hge-h2.wav"), 2.6],
  [path.join(VO, "hgw-w3.wav"), 4.3],
  [path.join(VO, "hgw-w4.wav"), 10.3],
  [path.join(VO, "hgw-w5.wav"), 15.9],
  [path.join(VO, "hgw-w6.wav"), 18.9],
  [path.join(VO, "hgw-w7.wav"), 25.3],
  [path.join(VO, "hgw-w8.wav"), 29.2],
  [path.join(VO, "hgw-w9.wav"), 36.9],
  [path.join(VO, "hgw-w10.wav"), 42.6],
  [path.join(VO, "hgw-w11.wav"), 46.1],
  [path.join(VO, "hgw-w12.wav"), 50.6],
  [path.join(VO, "hgw-w13.wav"), 53.0],
];
const MUSIC = path.join(OUT, "sfx", "music-D-ext.wav");
const SWELL_AT = 50.3;

const VO_TARGET_LUFS = -16;
const lufsCache = new Map();
async function measureLUFS(file) {
  if (lufsCache.has(file)) return lufsCache.get(file);
  const res = await run(ffmpegPath, [
    "-nostdin", "-hide_banner", "-i", file, "-af", "loudnorm=print_format=json", "-f", "null", "-",
  ]).catch((e) => e);
  const m = String(res.stderr).match(/"input_i"\s*:\s*"(-?[\d.]+)"/);
  if (!m) throw new Error(`Could not measure loudness of ${file}`);
  const lufs = parseFloat(m[1]);
  lufsCache.set(file, lufs);
  return lufs;
}

async function finish() {
  const raw = path.join(OUT, `${SLUG}-raw.webm`);
  if (!fs.existsSync(raw)) throw new Error(`Missing ${raw}; run site-tour.mjs first.`);
  const outtag = arg("--outtag", "vW1");
  const final = path.join(OUT, `${SLUG}-60s-${outtag}.mp4`);
  const srt = path.join(OUT, `${SLUG}-60s.srt`);

  const inputs = [];
  MIX.forEach(([f]) => inputs.push("-i", f));
  inputs.push("-i", MUSIC);
  const n = MIX.length;
  const gains = [];
  for (const [f] of MIX) {
    const lufs = await measureLUFS(f);
    gains.push(Math.max(-12, Math.min(12, VO_TARGET_LUFS - lufs)));
  }
  console.log("VO gains: " + gains.map((g) => g.toFixed(1) + "dB").join(", "));

  // video: trim take windows, concat in story order
  let fc = CUTS.map(([a, b], i) =>
    `[0:v]trim=${a}:${b},setpts=PTS-STARTPTS[v${i}]`).join(";");
  fc += ";" + CUTS.map((_, i) => `[v${i}]`).join("") + `concat=n=${CUTS.length}:v=1:a=0[vcat]`;

  fc += ";" + MIX
    .map(([, at], i) => `[${i + 1}:a]volume=${gains[i].toFixed(2)}dB,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[a${i}]`)
    .join(";");
  fc += `;[${n + 1}:a]apad=whole_dur=${DUR},volume='if(lt(t,${SWELL_AT}),0.18,min(0.18+0.1*(t-${SWELL_AT})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${DUR - 3}:d=3[bed]`;
  fc += ";" + MIX.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
  fc += `;[vob]highpass=f=75,dynaudnorm=f=250:g=15:p=0.9:m=4[voe]`;
  fc += `;[voe][bed]amix=inputs=2:normalize=0[mix]`;
  fc += `;[mix]loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
  fc += `;[vcat]subtitles='${srt.replace(/'/g, "\\'")}':fontsdir='${path.join(HERE, "fonts").replace(/'/g, "\\'")}':force_style='FontName=Schibsted Grotesk,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'[vout]`;

  await run(ffmpegPath, [
    "-nostdin", "-y", "-i", raw, ...inputs,
    "-filter_complex", fc,
    "-map", "[vout]", "-map", "[aout]",
    "-t", String(DUR),
    "-c:v", "libx264", "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p", "-r", "30",
    "-c:a", "aac", "-b:a", "192k",
    "-movflags", "+faststart",
    final,
  ]);
  console.log(`Final: ${final}`);
}

finish().catch((e) => { console.error(e); process.exit(1); });
