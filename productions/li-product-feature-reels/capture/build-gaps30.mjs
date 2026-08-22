// Assembles the gaps feature reel, 30-second parent and 15-second core, from the
// shipped knows-whats-missing capture (website-demo-slots production, on disk).
//
//   node productions/li-product-feature-reels/capture/build-gaps30.mjs
//   MIX_ONLY=1 node .../build-gaps30.mjs   # remix audio without re-rendering picture
//
// Slate grammar shared with the Compass rig: cards on the real brand faces, top
// captions on a soft white gradient, corner wordmark, provenance line, standing
// close. Behavior-only; the Maryellen quote lives in the Thursday post copy.
//
// The two rulings carried over from Compass, 2026-08-21: name the thing before the
// demo (identity card second, in the live site's eyebrow-over-promise composition),
// and answer the question the open card asks.
//
// The arc is wider than the asset plan's "the Knowledge Base tells you what is
// missing", because the capture is wider: it names the gap, the user fills it, and
// the product says the fill carries forward into everything built from here. That
// third beat is the one that makes the reel about what remains rather than about a
// clever feature.

import { chromium } from "playwright";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const WORK = path.join(OUT, "build-gaps");
fs.mkdirSync(WORK, { recursive: true });
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const FONTS = path.resolve(HERE, "../../common-table-press-release/capture/fonts");

const W = 1920, H = 1200, FPS = 30;
const ff = (args) => execFileSync(FF, ["-y", ...args], { stdio: ["ignore", "ignore", "inherit"] });
const b64 = (f) => fs.readFileSync(path.join(FONTS, f)).toString("base64");

// Footage: the one take. Action log: question sent 16.2s, answer complete 46.3s
// (names the gap and invites the fill), fill sent 57.3s, confirmed 74.9s.
const DEMO_OUT = path.resolve(HERE, "../../website-demo-slots/capture/out");
const TAKE = path.join(DEMO_OUT, "knows-whats-missing-raw.webm");

const BED_30 = path.join(OUT, "music", "P2-confident-30s.wav");
const BED_15 = path.join(OUT, "music", "P1-saas-demo-16s.wav");
const TARGET_LUFS = -15.8;

const FONTCSS = `
@font-face{font-family:"Schibsted";src:url(data:font/woff2;base64,${b64("SchibstedGrotesk-var.woff2")}) format("woff2");font-weight:100 900}
@font-face{font-family:"GeistMono";src:url(data:font/woff2;base64,${b64("GeistMono-var.woff2")}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:${W}px;height:${H}px;background:#FFFFFF;font-family:"Schibsted",sans-serif;display:flex;flex-direction:column;justify-content:center;padding:150px 170px;color:#1A2A3A}
h1{color:#05347E;font-weight:560;font-size:104px;line-height:1.06;letter-spacing:-.019em}
h1.tight{font-size:82px}
.u{box-shadow:inset 0 -.13em 0 #4CBB17}
.eyebrow{font-family:"GeistMono",monospace;font-size:34px;letter-spacing:.1em;text-transform:uppercase;color:#5C6A82;font-weight:500;margin-bottom:34px}
.cap{position:absolute;left:0;right:0;top:0;padding:44px 70px 64px;background:linear-gradient(rgba(255,255,255,.95) 58%,transparent)}
.cap span{color:#05347E;font-weight:560;font-size:62px;letter-spacing:-.015em}
.prov{position:absolute;left:70px;bottom:44px;font-family:"GeistMono",monospace;font-size:22px;letter-spacing:.09em;text-transform:uppercase;color:#5C6A82;font-weight:500;background:rgba(255,255,255,.78);padding:8px 16px;border-radius:6px}
`;

const WORDMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark.svg")
).toString("base64");
const PROVLINE = "Captured from the product · fictional demo organization";

const CARDS = {
  // Problem first, no product name. The recognizable version of the pain: the answer
  // existed, it just never got written anywhere the organization could reach it.
  open: `<h1 class="tight">Somebody knew the answer.<br>They just never <span class="u">wrote it down</span>.</h1>`,
  // The answer to the open card, in the live site's composition. Both sentences are
  // ratified: the first is the site's gap-honesty pair, the second is what the
  // capture shows the product do.
  whatitis: `<div>
    <div class="eyebrow">Knowledge Base &middot; your organization&rsquo;s record</div>
    <h1>It tells you what&rsquo;s missing.<br>Then it <span class="u">keeps what you add</span>.</h1>
  </div>`,
  // The thesis card. The product's own on-screen words are "that will carry forward
  // into any proposals, sponsorship materials, or event documents you build from
  // here"; this is that, in BeMo's voice.
  lead: `<h1>Answer it once. It <span class="u">carries forward</span> into everything you build next.</h1>`,
  categoryline: `<h1>One record, shared by<br>all <span class="u">four apps</span>.</h1>`,
};

