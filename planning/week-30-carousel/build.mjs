#!/usr/bin/env node
// Build the Week 30 LinkedIn carousel: "the questions worth asking". v2.
//
//   node planning/week-30-carousel/build.mjs
//
// Seven slides, copy verbatim from the ratified Week 30 asset plan
// (../bemo-os/docs/communications/narrative-arc/anchors/2026-w30-asset-plan.md,
// Wednesday carousel section). Do not edit slide copy here; if the plan
// changes, re-quote it. Typesetting (curly quotes, the green mark, the mono
// numbering labels, size splits within a slide's own copy) is layout, not
// rewriting.
//
// v2 is the bolder pass per Becky's Aug 16 note: Deep Sapphire cover and
// close with white type, oversized ghost glyphs in Verdant Soft behind the
// question slides (the reels' quote-card device, build-amplify30.mjs), eyebrow
// pills, and much larger load-bearing type. Orange appears once across the
// whole set, as the essay-pointer pill on the close (accent, never a ground).
//
// Outputs, next to this file:
//   w30-carousel-s1..s7-portrait.png   1080x1350, the LinkedIn document ratio
//   w30-carousel-s1..s7-square.png     1080x1080, the Instagram adaptation
//   w30-carousel.pdf                   7 portrait pages, the LinkedIn upload
//
// The PDF is assembled from the portrait PNGs (Pillow), so its pages are
// pixel-identical to the reviewed stills.

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");

// ------------------------------------------------------------------- assets
const FONTS = path.join(REPO, "productions", "common-table-press-release", "capture", "fonts");
const ASSETS = path.join(REPO, "productions", "common-table-press-release", "capture", "assets");
const WORDMARK_WHITE = `data:image/svg+xml;base64,${fs
  .readFileSync(path.join(ASSETS, "wordmark-white.svg"))
  .toString("base64")}`;

const fontFace = `
@font-face {
  font-family: "Schibsted Grotesk";
  src: url("file://${path.join(FONTS, "SchibstedGrotesk-var.woff2")}") format("woff2");
  font-weight: 100 900;
}
@font-face {
  font-family: "Geist Mono";
  src: url("file://${path.join(FONTS, "GeistMono-var.woff2")}") format("woff2");
  font-weight: 100 900;
}`;

// Tokens from bemo-website DESIGN.md. Green text on light grounds is the
// Week 26 fix, Verdant Green 700 #378F10; the underline mark and the ghost
// glyphs are graphics and use the brand values (#4CBB17, #EAF7E3). Orange is
// accent only, never a ground; its one appearance is the close's pill, ink on
// orange per the Ink-on-Orange Rule.
const C = {
  ground: "#FFFFFF",
  sapphire: "#05347E",
  ink: "#1A2A3A",
  inkMuted: "#3D4F66",
  inkFaint: "#5C6A82",
  green: "#4CBB17",
  green700: "#378F10",
  greenSoft: "#EAF7E3",
  orange: "#FF8210",
};

const M = (s) => `<span class="mark">${s}</span>`;

// ------------------------------------------------------------------- slides
//
// Copy fields carry the slide copy verbatim, split only for hierarchy, never
// reworded. Eyebrows and the page index are labels, allowed by the build
// brief; the QUESTION numbering is a label, not a statistic. `s` values are
// portrait sizes in px; the square build scales them by SQ.

