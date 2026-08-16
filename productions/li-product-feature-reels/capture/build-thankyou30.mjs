// Assembles the 30-second Donor Thank You Letter reel, second in the Amplify
// template slate. Same grammar, same identity card, same standing close as the
// Amplify reel, so the slate reads as a series.
//
//   node productions/li-product-feature-reels/capture/build-thankyou30.mjs

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const CAP = path.join(OUT, "thankyou2");
const WORK = path.join(OUT, "build-ty");
fs.mkdirSync(WORK, { recursive: true });
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const FONTS = path.resolve(HERE, "../../common-table-press-release/capture/fonts");
const WORDMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark.svg")
).toString("base64");
const WHITEMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark-white.svg")
).toString("base64");

const W = 1920, H = 1200, FPS = 30;
const ff = (args) => execFileSync(FF, ["-y", ...args], { stdio: ["ignore", "ignore", "inherit"] });
const b64 = (f) => fs.readFileSync(path.join(FONTS, f)).toString("base64");

const FONTCSS = `
@font-face{font-family:"Schibsted";src:url(data:font/woff2;base64,${b64("SchibstedGrotesk-var.woff2")}) format("woff2");font-weight:100 900}
@font-face{font-family:"GeistMono";src:url(data:font/woff2;base64,${b64("GeistMono-var.woff2")}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:${W}px;height:${H}px;background:#FFFFFF;font-family:"Schibsted",sans-serif;display:flex;flex-direction:column;justify-content:center;padding:150px 170px;color:#1A2A3A}
h1{color:#05347E;font-weight:560;font-size:104px;line-height:1.06;letter-spacing:-.019em}
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

const CARDS = {
  open: `<h1>Forty gifts came in this week. <span class="u">Every one needs a thank you</span>.</h1>`,
  category: `<div class="appcard">
    <div class="ic"><svg viewBox="0 0 36 36" fill="none" stroke="#378F10" stroke-width="2" stroke-linejoin="round">
      <path d="M8 15v6h4l9 5V10l-9 5H8z"/><path d="M25 14a5 5 0 0 1 0 8" stroke-linecap="round"/><path d="M28.5 11a9 9 0 0 1 0 14" stroke-linecap="round"/></svg></div>
    <h1 class="amp">Amplify.</h1>
    <div class="sub">One of four apps that share the same memory.</div>
  </div>`,
  end: `<div class="endcard"><img class="biglogo" src="data:image/svg+xml;base64,${WHITEMARK}"><div class="tag">Where missions gain momentum.</div><div class="site">bemointel.ai</div></div>`,
};
const CAPTIONS = {
  cap1: "It noticed her gift went up.",
  cap2: "It won't write a form letter.",
  cap3: "It asks what the money makes possible.",
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
for (const [name, body] of Object.entries(CARDS)) {
  const cls = name === "end" ? ' class="close"' : "";
  await page.setContent(`<style>${FONTCSS}</style><body${cls}>${body}</body>`);
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(WORK, `card-${name}.png`) });
  console.log("card:", name);
}
for (const [name, line] of Object.entries(CAPTIONS)) {
  await page.setContent(
    `<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}</style>
     <body><div class="cap"><span>${line}</span></div></body>`
  );
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(WORK, `${name}.png`), omitBackground: true });
  console.log("caption:", name);
}
await browser.close();

const MARK = path.join(OUT, "build", "wordmark.png"); // reuse the Amplify build's plate
const still = (png, secs, out, mark = true) =>
  mark
    ? ff(["-loop", "1", "-t", String(secs), "-i", png, "-loop", "1", "-t", String(secs), "-i", MARK,
          "-r", String(FPS),
          "-filter_complex", `[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,format=yuv420p[o]`,
          "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out])
    : ff(["-loop", "1", "-t", String(secs), "-i", png, "-r", String(FPS),
          "-vf", `scale=${W}:${H},format=yuv420p`,
          "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);
const beat = (src, ss, dur, capPng, out) =>
  ff(["-ss", String(ss), "-t", String(dur), "-i", src, "-i", capPng, "-i", MARK,
      "-filter_complex", `[0:v]scale=${W*2}:${H*2},fps=${FPS},zoompan=z='min(1.12+0.33*on/${Math.round(dur*FPS)},1.45)':x='max(0,min(2160-(iw/zoom)/2,iw-iw/zoom))':y='max(0,min(1120-(ih/zoom)/2,ih-ih/zoom))':d=1:s=${W}x${H}:fps=${FPS}[v];[v][1:v]overlay=0:0[c];[c][2:v]overlay=0:0,format=yuv420p[o]`,
      "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

// run2 (90s): fields fill ~35-39s, submit 39, the "since Deb increased her giving" reply lands ~59s
// run3 (180s): the enrichment questions render from ~14s; full panel visible after the scroll ~172s
const RUN2 = path.join(CAP, "page@a6c1ba0b49a15c0a8d93f576ae834aa8.webm");
const RUN3 = path.join(CAP, "page@c1b70eddb8c7a7dd9d6ed728fed295d8.webm");

console.log("building segments…");
still(path.join(WORK, "card-open.png"), 3.5, path.join(WORK, "s1.mp4"));
beat(RUN2, 56.5, 6, path.join(WORK, "cap1.png"), path.join(WORK, "s2.mp4"));   // the reply that notices the increase
beat(RUN3, 170, 5, path.join(WORK, "cap2.png"), path.join(WORK, "s3.mp4"));    // "standard acknowledgment → genuinely moving letter"
beat(RUN3, 175.5, 5, path.join(WORK, "cap3.png"), path.join(WORK, "s4.mp4"));  // "what will Deb's gift specifically enable"
still(path.join(WORK, "card-category.png"), 3.5, path.join(WORK, "s5.mp4"));
still(path.join(WORK, "card-end.png"), 4, path.join(WORK, "s6.mp4"), false);

const list = path.join(WORK, "concat.txt");
fs.writeFileSync(list, ["s1","s2","s3","s4","s5","s6"].map((s) => `file '${path.join(WORK, s + ".mp4")}'`).join("\n"));
const FINAL = path.join(OUT, "bemo-thankyou-feature-30s-v1.mp4");
ff(["-f", "concat", "-safe", "0", "-i", list, "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", FINAL]);

// the 15: open, the two strongest beats, the close
console.log("building the core…");
still(path.join(WORK, "card-open.png"), 3.0, path.join(WORK, "c1.mp4"));
beat(RUN2, 56.5, 4.5, path.join(WORK, "cap1.png"), path.join(WORK, "c2.mp4"));
beat(RUN3, 170, 4.0, path.join(WORK, "cap2.png"), path.join(WORK, "c3.mp4"));
still(path.join(WORK, "card-end.png"), 3.5, path.join(WORK, "c4.mp4"), false);
const coreList = path.join(WORK, "concat-core.txt");
fs.writeFileSync(coreList, ["c1","c2","c3","c4"].map((c) => `file '${path.join(WORK, c + ".mp4")}'`).join("\n"));
const CORE = path.join(OUT, "bemo-thankyou-feature-15s-core-v1.mp4");
ff(["-f", "concat", "-safe", "0", "-i", coreList, "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", CORE]);

console.log("\nwrote:", FINAL);
console.log("wrote:", CORE);
