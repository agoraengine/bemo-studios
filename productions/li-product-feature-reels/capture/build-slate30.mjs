// Builds the four remaining template reels on the shared grammar:
// open card, two captioned beats, Amplify identity, standing close.
//
//   node productions/li-product-feature-reels/capture/build-slate30.mjs

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const FONTS = path.resolve(HERE, "../../common-table-press-release/capture/fonts");
const WORDMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark.svg")
).toString("base64");
const WHITEMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark-white.svg")
).toString("base64");
const MARK = path.join(OUT, "build", "wordmark.png");

const W = 1920, H = 1200, FPS = 30;
const ff = (a) => execFileSync(FF, ["-y", ...a], { stdio: ["ignore", "ignore", "inherit"] });
const b64 = (f) => fs.readFileSync(path.join(FONTS, f)).toString("base64");

const FONTCSS = `
@font-face{font-family:"Schibsted";src:url(data:font/woff2;base64,${b64("SchibstedGrotesk-var.woff2")}) format("woff2");font-weight:100 900}
@font-face{font-family:"GeistMono";src:url(data:font/woff2;base64,${b64("GeistMono-var.woff2")}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:${W}px;height:${H}px;background:#FFFFFF;font-family:"Schibsted",sans-serif;display:flex;flex-direction:column;justify-content:center;padding:150px 170px;color:#1A2A3A}
h1{color:#05347E;font-weight:560;font-size:96px;line-height:1.07;letter-spacing:-.019em}
.u{box-shadow:inset 0 -.13em 0 #4CBB17}
.sub{font-size:40px;color:#05347E;margin-top:34px;line-height:1.4}
.cap{position:absolute;left:0;right:0;top:0;padding:44px 70px 64px;background:linear-gradient(rgba(255,255,255,.95) 58%,transparent)}
.cap span{color:#05347E;font-weight:560;font-size:62px;letter-spacing:-.015em}
body.close{background:#05347E;padding:0}
.endcard{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%}
.biglogo{height:330px;width:auto;display:block}
.endcard .tag{margin-top:58px;color:#FFFFFF;font-size:64px;font-weight:640;letter-spacing:-.015em}
.endcard .site{margin-top:52px;background:#FF8210;color:#1A2A3A;font-weight:700;font-size:38px;padding:18px 46px;border-radius:10px;letter-spacing:-.005em}
.appcard{display:flex;flex-direction:column;align-items:flex-start}
.appcard .ic{width:132px;height:132px;border-radius:32px;background:#EAF7E3;display:flex;align-items:center;justify-content:center;margin-bottom:40px}
.appcard .ic svg{width:88px;height:88px}
h1.amp{color:#2F7D0D}
`;

const IDENTITY = `<div class="appcard">
  <div class="ic"><svg viewBox="0 0 36 36" fill="none" stroke="#378F10" stroke-width="2" stroke-linejoin="round">
    <path d="M8 15v6h4l9 5V10l-9 5H8z"/><path d="M25 14a5 5 0 0 1 0 8" stroke-linecap="round"/><path d="M28.5 11a9 9 0 0 1 0 14" stroke-linecap="round"/></svg></div>
  <h1 class="amp">Amplify.</h1>
  <div class="sub">One of four apps that share the same memory.</div>
</div>`;
const CLOSE = `<div class="endcard"><img class="biglogo" src="data:image/svg+xml;base64,${WHITEMARK}"><div class="tag">Where missions gain momentum.</div><div class="site">bemointel.ai</div></div>`;

