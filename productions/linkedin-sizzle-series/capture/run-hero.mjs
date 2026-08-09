#!/usr/bin/env node
// Renders Reel 8H, the hero 60: Six Tools extended.
//
//   node run-hero.mjs --build      splice assets into source-hero.built.html
//   node run-hero.mjs --render     record 2560x1440
//   node run-hero.mjs --finish     encode + VO + music + captions  (--outtag vH1)
//
// VO: the hgh-* hero set plus three approved hg-r1 segments (fourapps, l6, l8).
// Film the site take first: node hero-front.mjs (serves from bemo-website/public on :8931).
//
// Audition flags (each films its own raw, suffixed):
//   --meg   split proof beat, Jen then Meg           (INTERNAL until Meg's per-use approval)
//   --mel   split proof beat, Jen then Maryellen     (blanket approval, customer-stories 00-overview)

import { chromium } from "playwright";
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
const SLUG = "bemo-linkedin-sizzle-series-r8h";
// --meg: the split-proof-beat audition (Jen card then Meg card). Internal review
// only until Meg's per-use approval for this placement.
const MEG = process.argv.includes("--meg");
const MEL = process.argv.includes("--mel");
const RAWSUF = MEG ? "-meg" : MEL ? "-mel" : "";
const DUR = 58, TAIL = 2;
const W = 2560, H = 1440;

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const MIX = [
  [path.join(VO, "hgh-l1.wav"), 0.4],
  [path.join(VO, "hg-r1-l5.wav"), 7.0],
  [path.join(VO, "hgh-l2s.wav"), 17.5],
  [path.join(VO, "hgh-l3.wav"), 20.1],
  [path.join(VO, "hgh-l4.wav"), 24.5],
  [path.join(VO, "hg-r1-fourapps.wav"), 31.9],
  [path.join(VO, "hg-r1-l6.wav"), 35.2],
  [path.join(VO, "hgh-l5.wav"), 47.0],
  [path.join(VO, "hg-r1-l8.wav"), 52.5],
];
const MUSIC = path.join(OUT, "sfx", "music-D-ext.wav");
// vH17: the swell waits for the close line to finish (speech ends 55.3). At
// 52.2 it sat under the voice; with the evened chain the voice no longer gets
// pushed above it, so the line sounded buried and limiter-pinched (Becky's
// "off and tinny" note). Bed stays at 0.18 under the words, swells into the tail.
const SWELL_AT = 55.4;
// [file, delaySec, trimStart, trimEnd, volume]
const SFX = [
  [path.join(OUT, "sfx", "typing.mp3"), 0.3, 0.0, 2.3, 0.12],
  [path.join(OUT, "sfx", "chime.mp3"), 15.7, 0.0, 1.4, 0.10],
];

const CAPS = [
  [0.4, 5.9, "How many tabs do you open, just to find out\\Nwhat's happening in your own organization?"],
  [7.0, 12.1, "An email. A call note. A spreadsheet. A message.\\NScattered on their own."],
  [12.1, 17.2, "Held together, they become what your organization knows.\\NAnd it keeps building."],
  [17.5, 20.0, "This is your organization's front page."],
  [20.1, 24.4, "The front page shows what's in play.\\NThe knowledge base tells you what's missing."],
  [24.5, 31.6, "Behind it, BeMo is the first platform where your grant work,\\Nstrategy, and communications share the same memory."],
  [31.9, 34.6, "Four apps. One product."],
  [35.2, 40.5, "So the work comes out finished, in your voice,\\Nwith nothing re-explained."],
  [47.0, 51.3, "Nothing falls on the floor.\\NAnd nothing walks out the door."],
  [52.5, 57.5, "BeMo. Where missions gain momentum."],
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

function build() {
  const tpl = fs.readFileSync(path.join(HERE, "source-hero.html"), "utf8");
  const b64 = (f, mime) =>
    `data:${mime};base64,` + fs.readFileSync(path.join(HERE, "assets", f)).toString("base64");
  const html = tpl
    .replace("{{WORDMARK}}", b64("wordmark.svg", "image/svg+xml"))
    .replace("{{WORDMARK_W}}", b64("wordmark-white.svg", "image/svg+xml"));
  fs.writeFileSync(path.join(HERE, "source-hero.built.html"), html);
  console.log("source-hero.built.html built.");
}

async function render() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
    colorScheme: "light",
    recordVideo: { dir: OUT, size: { width: W, height: H } },
  });
  const page = await context.newPage();
  await page.goto("file://" + path.join(HERE, "source-hero.built.html") + (MEG ? "?meg=1" : MEL ? "?mel=1" : ""));
  await page.addStyleTag({
    content: `
      html, body { background:#000 !important; overflow:hidden !important; margin:0 !important;
        padding:0 !important; display:block !important; width:${W}px !important; height:${H}px !important; }
      #stage { position:fixed !important; top:0 !important; left:0 !important;
        transform:scale(2) !important; transform-origin: top left !important; margin:0 !important; }
    `,
  });
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(() => Promise.all(
    [...document.querySelectorAll("video")].map((v) => new Promise((r) => {
      if (v.readyState >= 3) return r();
      v.addEventListener("canplaythrough", r, { once: true });
      v.load();
    }))));
  await page.evaluate(() => window.restart());
  console.log(`Recording hero for ${DUR + TAIL}s at ${W}x${H}...`);
  await page.waitForTimeout((DUR + TAIL) * 1000);
  await context.close();
  await browser.close();

  const cutoff = Date.now() - 5 * 60 * 1000;
  const webm = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm") && !f.startsWith("live-") && !f.startsWith("bemo-") && !f.startsWith("hero-"))
    .map((f) => path.join(OUT, f))
    .filter((f) => fs.statSync(f).mtimeMs > cutoff)
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  if (!webm) throw new Error("No fresh recording found in out/");
  const named = path.join(OUT, `${SLUG}-raw-60s${RAWSUF}.webm`);
  fs.renameSync(webm, named);
  console.log(`Raw: ${named}`);
}

