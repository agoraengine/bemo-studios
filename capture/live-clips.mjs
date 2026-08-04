import { chromium } from "playwright";
import path from "node:path"; import fs from "node:fs";
const PROFILE = "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile";
const OUT = "/Users/rebeccakern/Repositories/bemo-studios/productions/linkedin-sizzle-series/capture/out";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function record(name, fn, secs) {
  const context = await chromium.launchPersistentContext(PROFILE, {
    headless: true, viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } },
  });
  const page = context.pages()[0] || (await context.newPage());
  try { await fn(page); await sleep(secs * 1000); } catch (e) { console.log(name, "error:", e.message); }
  await context.close();
  const webm = fs.readdirSync(OUT).filter(f => f.endsWith(".webm") && f.startsWith("page")).map(f => path.join(OUT, f)).sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  fs.renameSync(webm, path.join(OUT, name + ".webm"));
  console.log(name, "recorded");
}

// clip 1: the FunderStorm Grant Progress Report template page, gentle scroll
await record("live-funderstorm-template", async (page) => {
  await page.goto("https://app.bemointel.ai/funderstorm/templates", { waitUntil: "networkidle" }).catch(() => {});
  await sleep(3500);
  await page.screenshot({ path: OUT + "/qa-templates-page.png" });
  const t = page.locator("text=Grant Progress Report").first();
  await t.waitFor({ timeout: 15000 });
  await t.click();
  await page.waitForSelector("text=New Grant Progress Report", { timeout: 15000 }).catch(() => {});
  await sleep(2500);
  await page.mouse.wheel(0, 300); await sleep(1500);
  await page.mouse.wheel(0, 300); await sleep(1500);
  await page.mouse.wheel(0, 250); await sleep(1200);
}, 3);


