#!/usr/bin/env node
// Renders reel 1 of the LinkedIn sizzle series, both cuts, both aspects.
//
//   node run.mjs --build                  splice images into source.html
//   node run.mjs --render                 record all four combos (or --cut 30 --aspect v)
//   node run.mjs --finish                 encode + VO + music + captions for all combos
//
// Output: capture/out/ (gitignored). Upload to Drive, link in assets.md.
//
// Vertical (1080x1920) is the primary per the brief; 16:9 renders at 1280x720,
// the same honest raster ceiling as the GA sizzle (the s3/s3b screenshots are
// ~1000px wide; a larger viewport only upscales them).

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
const GAVO = path.join(HERE, "..", "..", "ga-sizzle-reel", "capture", "out", "vo");
const SLUG = "bemo-linkedin-sizzle-series-r1";
const TAIL = 2;

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const COMBOS = [];
for (const cut of (arg("--cut", "30,60")).split(","))
  for (const aspect of (arg("--aspect", "h")).split(","))
    COMBOS.push({ cut, aspect });

const DIMS = { v: { w: 1080, h: 1920, scale: 1 }, h: { w: 2560, h: 1440, scale: 2 } };
const DUR = { "30": 25, "60": 51.5 };

// VO placements, seconds from reel start. Segments are per scene; the three
// chat lines are the locked S1 text regenerated one file per scene (script
// change log, 2026-08-02).
const MIX = {
  "30": [
    [path.join(VO, "becky", "b2-r1-l1.dry.wav"), 0.5],
    [path.join(VO, "becky", "b2-r1-l2.dry.wav"), 4.0],
    [path.join(VO, "becky", "b2-r1-l3.dry.wav"), 9.4],
    [path.join(VO, "becky", "b2-r1-l4b.dry.wav"), 11.4],
    [path.join(VO, "becky", "b-ga-l10.dry.wav"), 16.8],
    [path.join(VO, "becky", "b2-r1-l8.dry.wav"), 21.1],
  ],
  "60": [
    [path.join(VO, "becky", "b2-r1-l1.dry.wav"), 0.5],
    [path.join(VO, "becky", "b2-r1-l2.dry.wav"), 4.0],
    [path.join(VO, "becky", "b2-r1-l3.dry.wav"), 9.4],
    [path.join(VO, "becky", "b2-r1-l4a.dry.wav"), 11.4],
    [path.join(VO, "becky", "b2-r1-l5.dry.wav"), 19.4],
    [path.join(VO, "becky", "b2-r1-l6.dry.wav"), 30.3],
    [path.join(VO, "becky", "b2-r1-l7.dry.wav"), 35.7],
    [path.join(VO, "becky", "b2-r1-l8.dry.wav"), 41.4],
  ],
};
const MUSIC_BY_CUT = {
  "30": path.join(OUT, "sfx", "music-D.wav"),
  "60": path.join(OUT, "sfx", "music-D-ext.wav"),
};
const SFX_TYPING = path.join(OUT, "sfx", "typing.mp3");
const SFX_CHIME = path.join(OUT, "sfx", "chime.mp3");
// [file, delaySec, trimStart, trimEnd, volume] — quiet diegetic layer under the scenes
const SFX = {
  "30": [
    [SFX_TYPING, 0.0, 0.0, 2.3, 0.05],
    [SFX_TYPING, 4.3, 10.0, 13.0, 0.05],
  ],
  "60": [
    [SFX_TYPING, 0.0, 0.0, 2.3, 0.05],
    [SFX_TYPING, 4.3, 10.0, 13.0, 0.05],
  ],
};
// music swell into the close, per cut
const SWELL_AT = { "30": 20.5, "60": 45.1 };

function build() {
  const tpl = fs.readFileSync(path.join(HERE, "source-template.html"), "utf8");
  const b64 = (f, mime) =>
    `data:${mime};base64,` + fs.readFileSync(path.join(HERE, "assets", f)).toString("base64");
  // FunderStorm slot: drop a real capture at assets/funderstorm.png (seeded
  // demo org, 2560 wide). Until it exists, the approved funder-page art
  // stands in; the shot list carries the blocked row.
  const fsFile = fs.existsSync(path.join(HERE, "assets", "funderstorm.png"))
    ? ["funderstorm.png", "image/png"] : ["wikiS.jpg", "image/jpeg"];
  const html = tpl
    .replace("{{FUNDERSTORM}}", b64(fsFile[0], fsFile[1]))
    .replace("{{HOME0}}", b64("home-ct.png", "image/png"))
    .replace("{{SH4}}", b64("amplify.png", "image/png"))
    .replace("{{WORDMARK}}", b64("wordmark.svg", "image/svg+xml"));
  fs.writeFileSync(path.join(HERE, "source.html"), html);
  console.log("source.html built.");
}

