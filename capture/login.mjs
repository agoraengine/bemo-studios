#!/usr/bin/env node
// Login-once for app capture.
//
// Opens a real browser window on the app using a persistent profile stored
// in capture/.auth/profile (gitignored). Log in normally, then close the
// browser window. Every capture run afterwards reuses the session; no
// passwords are stored in the repo, only the browser's own session state.
//
//   node capture/login.mjs            open the window, log in, close it
//
// If the session ever expires, run it again.

import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = path.join(HERE, ".auth", "profile");
const APP = "https://app.bemointel.ai/";

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: false,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] || (await context.newPage());
await page.goto(APP);
console.log("Browser open. Log in to BeMo, then close the browser window.");
context.on("close", () => {
  console.log("Session saved to capture/.auth/profile");
  process.exit(0);
});
