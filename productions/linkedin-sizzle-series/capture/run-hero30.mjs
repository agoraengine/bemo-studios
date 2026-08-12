#!/usr/bin/env node
// Renders the Six Tools 30 (series reel 1's launch-post cut) as a true cutdown
// of the approved hero vH18: same raw film, same VO stems, same mix chain.
// No new capture. Becky's call, Aug 11: rebuild the 30 from the 60, not from
// the retired v13 creative.
//
//   node run-hero30.mjs --variant a   first act, then brand close   (~32s)
//   node run-hero30.mjs --variant b   adds the "Nothing falls on the floor."
//                                     card between them             (~35s)
//   node run-hero30.mjs --variant c   Becky's Aug 11 notes on a/b: the full
//                                     paired close ("...nothing walks out the
//                                     door") and a dissolve at the one splice
//                                     instead of a hard cut         (~37s)
//
// Video is spliced from out/bemo-linkedin-sizzle-series-r8h-raw-60s.webm at
// scene boundaries (sFront ends 24.3, sPair 46.8-52.2, sClose starts 52.2).
// The music arc is re-scored for the shorter runtime; the swell still waits
// for the close line to finish (the vH17 rule).

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
const RAW = path.join(OUT, "bemo-linkedin-sizzle-series-r8h-raw-60s.webm");
const SLUG = "bemo-linkedin-sizzle-series-r8-30s";
const MUSIC = path.join(OUT, "sfx", "music-D-ext.wav");

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}
const VARIANT = arg("--variant", "a").toLowerCase();

// The shared first act: hero video 0 to 24.3 (six-tools pile + the filmed
// front-page assembly), VO and SFX at their hero times.
const ACT1_END = 24.3;
const ACT1_MIX = [
  [path.join(VO, "hgh-l1.wav"), 0.4, null],
  [path.join(VO, "hg-r1-l5.wav"), 7.0, null],
  [path.join(VO, "hgh-l2s.wav"), 17.5, null],
  [path.join(VO, "hgh-l3.wav"), 20.1, null],
];
const ACT1_CAPS = [
  [0.4, 5.9, "How many tabs do you open, just to find out\\Nwhat's happening in your own organization?"],
  [7.0, 12.1, "An email. A call note. A spreadsheet. A message.\\NScattered on their own."],
  [12.1, 17.2, "Held together, they become what your organization knows.\\NAnd it keeps building."],
  [17.5, 20.0, "This is your organization's front page."],
  [20.1, 24.4, "The front page shows what's in play.\\NThe knowledge base tells you what's missing."],
];

// Variant assembly. Each video part is [rawFrom, rawTo]; VO entries are
// [file, delaySec, [trimStart, trimEnd] | null]. hgh-l5 holds both close-pair
// sentences; variant b takes only the first ("Nothing falls on the floor.",
// speech ends 1.39, cut at 1.55 inside the sentence gap).
let PARTS, MIX, CAPS, SWELL_AT, DUR, XFADE = 0;
if (VARIANT === "a") {
  PARTS = [[0, ACT1_END], [52.2, 60]];
  MIX = [...ACT1_MIX, [path.join(VO, "hgh-l8.wav"), 24.6, null]];
  CAPS = [...ACT1_CAPS, [24.6, 29.6, "BeMo. Where missions gain momentum."]];
  SWELL_AT = 27.5; // close speech ends ~27.4
  DUR = 30.1;
} else if (VARIANT === "b") {
  PARTS = [[0, ACT1_END], [46.8, 49.3], [52.2, 60]];
  MIX = [
    ...ACT1_MIX,
    [path.join(VO, "hgh-l5.wav"), 24.5, [0, 1.55]],
    [path.join(VO, "hgh-l8.wav"), 27.1, null],
  ];
  CAPS = [
    ...ACT1_CAPS,
    [24.5, 26.6, "Nothing falls on the floor."],
    [27.1, 32.1, "BeMo. Where missions gain momentum."],
  ];
  SWELL_AT = 30.0; // close speech ends ~29.9
  DUR = 32.6;
} else if (VARIANT === "c") {
  // Pair and brand close are contiguous in the hero raw (46.8 to 60), so the
  // cut has exactly one seam, dissolved over 0.45s while the front page holds
  // a cloned frame. Raw times map as new = raw - 22.5; every relative timing
  // from the approved hero survives (l5 lands 0.2s after the pair scene opens,
  // l8 lands 0.3s after the close scene opens, swell after speech ends).
  PARTS = [[0, ACT1_END], [46.8, 60]];
  XFADE = 0.45;
  MIX = [
    ...ACT1_MIX,
    [path.join(VO, "hgh-l5.wav"), 24.5, null],
    [path.join(VO, "hgh-l8.wav"), 30.0, null],
  ];
  CAPS = [
    ...ACT1_CAPS,
    [24.5, 28.8, "Nothing falls on the floor.\\NAnd nothing walks out the door."],
    [30.0, 35.0, "BeMo. Where missions gain momentum."],
  ];
  SWELL_AT = 32.9; // close speech ends ~32.8
  DUR = 35.5;
} else {
  throw new Error(`Unknown variant "${VARIANT}"; use a, b, or c.`);
}
const TAIL = 2;
const SFX = [
  [path.join(OUT, "sfx", "typing.mp3"), 0.3, 0.0, 2.3, 0.12],
  [path.join(OUT, "sfx", "chime.mp3"), 15.7, 0.0, 1.4, 0.10],
];