async function render() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const { cut, aspect } of COMBOS) {
    const { w, h, scale } = DIMS[aspect];
    const dur = DUR[cut];
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: w, height: h },
      deviceScaleFactor: aspect === "v" ? 1 : 2,
      colorScheme: "light",
      recordVideo: { dir: OUT, size: { width: w, height: h } },
    });
    const page = await context.newPage();
    await page.goto("file://" + path.join(HERE, "source.html") + `?cut=${cut}&aspect=${aspect === "v" ? "v" : "h"}`);
    await page.addStyleTag({
      content: `
        html, body { background:#000 !important; overflow:hidden !important; margin:0 !important;
          padding:0 !important; display:block !important; width:${w}px !important; height:${h}px !important; }
        #stage { position:fixed !important; top:0 !important; left:0 !important;
          transform:scale(${scale}) !important; transform-origin: top left !important; margin:0 !important; }
      `,
    });
    await page.evaluate(() => document.fonts?.ready);
    await page.evaluate(() => window.restart());
    console.log(`Recording ${cut}s/${aspect} for ${dur + TAIL}s at ${w}x${h}...`);
    await page.waitForTimeout((dur + TAIL) * 1000);
    await context.close();
    await browser.close();

    const webm = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm"))
      .map((f) => path.join(OUT, f))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
    const named = path.join(OUT, `${SLUG}-raw-${cut}s-${aspect}.webm`);
    fs.renameSync(webm, named);
    console.log(`Raw: ${named}`);
  }
}

async function finish() {
  for (const { cut, aspect } of COMBOS) {
    const raw = path.join(OUT, `${SLUG}-raw-${cut}s-${aspect}.webm`);
    if (!fs.existsSync(raw)) throw new Error(`Missing ${raw}; render first.`);
    const dur = DUR[cut] + TAIL;
    const variant = aspect === "v" ? "-vertical" : "";
    const musicOverride = arg("--music", null);
    const outtag = arg("--outtag", "v6");
    const final = path.join(OUT, `${SLUG}-${cut}s${variant}-${outtag}.mp4`);
    const srt = path.join(OUT, `${SLUG}-${cut}s.srt`);

    // VO chain: delay each segment to its scene time, mix, add music bed
    // at about -19dB with fades, per the GA sizzle mix.
    const segs = MIX[cut];
    const inputs = [];
    segs.forEach(([f]) => inputs.push("-i", f));
    inputs.push("-i", musicOverride || MUSIC_BY_CUT[cut]);
    const n = segs.length;
    let fc = segs
      .map(([, at], i) => `[${i + 1}:a]adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[a${i}]`)
      .join(";");
    const sfx = SFX[cut];
    sfx.forEach(([f]) => inputs.push("-i", f));
    const cs = SWELL_AT[cut];
    fc += `;[${n + 1}:a]volume='if(lt(t,${cs}),0.18,min(0.18+0.1*(t-${cs})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${dur - 3}:d=3[musv]`;
    sfx.forEach(([, at, t0, t1, vol], i) => {
      fc += `;[${n + 2 + i}:a]atrim=${t0}:${t1},asetpts=PTS-STARTPTS,volume=${vol},afade=t=in:d=0.25,afade=t=out:st=${Math.max(t1 - t0 - 0.35, 0)}:d=0.35,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[sx${i}]`;
    });
    fc += `;[musv]` + sfx.map((_, i) => `[sx${i}]`).join("") + `amix=inputs=${sfx.length + 1}:normalize=0[bed]`;
    fc += ";" + segs.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${n}:normalize=0[vob]`;
    fc += `;[vob]highpass=f=75,dynaudnorm=f=250:g=15:p=0.9:m=4[voe]`;
    fc += `;[voe][bed]amix=inputs=2:normalize=0[mix]`;
    fc += `;[mix]loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
    // Caption style per the Aug 1 GA sizzle restyle Becky approved: ink Geist
    // on a soft white box, no outline. libass styles resolve in its default
    // 384x288 space; sizes chosen for ~46px text on vertical, ~26px on 720p,
    // above the platform-chrome band per the safe-area standard.
    fc += aspect === "h" ? `;[0:v]scale=1920:1080[vs]` : `;[0:v]null[vs]`;
    fc += `;[vs]subtitles='${srt.replace(/'/g, "\\'")}':fontsdir='${path.join(HERE, "fonts").replace(/'/g, "\\'")}':force_style='FontName=Geist,FontSize=${aspect === "v" ? 7 : 10.5},PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=${aspect === "v" ? 58 : 24}'[vout]`;

    await run(ffmpegPath, [
      "-y", "-i", raw, ...inputs,
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
}

const mode = process.argv.includes("--build") ? build
  : process.argv.includes("--finish") ? finish
  : render;
Promise.resolve(mode()).catch((e) => { console.error(e); process.exit(1); });
