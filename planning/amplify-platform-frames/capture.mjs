#!/usr/bin/env node
// Recapture the Amplify Templates screen at twice the pixel density.
//
// The still shipped on August 14 was cropped from a QA capture taken at 1x on
// August 3, which is sharp enough for the square and the reel plate and soft
// in a 1200x628. This retakes the same screen at deviceScaleFactor 2, same
// layout width, so every crop in build.mjs lands twice as sharp with nothing
// to change.
//
// Needs a live session. If it lands on the login page, run:
//
//   node capture/login.mjs        log in, tick Remember me, close the window
//   node planning/amplify-platform-frames/capture.mjs
//   node planning/amplify-platform-frames/build.mjs
//
// The org must be Common Table. If the app opens on another organization,
// switch it in the app before running this, because the standing universe is
// the only one that may appear in published work.

import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const PROFILE = path.join(REPO, "capture", ".auth", "profile");
const URL = "https://app.bemointel.ai/amplify/templates";

// Today, as YYYY-MM-DD, so the filename records when the product looked
// like this. build.mjs takes the newest.
const stamp = new Date().toISOString().slice(0, 10);
const OUT = path.join(HERE, `_source-amplify-templates-${stamp}.png`);

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});
const page = context.pages()[0] || (await context.newPage());
await page.goto(URL, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(4000);

if (page.url().includes("/auth/login")) {
  console.error("Not logged in. Run: node capture/login.mjs");
  await context.close();
  process.exit(1);
}

// Hide the test-run tells rather than cropping around them. Doing it in the
// browser is allowed; painting them out of a finished PNG is not.
await page.addStyleTag({
  content: `
    [class*="badge"], [class*="Badge"],
    [role="status"], #cookie-banner { visibility: hidden !important }
  `,
});
await page.waitForTimeout(500);

await page.screenshot({ path: OUT });
console.log(`wrote ${path.basename(OUT)}`);
console.log("now run: node planning/amplify-platform-frames/build.mjs");
await context.close();
