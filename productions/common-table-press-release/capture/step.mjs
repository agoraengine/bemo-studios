// Step-driver for the press release document flow. Each invocation does one
// action against the app with the persistent profile, then dumps state.
//   node step.mjs goto <url>
//   node step.mjs click "<text>"
//   node step.mjs fill "<selector>" "<text>"
//   node step.mjs type "<text>"          (types into the focused/only textarea, then Enter)
//   node step.mjs dump                    (no action, just dump current doc url state)
// After the action: prints url, main text, enabled buttons; screenshots to scratchpad/step-NN.png
import { chromium } from "playwright";
import fs from "node:fs";
const SHOT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/80be43f1-83d5-4567-9def-5602501b5ce0/scratchpad";
const STATE = `${SHOT}/step-state.json`;
const [, , cmd, ...args] = process.argv;
const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, "utf8")) : { n: 0, url: "https://app.bemointel.ai/amplify/templates" };
state.n += 1;

const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
const target = cmd === "goto" ? args[0] : state.url;
await page.goto(target, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3000);

try {
  if (cmd === "click") {
    await page.click(`text=${args[0]}`, { timeout: 8000 });
  } else if (cmd === "fill") {
    await page.fill(args[0], args[1], { timeout: 8000 });
  } else if (cmd === "type") {
    const box = page.locator("textarea:visible").last();
    await box.click({ timeout: 8000 });
    await box.fill(args[0]);
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter");
  }
} catch (e) {
  console.log("ACTION FAILED:", e.message.split("\n")[0]);
}
await page.waitForTimeout(4000);

console.log("url:", page.url());
state.url = page.url();
fs.writeFileSync(STATE, JSON.stringify(state));
const shot = `${SHOT}/step-${String(state.n).padStart(2, "0")}.png`;
await page.screenshot({ path: shot, fullPage: false });
console.log("shot:", shot);
const text = await page.evaluate(() => {
  const main = document.querySelector("main") || document.body;
  return main.innerText.slice(0, 4500);
});
console.log("--- main text ---");
console.log(text);
const buttons = await page.$$eval("button:not([disabled])", bs => bs.map(b => (b.innerText || b.getAttribute("aria-label") || "").trim().replace(/\n/g, " / ").slice(0, 60)).filter(Boolean));
console.log("--- enabled buttons ---");
console.log([...new Set(buttons)].join(" | "));
await context.close();
