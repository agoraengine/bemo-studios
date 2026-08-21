// Caption cards for founder-to-camera footage.
//
// libass draws one box per line, so a two-line caption gets a ragged right edge
// and no say over corner radius or padding. Cards are rendered in Chromium
// instead and composited as timed overlays, which also buys the real brand face,
// since libass cannot load a variable .woff2 and a browser can.
//
// Source of truth for the text is the locked script. When a take diverges from
// its script, transcribe the take, read the transcript against the script line
// by line, caption what was actually said, and record the divergence in the
// asset plan. See ../../docs/04-founder-to-camera.md.

import fs from "node:fs";
import path from "node:path";

const MAXCARD = 80;   // two lines of MAXLINE, minus room for the wrap to land
const MAXLINE = 42;
const MINDUR = 1.2;   // a card that flashes is worse than no card

/** The model reliably hears the brand as a bank. */
const REPAIRS = { BMO: "BeMo", "BMO.": "BeMo.", Bemo: "BeMo", "B-mo": "BeMo" };

const txt = (ws) => ws.map((w) => w.t).join(" ");

/** Flatten a whisper JSON (word_timestamps on) into repaired words. */
export function words(whisperJson) {
  const d = typeof whisperJson === "string" ? JSON.parse(fs.readFileSync(whisperJson, "utf8")) : whisperJson;
  return d.segments.flatMap((s) => s.words || []).map((w) => {
    const t = w.word.trim();
    return { t: REPAIRS[t] ?? t, s: w.start, e: w.end };
  });
}

/** Split a long sentence into n pieces of roughly equal length, at word gaps. */
function evenSplit(ws, n) {
  const target = txt(ws).length / n;
  const out = [];
  let buf = [];
  for (let i = 0; i < ws.length; i++) {
    buf.push(ws[i]);
    if (out.length < n - 1 && txt(buf).length >= target && i < ws.length - 1) { out.push(buf); buf = []; }
  }
  if (buf.length) out.push(buf);
  return out;
}

/**
 * Sentence boundaries first, then break only the sentences that are too long,
 * at a comma where one fits and evenly where none does. Filling greedily to a
 * character count puts two half-sentences on a card and orphans the remainder.
 */
export function cards(ws) {
  const sentences = [];
  let cur = [];
  for (const w of ws) { cur.push(w); if (/[.!?]$/.test(w.t)) { sentences.push(cur); cur = []; } }
  if (cur.length) sentences.push(cur);

  const chunk = (s) => {
    if (txt(s).length <= MAXCARD) return [s];
    const commas = s.slice(0, -1).map((w, i) => (w.t.endsWith(",") ? i : -1)).filter((i) => i >= 0)
      .sort((a, b) => Math.abs(a - s.length / 2) - Math.abs(b - s.length / 2));
    for (const b of commas) {
      const a = s.slice(0, b + 1), z = s.slice(b + 1);
      if (txt(a).length <= MAXCARD && txt(z).length <= MAXCARD) return [a, z];
    }
    return evenSplit(s, Math.ceil(txt(s).length / MAXCARD));
  };

  const out = sentences.flatMap(chunk).map((c) => ({ text: txt(c), start: c[0].s, end: c.at(-1).e }));

  // absorb runts ("on them." on its own card reads as a mistake)
  for (let i = 0; i < out.length; i++) {
    if (out[i].text.length >= 14) continue;
    const prev = out[i - 1], next = out[i + 1];
    if (prev && prev.text.length + out[i].text.length + 1 <= MAXCARD + 8) {
      prev.text += " " + out[i].text; prev.end = out[i].end; out.splice(i--, 1);
    } else if (next && next.text.length + out[i].text.length + 1 <= MAXCARD + 8) {
      next.text = out[i].text + " " + next.text; next.start = out[i].start; out.splice(i--, 1);
    }
  }
  for (let i = 0; i < out.length; i++) {
    if (out[i].end - out[i].start >= MINDUR) continue;
    const ceiling = out[i + 1] ? out[i + 1].start - 0.02 : out[i].end + MINDUR;
    out[i].end = Math.min(out[i].start + MINDUR, ceiling);
  }
  return out;
}

