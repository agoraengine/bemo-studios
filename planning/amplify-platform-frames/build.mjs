#!/usr/bin/env node
// Build the Amplify templates still and its placement sizes.
//
// Input is one real capture of the live app against Common Table, the standing
// demo organization. Nothing here redraws, restyles, or cleans up the product
// screen: the only operation performed on the capture is a crop. Everything
// added (white ground, hairline, headline, provenance label) sits outside it.
//
//   node planning/amplify-platform-frames/build.mjs
//   node planning/amplify-platform-frames/build.mjs --proof     crop rulers only
//
// Drop a fresh capture next to this file as _source-amplify-templates-<date>.png
// and re-run; the newest one is picked up automatically.

import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const PROOF = process.argv.includes("--proof");

// Newest capture on disk wins, so a recapture is one command and no edit here.
const SOURCE_FILE = path.join(
  HERE,
  fs
    .readdirSync(HERE)
    .filter((f) => /^_source-amplify-templates-.*\.png$/.test(f))
    .sort()
    .pop()
);
// Inlined, because a page built with setContent has no file:// origin to
// resolve a file:// image against.
const SOURCE = `data:image/png;base64,${fs.readFileSync(SOURCE_FILE).toString("base64")}`;

// Layout pixels, not file pixels. The crop table below is in these units, so a
// recapture at deviceScaleFactor 2 lands sharper here with nothing to change:
// the raster gets denser, the layout does not move.
const SOURCE_W = 1920;
const SOURCE_H = 1200;

// The Amplify feature reel's own footage, as stills: the same appeal-path
// captures the Aug 20 reel cuts from (recaptured Aug 14 against Common Table).
// The reel's captions become these stills' headlines, so the video and the
// still say the same thing in the feed.
const REEL_OUT = path.join(REPO, "productions", "li-product-feature-reels", "capture", "out");
const reelSrc = (file) => ({
  data: `data:image/png;base64,${fs.readFileSync(path.join(REEL_OUT, file)).toString("base64")}`,
  w: 1920,
  h: 1200,
});
// The Knowledge Base territory: the August 3 captures behind the paid-static
// guidelines and the gaps reel (real app, Common Table, on disk).
const KB_OUT = path.join(REPO, "productions", "common-table-kb-load", "capture", "out");
const kbSrc = (file) => ({
  data: `data:image/png;base64,${fs.readFileSync(path.join(KB_OUT, file)).toString("base64")}`,
  w: 1920,
  h: 1080,
});
const SRCS = {
  shelf: { data: SOURCE, w: SOURCE_W, h: SOURCE_H },
  // the interview beat: "I still need three more" narration + the questions
  questions: reelSrc("c2-volunteered-amount.png"),
  // the volunteered suggested-amount panel
  volunteer: reelSrc("beat2-final.png"),
  // "I don't have any information about that": the honesty answer
  askGala: kbSrc("ask-gala-final.png"),
  // the unprompted gap list at the end of the board-member briefing
  askBoard: kbSrc("ask-board-final.png"),
  // the Knowledge Base index, owners and timestamps
  kbIndex: kbSrc("kb-final.png"),
  // Week 31's Saturday stills, from the same takes the week's two reels cut
  // from, so the still and the reel say the same thing in the feed.
  compassLenses: reelSrc("still-compass-lenses.png"),
  gapsSaved: reelSrc("still-gaps-saved.png"),
};

