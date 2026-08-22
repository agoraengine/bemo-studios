// Assembles the Compass feature reel, 30-second parent and 15-second core,
// from the one Compass session captured against Common Table
// (website-demo-slots production, on disk).
//
//   node productions/li-product-feature-reels/capture/build-compass30.mjs
//   MIX_ONLY=1 node .../build-compass30.mjs   # remix audio without re-rendering picture
//
// Cut per script.md "Reel: Compass" (ratified 2026-08-21). Cards render through
// Playwright on the real brand faces. Slate grammar: top captions on a soft white
// gradient, corner wordmark, provenance line, standing close. Behavior-only:
// Meg Poe is per-use gated and appears in no frame and no caption.
//
// Beds per Becky's 2026-08-16 ruling: P2 under the 30s parent, P1 under the 15s
// core, trimmed to the house -15.8 LUFS by measurement (the mix-beds discipline).

import { chromium } from "playwright";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const WORK = path.join(OUT, "build-compass");
fs.mkdirSync(WORK, { recursive: true });
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const FONTS = path.resolve(HERE, "../../common-table-press-release/capture/fonts");

const W = 1920, H = 1200, FPS = 30;
const ff = (args) => execFileSync(FF, ["-y", ...args], { stdio: ["ignore", "ignore", "inherit"] });
const b64 = (f) => fs.readFileSync(path.join(FONTS, f)).toString("base64");

// Footage: the one Compass take, website-demo-slots production.
// Action log: question sent 19.8s, answer complete 52.4s, follow-up sent 60.9s.
const DEMO_OUT = path.resolve(HERE, "../../website-demo-slots/capture/out");
const TAKE = path.join(DEMO_OUT, "compass-in-flow-raw.webm");

// Music: P2 under the parent, P1 under the core.
const BED_30 = path.join(OUT, "music", "P2-confident-30s.wav");
const BED_15 = path.join(OUT, "music", "P1-saas-demo-16s.wav");
const TARGET_LUFS = -15.8;

const FONTCSS = `
@font-face{font-family:"Schibsted";src:url(data:font/woff2;base64,${b64("SchibstedGrotesk-var.woff2")}) format("woff2");font-weight:100 900}
@font-face{font-family:"GeistMono";src:url(data:font/woff2;base64,${b64("GeistMono-var.woff2")}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:${W}px;height:${H}px;background:#FFFFFF;font-family:"Schibsted",sans-serif;display:flex;flex-direction:column;justify-content:center;padding:150px 170px;color:#1A2A3A}
h1{color:#05347E;font-weight:560;font-size:104px;line-height:1.06;letter-spacing:-.019em}
/* a longer line, sized so each sentence holds one line and the mark does not split */
h1.tight{font-size:78px}
.u{box-shadow:inset 0 -.13em 0 #4CBB17}
.sub{font-size:40px;color:#05347E;margin-top:34px;line-height:1.4}
/* caption, the letter-cut treatment (Becky, 2026-08-16): top of frame on a soft white gradient */
.cap{position:absolute;left:0;right:0;top:0;padding:44px 70px 64px;background:linear-gradient(rgba(255,255,255,.95) 58%,transparent)}
/* beat one carries its caption low: the subject of that shot is the user's own
   question, which sits at the top of the app viewport and must not be faded
   under the caption gradient. Same type, same treatment, flipped. */
.cap.low{top:auto;bottom:0;padding:64px 70px 48px;background:linear-gradient(transparent,rgba(255,255,255,.95) 42%)}
.cap span{color:#05347E;font-weight:560;font-size:62px;letter-spacing:-.015em}
/* the provenance line, bottom left (the caption gradient owns the top) */
.prov{position:absolute;left:70px;bottom:44px;font-family:"GeistMono",monospace;font-size:22px;letter-spacing:.09em;text-transform:uppercase;color:#5C6A82;font-weight:500;background:rgba(255,255,255,.78);padding:8px 16px;border-radius:6px}
/* beat one's provenance moves up out of the low caption's way */
.prov.raised{bottom:210px}
/* product identity card: Compass is Deep Sapphire (bemo-website DESIGN.md),
   on the cool wash rather than FunderStorm's warm one */
.appcard{display:flex;flex-direction:column;align-items:flex-start}
/* the answer line stacked under the category line on the identity card */
.sub.answer{margin-top:22px;font-size:46px;color:#05347E}
/* the site's own composition: product eyebrow over the promise as the headline */
.eyebrow{font-family:"GeistMono",monospace;font-size:34px;letter-spacing:.1em;text-transform:uppercase;color:#5C6A82;font-weight:500;margin-bottom:34px}
.appcard .ic{width:132px;height:132px;border-radius:32px;background:#E9F0FA;display:flex;align-items:center;justify-content:center;margin-bottom:40px}
.appcard .ic svg{width:88px;height:88px}
`;