const REELS = [
  {
    slug: "annualreport",
    open: `<h1>The annual report used to take <span class="u">three days</span>.</h1>`,
    video: "annualreport-video",
    beats: [
      { ss: 18, dur: 6.5, cap: "The mission arrived from the knowledge base." },
      { ss: 94, dur: 6.5, cap: "It asks for the year only you can tell it." },
    ],
  },
  {
    slug: "impactstory",
    open: `<h1>Your funder wants an impact story. The impact is in <span class="u">six places</span>.</h1>`,
    video: "impactstory-video",
    beats: [
      { ss: 55, dur: 6.5, cap: "It asks what actually happened for her." },
      { ss: 98, dur: 6.5, cap: "It won't tell her story without consent." },
    ],
  },
  {
    slug: "factsheet",
    open: `<h1>Someone asks what your organization does. <span class="u">Where is that written down?</span></h1>`,
    video: "factsheet-video",
    beats: [
      { ss: 16, dur: 6.5, cap: "It came knowing who you are." },
      { ss: 76, dur: 6.5, cap: "One page, shaped for its reader." },
    ],
  },
  {
    slug: "elevatorpitch",
    open: `<h1>Thirty seconds to explain your organization. <span class="u">Go.</span></h1>`,
    video: "elevatorpitch-video",
    beats: [
      { ss: 33, dur: 6.5, cap: "It starts from the mission on file." },
      { ss: 58, dur: 6.5, cap: "It asks who's listening first." },
    ],
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
async function renderCard(html, out, close = false) {
  await page.setContent(`<style>${FONTCSS}</style><body${close ? ' class="close"' : ""}>${html}</body>`);
  await page.waitForTimeout(320);
  await page.screenshot({ path: out });
}
async function renderCap(line, out) {
  await page.setContent(`<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}</style><body><div class="cap"><span>${line}</span></div></body>`);
  await page.waitForTimeout(320);
  await page.screenshot({ path: out, omitBackground: true });
}

const still = (png, secs, out, mark = true) =>
  mark
    ? ff(["-loop","1","-t",String(secs),"-i",png,"-loop","1","-t",String(secs),"-i",MARK,"-r",String(FPS),
          "-filter_complex",`[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,format=yuv420p[o]`,
          "-map","[o]","-c:v","libx264","-crf","20","-preset","medium",out])
    : ff(["-loop","1","-t",String(secs),"-i",png,"-r",String(FPS),
          "-vf",`scale=${W}:${H},format=yuv420p`,"-c:v","libx264","-crf","20","-preset","medium",out]);
const beat = (src, ss, dur, capPng, out) =>
  ff(["-ss",String(ss),"-t",String(dur),"-i",src,"-i",capPng,"-i",MARK,
      "-filter_complex",`[0:v]scale=${W*2}:${H*2},fps=${FPS},zoompan=z='min(1.12+0.33*on/${Math.round(dur*FPS)},1.45)':x='max(0,min(2160-(iw/zoom)/2,iw-iw/zoom))':y='max(0,min(1120-(ih/zoom)/2,ih-ih/zoom))':d=1:s=${W}x${H}:fps=${FPS}[v];[v][1:v]overlay=0:0[c];[c][2:v]overlay=0:0,format=yuv420p[o]`,
      "-map","[o]","-c:v","libx264","-crf","20","-preset","medium",out]);

for (const R of REELS) {
  const WORK = path.join(OUT, `build-${R.slug}`);
  fs.mkdirSync(WORK, { recursive: true });
  const vid = fs.readdirSync(path.join(OUT, R.video)).find((f) => f.endsWith(".webm"));
  const SRC = path.join(OUT, R.video, vid);
  console.log(`\n=== ${R.slug} (${vid})`);

  await renderCard(R.open, path.join(WORK, "open.png"));
  await renderCard(IDENTITY, path.join(WORK, "identity.png"));
  await renderCard(CLOSE, path.join(WORK, "close.png"), true);
  await renderCap(R.beats[0].cap, path.join(WORK, "cap1.png"));
  await renderCap(R.beats[1].cap, path.join(WORK, "cap2.png"));

  still(path.join(WORK, "open.png"), 3.5, path.join(WORK, "s1.mp4"));
  beat(SRC, R.beats[0].ss, R.beats[0].dur, path.join(WORK, "cap1.png"), path.join(WORK, "s2.mp4"));
  beat(SRC, R.beats[1].ss, R.beats[1].dur, path.join(WORK, "cap2.png"), path.join(WORK, "s3.mp4"));
  still(path.join(WORK, "identity.png"), 3.5, path.join(WORK, "s4.mp4"));
  still(path.join(WORK, "close.png"), 4, path.join(WORK, "s5.mp4"), false);

  const list = path.join(WORK, "concat.txt");
  fs.writeFileSync(list, ["s1","s2","s3","s4","s5"].map((s) => `file '${path.join(WORK, s + ".mp4")}'`).join("\n"));
  const FINAL = path.join(OUT, `bemo-${R.slug}-feature-24s-v1.mp4`);
  ff(["-f","concat","-safe","0","-i",list,"-c:v","libx264","-crf","20","-preset","slow","-pix_fmt","yuv420p",FINAL]);
  console.log("wrote:", FINAL);
}
await browser.close();
console.log("\nslate built");
