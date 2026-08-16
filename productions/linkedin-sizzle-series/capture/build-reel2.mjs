// Assembles series reel 2, "An Hour, Not Three Days" (production code R4).
//
//   node productions/linkedin-sizzle-series/capture/build-reel2.mjs
//
// Cards render through Playwright on the brand faces (Schibsted Grotesk,
// Geist Mono). Footage is the existing Amplify annual-report flow capture
// (li-product-feature-reels, captured against the Common Table demo org).
// VO is four speech-endpoint reads on Becky's twin voice (hg-r4-l*.wav),
// one pipeline end to end. Mix follows the voiced-cut standard: voice is
// the master track, bed sidechain-ducks, static measured gains, -16 LUFS.
// Bed runs at native length (27.0s); the close card holds a quiet tail.

import { chromium } from "playwright";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const WORK = path.join(OUT, "build-r4");
fs.mkdirSync(WORK, { recursive: true });
const FF = path.resolve(HERE, "../../../node_modules/ffmpeg-static/ffmpeg");
const FONTS = path.join(HERE, "fonts");
const VO = path.join(OUT, "vo", "becky");
const BED = path.join(OUT, "sfx", "music-30-upbeat.wav");
const FOOTAGE = path.resolve(HERE, "../../li-product-feature-reels/capture/out/annualreport-video/page@89423af281439758118da851a7a096ef.webm");

const W = 1920, H = 1080, FPS = 30, D = 30.0;
const ff = (a) => execFileSync(FF, ["-y", ...a], { stdio: ["ignore", "ignore", "inherit"] });
const b64 = (f) => fs.readFileSync(path.join(FONTS, f)).toString("base64");
const measureI = (file) => {
  const r = spawnSync(FF, ["-i", file, "-map", "0:a", "-af", "loudnorm=print_format=json", "-f", "null", "-"], { encoding: "utf8" });
  const m = (r.stderr || "").match(/"input_i"\s*:\s*"(-?[\d.]+)"/);
  return m ? parseFloat(m[1]) : null;
};

const WORDMARK = fs.readFileSync(path.join(HERE, "assets", "wordmark.svg")).toString("base64");
const WHITEMARK = fs.readFileSync(path.join(HERE, "assets", "wordmark-white.svg")).toString("base64");

const FONTCSS = `
@font-face{font-family:"Schibsted";src:url(data:font/woff2;base64,${b64("SchibstedGrotesk-var.woff2")}) format("woff2");font-weight:100 900}
@font-face{font-family:"GeistMono";src:url(data:font/woff2;base64,${b64("GeistMono-var.woff2")}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:${W}px;height:${H}px;background:#FFFFFF;font-family:"Schibsted",sans-serif;display:flex;flex-direction:column;justify-content:center;padding:130px 170px;color:#1A2A3A}
h1{color:#05347E;font-weight:560;font-size:100px;line-height:1.07;letter-spacing:-.019em}
h1.msg{font-size:84px}
.u{box-shadow:inset 0 -.13em 0 #4CBB17}
.mono{font-family:"GeistMono",monospace;font-size:26px;letter-spacing:.09em;text-transform:uppercase;color:#5C6A82;font-weight:500;margin-bottom:46px}
blockquote.qq{color:#05347E;font-weight:560;font-size:56px;line-height:1.26;letter-spacing:-.012em;font-style:italic;position:relative;padding-left:76px}
blockquote.qq::before{content:"\\201C";position:absolute;left:0;top:-14px;font-size:120px;line-height:1;color:#4CBB17;font-style:normal;font-weight:640}
cite{font-style:normal;display:block;margin-top:48px;font-size:32px;color:#3D4F66;line-height:1.45;padding-left:76px}
cite b{display:block;color:#1A2A3A;font-weight:700}
.prov{position:absolute;top:44px;right:56px;font-family:"GeistMono",monospace;font-size:22px;letter-spacing:.09em;text-transform:uppercase;color:#5C6A82;background:rgba(255,255,255,.88);padding:10px 18px;border-radius:8px}
body.close{background:#05347E;padding:0}
.endcard{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%}
.biglogo{height:300px;width:auto;display:block}
.endcard .tag{margin-top:54px;color:#FFFFFF;font-size:60px;font-weight:640;letter-spacing:-.015em}
.endcard .site{margin-top:48px;background:#FF8210;color:#1A2A3A;font-weight:700;font-size:36px;padding:17px 44px;border-radius:10px;letter-spacing:-.005em}
`;

