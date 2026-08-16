// Renders the standing close with the logo's signal arcs arriving in
// sequence, once, then still. Recorded as video for use as every reel's
// final segment.
//
//   node productions/li-product-feature-reels/capture/render-close-animated.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out", "close-anim");
fs.mkdirSync(OUT, { recursive: true });
const FONTS = path.resolve(HERE, "../../common-table-press-release/capture/fonts");
const b64 = (f) => fs.readFileSync(path.join(FONTS, f)).toString("base64");

// the white knockout, inlined so the three arc groups can be animated.
// The arcs are the final three clip-path groups in the svg.
let svg = fs.readFileSync(
  path.resolve(HERE, "../../common-table-press-release/capture/assets/wordmark-white.svg"),
  "utf8"
);
// tag the arc groups in document order: wide, middle, inner
let n = 0;
svg = svg.replace(/<g clip-rule="nonzero" clip-path="url\(#/g, (m) => {
  n += 1;
  const cls = n === 1 ? "arc arc1" : n === 4 ? "arc arc2" : n === 7 ? "arc arc3" : null;
  return cls ? `<g class="${cls}" clip-rule="nonzero" clip-path="url(#` : m;
});

const HTML = `<!doctype html><html><head><style>
@font-face{font-family:"Schibsted";src:url(data:font/woff2;base64,${b64("SchibstedGrotesk-var.woff2")}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:1920px;height:1200px;background:#05347E;font-family:"Schibsted",sans-serif;display:flex;align-items:center;justify-content:center}
.endcard{display:flex;flex-direction:column;align-items:center;justify-content:center}
.logo{height:330px;width:auto}
.logo svg{height:330px;width:auto;display:block}
.tag{margin-top:58px;color:#FFFFFF;font-size:64px;font-weight:640;letter-spacing:-.015em;opacity:0;animation:rise .7s ease 1.5s both}
.site{margin-top:52px;background:#FF8210;color:#1A2A3A;font-weight:700;font-size:38px;padding:18px 46px;border-radius:10px;letter-spacing:-.005em;opacity:0;animation:rise .6s ease 2.0s both}
.arc{opacity:0;transform-origin:86% 40%;animation:arc .45s ease both}
.arc1{animation-delay:1.15s}
.arc2{animation-delay:.95s}
.arc3{animation-delay:.75s}
@keyframes arc{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.word{opacity:0;animation:fadein .6s ease .15s both}
@keyframes fadein{from{opacity:0}to{opacity:1}}
</style></head><body>
<div class="endcard">
  <div class="logo word">${svg}</div>
  <div class="tag">Where missions gain momentum.</div>
  <div class="site">bemointel.ai</div>
</div>
</body></html>`;

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1200 },
  recordVideo: { dir: OUT, size: { width: 1920, height: 1200 } },
});
const page = await context.newPage();
await page.setContent(HTML);
await page.waitForTimeout(4600); // reveal plays once, then holds
await context.close();
await browser.close();

const vid = fs.readdirSync(OUT).find((f) => f.endsWith(".webm"));
console.log("wrote:", path.join(OUT, vid));
