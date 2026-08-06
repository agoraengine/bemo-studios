#!/usr/bin/env node
// Films the preview build's front-page assembly for the hero (R8-S2/S3 window):
// one 16s take, 1920x1080: a beat on the scattered artifacts, then a linear
// crawl through trackA so the fragments land in the funder page and the edition
// composes, holding on the honest ask. Serve bemo-website/public on :8931 first.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const NAME = "hero-front-raw.webm";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  colorScheme: "light",
  reducedMotion: "no-preference",
  recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
});
const page = await context.newPage();
await page.goto("http://localhost:8931/preview/index.html", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts?.ready);
await page.addStyleTag({ content: "::-webkit-scrollbar{display:none !important} html{scrollbar-width:none !important} button[onclick^=\u0027skipTrack\u0027]{display:none !important} #railA{display:none !important} .stagewrap{grid-template-columns:1fr !important} body{zoom:1.4}" });

await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const track = document.getElementById("trackA");
  const r = track.getBoundingClientRect();
  const top = r.top + window.scrollY;
  const span = r.height - window.innerHeight;
  // open just inside the track so the artifact fragments are on screen from frame one
  window.scrollTo(0, top + span * 0.05);
  window.dispatchEvent(new Event("scroll"));
  await sleep(1200);
  // linear crawl: the scroll IS the animation's clock
  await new Promise((resolve) => {
    const from = window.scrollY, to = top + span * 0.90, t0 = performance.now(), ms = 8600;
    function step(now) {
      const k = Math.min(1, (now - t0) / ms);
      window.scrollTo(0, from + (to - from) * k);
      if (k < 1) requestAnimationFrame(step); else resolve();
    }
    requestAnimationFrame(step);
  });
  await sleep(8600); // the edition loads, then HOLDS: long enough to actually read it
});

await context.close();
await browser.close();

const cutoff = Date.now() - 5 * 60 * 1000;
const webm = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm") && !f.startsWith("live-") && !f.startsWith("bemo-") && !f.startsWith("hero-"))
  .map((f) => path.join(OUT, f))
  .filter((f) => fs.statSync(f).mtimeMs > cutoff)
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
if (!webm) throw new Error("No fresh recording found");
fs.renameSync(webm, path.join(OUT, NAME));
console.log("Hero front take:", path.join(OUT, NAME));