const WORDMARK = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark.svg")
).toString("base64");

const PROVLINE = "Captured from the product · fictional demo organization";

const CARDS = {
  open: `<h1>The test is not retirement.<br>It is <span class="u">two weeks off</span>.</h1>`,
  lead: `<h1>You don&rsquo;t have to be <span class="u">the only one</span> who knows how this organization works.</h1>`,
  category: `<div class="appcard">
    <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#05347E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div>
    <h1>Compass.</h1>
    <div class="sub">One of four apps that share the same memory.</div>
  </div>`,
  // Not new copy: it is the first line of the ratified Tuesday post copy, moved onto
  // a card so the feed cut states its own setup.
  covering: `<h1 class="tight">Right now somebody is <span class="u">covering for you</span>.<br>Or you are covering for somebody.</h1>`,
  // The what-it-is card, second position in the v3 cuts. The description is the live
  // site's own, from the Compass page: "a thinking partner for strategy". Keeping the
  // video and the page on one sentence is the point; a viewer who watches this and
  // then lands on bemointel.ai should hear the same thing twice.
  // The category line as its own type card. Once the identity card moves to the front
  // of the reel, the old icon-and-name card at the end reads as a repeat, so the
  // closing card drops the icon and the name and carries only the ratified line.
  categoryline: `<h1>One of four apps that share<br>the <span class="u">same memory</span>.</h1>`,
  whatitis: `<div class="appcard">
    <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#05347E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div>
    <h1>Compass.</h1>
    <div class="sub">A thinking partner for strategy that remembers<br>what your organization already decided, and why.</div>
  </div>`,
  // The card that both names Compass and answers the question the open card asks.
  // The open card poses coverage: somebody is away and somebody is covering. Without
  // this line the 15 poses that and never answers it, because the lead message lived
  // only in the parent. The message-map line is the answer, and it runs verbatim.
  whatitis2: `<div class="appcard">
    <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#05347E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg></div>
    <h1>Compass.</h1>
    <div class="sub">A thinking partner for strategy.</div>
    <div class="sub answer">You don&rsquo;t have to be <span class="u">the only one</span><br>who knows how this organization works.</div>
  </div>`,
  // The same job in the live site's own composition: product eyebrow over the promise
  // as the headline, which is exactly how the Compass page is built.
  whatitis3: `<div>
    <div class="eyebrow">Compass &middot; strategy</div>
    <h1>You don&rsquo;t have to be <span class="u">the only one</span> who knows how this organization works.</h1>
  </div>`,
};

// Captions, and where each sits. Beat one goes low; see the .cap.low note above.
const CAPTIONS = {
  cap1: { line: "A decision, thought out loud.", low: true },
  cap2: { line: "Four lenses you do not have four people for.", low: false },
  cap3: { line: "Then it asks you for what it does not know.", low: false },
  // The plain-language caption for the v3 cuts. "Four lenses you do not have four
  // people for" is the better line and it stays on the record, but it describes the
  // absence rather than what the viewer is watching happen. This one says what is on
  // screen, and it tracks the live site's "BeMo answers with your objective, your
  // numbers, your history".
  cap2plain: { line: "It answers with your numbers, your history, your board.", low: false },
};