const SLIDES = [
  {
    // Cover, Deep Sapphire ground. The button sentence sets up quietly; the
    // payoff sentence runs huge with the green mark.
    n: 1,
    dark: true,
    eyebrow: { text: "The questions worth asking" },
    setup: { text: "LinkedIn added a button for reporting AI slop.", s: 52 },
    head: { text: `Here&rsquo;s ${M("a better test")}.`, s: 116 },
  },
  {
    // The unanswerable question, under the reels' oversized ghost quote mark.
    n: 2,
    ghost: { char: "&ldquo;", s: 560, top: -30, left: 40 },
    head: {
      text: `&ldquo;Was AI involved?&rdquo; is ${M("unanswerable")}, and getting more so.`,
      s: 88,
    },
    support: { text: "Even answered, it tells you nothing you can use.", s: 36 },
  },
  {
    n: 3,
    q: "01",
    ghost: { char: "?", s: 780, top: 340, right: -70 },
    head: { text: "Did you learn something?", s: 100 },
  },
  {
    n: 4,
    q: "02",
    ghost: { char: "?", s: 780, top: 340, right: -70 },
    head: { text: "Did it make you stop and think twice?", s: 100 },
  },
  {
    n: 5,
    q: "03",
    ghost: { char: "?", s: 780, top: 340, right: -70 },
    head: {
      text: "Did it connect you to the person who wrote it, or could anyone have posted it?",
      s: 100,
    },
  },
  {
    n: 6,
    q: "04",
    ghost: { char: "?", s: 780, top: 340, right: -70 },
    head: { text: "Would you trust the person behind it with something that mattered?", s: 100 },
  },
  {
    // Close, Deep Sapphire ground: white knockout wordmark, and the set's one
    // orange moment carrying the essay pointer (copy verbatim inside it).
    n: 7,
    dark: true,
    head: {
      text: `Underneath all of them: is there ${M("more of that person")} in this, or less?`,
      s: 86,
    },
    pointer: "(Full essay on my profile.)",
  },
];

// ------------------------------------------------------------------ formats
const FORMATS = [
  { suffix: "portrait", w: 1080, h: 1350, pad: 96, sq: 1 },
  { suffix: "square", w: 1080, h: 1080, pad: 88, sq: 0.86 },
];

