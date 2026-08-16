import { chromium } from "playwright";

const SHOT = process.env.SHOT_DIR || "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/99bafb8e-f500-451b-aab8-3dba398a2a34/scratchpad/probe";
const DOC = process.env.DOC || "doc_8lIegbSk4y4we4F2";
const context = await chromium.launchPersistentContext(
  "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile",
  { headless: true, viewport: { width: 1440, height: 900 } }
);
const page = context.pages()[0] || (await context.newPage());
await page.goto(`https://app.bemointel.ai/amplify/document/${DOC}`, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(4000);

for (let i = 0; i < 10; i++) {
  const body = await page.evaluate(() => ((document.querySelector("main") || document.body).innerText || ""));
  const hasPurpose = /purpose of this donor email|Fundraising appeal/i.test(body);
  console.log(`poll ${i}: purpose visible = ${hasPurpose} | len ${body.length}`);
  if (hasPurpose) {
    await page.screenshot({ path: `${SHOT}/w-purpose.png` });
    console.log("\n--- page text ---\n", body.slice(0, 2600));
    break;
  }
  await page.waitForTimeout(6000);
}
await page.screenshot({ path: `${SHOT}/w-final.png` });
await context.close();
