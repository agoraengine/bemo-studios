// Send one chat message to the in-flight press release doc, wait for the
// app to settle, dump the tail of the transcript.
//   node step-answer.mjs "<message>"
import { chromium } from "playwright";
const SHOT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/80be43f1-83d5-4567-9def-5602501b5ce0/scratchpad";
const DOC = "https://app.bemointel.ai/amplify/document/doc_OvkWEuIjn0IO3z3h";
const msg = process.argv[2];
const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto(DOC, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(5000);

async function stable({ quiet = 9000, max = 180000 } = {}) {
  let last = "", since = Date.now(), start = Date.now();
  while (Date.now() - start < max) {
    await page.waitForTimeout(2500);
    const now = await page.locator("body").innerText().catch(() => "");
    if (now !== last) { last = now; since = Date.now(); }
    else if (Date.now() - since > quiet) break;
  }
  return last;
}

if (msg) {
  const input = page.locator("textarea[placeholder='Ask anything'], textarea").last();
  await input.click({ timeout: 15000 });
  await input.fill(msg);
  await page.waitForTimeout(400);
  await page.keyboard.press("Enter");
  console.log("sent.");
}
const text = await stable();
const stamp = Date.now() % 100000;
await page.screenshot({ path: `${SHOT}/answer-${stamp}.png` });
console.log("shot:", `${SHOT}/answer-${stamp}.png`);
const main = await page.evaluate(() => (document.querySelector("main") || document.body).innerText);
console.log("--- tail ---");
console.log(main.slice(-3000));
await context.close();