// Two crops of the one capture.
//
// BREADTH is the still: the whole shelf, five full rows of templates. It is
// what a platform looks like, and it is what the headline is talking about.
// Right edge stops short of the notification cluster, which is a test-run tell
// we may not paint out, so we frame it out. Bottom edge lands on a row
// boundary, because a card cut mid-sentence reads as sloppy at feed size.
//
// LEGIBLE is the same screen held closer: the product name, the nav that
// proves it is a platform and not a chat box, and the first two columns of
// cards. It survives a 1200x628 at close to 1:1, which BREADTH does not,
// because the source capture is 1x. A 2x recapture would retire this crop;
// see the note in ../amplify-platform-still.md.
const CROPS = {
  breadth: { x: 0, y: 0, w: 1700, h: 1098 },
  legible: { x: 0, y: 0, w: 1278, h: 534 },
  // Reel-beat crops, framed to the content column so no placeholder text with
  // product double-hyphens enters the frame.
  questions: { src: "questions", x: 700, y: 268, w: 840, h: 680 },
  questionsShort: { src: "questions", x: 700, y: 268, w: 840, h: 450 },
  volunteer: { src: "volunteer", x: 700, y: 200, w: 840, h: 705 },
  // KB territory. Each frame starts below the app chrome; the honesty crop
  // keeps the question bubble and the full answer with its three ways forward.
  honesty: { src: "askGala", x: 640, y: 64, w: 880, h: 446 },
  // the briefing's team list and reading list, ending on the gap paragraph
  gaplist: { src: "askBoard", x: 676, y: 358, w: 824, h: 482 },
  // the index rows, name and scope only: the Owner column carries Becky's
  // real name, which does not belong inside the fictional organization's frame
  kbindex: { src: "kbIndex", x: 288, y: 262, w: 940, h: 772 },
  // Week 31 Saturday. Both start below the app chrome and hold the content
  // column only. The product's own prose inside them carries em dashes and
  // double hyphens; captures ship as captured, per the week's guardrail.
  // The Compass crop starts on the first numbered dimension rather than mid-line
  // above it. The gaps crop holds the fill and the whole save: opening higher on
  // "What I don't have on file" made the frame taller than the payoff sentence
  // could survive, and clipping "that will carry forward" costs the still its
  // point. The gap itself is the reel's job; the still carries the answer.
  compasslenses: { src: "compassLenses", x: 676, y: 352, w: 824, h: 460 },
  gapssaved: { src: "gapsSaved", x: 676, y: 695, w: 824, h: 300 },
  // A wide band of the same screen, for the 1.91:1 placements: the product
  // name, the top of the nav, the recent row, and the shelf heading. The only
  // crop whose shape lets the window span the full column at that ratio.
  band: { x: 0, y: 0, w: 1700, h: 385 },
};

const FONTS = path.join(REPO, "productions", "linkedin-sizzle-series", "capture", "fonts");
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

const PROVENANCE = "REAL BEMO SCREEN. COMMON TABLE IS OUR DEMO ORGANIZATION.";

// ---------------------------------------------------------------- brand close
//
// The reel's standing close, as static furniture: white wordmark and tagline
// on Deep Sapphire, bemointel.ai as ink on the Solar Orange pill. Same tokens
// as the 30-second rig (source-motion30.html), so the still and the reel end
// on the same card.

const PRESS_ASSETS = path.join(REPO, "productions", "common-table-press-release", "capture", "assets");
const b64 = (file, mime) =>
  `data:${mime};base64,${fs.readFileSync(path.join(PRESS_ASSETS, file)).toString("base64")}`;
const WORDMARK_WHITE = b64("wordmark-white.svg", "image/svg+xml");
const TAGLINE = "Where missions gain momentum.";
const SITE = "bemointel.ai";

