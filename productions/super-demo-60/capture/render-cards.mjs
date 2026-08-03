import { chromium } from "playwright";
import fs from "node:fs"; import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
for (const [card, secs] of [["a", 5], ["b", 5.5], ["c", 9]]) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } } });
  const page = await ctx.newPage();
  await page.goto("file://" + path.join(HERE, "cards.html") + "?card=" + card);
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(secs * 1000);
  await ctx.close(); await browser.close();
  const webm = fs.readdirSync(OUT).filter(f => f.endsWith(".webm")).map(f => path.join(OUT, f)).sort((x, y) => fs.statSync(y).mtimeMs - fs.statSync(x).mtimeMs)[0];
  fs.renameSync(webm, path.join(OUT, "card-" + card + ".webm"));
  console.log("card", card, "rendered");
}