const CARDS = {
  open: `<div class="mono">Jennifer Allen &middot; Friends of the Saratoga Springs Public Library</div>
    <h1>The annual report took<br><span class="u">about an hour</span>.</h1>`,
  quote: `<blockquote class="qq">What followed was the most painless report process I have ever experienced.</blockquote>
    <cite><b>Jennifer Allen</b>Executive Director, Friends of the Saratoga Springs Public Library. BeMo beta.</cite>`,
  message: `<h1 class="msg">Every piece of content reflects <span class="u">who you actually are</span>. Not who you were three drafts ago.</h1>`,
  end: `<div class="endcard"><img class="biglogo" src="data:image/svg+xml;base64,${WHITEMARK}"><div class="tag">Where missions gain momentum.</div><div class="site">bemointel.ai</div></div>`,
};

// ---- render cards and overlays
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
for (const [name, body] of Object.entries(CARDS)) {
  const cls = name === "end" ? ' class="close"' : "";
  await page.setContent(`<style>${FONTCSS}</style><body${cls}>${body}</body>`);
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(WORK, `card-${name}.png`) });
  console.log("card:", name);
}
// provenance label + corner wordmark, transparent plate for the footage beat
await page.setContent(
  `<style>${FONTCSS}body{background:transparent;padding:0;display:block;position:relative}
   img{position:absolute;right:64px;bottom:52px;height:50px;width:auto;opacity:.92}</style>
   <body><div class="prov">Captured from the product</div><img src="data:image/svg+xml;base64,${WORDMARK}"></body>`
);
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(WORK, "plate.png"), omitBackground: true });
console.log("footage plate");
await browser.close();

