#!/usr/bin/env node
// Renders the GA sizzle reel animation to video.
//
// The source is the July 30 artifact, saved locally as source.html so the
// render needs no claude.ai login. Its timeline is a 59-second rAF loop
// (var DUR = 59) driving a fixed 1280x720 stage.
//
// Run:  node productions/ga-sizzle-reel/capture/run.mjs
// Then: node productions/ga-sizzle-reel/capture/run.mjs --encode
//
// Output: capture/out/  (gitignored). Upload to Drive, link in assets.md.

import { chromium } from "playwright";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(HERE, "source.html");
const OUT = path.join(HERE, "out");

// Resolution, stated plainly rather than aspirationally.
//
// The source stage is a fixed 1280x720 with raster product screenshots baked
// in. Capturing larger only upscales those screenshots; it adds no detail. So
// this renders at the source's native size and the Monday cut is 720p.
//
// docs/02-production-standards.md asks for 1080p. This misses it, on purpose,
// because the honest ceiling is set by the source and not by the capture
// settings. The fix is real product capture (Path B in the shot list), not a
// bigger viewport here.
//
// deviceScaleFactor 2 still matters: the headline type is live CSS text, and
// it renders crisply rather than as upscaled pixels.
const WIDTH = 1280;
const HEIGHT = 720;
const DUR = 59; // matches `var DUR = 59` in source.html
const TAIL = 2; // hold the final frame, per the standards

async function render() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
    colorScheme: "light",
    reducedMotion: "no-preference",
    recordVideo: { dir: OUT, size: { width: WIDTH, height: HEIGHT } },
  });

  const page = await context.newPage();
  await page.goto("file://" + SOURCE);

  // Pin the stage to the origin at native size and strip the artifact page's
  // own chrome (dark backdrop, hint text, replay button, progress bar) so
  // only the reel is in shot.
  //
  // The stage must be pinned explicitly. The artifact page centres it inside
  // a flex body with a gap, which leaves black bands on two edges when the
  // viewport is exactly stage-sized.
  await page.addStyleTag({
    content: `
      html, body {
        background: #000 !important; overflow: hidden !important;
        margin: 0 !important; padding: 0 !important; gap: 0 !important;
        display: block !important; min-height: 0 !important;
        width: ${WIDTH}px !important; height: ${HEIGHT}px !important;
      }
      .hint, .static-alt { display: none !important; }
      #bar { display: none !important; }
      .frame-wrap {
        position: fixed !important; top: 0 !important; left: 0 !important;
        margin: 0 !important; padding: 0 !important;
      }
      #stage {
        position: fixed !important; top: 0 !important; left: 0 !important;
        width: ${WIDTH}px !important; height: ${HEIGHT}px !important;
        transform: none !important; border-radius: 0 !important;
        margin: 0 !important;
      }
    `,
  });

  // Let fonts settle before recording. A frame captured mid font-swap is a
  // frame that has to be recaptured. The artifact's timeline starts on load,
  // so keep this short: it eats into the reel.
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(500);

  console.log(`Recording ${DUR + TAIL}s at ${WIDTH}x${HEIGHT}...`);
  await page.waitForTimeout((DUR + TAIL) * 1000);

  await context.close();
  await browser.close();

  const webm = fs
    .readdirSync(OUT)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => path.join(OUT, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];

  if (!webm) throw new Error("No recording produced.");

  const named = path.join(OUT, "bemo-ga-sizzle-reel-raw.webm");
  fs.renameSync(webm, named);
  console.log(`Raw capture: ${named}`);
  console.log(`Next: node ${path.relative(process.cwd(), import.meta.filename)} --encode`);
}

// Encode to the delivery spec. Separate step so a re-encode does not
// require a re-render.
async function encode() {
  const raw = path.join(OUT, "bemo-ga-sizzle-reel-raw.webm");
  if (!fs.existsSync(raw)) throw new Error(`Not found: ${raw}. Render first.`);

  const primary = path.join(OUT, "bemo-ga-sizzle-reel-primary-v1.mp4");
  await execFileAsync("ffmpeg", [
    "-y", "-i", raw,
    "-c:v", "libx264", "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p", "-r", "30",
    "-movflags", "+faststart",
    primary,
  ]);
  console.log(`Primary 16:9: ${primary}`);

  // Vertical: centre-crop to 9:16. Only worth producing once Wave 2 needs it.
  const vertical = path.join(OUT, "bemo-ga-sizzle-reel-vertical-v1.mp4");
  await execFileAsync("ffmpeg", [
    "-y", "-i", raw,
    "-vf", "crop=ih*9/16:ih,scale=1080:1920",
    "-c:v", "libx264", "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p", "-r", "30",
    "-movflags", "+faststart",
    vertical,
  ]);
  console.log(`Vertical 9:16: ${vertical}`);
  console.log("\nStill to do: voiceover, burned-in captions, .srt sidecar.");
  console.log("See docs/02-production-standards.md for the standards check.");
}

const mode = process.argv.includes("--encode") ? encode : render;
mode().catch((err) => {
  console.error(err);
  process.exit(1);
});
