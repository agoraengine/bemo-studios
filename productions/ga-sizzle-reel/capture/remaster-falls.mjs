#!/usr/bin/env node
// The "falls" remaster (Becky, 2026-08-09): the close of S0 changes from
// "Nothing drops on the floor." to "Nothing falls on the floor.", matching the
// ratified Home outcome line (ga-message-map.md, reworded Aug 6) and the hero
// reel. Only the 60s cuts carry the line; the 30s finals are untouched.
//
// The replacement sentence is sliced from the hero's approved Avatar V read
// (../linkedin-sizzle-series/.../hgh-l5.wav, first sentence). Becky's real
// Voice Memos read stays the source for every other word; if the pipeline seam
// at 0:36 is audible to her, the pickup line in ../vo-recording-sheet.md
// replaces the slice with her live read (re-run this script after dropping
// b-l6b-falls.wav next to b-l6.wav).
//
//   node remaster-falls.mjs          patch audio + rebuild both 60s finals
//
// Method: music sits at offset 0 in the mix (verified by correlation, r=0.999),
// so the patch window [36.42, 38.14] is rebuilt as music-from-stem + the falls
// sentence, gains matched by RMS measurement, 25ms fades at the joins, total
// length preserved. Captions re-burned from the updated -burn.srt over the
// patched master, then the shipped loudness (-14.2 LUFS) reapplied as a fixed
// measured gain.

import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");
const run = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");

const MIX = path.join(OUT, "bemo-ga-sizzle-reel-60s-v7-vo-music.mp4");
const MUSIC = path.join(OUT, "vo", "music-83197124.wav");
const PICKUP = path.join(OUT, "vo", "becky", "b-l6b-falls.wav"); // Becky's live read, if recorded
const HERO_L5 = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "out", "vo", "becky", "hgh-l5.wav");
const BURN_SRT = path.join(OUT, "bemo-ga-sizzle-reel-60s-burn.srt");
const FONTS = path.join(HERE, "fonts");

// Patch geometry. The drops sentence occupied 36.45-38.10 (srt cue 13).
const P0 = 36.42, P1 = 38.14;           // replaced stretch of the mix
const VO_AT = 36.45;                     // where the new sentence lands
const SRC = fs.existsSync(PICKUP) ? PICKUP : HERO_L5;
const SRC_IN = SRC === PICKUP ? 0 : 0;   // sentence start within the source
const SRC_OUT = SRC === PICKUP ? null : 1.5; // hgh-l5: sentence one ends at ~1.39, gap to 1.77

const TARGET_I = -14.2; // the shipped finals' integrated loudness

async function pcm(file, ss, dur) {
  const tmp = path.join(OUT, `tmp-${process.pid}-${Math.random().toString(36).slice(2)}.f32`);
  await run(ffmpegPath, ["-nostdin", "-y", "-ss", String(ss), "-i", file, "-t", String(dur),
    "-ac", "1", "-ar", "8000", "-f", "f32le", tmp], { maxBuffer: 64e6 });
  const buf = fs.readFileSync(tmp);
  fs.unlinkSync(tmp);
  return new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4);
}
const rms = (a) => Math.sqrt(a.reduce((s, v) => s + v * v, 0) / a.length);
const db = (x) => 20 * Math.log10(x);

async function loudness(file) {
  const r = await run(ffmpegPath, ["-nostdin", "-hide_banner", "-i", file,
    "-af", "loudnorm=print_format=json", "-f", "null", "-"], { maxBuffer: 64e6 }).catch((e) => e);
  const g = (k) => parseFloat((String(r.stderr).match(new RegExp(`"${k}"\\s*:\\s*"(-?[\\d.]+)"`)) || [])[1]);
  return { I: g("input_i"), TP: g("input_tp") };
}

