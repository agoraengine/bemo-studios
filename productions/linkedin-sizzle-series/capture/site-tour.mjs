#!/usr/bin/env node
// Films the live website build (localhost:4000) in one continuous 79s take:
// hero settle, What BeMo is, the scroll-driven assembly, the network thesis,
// the quotes, How BeMo works, the conversation section, the CTA panel.
// The 60s cut is assembled from windows of this take by run-website60.mjs.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const NAME = "bemo-linkedin-sizzle-series-r1w-raw.webm";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  colorScheme: "light",
  reducedMotion: "no-preference",
  recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
});
const page = await context.newPage();
await page.goto("http://localhost:4000/", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts?.ready);
await page.addStyleTag({ content: "nextjs-portal{display:none !important}" });

// choreography runs inside the page so scrolling is rAF-smooth
await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  function findY(text) {
    let best = null;
    for (const el of document.querySelectorAll("h1,h2,h3,p,span")) {
      const t = (el.textContent || "").trim();
      if (t.startsWith(text) && t.length < text.length + 80) best = el;
    }
    if (!best) return null;
    return best.getBoundingClientRect().top + window.scrollY - 130;
  }
  function tween(toY, ms) {
    return new Promise((resolve) => {
      const from = window.scrollY, d = toY - from, t0 = performance.now();
      const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      function step(now) {
        const k = Math.min(1, (now - t0) / ms);
        window.scrollTo(0, from + d * ease(k));
        if (k < 1) requestAnimationFrame(step); else resolve();
      }
      requestAnimationFrame(step);
    });
  }
  // linear crawl for the scroll-driven assembly
  function crawl(toY, ms) {
    return new Promise((resolve) => {
      const from = window.scrollY, d = toY - from, t0 = performance.now();
      function step(now) {
        const k = Math.min(1, (now - t0) / ms);
        window.scrollTo(0, from + d * k);
        if (k < 1) requestAnimationFrame(step); else resolve();
      }
      requestAnimationFrame(step);
    });
  }

  await sleep(11000);                                   // hero settles, fragments drift
  await tween(findY("What BeMo is") ?? 900, 1500);
  await sleep(5500);                                    // the four cards
  const wy = findY("Watch it work");
  await tween(wy ?? 2400, 1500);
  await crawl((wy ?? 2400) + window.innerHeight * 1.35, 10000);  // assembly plays
  await tween(findY("Nobody stops caring.") ?? 4200, 1500);
  await sleep(7500);                                    // network draws
  await tween(findY("From the people using it") ?? 5600, 1500);
  await sleep(5500);                                    // quotes
  await tween(findY("How BeMo works") ?? 7000, 1500);
  await sleep(8500);                                    // the hub: everything in, nothing lost
  await tween(findY("Conversation as the interface") ?? 8600, 1500);
  await sleep(10000);                                   // conversation section
  await tween(findY("Find out what your nonprofit") ?? document.body.scrollHeight - 900, 1500);
  await sleep(10000);                                   // CTA panel
});

await context.close();
await browser.close();

const cutoff = Date.now() - 5 * 60 * 1000;
const webm = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm") && !f.startsWith("live-") && !f.startsWith("bemo-"))
  .map((f) => path.join(OUT, f))
  .filter((f) => fs.statSync(f).mtimeMs > cutoff)
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
if (!webm) throw new Error("No fresh recording found");
fs.renameSync(webm, path.join(OUT, NAME));
console.log("Raw take:", path.join(OUT, NAME));
