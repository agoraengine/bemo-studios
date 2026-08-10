#!/usr/bin/env node
// Renders Becky's press release share cut (script.md v1, 2026-08-09).
//
//   node run-press.mjs --build      splice wordmark into source-press.built.html
//   node run-press.mjs --render     record 2560x1440
//   node run-press.mjs --finish     encode + VO + music + captions  (--outtag v1)
//
// VO: pr-l1..l8 in out/vo/, generated via HeyGen create_speech on Becky's voice
// (speech endpoint end to end, one pipeline per track). Audio chain copied from
// the hero's vH14 finish: per-segment speech-median leveling, one uniform bus
// compressor, fixed-gain master. Music is the series' approved music-D bed.

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
const VO = path.join(OUT, "vo");
const SLUG = "common-table-press-release-becky";
const DUR = 58.5, TAIL = 1.5;
const W = 2560, H = 1440;

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const MIX = [
  [path.join(VO, "pr-l1.wav"), 0.4],
  [path.join(VO, "pr-l2.wav"), 4.8],
  [path.join(VO, "pr-l3.wav"), 16.4],
  [path.join(VO, "pr-l4.wav"), 24.5],
  [path.join(VO, "pr-l5.wav"), 33.0],
  [path.join(VO, "pr-l6.wav"), 39.2],
  [path.join(VO, "pr-l7.wav"), 47.2],
  [path.join(VO, "pr-l8.wav"), 54.0],
];
// --music d|warm|build: d is the series bed the hero wears; warm and build are
// audition alternates for Becky's ear. build is 53s, so it enters under the
// second card (5.5s) and lands at the close instead of padding out silent.
const SFX_DIR = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "out", "sfx");
const MUSIC_OPTS = {
  d: { file: "music-D-ext.wav", delay: 0 },
  warm: { file: "music-warm-acoustic.wav", delay: 0 },
  build: { file: "music-60-build.wav", delay: 5.5 },
};
const SWELL_AT = 53.4;

// burn:false rows duplicate a typographic card verbatim; they stay in the .srt
// sidecar for real caption tracks but are not burned into the picture (the
// card is the reading layer, same rule as the Academy no-doubling decision).
const CAPS = [
  [0.4, 4.3, "I've been writing and editing press releases\\Nmy entire career.", false],
  [4.8, 7.0, "And the work never begins with the writing.", false],
  [7.3, 10.6, "It begins with the hunt: numbers in a spreadsheet,", true],
  [10.7, 15.2, "history in someone's head, boilerplate\\Nin whichever doc used it last.", true],
  [16.4, 22.0, "So here's one taking shape inside BeMo, where\\Nthe organization's knowledge already lives.", true],
  [24.5, 32.5, "Before anyone types a word, the boilerplate, the media\\Ncontact, the organization's own facts show up on their own.", true],
  [33.0, 38.4, "You answer the questions only a person can answer:\\Nwhat you're announcing, and why it matters.", true],
  [39.2, 46.2, "And the draft comes back sounding like the organization:\\Nits programs, its numbers, its own words.", true],
  [47.2, 53.2, "Every piece of content reflects who you actually are,\\Nnot who you were three drafts ago.", false],
  [54.0, 57.3, "BeMo. Where missions gain momentum.", false],
];

function srtTime(s) {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  const ms = String(Math.round((s % 1) * 1000)).padStart(3, "0");
  return `${h}:${m}:${sec},${ms}`;
}
function writeSrt(file, rows) {
  const body = rows.map(([a, b, tx], i) =>
    `${i + 1}\n${srtTime(a)} --> ${srtTime(b)}\n${tx.replace(/\\N/g, "\n")}\n`).join("\n");
  fs.writeFileSync(file, body);
}

