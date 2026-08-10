#!/usr/bin/env node
// Reshoot the draft beat (S6) against the SEEDED Harvest Supper press release
// (doc_OvkWEuIjn0IO3z3h), which matches the acceptance sheet with zero em
// dashes, unlike the recorded fresh-run draft. Produces a 2x screenshot of the
// document pane for the stage's paper-page scene.
//
//   node reshoot-draft.mjs           writes assets/draft-page.png (+ a full-page
//                                    reference to out/reshoot-full.png)
//
// Uses the shared persistent profile from capture/.auth (run capture/login.mjs
// at the repo root first if the session has expired).

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");
const DOC = "https://app.bemointel.ai/amplify/document/doc_OvkWEuIjn0IO3z3h";

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});
const page = context.pages()[0] || (await context.newPage());
await page.goto(DOC, { waitUntil: "domcontentloaded" });
try {
  await page.getByText("FOR IMMEDIATE RELEASE").first().waitFor({ timeout: 45000 });
} catch {
  const url = page.url();
  await context.close();
  throw new Error(`Document text never rendered; landed on ${url} (session expired? run node capture/login.mjs)`);
}
await page.waitForTimeout(2500);
fs.mkdirSync(path.join(HERE, "out"), { recursive: true });
await page.screenshot({ path: path.join(HERE, "out", "reshoot-full.png") });
// the document pane; this page has no inputs sidebar, so the paper sits at
// x 552-1368 (measured from out/reshoot-full.png)
await page.screenshot({
  path: path.join(HERE, "assets", "draft-page.png"),
  clip: { x: 552, y: 150, width: 816, height: 930 },
});
await context.close();
console.log("Wrote assets/draft-page.png and out/reshoot-full.png");