// The document overlay: a REAL finished document, captured from the live app
// against Common Table, laid over the shelf. Same rule as the shelf itself:
// the capture is placed, never redrawn.
//
// One document exists on disk today. The appeal-letter and thank-you runs
// (li-product-feature-reels/capture/out/) only reached interview states, so
// their finished pages still need a seeded-document capture, same pattern as
// common-table-press-release/capture/reshoot-draft.mjs. Drop the new page in
// this table and the variants build themselves.
const DOCS = {
  "press-release": {
    label: "press release",
    // 2x screenshot of the seeded Harvest Supper press release
    // (doc_OvkWEuIjn0IO3z3h), zero em dashes, per that production's
    // acceptance sheet.
    src: `data:image/png;base64,${fs
      .readFileSync(path.join(PRESS_ASSETS, "draft-page.png"))
      .toString("base64")}`,
    w: 816,
    h: 930, // layout px (the file is 2x)
    // Show the page down to the end of the second pull quote. The capture is
    // a viewport crop whose last line is cut mid-sentence; ending the visible
    // page on a paragraph boundary is a crop, not an edit.
    show: 0.885,
  },
  "appeal-letter": {
    label: "appeal letter",
    article: "An",
    // The finished appeal letter the app drafted against Common Table on the
    // Aug 15 draft run of the fundraising-appeal path (the same flow the
    // Aug 20 feature reel films). The source is a full-editor capture; the
    // crop is the letter page itself, measured to its edges, whole from the
    // subject line to the P.S. As everywhere else: cropped, never redrawn.
    // Known finding, logged in ../amplify-platform-still.md: the letter's
    // third paragraph carries an em dash of the product's own writing. The
    // page ships as captured, per the product-screen rule.
    src: `data:image/png;base64,${fs
      .readFileSync(path.join(REEL_OUT, "draft", "d1-letter.png"))
      .toString("base64")}`,
    srcW: 1920, // layout px (the file is 1x)
    crop: { x: 473, y: 149, w: 814, h: 858 },
    w: 814,
    h: 858,
  },
};

// Tokens inherited from the website's design system by way of
// planning/paid-static-creative.md. Do not add a colour that is not here.
const C = {
  ground: "#FFFFFF",
  sapphire: "#05347E",
  ink: "#1A2A3A",
  inkMuted: "#3D4F66",
  green: "#4CBB17",
  rule: "#D1D9E6",
};

// ------------------------------------------------------------------ headlines
//
// "Dozens" is Becky's Aug 14 ruling: the shelf keeps growing, so the copy
// names no number and never needs re-ratifying when templates land. (The
// earlier exact-count treatment is in git history if a counted line is ever
// wanted again.)
//
// `mark` is the phrase that takes the green underline. Keep it short enough
// that it never wraps, because a mark that breaks across two lines reads as a
// mistake rather than an accent.

const HEADLINES = {
  "already-knows": (doc) => ({
    line: `${doc.article ?? "A"} ${doc.label}, built from what your organization already knows.`,
    mark: "already knows",
    support:
      "Dozens of communication templates in BeMo Amplify, each one written from what your Knowledge Base already holds.",
  }),
  dozens: (doc) => ({
    line: `Dozens of communication templates. This one is the ${doc.label}.`,
    mark: `the ${doc.label}`,
    support: "BeMo Amplify. Every template draws on what your Knowledge Base already holds.",
  }),
};

/** Headline with the green mark applied to its key phrase. */
function headline(key, doc, size) {
  const h = HEADLINES[key](DOCS[doc]);
  const marked = h.line.replace(h.mark, `<span class="mark">${h.mark}</span>`);
  return `<div class="head" style="font-size:${size}px">${marked}</div>`;
}

function support(key, doc, size) {
  return `<div class="support" style="font-size:${size}px">${HEADLINES[key](DOCS[doc]).support}</div>`;
}

/** The capture, cropped, scaled to fit a box, as a bordered block. */
function shot(cropName, box, { radius = 8, border = true } = {}) {
  const crop = CROPS[cropName];
  const src = SRCS[crop.src ?? "shelf"];
  const scale = Math.min(box.w / crop.w, box.h / crop.h);
  return `<div class="shot" style="width:${Math.round(crop.w * scale)}px;height:${Math.round(
    crop.h * scale
  )}px;border-radius:${radius}px;${border ? "" : "border:none"}">
    <img src="${src.data}" style="
      width:${Math.round(src.w * scale)}px;
      height:${Math.round(src.h * scale)}px;
      margin-left:${Math.round(-crop.x * scale)}px;
      margin-top:${Math.round(-crop.y * scale)}px;">
  </div>`;
}