const CAPTIONS = {
  cap1: { line: "What it has, straight from your own record." },
  cap2: { line: "And what it does not have, said plainly." },
  cap3: { line: "You answer once. It carries forward." },
};

// Beats, framed by inspection of the take, 2026-08-22. Both sit after their text has
// settled, so no streaming-edge artifact can land in frame (the Compass lesson).
// The take runs 79.24s and the confirmation only settles at 74.85s, so beat c has
// about 4.3 seconds of usable footage and no more. Asking for longer silently
// truncates the segment, which is what shortened the first parent build. The first
// half of the answer is settled from 46.3s, so beats one and two take the airtime
// instead, framed on different parts of the same block.
const BEATS = {
  a1: { ss: 42.0, focus: [1080, 350], place: [960, 620], zoom: [1.50, 1.58], cap: "cap1" },
  a2: { ss: 48.5, focus: [1080, 580], place: [960, 700], zoom: [1.55, 1.66], cap: "cap2" },
  // Framed tight on the exchange itself, the user's answer and the product recording
  // it, because the payoff line has to be readable at feed width. The wider framing
  // took in the whole thread and shrank the sentence the beat exists for.
  c: { ss: 74.9, focus: [1080, 830], place: [960, 700], zoom: [2.00, 2.12], cap: "cap3" },
};
const BEAT_C_MAX = 4.3;

