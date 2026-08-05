#!/usr/bin/env node
// Renders Reel 1C, the commercial cut. 16:9 only, 58s content + 2s tail = 60s.
//
//   node run-commercial.mjs --build      splice images into source-commercial.built.html
//   node run-commercial.mjs --render     record 2560x1440
//   node run-commercial.mjs --finish     encode + VO + music + captions  (--outtag vC1)
//
// VO is the hgc-* set (audio-only speech-endpoint reads, leveled to -18);
// the four-apps and close segments reuse the approved hg-r1 files.

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
const SLUG = "bemo-linkedin-sizzle-series-r1c";
const DUR = 58, TAIL = 2;
const W = 2560, H = 1440;

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const MIX = [
  [path.join(VO, "hgc-c1.wav"), 0.4],
  [path.join(VO, "hgc-c2.wav"), 2.75],
  [path.join(VO, "hgc-c3.wav"), 4.45],
  [path.join(VO, "hgc-c4.wav"), 7.45],
  [path.join(VO, "hgc-c5.wav"), 9.0],
  [path.join(VO, "hgc-c6.wav"), 12.35],
  [path.join(VO, "hgc-c7.wav"), 15.15],
  [path.join(VO, "hgc-c8.wav"), 19.7],
  [path.join(VO, "hgc-c9.wav"), 23.5],
  [path.join(VO, "hgc-c10.wav"), 27.05],
  [path.join(VO, "hgc-c11.wav"), 28.3],
  [path.join(VO, "hgc-c12.wav"), 35.1],
  [path.join(VO, "hgc-c13.wav"), 39.6],
  [path.join(VO, "hg-r1-fourapps.wav"), 44.35],
  [path.join(VO, "hg-r1-l8.wav"), 48.35],
  [path.join(VO, "hgc-c14.wav"), 52.4],
];
const MUSIC = path.join(OUT, "sfx", "music-D-ext.wav");
const SFX_TYPING = path.join(OUT, "sfx", "typing.mp3");
const SFX_CHIME = path.join(OUT, "sfx", "chime.mp3");
// [file, delaySec, trimStart, trimEnd, volume]
const SFX = [
  [SFX_TYPING, 0.2, 0.0, 2.2, 0.06],
  [SFX_TYPING, 2.7, 10.0, 11.3, 0.07],
  [SFX_TYPING, 4.4, 12.0, 13.0, 0.08],
  [SFX_CHIME, 12.2, 0.0, 1.4, 0.12],
];
const SWELL_AT = 44.2;

function build() {
  const tpl = fs.readFileSync(path.join(HERE, "source-commercial.html"), "utf8");
  const b64 = (f, mime) =>
    `data:${mime};base64,` + fs.readFileSync(path.join(HERE, "assets", f)).toString("base64");
  const html = tpl
    .replace("{{HOME0}}", b64("home-ct.png", "image/png"))
    .replace("{{WORDMARK}}", b64("wordmark.svg", "image/svg+xml"));
  fs.writeFileSync(path.join(HERE, "source-commercial.built.html"), html);
  console.log("source-commercial.built.html built.");
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
  await page.goto("file://" + path.join(HERE, "source-commercial.built.html"));
  await page.addStyleTag({
    content: `
      html, body { background:#000 !important; overflow:hidden !important; margin:0 !important;
        padding:0 !important; display:block !important; width:${W}px !important; height:${H}px !important; }
      #stage { position:fixed !important; top:0 !important; left:0 !important;
        transform:scale(2) !important; transform-origin: top left !important; margin:0 !important; }
    `,
  });
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(() => window.restart());
  console.log(`Recording commercial cut for ${DUR + TAIL}s at ${W}x${H}...`);
  await page.waitForTimeout((DUR + TAIL) * 1000);
  await context.close();
  await browser.close();

  const cutoff = Date.now() - 5 * 60 * 1000;
  const webm = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm") && !f.startsWith("live-") && !f.startsWith("bemo-"))
    .map((f) => path.join(OUT, f))
    .filter((f) => fs.statSync(f).mtimeMs > cutoff)
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  if (!webm) throw new Error("No fresh recording found in out/");
  const named = path.join(OUT, `${SLUG}-raw-60s-h.webm`);
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
  const raw = path.join(OUT, `${SLUG}-raw-60s-h.webm`);
  if (!fs.existsSync(raw)) throw new Error(`Missing ${raw}; render first.`);
  const dur = DUR + TAIL;
  const outtag = arg("--outtag", "vC1");
  const final = path.join(OUT, `${SLUG}-60s-${outtag}.mp4`);
  const srt = path.join(OUT, `${SLUG}-60s.srt`);

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
  SFX.forEach(([f]) => inputs.push("-i", f));
  const cs = SWELL_AT;
  fc += `;[${n + 1}:a]apad=whole_dur=${dur},volume='if(lt(t,${cs}),0.18,min(0.18+0.1*(t-${cs})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${dur - 3}:d=3[musv]`;
  SFX.forEach(([, at, t0, t1, vol], i) => {
    fc += `;[${n + 2 + i}:a]atrim=${t0}:${t1},asetpts=PTS-STARTPTS,volume=${vol},afade=t=in:d=0.25,afade=t=out:st=${Math.max(t1 - t0 - 0.35, 0)}:d=0.35,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[sx${i}]`;
  });
  fc += `;[musv]` + SFX.map((_, i) => `[sx${i}]`).join("") + `amix=inputs=${SFX.length + 1}:normalize=0[bed]`;
  fc += ";" + segs.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
  fc += `;[vob]highpass=f=75,dynaudnorm=f=250:g=15:p=0.9:m=4[voe]`;
  fc += `;[voe][bed]amix=inputs=2:normalize=0[mix]`;
  fc += `;[mix]loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
  fc += `;[0:v]scale=1920:1080[vs]`;
  fc += `;[vs]subtitles='${srt.replace(/'/g, "\\'")}':fontsdir='${path.join(HERE, "fonts").replace(/'/g, "\\'")}':force_style='FontName=Geist,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'[vout]`;

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