/** The shelf window with the scrim and a real document page laid over it. */
function overlay({ crop, win, doc, radius = 10 }) {
  const c = CROPS[crop];
  const scale = Math.min(win.w / c.w, win.h / c.h);
  const winW = Math.round(c.w * scale);
  const winH = Math.round(c.h * scale);
  const d = DOCS[doc.name];
  const docW = Math.round((d.w / d.h) * doc.h);
  const docShown = Math.round(doc.h * (d.show ?? 1));
  // A doc whose source is a full-editor capture carries a crop: the page
  // rect in source layout px. The image is scaled so the crop fills the
  // container and shifted so only the page shows. Still a crop, never a
  // redraw.
  const docImg = d.crop
    ? (() => {
        const s = docW / d.crop.w;
        return `<img src="${d.src}" style="width:${Math.round(d.srcW * s)}px;height:auto;max-width:none;margin-left:${Math.round(-d.crop.x * s)}px;margin-top:${Math.round(-d.crop.y * s)}px">`;
      })()
    : `<img src="${d.src}">`;
  return `<div class="comp" style="height:${Math.max(winH, doc.top + docShown)}px">
    <div style="position:relative;width:${winW}px;height:${winH}px">
      ${shot(crop, win, { radius })}
      <div class="scrim" style="border-radius:${radius}px"></div>
    </div>
    <div class="doc" style="width:${docW}px;height:${docShown}px;right:${doc.right}px;top:${doc.top}px">
      ${docImg}
    </div>
  </div>`;
}

/** The reel's close card as a bottom band. */
function band({ h, pad, markH, tagSize, pillSize }) {
  return `<div class="band" style="height:${h}px;padding:0 ${pad}px">
    <img src="${WORDMARK_WHITE}" style="height:${markH}px" alt="BeMo">
    <div class="tag" style="font-size:${tagSize}px">${TAGLINE}</div>
    <div class="pill" style="font-size:${pillSize}px;padding:${Math.round(pillSize * 0.62)}px ${Math.round(pillSize * 1.5)}px">${SITE}</div>
  </div>`;
}

/**
 * The capture filling a box edge to edge (cover fit): scaled up until both
 * dimensions fill, the overflow cropped. Still a crop, never a redraw. Use
 * anchor to keep the beat's payoff in frame: "top", "bottom", or "center".
 */
function shotCover(cropName, box, { radius = 8, anchor = "top" } = {}) {
  const crop = CROPS[cropName];
  const src = SRCS[crop.src ?? "shelf"];
  // Fill the width always; never crop horizontally, because a text line
  // missing its first letters reads as a broken image. If the scaled crop is
  // taller than the box, crop vertically per anchor; if shorter, the window
  // simply ends where the capture does.
  const scale = box.w / crop.w;
  const scaledH = Math.round(crop.h * scale);
  const h = Math.min(box.h, scaledH);
  const overH = scaledH - h;
  const shiftY = anchor === "bottom" ? overH : anchor === "center" ? Math.round(overH / 2) : 0;
  return `<div class="shot" style="width:${box.w}px;height:${h}px;border-radius:${radius}px">
    <img src="${src.data}" style="
      width:${Math.round(src.w * scale)}px;
      height:${Math.round(src.h * scale)}px;
      margin-left:${Math.round(-crop.x * scale)}px;
      margin-top:${Math.round(-crop.y * scale) - shiftY}px;">
  </div>`;
}

const label = (size = 13) =>
  `<div class="prov" style="font-size:${size}px">${PROVENANCE}</div>`;