function build() {
  const tpl = fs.readFileSync(path.join(HERE, "source-press.html"), "utf8");
  const b64 = (f, mime) =>
    `data:${mime};base64,` + fs.readFileSync(path.join(HERE, "assets", f)).toString("base64");
  const html = tpl
    .replace("{{WORDMARK_W}}", b64("wordmark-white.svg", "image/svg+xml"))
    .replace("{{DRAFT_PAGE}}", b64("draft-page.png", "image/png"));
  fs.writeFileSync(path.join(HERE, "source-press.built.html"), html);
  console.log("source-press.built.html built.");
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
  await page.goto("file://" + path.join(HERE, "source-press.built.html"));
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
  console.log(`Recording for ${DUR + TAIL}s at ${W}x${H}...`);
  await page.waitForTimeout((DUR + TAIL) * 1000);
  await context.close();
  await browser.close();

  const cutoff = Date.now() - 5 * 60 * 1000;
  const webm = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm") && !f.startsWith("press-release-flow"))
    .map((f) => path.join(OUT, f))
    .filter((f) => fs.statSync(f).mtimeMs > cutoff)
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  if (!webm) throw new Error("No fresh recording found in out/");
  const named = path.join(OUT, `${SLUG}-raw.webm`);
  fs.renameSync(webm, named);
  console.log(`Raw: ${named}`);
}

// Audio chain from the hero's vH14: match segments on speech-active loudness,
// one uniform compressor for the whole VO bus, fixed-gain master.
const VO_SPEECH_TARGET = -17.5;
const VO_BUS_MAKEUP = 2.7;
const MASTER_TARGET_I = -15.8;
// --tone none|warm|warmer: EQ on the VO bus for Becky's "tinny" note (Aug 9).
// warm shaves the top shelf and lifts the low-mids; warmer adds a presence dip.
const TONE_EQ = {
  none: "",
  warm: "lowshelf=f=190:g=2,highshelf=f=7200:g=-3,",
  warmer: "lowshelf=f=210:g=2.5,equalizer=f=3800:width_type=q:w=1.3:g=-1.5,highshelf=f=6300:g=-4.5,",
};
let VO_BUS_CHAIN = "";
function setTone(key) {
  const eq = TONE_EQ[key];
  if (eq === undefined) throw new Error(`Unknown --tone ${key}; use none, warm, or warmer`);
  VO_BUS_CHAIN = `highpass=f=75,${eq}acompressor=threshold=0.05:ratio=2:attack=6:release=150:makeup=${VO_BUS_MAKEUP},alimiter=limit=0.891:attack=3:release=80:level=false`;
}
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
  const raw = path.join(OUT, `${SLUG}-raw.webm`);
  if (!fs.existsSync(raw)) throw new Error(`Missing ${raw}; render first.`);
  const dur = DUR + TAIL;
  const outtag = arg("--outtag", "v1");
  setTone(arg("--tone", "warm"));
  const musicKey = arg("--music", "d");
  const MUSIC_CHOICE = MUSIC_OPTS[musicKey];
  if (!MUSIC_CHOICE) throw new Error(`Unknown --music ${musicKey}; use d, warm, or build`);
  const MUSIC = path.join(SFX_DIR, MUSIC_CHOICE.file);
  const final = path.join(OUT, `${SLUG}-${outtag}.mp4`);
  const srt = path.join(OUT, `${SLUG}.srt`);
  writeSrt(srt, CAPS);
  const burnSrt = path.join(OUT, `${SLUG}.burn.srt`);
  writeSrt(burnSrt, CAPS.filter((c) => c[3]));

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
  const mdel = Math.round(MUSIC_CHOICE.delay * 1000);
  fc += `;[${n + 1}:a]afade=t=in:d=0.6${mdel ? `,adelay=${mdel}|${mdel}` : ""},apad=whole_dur=${dur},volume='if(lt(t,${SWELL_AT}),0.18,min(0.18+0.08*(t-${SWELL_AT})/1.2,0.26))':eval=frame,afade=t=out:st=${dur - 3}:d=3[bed]`;
  fc += ";" + segs.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
  fc += `;[vob]${VO_BUS_CHAIN}[voe]`;
  fc += `;[voe][bed]amix=inputs=2:normalize=0[mix]`;
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
  fc += `;[vs]subtitles='${burnSrt.replace(/'/g, "\\'")}':fontsdir='${path.join(HERE, "fonts").replace(/'/g, "\\'")}':force_style='FontName=Schibsted Grotesk,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'[vout]`;

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
  await run(ffmpegPath, ["-y", "-ss", "42", "-i", final, "-frames:v", "1", "-q:v", "2",
    path.join(OUT, `${SLUG}-${outtag}-poster.jpg`)]);
  console.log(`Final: ${final}`);
}

const mode = process.argv.includes("--build") ? build
  : process.argv.includes("--finish") ? finish
  : render;
Promise.resolve(mode()).catch((e) => { console.error(e); process.exit(1); });
