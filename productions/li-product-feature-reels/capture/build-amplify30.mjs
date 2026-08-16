// Assembles the 30-second Amplify feature reel from the appeal-path capture.
//
//   node productions/li-product-feature-reels/capture/build-amplify30.mjs
//
// Cards are rendered through Playwright so they use the real brand faces
// (Schibsted Grotesk, Geist Mono) pulled from the website build. Picture only:
// the music bed is added in the edit, per the feature reel standard.

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const WORK = path.join(OUT, "build");
fs.mkdirSync(WORK, { recursive: true });
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const FONTS = path.resolve(HERE, "../../common-table-press-release/capture/fonts");

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
.mono{font-family:"GeistMono",monospace;font-size:26px;letter-spacing:.09em;text-transform:uppercase;color:#5C6A82;font-weight:500}
blockquote{color:#05347E;font-weight:560;font-size:66px;line-height:1.22;letter-spacing:-.014em}
blockquote.q{font-size:52px;line-height:1.24}
cite{font-style:normal;display:block;margin-top:44px;font-size:32px;color:#3D4F66;line-height:1.45}
cite b{display:block;color:#1A2A3A;font-weight:700}
cite.anon{font-family:"GeistMono",monospace;font-size:24px;letter-spacing:.08em;text-transform:uppercase;color:#5C6A82;margin-top:64px}
blockquote.qq{color:#05347E;font-weight:560;font-size:46px;line-height:1.3;letter-spacing:-.011em;font-style:italic;position:relative;padding-left:76px}
blockquote.qq+blockquote.qq{margin-top:60px}
blockquote.qq::before{content:"“";position:absolute;left:0;top:-14px;font-size:120px;line-height:1;color:#4CBB17;font-style:normal;font-weight:640}
.qmark{position:absolute;top:120px;left:170px;font-size:340px;line-height:1;color:#EAF7E3;font-weight:640;font-style:normal}
.hid{visibility:hidden}
.pill{align-self:flex-start;background:#FF8210;color:#1A2A3A;font-weight:700;font-size:44px;padding:26px 52px;border-radius:999px;margin-top:52px}
.sub{font-size:40px;color:#05347E;margin-top:34px;line-height:1.4}
.cap{position:absolute;left:0;right:0;top:0;padding:44px 70px 64px;background:linear-gradient(rgba(255,255,255,.95) 58%,transparent)}
.cap span{color:#05347E;font-weight:560;font-size:62px;letter-spacing:-.015em}
/* the standing close, matching the hero sizzle */
body.close{background:#05347E;padding:0}
.endcard{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%}
.biglogo{height:330px;width:auto;display:block}
.endcard .tag{margin-top:58px;color:#FFFFFF;font-size:64px;font-weight:640;letter-spacing:-.015em}
.endcard .site{margin-top:52px;background:#FF8210;color:#1A2A3A;font-weight:700;font-size:38px;padding:18px 46px;border-radius:10px;letter-spacing:-.005em}
/* product identity card */
.appcard{display:flex;flex-direction:column;align-items:flex-start}
.appcard .ic{width:132px;height:132px;border-radius:32px;background:#EAF7E3;display:flex;align-items:center;justify-content:center;margin-bottom:40px}
.appcard .ic svg{width:88px;height:88px}
h1.amp{color:#2F7D0D}
`;

const WORDMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark.svg")
).toString("base64");
const WHITEMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark-white.svg")
).toString("base64");

const CARDS = {
  open: `<h1>An appeal letter starts with a blank page.<br><span class="u">Where do you begin?</span></h1>`,
  // the double-quote card renders as three aligned layers so each quote can fade on its own
  __quotes: null,
  category: `<div class="appcard">
    <div class="ic"><svg viewBox="0 0 36 36" fill="none" stroke="#378F10" stroke-width="2" stroke-linejoin="round">
      <path d="M8 15v6h4l9 5V10l-9 5H8z"/><path d="M25 14a5 5 0 0 1 0 8" stroke-linecap="round"/><path d="M28.5 11a9 9 0 0 1 0 14" stroke-linecap="round"/></svg></div>
    <h1 class="amp">Amplify.</h1>
    <div class="sub">One of four apps that share the same memory.</div>
  </div>`,
  end: `<div class="endcard"><img class="biglogo" src="data:image/svg+xml;base64,${WHITEMARK}"><div class="tag">Where missions gain momentum.</div><div class="site">bemointel.ai</div></div>`,
};
const QUOTE_LAYERS = {
  qbase: `<div class="qmark">“</div><blockquote class="qq hid">The questions weren&rsquo;t generic. They were insightful, the kind a seasoned development professional would ask, and they pushed me to articulate our case for support more clearly than I might have on my own.</blockquote>
          <blockquote class="qq hid">What followed was one of the most thoughtful writing experiences I&rsquo;ve had with any tool.</blockquote>
          <cite class="anon">A BeMo user, in her own words</cite>`,
  qa: `<blockquote class="qq">The questions weren&rsquo;t generic. They were insightful, the kind a <span class="u">seasoned development professional</span> would ask, and they pushed me to articulate our case for support more clearly than I might have on my own.</blockquote>
       <blockquote class="qq hid">What followed was one of the most thoughtful writing experiences I&rsquo;ve had with any tool.</blockquote>
       <cite class="anon hid">A BeMo user, in her own words</cite>`,
  qb: `<blockquote class="qq hid">The questions weren&rsquo;t generic. They were insightful, the kind a seasoned development professional would ask, and they pushed me to articulate our case for support more clearly than I might have on my own.</blockquote>
       <blockquote class="qq">What followed was one of the <span class="u">most thoughtful writing experiences</span> I&rsquo;ve had with any tool.</blockquote>
       <cite class="anon hid">A BeMo user, in her own words</cite>`,
};
const CAPTIONS = {
  cap1: "It asks before it writes.",
  cap2: "It knew what a strong appeal needs.",
};

// ---- render cards and caption overlays
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

for (const [name, body] of Object.entries(CARDS)) {
  if (!body) continue;
  const cls = name === "end" ? ' class="close"' : "";
  await page.setContent(`<style>${FONTCSS}</style><body${cls}>${body}</body>`);
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(WORK, `card-${name}.png`) });
  console.log("card:", name);
}
await page.setContent(`<style>${FONTCSS}</style><body>${QUOTE_LAYERS.qbase}</body>`);
await page.waitForTimeout(320);
await page.screenshot({ path: path.join(WORK, "qbase.png") });
for (const layer of ["qa", "qb"]) {
  await page.setContent(`<style>${FONTCSS}body{background:transparent}</style><body>${QUOTE_LAYERS[layer]}</body>`);
  await page.waitForTimeout(320);
  await page.screenshot({ path: path.join(WORK, layer + ".png"), omitBackground: true });
  console.log("layer:", layer);
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
// corner wordmark: transparent full-frame plate, bottom right
await page.setContent(
  `<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}
   img{position:absolute;right:64px;bottom:56px;height:52px;width:auto;opacity:.92}</style>
   <body><img src="data:image/svg+xml;base64,${WORDMARK}"></body>`
);
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(WORK, "wordmark.png"), omitBackground: true });
console.log("wordmark plate");

await browser.close();

// ---- segments
const MARK = () => path.join(WORK, "wordmark.png");

const still = (png, secs, out, mark = true) =>
  mark
    ? ff(["-loop", "1", "-t", String(secs), "-i", png,
          "-loop", "1", "-t", String(secs), "-i", MARK(),
          "-r", String(FPS),
          "-filter_complex", `[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,format=yuv420p[o]`,
          "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out])
    : ff(["-loop", "1", "-t", String(secs), "-i", png, "-r", String(FPS),
          "-vf", `scale=${W}:${H},format=yuv420p`,
          "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

const beat = (src, ss, dur, capPng, out) =>
  ff(["-ss", String(ss), "-t", String(dur), "-i", src, "-i", capPng, "-i", MARK(),
      "-filter_complex", `[0:v]scale=${W*2}:${H*2},fps=${FPS},zoompan=z='min(1.12+0.33*on/${Math.round(dur*FPS)},1.45)':x='max(0,min(2160-(iw/zoom)/2,iw-iw/zoom))':y='max(0,min(1120-(ih/zoom)/2,ih-ih/zoom))':d=1:s=${W}x${H}:fps=${FPS}[v];[v][1:v]overlay=0:0[c];[c][2:v]overlay=0:0,format=yuv420p[o]`,
      "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

const CONT = path.join(OUT, "page@e95429aa9bd9482a6bb2e0442024392d.webm"); // form + questions
const CLOSEANIM = (() => {
  const d = path.join(OUT, "close-anim");
  return path.join(d, fs.readdirSync(d).find((x) => x.endsWith(".webm")));
})();
const BEAT2 = path.join(OUT, "enrichfill", "page@177226a03de55f7fc3ee8a2063dc63e7.webm"); // enrichment answers arriving

const fadeStill = (png, secs, out, fin = 0.6, fout = 0.6) =>
  ff(["-loop", "1", "-t", String(secs), "-i", png,
      "-loop", "1", "-t", String(secs), "-i", MARK(),
      "-r", String(FPS),
      "-filter_complex", `[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,fade=t=in:st=0:d=${fin},fade=t=out:st=${(secs - fout).toFixed(2)}:d=${fout},format=yuv420p[o]`,
      "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

console.log("building segments…");
still(path.join(WORK, "card-open.png"), 3.5, path.join(WORK, "s1.mp4"));
beat(CONT, 9.5, 6, path.join(WORK, "cap1.png"), path.join(WORK, "s2.mp4"));
beat(BEAT2, 12.8, 6, path.join(WORK, "cap2.png"), path.join(WORK, "s3.mp4"));
ff(["-loop","1","-t","7","-i",path.join(WORK,"qbase.png"),
    "-loop","1","-t","7","-i",path.join(WORK,"qa.png"),
    "-loop","1","-t","7","-i",path.join(WORK,"qb.png"),
    "-loop","1","-t","7","-i",MARK(),
    "-r",String(FPS),
    "-filter_complex",
    `[1:v]format=rgba,fade=t=in:st=0.3:d=0.6:alpha=1[qa];[2:v]format=rgba,fade=t=in:st=2.6:d=0.7:alpha=1[qb];[0:v][qa]overlay[x];[x][qb]overlay[y];[y][3:v]overlay=0:0,fade=t=out:st=6.4:d=0.6,format=yuv420p[o]`,
    "-map","[o]","-c:v","libx264","-crf","20","-preset","medium",path.join(WORK,"s4.mp4")]);
still(path.join(WORK, "card-category.png"), 3.5, path.join(WORK, "s5.mp4"));
ff(["-ss","0.2","-t","4.4","-i",CLOSEANIM,"-r",String(FPS),"-vf",`scale=${W}:${H},fps=${FPS},format=yuv420p`,"-c:v","libx264","-crf","20","-preset","medium",path.join(WORK,"s6.mp4")]);

const list = path.join(WORK, "concat.txt");
fs.writeFileSync(list, ["s1", "s2", "s3", "s4", "s5", "s6"].map((s) => `file '${path.join(WORK, s + ".mp4")}'`).join("\n"));

const FINAL = path.join(OUT, "bemo-amplify-feature-30s-v1.mp4");
ff(["-f", "concat", "-safe", "0", "-i", list, "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", FINAL]);

// The 15-second core is assembled, not truncated: it carries the same standing
// close, so it ends like a reel rather than stopping mid-argument.
console.log("building the core…");
still(path.join(WORK, "card-open.png"), 3.0, path.join(WORK, "c1.mp4"));
beat(CONT, 9.5, 4.5, path.join(WORK, "cap1.png"), path.join(WORK, "c2.mp4"));
beat(BEAT2, 12.8, 4.5, path.join(WORK, "cap2.png"), path.join(WORK, "c3.mp4"));
ff(["-ss","0.2","-t","4.6","-i",CLOSEANIM,"-r",String(FPS),"-vf",`scale=${W}:${H},fps=${FPS},format=yuv420p`,"-c:v","libx264","-crf","20","-preset","medium",path.join(WORK,"c4.mp4")]);

const coreList = path.join(WORK, "concat-core.txt");
fs.writeFileSync(coreList, ["c1", "c2", "c3", "c4"].map((c) => `file '${path.join(WORK, c + ".mp4")}'`).join("\n"));

const CORE = path.join(OUT, "bemo-amplify-feature-15s-core-v1.mp4");
ff(["-f", "concat", "-safe", "0", "-i", coreList, "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", CORE]);

console.log("\nwrote:", FINAL);
console.log("wrote:", CORE);
