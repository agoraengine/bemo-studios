import { chromium } from "playwright";
const PROFILE = "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile";
const OUT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/aef02867-fc9a-4cb4-90fc-6f326a43c532/scratchpad";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
});
const page = context.pages()[0] || (await context.newPage());

// 1. KB item detail: what does an item page show? (owner? sources?)
await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await sleep(3000);
await page.locator("tbody tr", { hasText: "Harvest Supper" }).first().click({ timeout: 8000 }).catch((e) => console.log("item open failed:", e.message));
await sleep(2500);
console.log("item view:", page.url());
await page.screenshot({ path: `${OUT}/probe3-kb-item.png` });

// 2. Existing in-flight Grant Progress Report: select the KB input and submit, see step 2
await page.goto("https://app.bemointel.ai/funderstorm/home", { waitUntil: "networkidle" }).catch(() => {});
await sleep(2500);
await page.locator("text=Grant Progress Report").first().click({ timeout: 8000 }).catch((e) => console.log("gpr open failed:", e.message));
await sleep(3500);
const submit = page.locator("button:has-text('Submit')").first();
if (await submit.count()) {
  await submit.click().catch((e) => console.log("submit failed:", e.message));
  await sleep(6000);
  console.log("after submit:", page.url());
  await page.screenshot({ path: `${OUT}/probe3-gpr-step2.png` });
  await sleep(6000);
  await page.screenshot({ path: `${OUT}/probe3-gpr-step2b.png` });
} else {
  console.log("no submit button");
  await page.screenshot({ path: `${OUT}/probe3-gpr-nosubmit.png` });
}

await context.close();
