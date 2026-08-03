#!/usr/bin/env node
// Headless check that the saved login session works: loads the app with the
// persistent profile and screenshots whatever it lands on.
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const context = await chromium.launchPersistentContext(path.join(HERE, ".auth", "profile"), {
  headless: true,
  viewport: { width: 1440, height: 900 },
});
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3000);
console.log("landed on:", page.url());
await page.screenshot({ path: "/tmp/bemo-session-check.png" });
await context.close();