function page({ w, h, body, pad = 0, align = "center", justify = "center" }) {
  return `<style>
    ${fontFace}
    * { margin:0; padding:0; box-sizing:border-box }
    body {
      width:${w}px; height:${h}px; background:${C.ground};
      font-family:"Schibsted Grotesk", system-ui, sans-serif;
      color:${C.ink};
      display:flex; flex-direction:column; align-items:${align}; justify-content:${justify};
      padding:${pad}px; overflow:hidden;
    }
    .stack { display:flex; flex-direction:column; gap:16px; align-items:flex-start }
    .shot { overflow:hidden; border:1px solid ${C.rule}; position:relative; flex:none }
    .shot img { display:block; position:absolute; top:0; left:0; max-width:none }
    .prov {
      font-family:"Geist Mono", ui-monospace, monospace;
      font-weight:500; letter-spacing:0.02em; text-transform:uppercase;
      color:${C.inkMuted};
    }
    .head {
      color:${C.sapphire}; font-weight:560; letter-spacing:-0.018em; line-height:1.08;
      text-wrap:balance;
    }
    .support { color:${C.ink}; font-weight:400; line-height:1.45 }
    .mark { box-shadow: inset 0 -0.13em 0 ${C.green} }
    .comp { position:relative; width:100% }
    .scrim { position:absolute; inset:0; background:rgba(255,255,255,0.32) }
    .doc {
      position:absolute; border:1px solid ${C.rule}; border-radius:6px;
      box-shadow: 0 34px 70px -28px rgba(26,42,58,0.5); background:#FFFFFF; overflow:hidden;
    }
    .doc img { display:block; width:100%; height:auto }
    .band {
      position:absolute; left:0; right:0; bottom:0; background:${C.sapphire};
      display:flex; align-items:center; justify-content:space-between;
    }
    .band img { display:block }
    .tag { color:#FFFFFF; font-weight:600; letter-spacing:-0.01em }
    .pill {
      font-family:"Geist Mono", ui-monospace, monospace; font-weight:500;
      letter-spacing:0.07em; color:${C.ink}; background:#FF8210;
      border-radius:999px;
    }
  </style>${body}`;
}

// ---------------------------------------------------------------- deliverables

// The clean crops. No ground, no border, no headline: hand these to whoever
// builds a given asset and let them set the line themselves.
const PLAIN = [
  {
    name: "amplify-templates-master",
    w: CROPS.breadth.w,
    h: CROPS.breadth.h,
    crop: "breadth",
  },
  {
    name: "amplify-templates-closer",
    w: CROPS.legible.w,
    h: CROPS.legible.h,
    crop: "legible",
  },
].map((f) => ({
  ...f,
  html: (x) => page({ w: x.w, h: x.h, body: shot(f.crop, CROPS[f.crop], { radius: 0, border: false }) }),
}));

// The 16:9 reel plate carries no headline: the reels set their own type in the
// edit, and a burned-in line would fight it.
const PLATE = {
  name: "amplify-templates-plate-1920x1080",
  w: 1920,
  h: 1080,
  html: (f) =>
    page({
      w: f.w,
      h: f.h,
      pad: 56,
      body: `<div class="stack">
        ${shot("breadth", { w: 1400, h: 900 }, { radius: 10 })}
        ${label(15)}
      </div>`,
    }),
};

// Every headline, in every placement that carries type, over every finished
// document on disk. The still reads as the reel does: the shelf behind, one
// real document in front, the standing close underneath.
const PLACEMENTS = [
  {
    // LinkedIn single image, and the anchor article header.
    suffix: "wide-1200x628",
    w: 1200,
    h: 628,
    build: (key, doc) => ({
      pad: 48,
      align: "flex-start",
      justify: "flex-start",
      body: `<div style="display:flex;flex-direction:column;gap:10px;width:100%">
        ${headline(key, doc, 34)}
        ${support(key, doc, 18)}
      </div>
      <div style="margin-top:22px;width:100%">
        ${overlay({ crop: "band", win: { w: 1104, h: 250 }, doc: { name: doc, h: 260, top: 10, right: 48 } })}
      </div>
      ${label(15)}
      ${band({ h: 88, pad: 48, markH: 33, tagSize: 22, pillSize: 15 })}`,
    }),
  },
  {
    // Carousel slide, and the Instagram adaptation.
    suffix: "square-1080x1080",
    w: 1080,
    h: 1080,
    build: (key, doc) => ({
      pad: 56,
      align: "flex-start",
      justify: "flex-start",
      body: `<div style="display:flex;flex-direction:column;gap:14px;width:100%">
        ${headline(key, doc, 54)}
        ${support(key, doc, 25)}
      </div>
      <div style="margin-top:30px;width:100%">
        ${overlay({ crop: "breadth", win: { w: 968, h: 560 }, doc: { name: doc, h: 470, top: 50, right: 28 } })}
      </div>
      ${label(14)}
      ${band({ h: 108, pad: 56, markH: 40, tagSize: 27, pillSize: 18 })}`,
    }),
  },
  {
    // LinkedIn carousel native, 4:5.
    suffix: "portrait-1080x1350",
    w: 1080,
    h: 1350,
    build: (key, doc) => ({
      pad: 56,
      align: "flex-start",
      justify: "flex-start",
      body: `<div style="display:flex;flex-direction:column;gap:16px;width:100%">
        ${headline(key, doc, 60)}
        ${support(key, doc, 27)}
      </div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;width:100%;padding-bottom:118px">
        <div style="width:100%">
          ${overlay({ crop: "breadth", win: { w: 968, h: 640 }, doc: { name: doc, h: 600, top: 64, right: 28 } })}
        </div>
        ${label(15)}
      </div>
      ${band({ h: 118, pad: 56, markH: 42, tagSize: 28, pillSize: 19 })}`,
    }),
  },
];