function srtTime(s) {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  const ms = String(Math.round((s % 1) * 1000)).padStart(3, "0");
  return `${h}:${m}:${sec},${ms}`;
}
function writeSrt(file) {
  const body = CAPS.map(([a, b, tx], i) =>
    `${i + 1}\n${srtTime(a)} --> ${srtTime(b)}\n${tx.replace(/\\N/g, "\n")}\n`).join("\n");
  fs.writeFileSync(file, body);
}

// The ratified vH18 chain (run-hero.mjs): speech-median segment matching with a
// post-chain trim pass, one uniform VO bus, probe-measured fixed master.
const VO_SPEECH_TARGET = -17.5;
const VO_BUS_MAKEUP = 2.7;
const MASTER_TARGET_I = -15.8;
const VO_BUS_CHAIN = `highpass=f=75,acompressor=threshold=0.05:ratio=2:attack=6:release=150:makeup=${VO_BUS_MAKEUP},lowshelf=g=2.5:f=220:width_type=q:width=0.6,alimiter=limit=0.891:attack=3:release=80:level=false`;
const speechCache = new Map();
function segFilter(trim) {
  return trim ? `atrim=${trim[0]}:${trim[1]},asetpts=PTS-STARTPTS,afade=t=out:st=${Math.max(trim[1] - trim[0] - 0.15, 0)}:d=0.15,` : "";
}
async function measureSpeechMedian(file, trim) {
  const key = `${file}|${trim ? trim.join("-") : "full"}`;
  if (speechCache.has(key)) return speechCache.get(key);
  const res = await run(ffmpegPath, [
    "-nostdin", "-hide_banner", "-loglevel", "verbose", "-i", file,
    "-af", `${segFilter(trim)}ebur128=framelog=verbose`, "-f", "null", "-",
  ], { maxBuffer: 64e6 }).catch((e) => e);
  const M = [...String(res.stderr).matchAll(/M:\s*(-?[\d.]+)/g)].map((m) => parseFloat(m[1]));
  const peak = Math.max(...M);
  const act = M.filter((v) => v > peak - 12).sort((a, b) => a - b);
  if (!act.length) throw new Error(`Could not measure speech level of ${file}`);
  const med = act[Math.floor(act.length / 2)];
  speechCache.set(key, med);
  return med;
}
async function measurePostChain(file, trim, gainDb) {
  const key = `${file}|${trim ? trim.join("-") : "full"}|${gainDb.toFixed(2)}`;
  if (speechCache.has(key)) return speechCache.get(key);
  const res = await run(ffmpegPath, [
    "-nostdin", "-hide_banner", "-loglevel", "verbose", "-i", file,
    "-af", `${segFilter(trim)}volume=${gainDb.toFixed(2)}dB,${VO_BUS_CHAIN},ebur128=framelog=verbose`,
    "-f", "null", "-",
  ], { maxBuffer: 64e6 }).catch((e) => e);
  const M = [...String(res.stderr).matchAll(/M:\s*(-?[\d.]+)/g)].map((m) => parseFloat(m[1]));
  const peak = Math.max(...M);
  const act = M.filter((v) => v > peak - 12).sort((a, b) => a - b);
  if (!act.length) throw new Error(`Could not measure post-chain level of ${file}`);
  const med = act[Math.floor(act.length / 2)];
  speechCache.set(key, med);
  return med;
}