// ---- picture segments
// s1 0.0-5.0 open card / s2 5.0-11.6 footage / s3 11.6-17.6 quote (silent)
// s4 17.6-23.0 message / s5 23.0-30.0 close
const still = (png, secs, out) =>
  ff(["-loop", "1", "-t", String(secs), "-i", png, "-r", String(FPS),
      "-vf", `scale=${W}:${H},format=yuv420p`,
      "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);
const fadeStill = (png, secs, out, fin, fout) =>
  ff(["-loop", "1", "-t", String(secs), "-i", png, "-r", String(FPS),
      "-vf", `scale=${W}:${H},fade=t=in:st=0:d=${fin},fade=t=out:st=${(secs - fout).toFixed(2)}:d=${fout},format=yuv420p[o]`.replace("[o]", ""),
      "-c:v", "libx264", "-crf", "20", "-preset", "medium", out]);

console.log("segments…");
still(path.join(WORK, "card-open.png"), 5.0, path.join(WORK, "s1.mp4"));
// footage: 1920x1200 source, cover-crop to 16:9 with the 1.12x slow push (series style)
// the interview beat (editor asking the annual-report questions, facts rail
// filling in): full UI in frame with the series' gentle push, 1.12 to 1.32,
// focal on the form column; source 2x = 3840x2400 cropped to 3840x2160
ff(["-ss", "92", "-t", "6.6", "-i", FOOTAGE, "-i", path.join(WORK, "plate.png"),
    "-filter_complex",
    `[0:v]scale=${W * 2}:2400,fps=${FPS},crop=${W * 2}:${H * 2}:0:120,zoompan=z='min(1.12+0.2*on/${Math.round(6.6 * FPS)},1.32)':x='max(0,min(2240-(iw/zoom)/2,iw-iw/zoom))':y='max(0,min(900-(ih/zoom)/2,ih-ih/zoom))':d=1:s=${W}x${H}:fps=${FPS}[v];[v][1:v]overlay=0:0,format=yuv420p[o]`,
    "-map", "[o]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", path.join(WORK, "s2.mp4")]);
fadeStill(path.join(WORK, "card-quote.png"), 6.0, path.join(WORK, "s3.mp4"), 0.5, 0.5);
still(path.join(WORK, "card-message.png"), 5.4, path.join(WORK, "s4.mp4"));
still(path.join(WORK, "card-end.png"), 7.0, path.join(WORK, "s5.mp4"));

const list = path.join(WORK, "concat.txt");
fs.writeFileSync(list, ["s1", "s2", "s3", "s4", "s5"].map((s) => `file '${path.join(WORK, s + ".mp4")}'`).join("\n"));
const PICTURE = path.join(WORK, "r4-picture.mp4");
ff(["-f", "concat", "-safe", "0", "-i", list, "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", PICTURE]);

// ---- captions
// Burned: the two lines whose words are not already on a card (Becky's
// no-doubling rule); the sidecar carries all four for platform indexing.
const srtTime = (s) => {
  const ms = Math.round(s * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return `${h}:${m}:${sec},${String(ms % 1000).padStart(3, "0")}`;
};
// l2/l5 are the August 16 recut takes (one-word "Beemo" in the generation
// text, which renders the name as one tight unit; the first "Bee Mo" reads
// splayed it into two tokens, Becky's catch). Originals kept as hg-r4-l2/l5.
const LINES = [
  { id: "l1", at: 0.4, end: 4.95, text: "Jennifer runs a library friends group.\nHer annual report used to take three days.", burn: true },
  { id: "l2c", at: 5.3, end: 10.66, text: "This year she built it in BeMo, in her\norganization's own voice. It took about an hour.", burn: true },
  { id: "l4", at: 17.9, end: 22.34, text: "Every piece of content reflects who you\nactually are. Not who you were three drafts ago.", burn: false },
  { id: "l5b", at: 23.6, end: 26.68, text: "BeMo. Where missions gain momentum.", burn: false },
];
const srtOf = (rows) => rows.map((r, i) => `${i + 1}\n${srtTime(r.at)} --> ${srtTime(r.end)}\n${r.text}\n`).join("\n");
const SIDE_SRT = path.join(OUT, "bemo-linkedin-sizzle-series-r4-30s.srt");
fs.writeFileSync(SIDE_SRT, srtOf(LINES));
const BURN_SRT = path.join(WORK, "burn.srt");
fs.writeFileSync(BURN_SRT, srtOf(LINES.filter((l) => l.burn)));

const CAPTIONED = path.join(WORK, "r4-captioned.mp4");
ff(["-i", PICTURE, "-vf",
    `subtitles='${BURN_SRT.replace(/'/g, "\\'")}':fontsdir='${FONTS.replace(/'/g, "\\'")}':force_style='FontName=Schibsted Grotesk,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'`,
    "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", CAPTIONED]);

// ---- mix (voiced-cut standard: static gains, sidechain duck, no dynamic loudness)
const gains = {};
let prevEnd = 0, prevName = "";
for (const l of LINES) {
  const wav = path.join(VO, `hg-r4-${l.id}.wav`);
  const I = measureI(wav);
  gains[l.id] = I === null ? 0 : Math.max(-12, Math.min(18, -17 - I));
  const r = spawnSync(FF, ["-i", wav], { encoding: "utf8" });
  const dur = parseFloat(((r.stderr || "").match(/Duration: 00:00:([\d.]+)/) || [])[1] || 0);
  if (l.at < prevEnd - 0.15) { console.error(`OVERLAP: ${l.id} at ${l.at} vs ${prevName} to ${prevEnd}`); process.exit(1); }
  if (l.at + dur > D + 0.1) { console.error(`OVERRUN: ${l.id}`); process.exit(1); }
  prevEnd = l.at + dur; prevName = l.id;
  console.log(`${l.id}: ${I} LUFS, gain ${gains[l.id].toFixed(1)} dB, ${dur.toFixed(2)}s at ${l.at}s`);
}

const inputs = ["-i", CAPTIONED, "-i", BED];
LINES.forEach((l) => inputs.push("-i", path.join(VO, `hg-r4-${l.id}.wav`)));
const voChain = LINES.map((l, i) =>
  `[${i + 2}:a]volume=${gains[l.id].toFixed(1)}dB,adelay=${Math.round(l.at * 1000)}|${Math.round(l.at * 1000)}[v${i}]`).join(";");
const voMix = LINES.map((_, i) => `[v${i}]`).join("") + `amix=inputs=${LINES.length}:normalize=0,apad=whole_dur=${D}[vo]`;
const FILTER =
  `${voChain};${voMix};[vo]asplit[voKey][voMix];` +
  `[1:a]atrim=0:27,apad=whole_dur=${D},afade=t=in:st=0:d=0.3,afade=t=out:st=25.6:d=1.4,volume=-13dB[bedpre];` +
  `[bedpre][voKey]sidechaincompress=threshold=0.015:ratio=9:attack=8:release=420:makeup=1[bed];` +
  `[bed][voMix]amix=inputs=2:normalize=0,alimiter=limit=0.83:level=false[a]`;

const FINAL = path.join(OUT, "bemo-linkedin-sizzle-series-r4-30s-v3.mp4");
ff([...inputs, "-filter_complex", FILTER, "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", String(D), FINAL]);

const I = measureI(FINAL);
const trim = I === null ? 0 : (-16 - I);
if (Math.abs(trim) > 0.5) {
  const TMP = FINAL.replace(".mp4", "-trim.mp4");
  ff(["-i", FINAL, "-map", "0:v", "-map", "0:a", "-c:v", "copy", "-af", `volume=${trim.toFixed(1)}dB,alimiter=limit=0.85:level=false`, "-c:a", "aac", "-b:a", "192k", TMP]);
  fs.renameSync(TMP, FINAL);
}
console.log(`wrote: ${FINAL} (program ${I} LUFS, trimmed ${trim.toFixed(1)} dB)`);
console.log(`sidecar: ${SIDE_SRT}`);