// The three beats, framed by inspection of the take at 2026-08-21.
// focus is a point in the source's own 1920x1200 coordinates; place is where that
// point should land in the output frame; zoom is the push across the shot.
//
// Beat three starts after the answer completes at 52.4s. Typing of the follow-up
// begins around 55.5s, well before the action log's 60.0s "typed" mark, so the
// composer carries the words "If the Bright Harbor renewal" for the back half of
// this shot. That is the exchange script.md deliberately banks. Rather than cut
// the beat short, the frame is anchored on the ask-back block's bottom edge so
// the crop ends above the composer and the banked line never enters frame.
//
// Beat one is the only shot cut from the answer while it is still streaming, and the
// writing edge is where the artifacts live: heading three renders as raw `**3. Demand`
// for a fraction of a second at about 35.3s before the bold resolves (headings one and
// two do not glitch). The in-point moved from 30.0 to 29.4 so the shot ends at 34.9,
// clear of it. Beats two and three are settled: the answer is fully rendered by 46.5s,
// well before the action log's 52.4s mark.
const BEATS = {
  b1: { ss: 29.4, focus: [1200, 130], place: [960, 112], zoom: [1.55, 1.72], cap: "cap1" },
  b2: { ss: 46.0, focus: [1080, 570], focusEnd: [1080, 640], place: [960, 700], zoom: [1.58, 1.66], cap: "cap2" },
  b3: { ss: 53.5, focus: [1080, 1005], place: [960, 1055], zoom: [1.82, 1.95], cap: "cap3" },
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
  for (const [name, { line, low }] of Object.entries(CAPTIONS)) {
    await page.setContent(
      `<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}</style>
       <body><div class="prov${low ? " raised" : ""}">${PROVLINE}</div>
       <div class="cap${low ? " low" : ""}"><span>${line}</span></div></body>`
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
  console.log("wordmark plate");

  await browser.close();

  // ---- segments
  const MARK = path.join(WORK, "wordmark.png");

  const still = (png, secs, out) =>
    ff(["-loop", "1", "-t", String(secs), "-i", png,
        "-loop", "1", "-t", String(secs), "-i", MARK,
        "-r", String(FPS),
        "-filter_complex", `[0:v]scale=${W}:${H}[v];[v][1:v]overlay=0:0,format=yuv420p[o]`,
        "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

  // The push-in rule, framed: supersample 2x, then hold the beat's focus point at
  // a chosen spot in the output while the zoom creeps. Keeping the focus fixed is
  // what stops the shot drifting off the thing the caption is talking about.
  const beat = (key, dur, out, capOverride) => {
    const { ss, focus, focusEnd, place, zoom } = BEATS[key];
    const N = Math.round(dur * FPS);
    const [z0, z1] = zoom, [ox, oy] = place, [fx, fy] = focus;
    const p = `on/${N}`;
    const zx = `min(${z0}+${(z1 - z0).toFixed(4)}*${p},${z1})`;
    // focusEnd drifts the focus point across the shot, which reads as a slow scroll
    const fxe = focusEnd ? `(${fx}+${focusEnd[0] - fx}*${p})` : String(fx);
    const fye = focusEnd ? `(${fy}+${focusEnd[1] - fy}*${p})` : String(fy);
    const xe = `max(0,min(2*(${fxe}-${ox}/zoom),iw-iw/zoom))`;
    const ye = `max(0,min(2*(${fye}-${oy}/zoom),ih-ih/zoom))`;
    ff(["-ss", String(ss), "-t", String(dur), "-i", TAKE,
        "-i", path.join(WORK, `${capOverride || BEATS[key].cap}.png`), "-i", MARK,
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

  // ---- the cuts.
  //
  // The ordering ruling, 2026-08-21: **name the product before the demo, not after.**
  // The slate's grammar puts the identity card near the end, which works for a viewer
  // who already knows BeMo. A cold feed viewer watched sixteen seconds of a chat
  // interface before the word Compass ever appeared, and the 15 never said it at all.
  // v3 cuts move the identity card to second position, straight after the problem, so
  // the viewer knows what they are looking at before they look at it.
  //
  // The identity card uses the live site's own plain description, "a thinking partner
  // for strategy", rather than the category line "one of four apps that share the same
  // memory", which tells a newcomer nothing about what Compass does. The parent keeps
  // the category line at the end, where the viewer is ready for it.
  const CUTS = [
    // 30-second parents (bed P2)
    { id: "30s-v2", kind: "parent", parts: [
      ["card", "covering", 2.9], ["card", "whatitis", 3.1],
      ["beat", "b1", 4.6], ["beat", "b2", 5.1, "cap2plain"], ["beat", "b3", 4.6],
      ["card", "lead", 2.7], ["card", "categoryline", 2.4], ["close"]] },
    { id: "30s-v1-superseded", kind: "parent", parts: [
      ["card", "open", 3.0], ["beat", "b1", 5.5], ["beat", "b2", 5.5], ["beat", "b3", 5.5],
      ["card", "lead", 3.0], ["card", "category", 3.0], ["close"]] },
    // 15-second cores (bed P1)
    // v4 answers the question the open card asks. v3 named Compass but left the
    // coverage setup hanging: it never said what happens when the person who knows is
    // away. The message-map line is that answer and it now rides the identity card.
    // The site composition wins the card: the promise reads at headline size where the
    // stacked version buried it at 46px under a large product name. The eyebrow still
    // names Compass and its category, exactly as the live page does.
    { id: "15s-core-v4", kind: "core", parts: [
      ["card", "covering", 2.8], ["card", "whatitis3", 3.6],
      ["beat", "b2", 4.4, "cap2plain"], ["close"]] },
    { id: "15s-core-v4-alt-product-name-large", kind: "core", parts: [
      ["card", "covering", 2.8], ["card", "whatitis2", 3.6],
      ["beat", "b2", 4.4, "cap2plain"], ["close"]] },
    // v5 swaps the footage beat: the question going in rather than the four
    // lenses coming back. Built to settle whether the week's most on-anchor
    // image belongs in the feed cut. That frame carries the user's unfinished
    // question, the product naming itself a thinking partner, and the first
    // org-specific line of the answer, which is the essay's argument in one shot.
    { id: "15s-core-v5-the-question", kind: "core", parts: [
      ["card", "covering", 2.8], ["card", "whatitis3", 3.6],
      ["beat", "b1", 4.4], ["close"]] },
    { id: "15s-core-v3-superseded", kind: "core", parts: [
      ["card", "covering", 3.0], ["card", "whatitis", 3.0],
      ["beat", "b2", 4.8, "cap2plain"], ["close"]] },
    { id: "15s-core-v2-superseded", kind: "core", parts: [
      ["card", "covering", 3.2], ["beat", "b1", 3.2], ["beat", "b2", 4.4], ["close"]] },
  ];

  for (const { id, parts } of CUTS) {
    console.log("building:", id);
    const names = parts.map((p, i) => {
      const n = `cut-${id}-${i}`;
      const dst = path.join(WORK, `${n}.mp4`);
      if (p[0] === "card") still(path.join(WORK, `card-${p[1]}.png`), p[2], dst);
      else if (p[0] === "beat") beat(p[1], p[2], dst, p[3]);
      else close(dst);
      return n;
    });
    concat(names, `bemo-compass-feature-${id}.mp4`);
  }
}

// ---- music: bed at native length, static measured gain to the house target
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

const MIX = [
  ["30s-v2", BED_30], ["30s-v1-superseded", BED_30],
  ["15s-core-v4", BED_15], ["15s-core-v4-alt-product-name-large", BED_15],
  ["15s-core-v5-the-question", BED_15], ["15s-core-v3-superseded", BED_15], ["15s-core-v2-superseded", BED_15],
];
for (const [pic, bed, out] of MIX.map(([id, bed]) => [
  `bemo-compass-feature-${id}.mp4`, bed, `bemo-compass-feature-${id}-final.mp4`])) {
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
