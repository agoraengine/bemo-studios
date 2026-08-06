#!/usr/bin/env node
// Renders Reel 8H, the hero 60: Six Tools extended.
//
//   node run-hero.mjs --build      splice assets into source-hero.built.html
//   node run-hero.mjs --render     record 2560x1440
//   node run-hero.mjs --finish     encode + VO + music + captions  (--outtag vH1)
//
// VO: the hgh-* hero set plus three approved hg-r1 segments (fourapps, l6, l8).
// Film the site take first: node hero-front.mjs (serves from bemo-website/public on :8931).

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
const SWELL_AT = 52.2;
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
  [20.1, 24.2, "The front page shows what's in play.\\NThe knowledge base tells you what's missing."],
  [24.5, 31.6, "Behind it, BeMo is the first platform where your grant work,\\Nstrategy, and communications share the same memory."],
  [31.9, 34.6, "Four apps. One product."],
  [35.2, 40.5, "So the work comes out finished, in your voice,\\Nwith nothing re-explained."],
  [47.0, 51.3, "Nothing drops on the floor.\\NAnd nothing walks out the door."],
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
  const html = tpl.replace("{{WORDMARK}}", b64("wordmark.svg", "image/svg+xml"));
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
  await page.goto("file://" + path.join(HERE, "source-hero.built.html"));
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
  const named = path.join(OUT, `${SLUG}-raw-60s.webm`);
  fs.renameSync(webm, named);
  console.log(`Raw: ${named}`);
}

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
  const raw = path.join(OUT, `${SLUG}-raw-60s.webm`);
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
    const lufs = await measureLUFS(f);
    gains.push(Math.max(-12, Math.min(12, VO_TARGET_LUFS - lufs)));
  }
  console.log("VO gains: " + gains.map((g) => g.toFixed(1) + "dB").join(", "));
  let fc = segs
    .map(([, at], i) => `[${i + 1}:a]volume=${gains[i].toFixed(2)}dB,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[a${i}]`)
    .join(";");
  fc += `;[${n + 1}:a]apad=whole_dur=${dur},volume='if(lt(t,${SWELL_AT}),0.18+0.04*clip((t-16.2)/0.6,0,1)-0.04*clip((t-23.9)/0.6,0,1)-0.05*clip((t-41.2)/0.6,0,1)+0.05*clip((t-46.2)/0.6,0,1),min(0.18+0.1*(t-${SWELL_AT})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${dur - 3}:d=3[musv]`;
  SFX.forEach(([f]) => inputs.push("-i", f));
  SFX.forEach(([, at, t0, t1, vol], i) => {
    fc += `;[${n + 2 + i}:a]atrim=${t0}:${t1},asetpts=PTS-STARTPTS,volume=${vol},afade=t=in:d=0.2,afade=t=out:st=${Math.max(t1 - t0 - 0.35, 0)}:d=0.35,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[sx${i}]`;
  });
  fc += `;[musv]` + SFX.map((_, i) => `[sx${i}]`).join("") + `amix=inputs=${SFX.length + 1}:normalize=0[bed]`;
  fc += ";" + segs.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
  fc += `;[vob]highpass=f=75,dynaudnorm=f=250:g=15:p=0.9:m=4[voe]`;
  fc += `;[voe][bed]amix=inputs=2:normalize=0[mix]`;
  fc += `;[mix]loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
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