// vH14 (Becky's evenness note, Aug 9): match segments on what the ear compares,
// the level while she is speaking, not whole-file integrated loudness, which the
// segments' differing silence padding skews. Median momentary loudness over
// speech-active frames (within 12 LU of the segment's own peak).
const VO_SPEECH_TARGET = -17.5;
const VO_BUS_MAKEUP = 2.7; // linear gain after the uniform compressor (~ +8.6dB)
const MASTER_TARGET_I = -15.8; // vH13's delivered integrated loudness
const VO_BUS_CHAIN = `highpass=f=75,acompressor=threshold=0.05:ratio=2:attack=6:release=150:makeup=${VO_BUS_MAKEUP},alimiter=limit=0.891:attack=3:release=80:level=false`;
const speechCache = new Map();
async function measureSpeechMedian(file) {
  if (speechCache.has(file)) return speechCache.get(file);
  const res = await run(ffmpegPath, [
    "-nostdin", "-hide_banner", "-loglevel", "verbose", "-i", file,
    "-af", "ebur128=framelog=verbose", "-f", "null", "-",
  ], { maxBuffer: 64e6 }).catch((e) => e);
  const M = [...String(res.stderr).matchAll(/M:\s*(-?[\d.]+)/g)].map((m) => parseFloat(m[1]));
  const peak = Math.max(...M);
  const act = M.filter((v) => v > peak - 12).sort((a, b) => a - b);
  if (!act.length) throw new Error(`Could not measure speech level of ${file}`);
  const med = act[Math.floor(act.length / 2)];
  speechCache.set(file, med);
  return med;
}