const HEADLINED = Object.keys(HEADLINES).flatMap((key) =>
  Object.keys(DOCS).flatMap((doc) =>
    PLACEMENTS.map((p) => ({
      name: `amplify-templates-${key}-${doc}-${p.suffix}`,
      w: p.w,
      h: p.h,
      html: (f) => page({ w: f.w, h: f.h, ...p.build(key, doc) }),
    }))
  )
);

// ------------------------------------------------- reel-beat and quote stills
//
// One still per beat of the Aug 20 Amplify feature reel, headline = the reel's
// caption verbatim, window = the frame the reel films. Plus Jen's questions
// quote (the reel's quote card) over the screen that shows the questions.
//
// The quote runs in two attributions because the week is split on naming: the
// reel's quote card names her (script v1), while the week's appeal-letter
// story runs unnamed for bench optics (ga-onramp, week of Aug 17). Becky picks
// per placement; both are built.

const BEATS = [
  {
    base: "amplify-beat-asks",
    line: "It asks before it writes.",
    mark: "asks",
    support:
      "The Fundraising Appeal flow in BeMo Amplify: it reads what your Knowledge Base already holds, then asks for what is missing.",
    crop: "questions",
    anchor: "top",
  },
  {
    base: "amplify-beat-volunteers",
    line: "Nobody asked it for this.",
    mark: "Nobody asked",
    support:
      "A suggested gift amount, offered unprompted. Amplify knows what a strong appeal needs.",
    crop: "volunteer",
    anchor: "top",
  },
  {
    base: "kb-beat-gaps",
    line: "It finished the work, then told us what was missing.",
    mark: "what was missing",
    support:
      "At the end of a real briefing, BeMo volunteered the two things its Knowledge Base did not have.",
    crop: "gaplist",
    anchor: "bottom",
  },
  {
    base: "kb-beat-honesty",
    line: "The most useful thing it said was that it didn't know.",
    mark: "it didn't know",
    support:
      "Ask it something it can't know. BeMo says so, then offers three real ways forward.",
    crop: "honesty",
    anchor: "top",
  },
  {
    base: "kb-index",
    line: "This is what your organization knows, written down.",
    mark: "written down",
    support:
      "The BeMo Knowledge Base: every fact with an owner and a date, behind every template and every answer.",
    crop: "kbindex",
    anchor: "top",
  },
  // Week 31 Saturday, the product-still slot. Two options; Becky picks the
  // cleaner one by Friday. Each headline is the caption its own reel shipped
  // with, so whichever runs, the still and the reel say one thing in the feed.
  {
    base: "w31-still-compass",
    line: "It answers with your numbers, your history, your board.",
    mark: "your board",
    support:
      "BeMo Compass, framing one decision across four dimensions from what the organization already has on file.",
    crop: "compasslenses",
    anchor: "top",
  },
  {
    base: "w31-still-gaps",
    line: "You answer once. It carries forward.",
    mark: "carries forward",
    support:
      "The BeMo Knowledge Base names what it does not have, then keeps what you add for everything you build next.",
    crop: "gapssaved",
    anchor: "top",
  },
];

