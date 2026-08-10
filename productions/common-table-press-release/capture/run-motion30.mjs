#!/usr/bin/env node
// Renders the 30s cutdown of the motion cut (Becky, Aug 10). Four beats from
// the locked v3 narration at sentence boundaries: pr-l2s (the first sentence
// of pr-l2b, trimmed), l4, l6, l8. Same audio chain as run-motion.mjs; music
// is the series' 30s bed (music-30-upbeat, the bed the series' 30s cuts wear),
// flat envelope, no swell.
//
//   node run-motion30.mjs --build      splice wordmark into source-motion30.built.html
//   node run-motion30.mjs --render     record 2560x1440
//   node run-motion30.mjs --finish     encode + VO + music + captions  (--outtag v1)

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
const SLUG = "common-table-press-release-motion30";
// v4 (script v5, Becky-ratified story pass): six beats. Stakes and gathering
// open on cards, the turn rides the KB window, the interview beat returns,
// payoff goes second person ("your organization", pr-s5). New lines pr-s1..s3
// and pr-s5 (speech endpoint, +6dB pre-gain, atempo 1.08; s3 at 1.12 for its
// slow list read); l5/l8 reuse locked audio sped to match.
// v9 (Becky: flow, tell a story): the body narration is ONE continuous read
// (pr-body.wav, native 1.25x, word timestamps drive the visuals). The stakes
// line reads "needs to go out tomorrow. And the writing..."; the count is
// canon's 105-template library ("more than a hundred"). Close stays its own
// 1.15x read.
// v10: lands at 30 (28.7 + tail). Same performance, three sentence pauses
// trimmed at exact timestamps + atempo 1.12 (net ~1.4x words); close at 1.06.
const DUR = 28.7, TAIL = 1.5;
const W = 2560, H = 1440;

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const MIX = [
  [path.join(VO, "pr-bodyf.wav"), 0.25],
  // close audition (Becky, Aug 10: "BeMo" more upbeat): t8u = bright read at
  // the body's pace; t8x = exclamation lift. Swap the file, re-finish.
  [path.join(VO, "pr-t8u.wav"), 25.7],
];
const SFX_DIR = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "out", "sfx");
const MUSIC_OPTS = {
  up: { file: "music-30-upbeat.wav", delay: 0 },
};
const SWELL_AT = null; // flat bed on the 30s cut, no swell
const TICKS = [6.15, 6.9, 8.5, 11.6, 12.45, 13.65];
// sfx-tick.wav peaks at -23.6dBFS; 0.6 lands it near -28dBFS in the mix,
// texture under the -16 LUFS VO rather than a sound-effect moment
const TICK_GAIN = 0.6;

// burn:false rows duplicate a typographic card verbatim; they stay in the .srt
// sidecar for real caption tracks but are not burned into the picture (the
// card is the reading layer, same rule as the Academy no-doubling decision).
const CAPS = [
  [0.5, 3.9, "The press release needs to go out tomorrow.\\NAnd the writing was never the starting point.", false],
  [4.1, 9.5, "The starting point is gathering all the facts: the numbers,\\Nthe history, whichever doc used the boilerplate last.", false],
  [9.7, 14.9, "Inside BeMo, it's already waiting: boilerplate,\\Nmedia contact, the organization's own facts.", true],
  [15.0, 19.4, "And the draft comes back sounding like your organization:\\Nits programs, its numbers, its own words.", true],
  [19.6, 22.6, "The press release is just one of more\\Nthan a hundred templates inside BeMo.", true],
  [22.8, 24.3, "And it all lives in one platform.", false],
  [25.9, 28.6, "BeMo. Where missions gain momentum.", false],
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
  const tpl = fs.readFileSync(path.join(HERE, "source-motion30.html"), "utf8");
  const b64 = (f, mime) =>
    `data:${mime};base64,` + fs.readFileSync(path.join(HERE, "assets", f)).toString("base64");
  const html = tpl
    .replaceAll("{{WORDMARK_W}}", b64("wordmark-white.svg", "image/svg+xml"))
    .replaceAll("{{DRAFT_PAGE}}", b64("draft-page.png", "image/png"));
  fs.writeFileSync(path.join(HERE, "source-motion30.built.html"), html);
  console.log("source-motion30.built.html built.");
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
  await page.goto("file://" + path.join(HERE, "source-motion30.built.html"));
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
  const musicKey = arg("--music", "up");
  const MUSIC_CHOICE = MUSIC_OPTS[musicKey];
  if (!MUSIC_CHOICE) throw new Error(`Unknown --music ${musicKey}; the 30s cut uses "up"`);
  const MUSIC = path.join(SFX_DIR, MUSIC_CHOICE.file);
  const final = path.join(OUT, `${SLUG}-${outtag}.mp4`);
  const srt = path.join(OUT, `${SLUG}.srt`);
  writeSrt(srt, CAPS);
  const burnSrt = path.join(OUT, `${SLUG}.burn.srt`);
  writeSrt(burnSrt, CAPS.filter((c) => c[3]));

  const segs = MIX;
  const inputs = [];
  segs.forEach(([f]) => inputs.push("-i", f));
  // the 27s bed is shorter than the cut: two copies, 2s crossfade seam
  inputs.push("-i", MUSIC);
  inputs.push("-i", MUSIC);
  inputs.push("-i", path.join(OUT, "sfx-tick.wav"));
  const n = segs.length;
  const gains = [];
  for (const [f] of segs) {
    const med = await measureSpeechMedian(f);
    gains.push(Math.max(-12, Math.min(12, VO_SPEECH_TARGET - med)));
  }
  // three passes: mixed-provenance tracks (fresh pre-gained lines + reused
  // locked reads) need one more iteration to reach the 0.1 LU bar
  for (let pass = 0; pass < 3; pass++) {
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
  fc += `;[${n + 1}:a][${n + 2}:a]acrossfade=d=2:c1=tri:c2=tri,afade=t=in:d=0.6${mdel ? `,adelay=${mdel}|${mdel}` : ""},apad=whole_dur=${dur},volume=0.235,afade=t=out:st=${dur - 3}:d=3[bed]`;
  fc += `;[${n + 3}:a]asplit=${TICKS.length}` + TICKS.map((_, i) => `[tk${i}]`).join("");
  fc += ";" + TICKS.map((t, i) =>
    `[tk${i}]adelay=${Math.round(t * 1000)}|${Math.round(t * 1000)}[td${i}]`).join(";");
  fc += ";" + TICKS.map((_, i) => `[td${i}]`).join("") +
    `amix=inputs=${TICKS.length}:normalize=0,apad=whole_dur=${dur},volume=${TICK_GAIN}[ticks]`;
  fc += ";" + segs.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
  fc += `;[vob]${VO_BUS_CHAIN}[voe]`;
  fc += `;[voe][bed][ticks]amix=inputs=3:normalize=0[mix]`;
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