async function main() {
  console.log(`VO source: ${path.basename(SRC)}${SRC === HERO_L5 ? " (Avatar V slice; record the pickup to replace)" : " (Becky's live pickup)"}`);

  // Gains by measurement. The mix's music is ducked under narration, so
  // calibrate on the music-only breath right after the sentence (38.28-38.72),
  // not on a far-away stretch where the bed runs louder.
  const musInMix = rms(await pcm(MIX, 38.28, 0.44));
  const musStem = rms(await pcm(MUSIC, 38.28, 0.44));
  const musGainDb = db(musInMix / musStem);
  const mixRegion = rms(await pcm(MIX, 36.55, 1.4));    // old sentence, VO + ducked music
  const musRegion = rms(await pcm(MUSIC, 36.55, 1.4)) * (musInMix / musStem);
  const voInMix = Math.sqrt(Math.max(mixRegion ** 2 - musRegion ** 2, 1e-12));
  const voSrc = rms(await pcm(SRC, SRC_IN + 0.05, 1.25));
  const voGainDb = db(voInMix / voSrc);
  console.log(`music gain ${musGainDb.toFixed(2)}dB, falls VO gain ${voGainDb.toFixed(2)}dB`);

  // Patch the master's audio; video stream is copied untouched.
  const patched = path.join(OUT, "bemo-ga-sizzle-reel-60s-v8-vo-music-falls.mp4");
  const segDur = P1 - P0;
  const voLen = (SRC_OUT ?? 1.5) - SRC_IN;
  const fc = [
    `[0:a]atrim=0:${P0},asetpts=PTS-STARTPTS,afade=t=out:st=${P0 - 0.025}:d=0.025[pre]`,
    `[1:a]atrim=${P0}:${P1},asetpts=PTS-STARTPTS,volume=${musGainDb.toFixed(2)}dB,afade=t=in:d=0.025,afade=t=out:st=${segDur - 0.025}:d=0.025[pm]`,
    `[2:a]atrim=${SRC_IN}:${SRC_OUT ?? 99},asetpts=PTS-STARTPTS,volume=${voGainDb.toFixed(2)}dB,afade=t=in:d=0.02,afade=t=out:st=${voLen - 0.12}:d=0.12,adelay=${Math.round((VO_AT - P0) * 1000)}|${Math.round((VO_AT - P0) * 1000)},apad=whole_dur=${segDur}[pv]`,
    `[pm][pv]amix=inputs=2:normalize=0,atrim=0:${segDur},asetpts=PTS-STARTPTS[patch]`,
    `[0:a]atrim=${P1},asetpts=PTS-STARTPTS,afade=t=in:d=0.025[post]`,
    `[pre][patch][post]concat=n=3:v=0:a=1[aout]`,
  ].join(";");
  await run(ffmpegPath, ["-nostdin", "-y", "-i", MIX, "-i", MUSIC, "-i", SRC,
    "-filter_complex", fc, "-map", "0:v", "-map", "[aout]",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", patched]);
  console.log(`Patched master: ${patched}`);

  // Loudness to the shipped level, as one fixed gain. The limiter eats some of
  // it, so converge on audio-only passes (cheap) before burning video.
  const { I } = await loudness(patched);
  let gain = TARGET_I - I;
  for (let pass = 0; pass < 3; pass++) {
    const tmp = path.join(OUT, "tmp-master-probe.wav");
    await run(ffmpegPath, ["-nostdin", "-y", "-i", patched, "-vn",
      "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=0.977:attack=5:release=100:level=false`, tmp]);
    const got = (await loudness(tmp)).I;
    fs.unlinkSync(tmp);
    console.log(`gain ${gain.toFixed(2)}dB lands at ${got} LUFS (target ${TARGET_I})`);
    if (Math.abs(got - TARGET_I) <= 0.25) break;
    gain += TARGET_I - got;
  }

  // Re-burn captions: horizontal, then the center-crop vertical.
  const style = (size, marginV) =>
    `FontName=Geist,FontSize=${size},PrimaryColour=&H003A2A1A,BorderStyle=4,` +
    `BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=${marginV}`;
  const srtEsc = BURN_SRT.replace(/'/g, "\\'");
  const fontsEsc = FONTS.replace(/'/g, "\\'");

  const finalH = path.join(OUT, "bemo-ga-sizzle-reel-60s-final-captioned-falls.mp4");
  await run(ffmpegPath, ["-nostdin", "-y", "-i", patched,
    "-vf", `subtitles='${srtEsc}':fontsdir='${fontsEsc}':force_style='${style(12, 22)}'`,
    "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=0.977:attack=5:release=100:level=false`,
    "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30",
    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", finalH]);
  console.log(`Final 16:9: ${finalH}`);

  const finalV = path.join(OUT, "bemo-ga-sizzle-reel-60s-final-captioned-falls-vertical.mp4");
  await run(ffmpegPath, ["-nostdin", "-y", "-i", patched,
    "-vf", `crop=ih*9/16:ih,scale=1080:1920,subtitles='${srtEsc}':fontsdir='${fontsEsc}':force_style='${style(7.6, 21)}'`,
    "-af", `volume=${gain.toFixed(2)}dB,alimiter=limit=0.977:attack=5:release=100:level=false`,
    "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30",
    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", finalV]);
  console.log(`Final 9:16: ${finalV}`);

  for (const f of [finalH, finalV]) {
    const l = await loudness(f);
    console.log(`${path.basename(f)}: I ${l.I} LUFS, TP ${l.TP} dBTP`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