/** Balanced two-line wrap that keeps word order. */
export function wrap(t) {
  if (t.length <= MAXLINE) return t;
  const w = t.split(" ");
  let best = null;
  for (let i = 1; i < w.length; i++) {
    const a = w.slice(0, i).join(" "), b = w.slice(i).join(" ");
    if (a.length > MAXLINE || b.length > MAXLINE) continue;
    const score = Math.abs(a.length - b.length);
    if (!best || score < best.score) best = { a, b, score };
  }
  if (best) return `${best.a}\n${best.b}`;
  let a = "", i = 0;
  while (i < w.length && `${a} ${w[i]}`.trim().length <= MAXLINE) { a = `${a} ${w[i]}`.trim(); i++; }
  return `${a}\n${w.slice(i).join(" ")}`;
}

const ts = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(Math.floor(sec)).padStart(2, "0")},${String(Math.round((sec % 1) * 1000)).padStart(3, "0")}`;
};

/** The sidecar. Platforms that accept it index it. */
export function writeSrt(cs, file) {
  fs.writeFileSync(file, cs.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${wrap(c.text)}\n`).join("\n"));
  return file;
}

/**
 * Brand card styling. Size is in real pixels at 720p; judge it by downscaling a
 * frame to 380px wide, which is roughly a LinkedIn feed video on a phone, not by
 * looking at it full screen.
 */
export const STYLE = {
  font: "SchibstedGrotesk-var.woff2",
  size: 34, weight: 500, color: "#05347E",
  panel: "rgba(255,255,255,0.93)", radius: 14, pad: "16px 27px 18px",
  marginBottom: 46,
};

/** Render each card to a transparent PNG at 2x, for supersampled compositing. */
export async function render(cs, { outDir, fontFile, style = STYLE }) {
  const { chromium } = await import("playwright");
  fs.mkdirSync(outDir, { recursive: true });
  const font = fs.readFileSync(fontFile).toString("base64");
  const css = `
@font-face{font-family:'Brand';src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent}body{display:inline-block}
.card{font-family:'Brand',sans-serif;font-weight:${style.weight};font-size:${style.size}px;line-height:1.30;
letter-spacing:-0.004em;color:${style.color};background:${style.panel};border-radius:${style.radius}px;
padding:${style.pad};max-width:900px;text-align:center;display:block;width:fit-content;white-space:pre}`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1400, height: 400 } });
  const files = [];
  for (let i = 0; i < cs.length; i++) {
    const safe = wrap(cs[i].text).replace(/&/g, "&amp;").replace(/</g, "&lt;");
    await page.setContent(`<style>${css}</style><div class="card">${safe}</div>`);
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(outDir, `card-${String(i + 1).padStart(2, "0")}.png`);
    await (await page.$(".card")).screenshot({ path: file, omitBackground: true });
    files.push(file);
  }
  await browser.close();
  return files;
}

/**
 * Filter-graph fragments that lay the cards over `inLabel`. Cards are halved on
 * the way in because they were rendered at 2x. Returns the inputs to append and
 * the label the finished video comes out on.
 */
export function overlay(cs, files, { inLabel = "bg", marginBottom = STYLE.marginBottom } = {}) {
  const inputs = files.flatMap((f) => ["-i", f]);
  const parts = [];
  let cur = inLabel;
  cs.forEach((c, i) => {
    const n = i + 1;
    parts.push(`[${n}:v]scale=iw/2:ih/2[c${n}]`);
    parts.push(`[${cur}][c${n}]overlay=x=(W-w)/2:y=H-h-${marginBottom}:enable='between(t,${c.start.toFixed(3)},${c.end.toFixed(3)})'[v${n}]`);
    cur = `v${n}`;
  });
  return { inputs, parts, outLabel: cur };
}