function beatHeadline(beat, size) {
  const marked = beat.line.replace(beat.mark, `<span class="mark">${beat.mark}</span>`);
  return `<div class="head" style="font-size:${size}px">${marked}</div>`;
}

const BEAT_FRAMES = BEATS.flatMap((b) => [
  {
    name: `${b.base}-square-1080x1080`,
    w: 1080,
    h: 1080,
    html: (f) =>
      page({
        w: f.w,
        h: f.h,
        pad: 56,
        align: "flex-start",
        justify: "flex-start",
        body: `<div style="display:flex;flex-direction:column;gap:12px;width:100%">
          ${beatHeadline(b, 62)}
          <div class="support" style="font-size:26px">${b.support}</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;width:100%;padding-bottom:108px">
          ${shotCover(b.crop, { w: 968, h: 560 }, { anchor: b.anchor })}
          ${label(14)}
        </div>
        ${band({ h: 108, pad: 56, markH: 40, tagSize: 27, pillSize: 18 })}`,
      }),
  },
  {
    name: `${b.base}-portrait-1080x1350`,
    w: 1080,
    h: 1350,
    html: (f) =>
      page({
        w: f.w,
        h: f.h,
        pad: 56,
        align: "flex-start",
        justify: "flex-start",
        body: `<div style="display:flex;flex-direction:column;gap:14px;width:100%">
          ${beatHeadline(b, 68)}
          <div class="support" style="font-size:28px">${b.support}</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;width:100%;padding-bottom:118px">
          ${shotCover(b.crop, { w: 968, h: 780 }, { anchor: b.anchor })}
          ${label(15)}
        </div>
        ${band({ h: 118, pad: 56, markH: 42, tagSize: 28, pillSize: 19 })}`,
      }),
  },
  {
    name: `${b.base}-wide-1200x628`,
    w: 1200,
    h: 628,
    html: (f) =>
      page({
        w: f.w,
        h: f.h,
        pad: 48,
        align: "flex-start",
        justify: "flex-start",
        body: `<div style="display:flex;gap:40px;width:100%;flex:1;padding-bottom:88px;align-items:center">
          <div style="display:flex;flex-direction:column;gap:14px;flex:1;min-width:0">
            ${beatHeadline(b, 40)}
            <div class="support" style="font-size:20px">${b.support}</div>
            ${label(15)}
          </div>
          <div style="flex:none">
            ${shotCover(b.crop, { w: 560, h: 452 }, { anchor: b.anchor })}
          </div>
        </div>
        ${band({ h: 88, pad: 48, markH: 33, tagSize: 22, pillSize: 15 })}`,
      }),
  },
]);

// Quote cards: real words over the screen the words describe.
const QUOTES = [
  {
    base: "amplify-quote-questions",
    text: "The questions weren&rsquo;t generic. They were insightful, the kind a seasoned development professional would ask.",
    mark: "insightful",
    crop: "questions",
    cropShort: "questionsShort",
    anchor: "top",
    // Named matches the reel's quote card; unnamed matches the week's story
    // ruling (bench optics). Becky picks per placement.
    variants: {
      named: "Jennifer Allen, Executive Director, Friends of the Saratoga Springs Public Library. BeMo beta.",
      unnamed: "Executive director, a library friends group. BeMo beta.",
    },
  },
  {
    base: "kb-quote-gaps",
    text: "I love that BeMo can tell you the &lsquo;gaps&rsquo; that exist in your Knowledge Base.",
    mark: "gaps",
    crop: "gaplist",
    cropShort: "gaplist",
    anchor: "bottom",
    // Her blanket covers her name and words; naming the foundation needs her
    // look, so the card runs without it.
    variants: {
      named: "Maryellen Duggan, BeMo beta tester.",
    },
  },
];