async function finish() {
  if (!fs.existsSync(RAW)) throw new Error(`Missing ${RAW}; the hero raw is the source.`);
  const dur = DUR + TAIL;
  const outtag = arg("--outtag", `v${VARIANT.toUpperCase()}1`);
  const final = path.join(OUT, `${SLUG}-${outtag}.mp4`);
  const srt = path.join(OUT, `${SLUG}-${VARIANT}.srt`);
  writeSrt(srt);

  const inputs = [];
  MIX.forEach(([f]) => inputs.push("-i", f));
  inputs.push("-i", MUSIC);
  const n = MIX.length;
  const gains = [];
  for (const [f, , trim] of MIX) {
    const med = await measureSpeechMedian(f, trim);
    gains.push(Math.max(-12, Math.min(12, VO_SPEECH_TARGET - med)));
  }
  for (let pass = 0; pass < 2; pass++) {
    const posts = [];
    for (let i = 0; i < MIX.length; i++) posts.push(await measurePostChain(MIX[i][0], MIX[i][2], gains[i]));
    const target = posts.reduce((a, b) => a + b, 0) / posts.length;
    let worst = 0;
    for (let i = 0; i < MIX.length; i++) {
      const err = target - posts[i];
      worst = Math.max(worst, Math.abs(err));
      gains[i] = Math.max(-12, Math.min(12, gains[i] + Math.max(-3, Math.min(3, err * 2))));
    }
    console.log(`VO evenness pass ${pass + 1}: post-chain spread ${(Math.max(...posts) - Math.min(...posts)).toFixed(2)} LU, worst err ${worst.toFixed(2)}`);
    if (worst < 0.2) break;
  }
  console.log("VO gains: " + gains.map((g) => g.toFixed(1) + "dB").join(", "));

  let fc = MIX
    .map(([, at, trim], i) => `[${i + 1}:a]${segFilter(trim)}volume=${gains[i].toFixed(2)}dB,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[a${i}]`)
    .join(";");
  // Music arc, re-scored for the short runtime: the 16.2/23.9 move under the
  // chime and the front-page hold survives from the hero; the Jen rise does not
  // exist here; the swell waits for the close line to finish, then the 3s out.
  fc += `;[${n + 1}:a]apad=whole_dur=${dur},volume='if(lt(t,${SWELL_AT}),0.18+0.04*clip((t-16.2)/0.6,0,1)-0.04*clip((t-23.9)/0.6,0,1),min(0.18+0.1*(t-${SWELL_AT})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${dur - 3}:d=3[musv]`;
  SFX.forEach(([f]) => inputs.push("-i", f));
  SFX.forEach(([, at, t0, t1, vol], i) => {
    fc += `;[${n + 2 + i}:a]atrim=${t0}:${t1},asetpts=PTS-STARTPTS,volume=${vol},afade=t=in:d=0.2,afade=t=out:st=${Math.max(t1 - t0 - 0.35, 0)}:d=0.35,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[sx${i}]`;
  });
  fc += `;[musv]` + SFX.map((_, i) => `[sx${i}]`).join("") + `amix=inputs=${SFX.length + 1}:normalize=0[bed]`;
  fc += ";" + MIX.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
  fc += `;[vob]${VO_BUS_CHAIN}[voe]`;
  fc += `;[voe][bed]amix=inputs=2:normalize=0[mix]`;

  const probe = await run(ffmpegPath, [
    "-nostdin", "-hide_banner", "-i", RAW, ...inputs,
    "-filter_complex", fc + `;[mix]loudnorm=print_format=json[aout]`,
    "-map", "[aout]", "-t", String(dur), "-f", "null", "-",
  ], { maxBuffer: 64e6 }).catch((e) => e);
  const pm = String(probe.stderr).match(/"input_i"\s*:\s*"(-?[\d.]+)"/);
  if (!pm) throw new Error("Master probe failed to measure the mix");
  const masterGain = MASTER_TARGET_I - parseFloat(pm[1]);
  console.log(`Master: mix at ${pm[1]} LUFS, gain ${masterGain.toFixed(2)}dB to ${MASTER_TARGET_I}`);
  fc += `;[mix]volume=${masterGain.toFixed(2)}dB,alimiter=limit=0.813:attack=5:release=100:level=false[aout]`;

  // The video splice: scene-boundary trims from the hero raw, then the hero's
  // delivery scale and caption burn. With XFADE set, the two parts dissolve
  // (xfade needs constant fps and matching timebases; the front page freezes a
  // cloned frame under the blend, invisible because the film has settled).
  fc += `;[0:v]split=${PARTS.length}` + PARTS.map((_, i) => `[p${i}]`).join("");
  if (XFADE) {
    const [a0, b0] = PARTS[0];
    const [a1, b1] = PARTS[1];
    fc += `;[p0]trim=${a0}:${b0},setpts=PTS-STARTPTS,fps=30,settb=AVTB,tpad=stop_mode=clone:stop_duration=${XFADE}[t0]`;
    fc += `;[p1]trim=${a1}:${b1},setpts=PTS-STARTPTS,fps=30,settb=AVTB[t1]`;
    fc += `;[t0][t1]xfade=transition=fade:duration=${XFADE}:offset=${b0 - a0}[vcat]`;
  } else {
    PARTS.forEach(([a, b], i) => {
      fc += `;[p${i}]trim=${a}:${b},setpts=PTS-STARTPTS[t${i}]`;
    });
    fc += `;` + PARTS.map((_, i) => `[t${i}]`).join("") + `concat=n=${PARTS.length}:v=1:a=0[vcat]`;
  }
  fc += `;[vcat]scale=1920:1080[vs]`;
  // --wordmark: the persistent corner mark from the Google Workspace reference
  // (reference-google-workspace-reel.md adoption 6), post-only so the approved
  // film is untouched. Becky's Aug 12 notes: bottom right, and gone in the
  // brand close where the lockup already appears. The color mark carries the
  // light front act; the white mark carries the navy pair scene, swapping at
  // the dissolve, and drops out before the close scene starts.
  // The two PNGs are gitignored derivatives of assets/wordmark.svg and
  // assets/wordmark-white.svg: rasterize each at 200px wide, 2x scale,
  // transparent background (playwright screenshot of the inline svg) to
  // assets/wordmark-200.png and assets/wordmark-white-200.png.
  if (process.argv.includes("--wordmark")) {
    const closeStart = ACT1_END + (52.2 - 46.8); // brand close scene, new time
    const base = MIX.length + 2 + SFX.length;
    // -loop 1 turns each still into a continuous stream; without it the fade
    // filters see a single frame at t=0 and never run (the vC3 ghost-mark bug).
    inputs.push("-loop", "1", "-i", path.join(HERE, "assets", "wordmark-200.png"));
    inputs.push("-loop", "1", "-i", path.join(HERE, "assets", "wordmark-white-200.png"));
    fc += `;[${base}:v]scale=150:-1,format=rgba,colorchannelmixer=aa=0.5,fade=t=out:st=${ACT1_END - 0.4}:d=0.4:alpha=1[wmc]`;
    fc += `;[${base + 1}:v]scale=150:-1,format=rgba,colorchannelmixer=aa=0.5,fade=t=in:st=${ACT1_END}:d=0.4:alpha=1,fade=t=out:st=${(closeStart - 0.4).toFixed(2)}:d=0.4:alpha=1[wmw]`;
    fc += `;[vs][wmc]overlay=main_w-overlay_w-64:main_h-overlay_h-48[vsc]`;
    fc += `;[vsc][wmw]overlay=main_w-overlay_w-64:main_h-overlay_h-48[vsw]`;
  }
  fc += `;[${process.argv.includes("--wordmark") ? "vsw" : "vs"}]subtitles='${srt.replace(/'/g, "\\'")}':fontsdir='${path.join(HERE, "fonts").replace(/'/g, "\\'")}':force_style='FontName=Schibsted Grotesk,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'[vout]`;

  await run(ffmpegPath, [
    "-nostdin", "-y", "-i", RAW, ...inputs,
    "-filter_complex", fc,
    "-map", "[vout]", "-map", "[aout]",
    "-t", String(dur),
    "-c:v", "libx264", "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p", "-r", "30",
    "-c:a", "aac", "-b:a", "192k",
    "-movflags", "+faststart",
    final,
  ]);
  console.log(`Final: ${final}`);
}

finish().catch((e) => { console.error(e); process.exit(1); });
