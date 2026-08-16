// Assembles the 30-second FunderStorm feature reel from the Grant Progress
// Report captures (website-demo-slots production, on disk).
//
//   node productions/li-product-feature-reels/capture/build-funderstorm30.mjs
//   MIX_ONLY=1 node .../build-funderstorm30.mjs   # remix audio without re-rendering picture
//
// Cards are rendered through Playwright so they use the real brand faces
// (Schibsted Grotesk, Geist Mono) pulled from the website build. Captions match
// the shipped Amplify v1 finals (large sapphire line, lower left) so the slate
// reads as a series, plus the Week 30 provenance line on both footage beats.
// The music stage mixes bed A under both cuts to match the shipped Amplify
// final's -15.9 LUFS integrated.

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const WORK = path.join(OUT, "build-funderstorm");
fs.mkdirSync(WORK, { recursive: true });
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const FONTS = path.resolve(HERE, "../../common-table-press-release/capture/fonts");

const W = 1920, H = 1200, FPS = 30;
const ff = (args) => execFileSync(FF, ["-y", ...args], { stdio: ["ignore", "ignore", "inherit"] });
const b64 = (f) => fs.readFileSync(path.join(FONTS, f)).toString("base64");

// Footage: the Grant Progress Report takes, website-demo-slots production.
const DEMO_OUT = path.resolve(HERE, "../../website-demo-slots/capture/out");
const CYCLE = path.join(DEMO_OUT, "funderstorm-cycle-raw.webm"); // the record building
const PICKUP = path.join(DEMO_OUT, "funderstorm-pickup-raw.webm"); // the reopened session
const BEAT1_SS = 221.5; // budget answer saved, facts rail at eleven
const BEAT2_SS = 11.5; // reporting period supplied, brief summary completes

// Music: bed A at native length. Gains measured against the -15.85 LUFS target
// (the shipped Amplify final measures -15.9); bed source measures -12.5 LUFS.
const MUSIC = path.join(OUT, "music", "A-upbeat-acoustic.wav");
const GAIN_30 = -3.1; // dB, tuned by ebur128 measurement of the rendered final
const GAIN_15 = -2.9;

const FONTCSS = `
@font-face{font-family:"Schibsted";src:url(data:font/woff2;base64,${b64("SchibstedGrotesk-var.woff2")}) format("woff2");font-weight:100 900}
@font-face{font-family:"GeistMono";src:url(data:font/woff2;base64,${b64("GeistMono-var.woff2")}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:${W}px;height:${H}px;background:#FFFFFF;font-family:"Schibsted",sans-serif;display:flex;flex-direction:column;justify-content:center;padding:150px 170px;color:#1A2A3A}
h1{color:#05347E;font-weight:560;font-size:104px;line-height:1.06;letter-spacing:-.019em}
.u{box-shadow:inset 0 -.13em 0 #4CBB17}
.mono{font-family:"GeistMono",monospace;font-size:26px;letter-spacing:.09em;text-transform:uppercase;color:#5C6A82;font-weight:500}
blockquote.qq{color:#05347E;font-weight:560;font-size:56px;line-height:1.26;letter-spacing:-.012em;font-style:italic;position:relative;padding-left:76px}
blockquote.qq::before{content:"\\201C";position:absolute;left:0;top:-14px;font-size:120px;line-height:1;color:#4CBB17;font-style:normal;font-weight:640}
cite.anon{font-style:normal;display:block;font-family:"GeistMono",monospace;font-size:24px;letter-spacing:.08em;text-transform:uppercase;color:#5C6A82;margin-top:64px}
.qmark{position:absolute;top:120px;left:170px;font-size:340px;line-height:1;color:#EAF7E3;font-weight:640;font-style:normal}
.sub{font-size:40px;color:#05347E;margin-top:34px;line-height:1.4}
/* caption, the letter-cut treatment (Becky, 2026-08-16): top of frame on a soft white gradient */
.cap{position:absolute;left:0;right:0;top:0;padding:44px 70px 64px;background:linear-gradient(rgba(255,255,255,.95) 58%,transparent)}
.cap span{color:#05347E;font-weight:560;font-size:62px;letter-spacing:-.015em}
/* the Week 30 provenance line, bottom left (the caption gradient owns the top) */
.prov{position:absolute;left:70px;bottom:44px;font-family:"GeistMono",monospace;font-size:22px;letter-spacing:.09em;text-transform:uppercase;color:#5C6A82;font-weight:500;background:rgba(255,255,255,.78);padding:8px 16px;border-radius:6px}
/* the standing close, matching the hero sizzle */
body.close{background:#05347E;padding:0}
/* product identity card, FunderStorm orange (the product's color in the site design system) */
.appcard{display:flex;flex-direction:column;align-items:flex-start}
.appcard .ic{width:132px;height:132px;border-radius:32px;background:#FFF3E6;display:flex;align-items:center;justify-content:center;margin-bottom:40px}
.appcard .ic svg{width:88px;height:88px}
h1.fs{color:#B05606}
`;

const WORDMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark.svg")
).toString("base64");

const PROVLINE = "Captured from the product · fictional demo organization";

const CARDS = {
  open: `<h1>The grant report is due. Again.<br><span class="u">Where did last cycle&rsquo;s answers go?</span></h1>`,
  lead: `<h1>Your next grant cycle should start <span class="u">where your last one ended</span>, not from scratch.</h1>`,
  quote: `<div class="qmark">“</div>
    <blockquote class="qq">Love that the &lsquo;chats&rsquo; are <span class="u">saved to come back to later</span>.</blockquote>
    <cite class="anon">Maryellen Duggan &middot; Caigh It Forward Foundation &middot; in her own words</cite>`,
  category: `<div class="appcard">
    <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#DB6B09" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/></svg></div>
    <h1 class="fs">FunderStorm.</h1>
    <div class="sub">One of four apps that share the same memory.</div>
  </div>`,
};
const CAPTIONS = {
  cap1: "Every answer goes on the record.",
  cap2: "It picks up right where you left off.",
};

if (!process.env.MIX_ONLY) {
  // ---- render cards and overlay plates
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

  for (const [name, body] of Object.entries(CARDS)) {
    await page.setContent(`<style>${FONTCSS}</style><body>${body}</body>`);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(WORK, `card-${name}.png`) });
    console.log("card:", name);
  }
  // caption plates carry the caption (lower left) and the provenance line (top left)
  for (const [name, line] of Object.entries(CAPTIONS)) {
    await page.setContent(
      `<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}</style>
       <body><div class="prov">${PROVLINE}</div><div class="cap"><span>${line}</span></div></body>`
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

  const still = (png, secs, out) =>
    ff(["-loop", "1", "-t", String(secs), "-i", png,
        "-loop", "1", "-t", String(secs), "-i", MARK(),
        "-r", String(FPS),
        "-filter_complex", `[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,format=yuv420p[o]`,
        "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

  // the push-in rule: supersampled slow zoom so the document work fills the screen
  const beat = (src, ss, dur, capPng, out) =>
    ff(["-ss", String(ss), "-t", String(dur), "-i", src, "-i", capPng, "-i", MARK(),
        "-filter_complex", `[0:v]scale=${W*2}:${H*2},fps=${FPS},zoompan=z='min(1.12+0.33*on/${Math.round(dur*FPS)},1.45)':x='max(0,min(2160-(iw/zoom)/2,iw-iw/zoom))':y='max(0,min(1120-(ih/zoom)/2,ih-ih/zoom))':d=1:s=${W}x${H}:fps=${FPS}[v];[v][1:v]overlay=0:0[c];[c][2:v]overlay=0:0,format=yuv420p[o]`,
        "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

  const fadeStill = (png, secs, out, fin = 0.5, fout = 0.5) =>
    ff(["-loop", "1", "-t", String(secs), "-i", png,
        "-loop", "1", "-t", String(secs), "-i", MARK(),
        "-r", String(FPS),
        "-filter_complex", `[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,fade=t=in:st=0:d=${fin},fade=t=out:st=${(secs - fout).toFixed(2)}:d=${fout},format=yuv420p[o]`,
        "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

  const CLOSEANIM = (() => {
    const d = path.join(OUT, "close-anim");
    return path.join(d, fs.readdirSync(d).find((x) => x.endsWith(".webm")));
  })();

  console.log("building segments…");
  still(path.join(WORK, "card-open.png"), 3.2, path.join(WORK, "s1.mp4"));
  beat(CYCLE, BEAT1_SS, 5.5, path.join(WORK, "cap1.png"), path.join(WORK, "s2.mp4"));
  beat(PICKUP, BEAT2_SS, 5.5, path.join(WORK, "cap2.png"), path.join(WORK, "s3.mp4"));
  still(path.join(WORK, "card-lead.png"), 3.0, path.join(WORK, "s4.mp4"));
  fadeStill(path.join(WORK, "card-quote.png"), 5.6, path.join(WORK, "s5.mp4"));
  still(path.join(WORK, "card-category.png"), 2.8, path.join(WORK, "s6.mp4"));
  ff(["-ss","0.2","-t","4.4","-i",CLOSEANIM,"-r",String(FPS),"-vf",`scale=${W}:${H},fps=${FPS},format=yuv420p`,"-c:v","libx264","-crf","20","-preset","medium",path.join(WORK,"s7.mp4")]);

  const list = path.join(WORK, "concat.txt");
  fs.writeFileSync(list, ["s1","s2","s3","s4","s5","s6","s7"].map((s) => `file '${path.join(WORK, s + ".mp4")}'`).join("\n"));
  ff(["-f", "concat", "-safe", "0", "-i", list, "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", path.join(OUT, "bemo-funderstorm-feature-30s-v1.mp4")]);

  // The 15-second core is assembled, not truncated: it carries the same standing
  // close, so it ends like a reel rather than stopping mid-argument.
  console.log("building the core…");
  still(path.join(WORK, "card-open.png"), 2.8, path.join(WORK, "c1.mp4"));
  beat(CYCLE, BEAT1_SS, 4.0, path.join(WORK, "cap1.png"), path.join(WORK, "c2.mp4"));
  beat(PICKUP, BEAT2_SS, 4.0, path.join(WORK, "cap2.png"), path.join(WORK, "c3.mp4"));
  ff(["-ss","0.2","-t","4.4","-i",CLOSEANIM,"-r",String(FPS),"-vf",`scale=${W}:${H},fps=${FPS},format=yuv420p`,"-c:v","libx264","-crf","20","-preset","medium",path.join(WORK,"c4.mp4")]);

  const coreList = path.join(WORK, "concat-core.txt");
  fs.writeFileSync(coreList, ["c1","c2","c3","c4"].map((c) => `file '${path.join(WORK, c + ".mp4")}'`).join("\n"));
  ff(["-f", "concat", "-safe", "0", "-i", coreList, "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", path.join(OUT, "bemo-funderstorm-feature-15s-core-v1.mp4")]);
}

// ---- music: bed A under the picture, native length, no looping, fade out ~1.5s
const probeDur = (f) => {
  try { execFileSync(FF, ["-i", f], { stdio: ["ignore", "ignore", "pipe"] }); } catch (e) {
    const m = e.stderr.toString().match(/Duration: (\d+):(\d+):([\d.]+)/);
    return (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]);
  }
};

for (const [pic, gain, out] of [
  ["bemo-funderstorm-feature-30s-v1.mp4", GAIN_30, "bemo-funderstorm-feature-30s-v1-final.mp4"],
  ["bemo-funderstorm-feature-15s-core-v1.mp4", GAIN_15, "bemo-funderstorm-feature-15s-core-v1-final.mp4"],
]) {
  const picture = path.join(OUT, pic);
  const dur = probeDur(picture);
  const fadeStart = (dur - 1.5).toFixed(2);
  ff(["-i", picture, "-i", MUSIC,
      "-filter_complex", `[1:a]volume=${gain}dB,afade=t=in:st=0:d=0.6,afade=t=out:st=${fadeStart}:d=1.5,atrim=0:${dur.toFixed(2)}[a]`,
      "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
      path.join(OUT, out)]);
  console.log("mixed:", out, `(${dur.toFixed(2)}s, bed ${gain}dB)`);
}
console.log("done");