function slideHtml(s, fmt) {
  const px = (v) => Math.round(v * fmt.sq);
  const dark = !!s.dark;
  const headColor = dark ? "#FFFFFF" : C.sapphire;
  const ground = dark ? C.sapphire : C.ground;

  // Eyebrow: cover gets bare green mono on navy; question slides get the
  // matched Verdant Soft pill with Verdant 700 text.
  let eyebrow = "";
  if (s.q) {
    eyebrow = `<div class="pill">Question ${s.q}</div>`;
  } else if (s.eyebrow) {
    eyebrow = `<div class="eyebrow">${s.eyebrow.text}</div>`;
  }

  const ghost = s.ghost
    ? `<div class="ghost" style="font-size:${px(s.ghost.s)}px;top:${px(s.ghost.top)}px;${
        s.ghost.left != null ? `left:${px(s.ghost.left)}px` : `right:${px(s.ghost.right)}px`
      }">${s.ghost.char}</div>`
    : "";

  const setup = s.setup ? `<div class="setup" style="font-size:${px(s.setup.s)}px">${s.setup.text}</div>` : "";
  const support = s.support
    ? `<div class="support" style="font-size:${px(s.support.s)}px">${s.support.text}</div>`
    : "";
  const footer = s.pointer
    ? `<div class="footrow">
         <img class="wordmark" src="${WORDMARK_WHITE}" alt="BeMo">
         <div class="pointer">${s.pointer}</div>
       </div>`
    : "";
  const index = `<div class="index"${s.pointer ? ' style="left:auto"' : ""}>0${s.n} / 07</div>`;

  // Question slides share one top-anchored grid so the four read as a set
  // when flipped; statement slides center.
  const anchored = !!s.q;

  return `<style>
    ${fontFace}
    * { margin:0; padding:0; box-sizing:border-box }
    body {
      width:${fmt.w}px; height:${fmt.h}px; background:${ground};
      font-family:"Schibsted Grotesk", system-ui, sans-serif; color:${C.ink};
      padding:${fmt.pad}px; overflow:hidden; position:relative;
      display:flex; flex-direction:column;
      justify-content:${anchored ? "flex-start" : "center"};
      ${anchored ? `padding-top:${px(300)}px;` : ""}
    }
    .ghost {
      position:absolute; z-index:0; color:${C.greenSoft};
      font-weight:640; line-height:1; letter-spacing:-0.02em;
    }
    .eyebrow {
      position:relative; z-index:1;
      font-family:"Geist Mono", ui-monospace, monospace;
      font-size:${px(24)}px; font-weight:500; letter-spacing:0.09em;
      text-transform:uppercase; color:${C.green};
      margin-bottom:${px(44)}px;
    }
    .pill {
      position:relative; z-index:1; align-self:flex-start;
      font-family:"Geist Mono", ui-monospace, monospace;
      font-size:${px(24)}px; font-weight:500; letter-spacing:0.09em;
      text-transform:uppercase; color:${C.green700}; background:${C.greenSoft};
      border-radius:999px; padding:${px(14)}px ${px(26)}px;
      margin-bottom:${px(52)}px;
    }
    .setup {
      position:relative; z-index:1; color:rgba(255,255,255,0.82);
      font-weight:500; letter-spacing:-0.012em; line-height:1.25;
      margin-bottom:${px(40)}px; max-width:15em;
    }
    .head {
      position:relative; z-index:1; color:${headColor};
      font-size:${px(s.head.s)}px; font-weight:640;
      letter-spacing:-0.025em; line-height:1.06; text-wrap:balance;
    }
    .support {
      position:relative; z-index:1; color:${C.inkMuted};
      font-weight:400; letter-spacing:-0.005em; line-height:1.4;
      margin-top:${px(48)}px; max-width:22em;
    }
    /* nowrap: a mark that breaks across two lines reads as a mistake */
    .mark { box-shadow: inset 0 -0.12em 0 ${C.green}; white-space:nowrap }
    .index {
      position:absolute; z-index:1; bottom:${fmt.pad - 18}px;
      left:${fmt.pad}px; right:${fmt.pad}px;
      font-family:"Geist Mono", ui-monospace, monospace;
      font-size:18px; font-weight:500; letter-spacing:0.06em;
      color:${dark ? "rgba(255,255,255,0.6)" : C.inkFaint}; text-align:left;
    }
    .index[style] { text-align:right }
    .footrow {
      position:absolute; z-index:1; bottom:${fmt.pad - 24}px; left:${fmt.pad}px;
      display:flex; align-items:center; gap:${px(28)}px;
    }
    .wordmark { height:${px(40)}px; display:block }
    .pointer {
      font-family:"Geist Mono", ui-monospace, monospace;
      color:${C.ink}; background:${C.orange}; border-radius:999px;
      font-size:${px(22)}px; font-weight:500; letter-spacing:0.02em;
      padding:${px(13)}px ${px(30)}px;
    }
  </style>
  ${ghost}
  ${eyebrow}
  ${setup}
  <div class="head">${s.head.text}</div>
  ${support}
  ${footer}
  ${index}`;
}

// -------------------------------------------------------------------- build
const browser = await chromium.launch();
for (const fmt of FORMATS) {
  const ctx = await browser.newContext({
    viewport: { width: fmt.w, height: fmt.h },
    deviceScaleFactor: 1, // exact 1080-px deliverables, per the build spec
  });
  const page = await ctx.newPage();
  for (const s of SLIDES) {
    await page.setContent(slideHtml(s, fmt), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const out = path.join(HERE, `w30-carousel-s${s.n}-${fmt.suffix}.png`);
    await page.screenshot({ path: out });
    console.log(`${path.basename(out)}  ${fmt.w}x${fmt.h}  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
  }
  await ctx.close();
}
await browser.close();

// PDF for the LinkedIn document upload: the seven portrait PNGs, one per
// page, no margins. Pillow embeds the exact reviewed pixels.
const py = `
from PIL import Image
import os
here = ${JSON.stringify(HERE)}
pages = [Image.open(os.path.join(here, f"w30-carousel-s{n}-portrait.png")).convert("RGB") for n in range(1, 8)]
out = os.path.join(here, "w30-carousel.pdf")
pages[0].save(out, save_all=True, append_images=pages[1:], resolution=144.0)
print("w30-carousel.pdf", len(pages), "pages", round(os.path.getsize(out)/1024), "KB")
`;
execFileSync("python3", ["-c", py], { stdio: "inherit" });