if (!process.env.MIX_ONLY) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

  for (const [name, body] of Object.entries(CARDS)) {
    await page.setContent(`<style>${FONTCSS}</style><body>${body}</body>`);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(WORK, `card-${name}.png`) });
    console.log("card:", name);
  }
  for (const [name, { line }] of Object.entries(CAPTIONS)) {
    await page.setContent(
      `<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}</style>
       <body><div class="prov">${PROVLINE}</div><div class="cap"><span>${line}</span></div></body>`
    );
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(WORK, `${name}.png`), omitBackground: true });
    console.log("caption:", name);
  }
  await page.setContent(
    `<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}
     img{position:absolute;right:64px;bottom:56px;height:52px;width:auto;opacity:.92}</style>
     <body><img src="data:image/svg+xml;base64,${WORDMARK}"></body>`
  );
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(WORK, "wordmark.png"), omitBackground: true });
  await browser.close();

  const MARK = path.join(WORK, "wordmark.png");
  const still = (png, secs, out) =>
    ff(["-loop", "1", "-t", String(secs), "-i", png, "-loop", "1", "-t", String(secs), "-i", MARK,
        "-r", String(FPS),
        "-filter_complex", `[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,format=yuv420p[o]`,
        "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

  const beat = (key, dur, out) => {
    const { ss, focus, place, zoom, cap } = BEATS[key];
    const N = Math.round(dur * FPS);
    const [z0, z1] = zoom, [ox, oy] = place, [fx, fy] = focus;
    const zx = `min(${z0}+${(z1 - z0).toFixed(4)}*on/${N},${z1})`;
    const xe = `max(0,min(2*(${fx}-${ox}/zoom),iw-iw/zoom))`;
    const ye = `max(0,min(2*(${fy}-${oy}/zoom),ih-ih/zoom))`;
    ff(["-ss", String(ss), "-t", String(dur), "-i", TAKE,
        "-i", path.join(WORK, `${cap}.png`), "-i", MARK,
        "-filter_complex",
        `[0:v]scale=${W * 2}:${H * 2},fps=${FPS},zoompan=z='${zx}':x='${xe}':y='${ye}':d=1:s=${W}x${H}:fps=${FPS}[v];` +
        `[v][1:v]overlay=0:0[c];[c][2:v]overlay=0:0,format=yuv420p[o]`,
        "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);
  };

  const CLOSEANIM = (() => {
    const d = path.join(OUT, "close-anim");
    return path.join(d, fs.readdirSync(d).find((x) => x.endsWith(".webm")));
  })();
  const close = (out) =>
    ff(["-ss", "0.2", "-t", "4.4", "-i", CLOSEANIM, "-r", String(FPS),
        "-vf", `scale=${W}:${H},fps=${FPS},format=yuv420p`,
        "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

  const concat = (parts, out) => {
    const list = path.join(WORK, `concat-${path.basename(out, ".mp4")}.txt`);
    fs.writeFileSync(list, parts.map((s) => `file '${path.join(WORK, s + ".mp4")}'`).join("\n"));
    ff(["-f", "concat", "-safe", "0", "-i", list, "-c:v", "libx264", "-crf", "20",
        "-preset", "slow", "-pix_fmt", "yuv420p", path.join(OUT, out)]);
  };

  const CUTS = [
    { id: "30s-v1", parts: [
      ["card", "open", 2.9], ["card", "whatitis", 3.3],
      ["beat", "a1", 4.8], ["beat", "a2", 4.8], ["beat", "c", BEAT_C_MAX],
      ["card", "lead", 3.1], ["card", "categoryline", 2.4], ["close"]] },
    // The core keeps beat c, the one that closes the loop, for the same reason the
    // Compass core keeps the four lenses: the payoff is what earns the click.
    { id: "15s-core-v1", parts: [
      ["card", "open", 2.8], ["card", "whatitis", 3.6],
      ["beat", "c", BEAT_C_MAX], ["close"]] },
    { id: "15s-core-v1-alt-shows-the-gap", parts: [
      ["card", "open", 2.6], ["card", "whatitis", 3.2],
      ["beat", "a2", 2.6], ["beat", "c", 2.4], ["close"]] },
  ];

  for (const { id, parts } of CUTS) {
    console.log("building:", id);
    const names = parts.map((p, i) => {
      const n = `cut-${id}-${i}`;
      const dst = path.join(WORK, `${n}.mp4`);
      if (p[0] === "card") still(path.join(WORK, `card-${p[1]}.png`), p[2], dst);
      else if (p[0] === "beat") beat(p[1], p[2], dst);
      else close(dst);
      return n;
    });
    concat(names, `bemo-gaps-feature-${id}.mp4`);
  }
}

const dur = (file) => {
  const r = spawnSync(FF, ["-i", file], { encoding: "utf8" });
  const m = (r.stderr || "").match(/Duration: 00:00:([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
};
const measureI = (file) => {
  const r = spawnSync(FF, ["-i", file, "-map", "0:a", "-af", "loudnorm=print_format=json", "-f", "null", "-"], { encoding: "utf8" });
  const m = (r.stderr || "").match(/"input_i"\s*:\s*"(-?[\d.]+)"/);
  return m ? parseFloat(m[1]) : null;
};

for (const [pic, bed, out] of [
  ["30s-v1", BED_30], ["15s-core-v1", BED_15], ["15s-core-v1-alt-shows-the-gap", BED_15],
].map(([id, bed]) => [`bemo-gaps-feature-${id}.mp4`, bed, `bemo-gaps-feature-${id}-final.mp4`])) {
  const PIC = path.join(OUT, pic), FINAL = path.join(OUT, out);
  const D = dur(PIC);
  const fadeOut = Math.min(1.5, D - 0.1);
  ff(["-i", PIC, "-i", bed, "-filter_complex",
      `[1:a]atrim=0:${D},apad=whole_dur=${D},afade=t=in:st=0:d=0.6,afade=t=out:st=${(D - fadeOut).toFixed(2)}:d=${fadeOut}[a]`,
      "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", String(D), FINAL]);
  const I = measureI(FINAL);
  const trim = I === null ? 0 : (TARGET_LUFS - I);
  if (Math.abs(trim) > 0.3) {
    const TMP = FINAL.replace(".mp4", "-trim.mp4");
    ff(["-i", FINAL, "-map", "0:v", "-map", "0:a", "-c:v", "copy",
        "-af", `volume=${trim.toFixed(1)}dB,alimiter=limit=0.85:level=false`, "-c:a", "aac", "-b:a", "192k", TMP]);
    fs.renameSync(TMP, FINAL);
  }
  console.log(`${out}: ${D.toFixed(2)}s, program ${I} LUFS, trimmed ${trim.toFixed(1)} dB`);
}
console.log("done");
