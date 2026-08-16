import { chromium } from "playwright";

const SHOT = process.env.SHOT_DIR || "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/99bafb8e-f500-451b-aab8-3dba398a2a34/scratchpad/probe";
const DOC = process.env.DOC || "";
const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  { headless: true, viewport: { width: 1440, height: 900 } }
);
const page = context.pages()[0] || (await context.newPage());

async function shot(tag) {
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SHOT}/${tag}.png` });
  const text = await page.evaluate(() =>
    ((document.querySelector("main") || document.body).innerText || "").slice(0, 2600)
  );
  console.log(`\n=== ${tag} :: ${page.url()}`);
  console.log(text);
}

if (DOC) {
  await page.goto(`https://app.bemointel.ai/amplify/document/${DOC}`, { waitUntil: "networkidle" }).catch(() => {});
} else {
  await page.goto("https://app.bemointel.ai/amplify/templates", { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.click("text=New Donor Email", { timeout: 10000 });
}
await page.waitForTimeout(5000);
await shot("q1-kb-inputs");

// step 1 of 5: accept the knowledge base inputs
await page.click("button:has-text('Submit')", { timeout: 10000 }).catch((e) => console.log("submit1:", e.message));
await page.waitForTimeout(9000);
await shot("q2-purpose-picker");

// step 2 of 5: the purpose picker
const appeal = page.locator("text=Fundraising appeal").first();
console.log("appeal option present:", await appeal.count());
if (await appeal.count()) {
  await appeal.click();
  await page.waitForTimeout(800);
  await shot("q3-appeal-chosen");
  await page.click("button:has-text('Submit')", { timeout: 10000 }).catch((e) => console.log("submit2:", e.message));
  await page.waitForTimeout(10000);
  await shot("q4-after-purpose");
}

console.log("\nDOC:", page.url());
await context.close();