// Speech median after the gain and the shared bus chain: because segments never
// overlap in time, running one segment through the bus filters predicts exactly
// how it will sit in the mixed [voe] bus.
async function measurePostChain(file, gainDb) {
  const key = `${file}|${gainDb.toFixed(2)}`;
  if (speechCache.has(key)) return speechCache.get(key);
  const res = await run(ffmpegPath, [
    "-nostdin", "-hide_banner", "-loglevel", "verbose", "-i", file,
    "-af", `volume=${gainDb.toFixed(2)}dB,${VO_BUS_CHAIN},ebur128=framelog=verbose`,
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
  const raw = path.join(OUT, `${SLUG}-raw-60s${RAWSUF}.webm`);
  if (!fs.existsSync(raw)) throw new Error(`Missing ${raw}; render first.`);
  const dur = DUR + TAIL;
  const outtag = arg("--outtag", "vH1");
  const final = path.join(OUT, `${SLUG}-60s-${outtag}.mp4`);
  const srt = path.join(OUT, `${SLUG}-60s.srt`);
  writeSrt(srt);

  const segs = MIX;
  const inputs = [];
  segs.forEach(([f]) => inputs.push("-i", f));
  inputs.push("-i", MUSIC);
  const n = segs.length;
  const gains = [];
  for (const [f] of segs) {
    const med = await measureSpeechMedian(f);
    gains.push(Math.max(-12, Math.min(12, VO_SPEECH_TARGET - med)));
  }
  // Second pass: equalize what actually leaves the bus chain. The compressor's
  // 2:1 slope halves input trims above threshold, so correct by 2x, twice.
  for (let pass = 0; pass < 2; pass++) {
    const posts = [];
    for (let i = 0; i < segs.length; i++) posts.push(await measurePostChain(segs[i][0], gains[i]));
    const target = posts.reduce((a, b) => a + b, 0) / posts.length;
    let worst = 0;
    for (let i = 0; i < segs.length; i++) {
      const err = target - posts[i];
      worst = Math.max(worst, Math.abs(err));
      gains[i] = Math.max(-12, Math.min(12, gains[i] + Math.max(-3, Math.min(3, err * 2))));
    }
    console.log(`VO evenness pass ${pass + 1}: post-chain spread ${(Math.max(...posts) - Math.min(...posts)).toFixed(2)} LU, worst err ${worst.toFixed(2)}`);
    if (worst < 0.2) break;
  }
  console.log("VO gains: " + gains.map((g) => g.toFixed(1) + "dB").join(", "));
  let fc = segs
    .map(([, at], i) => `[${i + 1}:a]volume=${gains[i].toFixed(2)}dB,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[a${i}]`)
    .join(";");
  // Jen beat (41.2-46.2): the music rises to fill the silence, +0.12 over base.
  // vH13 scored a duck there, but its dynamic master boosted the quiet stretch
  // ~8dB and that rise is the sound Becky approved; with the fixed master (vH14)
  // the rise is scored on purpose instead of appearing by accident.
  fc += `;[${n + 1}:a]apad=whole_dur=${dur},volume='if(lt(t,${SWELL_AT}),0.18+0.04*clip((t-16.2)/0.6,0,1)-0.04*clip((t-23.9)/0.6,0,1)+0.12*clip((t-41.2)/0.6,0,1)-0.12*clip((t-46.2)/0.6,0,1),min(0.18+0.1*(t-${SWELL_AT})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${dur - 3}:d=3[musv]`;
  SFX.forEach(([f]) => inputs.push("-i", f));
  SFX.forEach(([, at, t0, t1, vol], i) => {
    fc += `;[${n + 2 + i}:a]atrim=${t0}:${t1},asetpts=PTS-STARTPTS,volume=${vol},afade=t=in:d=0.2,afade=t=out:st=${Math.max(t1 - t0 - 0.35, 0)}:d=0.35,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[sx${i}]`;
  });
  fc += `;[musv]` + SFX.map((_, i) => `[sx${i}]`).join("") + `amix=inputs=${SFX.length + 1}:normalize=0[bed]`;
  fc += ";" + segs.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
  // vH14: dynaudnorm dropped. It re-leveled each 250ms frame toward full scale
  // (up to +12dB), so breaths, tails, and each segment's own noise floor came up
  // by different amounts: the per-segment pumping Becky heard as separate
  // recordings. One uniform compressor + limiter instead, identical for every
  // segment; VO_BUS_MAKEUP tuned so speech sits at vH13's level over the music.
  fc += `;[vob]${VO_BUS_CHAIN}[voe]`;
  fc += `;[voe][bed]amix=inputs=2:normalize=0[mix]`;
  // vH14: the master is a measured fixed gain + limiter, not dynamic loudnorm,
  // whose time-varying gain crept upward after quiet passages (another source of
  // "different recordings"). Probe pass measures the mix, then one gain for the
  // whole minute.
  const probe = await run(ffmpegPath, [
    "-nostdin", "-hide_banner", "-i", raw, ...inputs,
    "-filter_complex", fc + `;[mix]loudnorm=print_format=json[aout]`,
    "-map", "[aout]", "-t", String(dur), "-f", "null", "-",
  ], { maxBuffer: 64e6 }).catch((e) => e);
  const pm = String(probe.stderr).match(/"input_i"\s*:\s*"(-?[\d.]+)"/);
  if (!pm) throw new Error("Master probe failed to measure the mix");
  const masterGain = MASTER_TARGET_I - parseFloat(pm[1]);
  console.log(`Master: mix at ${pm[1]} LUFS, gain ${masterGain.toFixed(2)}dB to ${MASTER_TARGET_I}`);
  fc += `;[mix]volume=${masterGain.toFixed(2)}dB,alimiter=limit=0.813:attack=5:release=100:level=false[aout]`;
  fc += `;[0:v]scale=1920:1080[vs]`;
  fc += `;[vs]subtitles='${srt.replace(/'/g, "\\'")}':fontsdir='${path.join(HERE, "fonts").replace(/'/g, "\\'")}':force_style='FontName=Schibsted Grotesk,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'[vout]`;

  await run(ffmpegPath, [
    "-nostdin", "-y", "-i", raw, ...inputs,
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

const mode = process.argv.includes("--build") ? build
  : process.argv.includes("--finish") ? finish
  : render;
Promise.resolve(mode()).catch((e) => { console.error(e); process.exit(1); });