const QUOTE_FRAMES = QUOTES.flatMap((q) =>
  Object.entries(q.variants).flatMap(([attr, attribution]) => {
    const quoteHead = (size) =>
      `<div class="head" style="font-size:${size}px">&ldquo;${q.text.replace(
        q.mark,
        `<span class="mark">${q.mark}</span>`
      )}&rdquo;</div>`;
    return [
      {
        name: `${q.base}-${attr}-square-1080x1080`,
        w: 1080,
        h: 1080,
        html: (f) =>
          page({
            w: f.w,
            h: f.h,
            pad: 56,
            align: "flex-start",
            justify: "flex-start",
            body: `<div style="display:flex;flex-direction:column;gap:16px;width:100%">
              ${quoteHead(48)}
              <div class="attrib" style="font-size:24px">${attribution}</div>
            </div>
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;width:100%;padding-bottom:108px">
              ${shotCover(q.cropShort, { w: 968, h: 470 }, { anchor: q.anchor })}
              ${label(14)}
            </div>
            ${band({ h: 108, pad: 56, markH: 40, tagSize: 27, pillSize: 18 })}`,
          }),
      },
      {
        name: `${q.base}-${attr}-portrait-1080x1350`,
        w: 1080,
        h: 1350,
        html: (f) =>
          page({
            w: f.w,
            h: f.h,
            pad: 56,
            align: "flex-start",
            justify: "flex-start",
            body: `<div style="display:flex;flex-direction:column;gap:16px;width:100%">
              ${quoteHead(56)}
              <div class="attrib" style="font-size:25px">${attribution}</div>
            </div>
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;width:100%;padding-bottom:118px">
              ${shotCover(q.crop, { w: 968, h: 640 }, { anchor: q.anchor })}
              ${label(15)}
            </div>
            ${band({ h: 118, pad: 56, markH: 42, tagSize: 28, pillSize: 19 })}`,
          }),
      },
    ];
  })
);

const FRAMES = [...PLAIN, PLATE, ...HEADLINED, ...BEAT_FRAMES, ...QUOTE_FRAMES];

const PROOFS = [
  {
    name: "_proof-crop",
    w: SOURCE_W,
    h: SOURCE_H,
    html: () => `<style>
      body { margin:0; position:relative; width:${SOURCE_W}px; height:${SOURCE_H}px }
      img { display:block; width:${SOURCE_W}px; height:${SOURCE_H}px }
      .v, .hz { position:absolute; background:rgba(255,0,0,.55) }
      .v { top:0; bottom:0; width:1px }
      .hz { left:0; right:0; height:1px }
      .t { position:absolute; font:11px monospace; color:#c00; background:#fff }
    </style>
    <img src="${SOURCE}">
    ${[1278, 1660, 1700]
      .map((x) => `<div class="v" style="left:${x}px"></div><div class="t" style="left:${x + 2}px;top:4px">${x}</div>`)
      .join("")}
    ${[300, 534, 820, 1098]
      .map((y) => `<div class="hz" style="top:${y}px"></div><div class="t" style="top:${y + 2}px;left:4px">${y}</div>`)
      .join("")}`,
  },
];

const browser = await chromium.launch();
for (const f of PROOF ? PROOFS : FRAMES) {
  const ctx = await browser.newContext({
    viewport: { width: f.w, height: f.h },
    deviceScaleFactor: 2,
  });
  const p = await ctx.newPage();
  await p.setContent(f.html(f), { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(250);
  const out = path.join(HERE, `${f.name}.png`);
  await p.screenshot({ path: out });
  await ctx.close();
  console.log(`${f.name}.png  ${f.w}x${f.h} @2x  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);

  // A light JPEG of the same frame, for review pages and for anything that
  // has to carry all of them at once.
  if (!PROOF) {
    const prevDir = path.join(HERE, "previews");
    fs.mkdirSync(prevDir, { recursive: true });
    const pctx = await browser.newContext({
      viewport: { width: f.w, height: f.h },
      deviceScaleFactor: Math.min(1, 1000 / f.w),
    });
    const pp = await pctx.newPage();
    await pp.setContent(f.html(f), { waitUntil: "load" });
    await pp.evaluate(() => document.fonts.ready);
    await pp.waitForTimeout(200);
    await pp.screenshot({ path: path.join(prevDir, `${f.name}.jpg`), type: "jpeg", quality: 82 });
    await pctx.close();
  }
}
await browser.close();
