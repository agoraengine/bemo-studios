import { chromium } from "playwright";
const PROFILE = "/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile";
const OUT = "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/aef02867-fc9a-4cb4-90fc-6f326a43c532/scratchpad";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1920, height: 1200 },
});
const page = context.pages()[0] || (await context.newPage());

await page.goto("https://app.bemointel.ai/funderstorm/kb", { waitUntil: "networkidle" }).catch(() => {});
await sleep(3000);

const row = page.locator("tbody tr", { hasText: "Organization name" }).first();
await row.locator("mat-icon:has-text('more_vert'), button").last().click({ timeout: 8000 }).catch((e) => console.log("menu failed:", e.message));
await sleep(1500);
await page.screenshot({ path: `${OUT}/probe4-menu.png` });

// try a View/Edit/Open item in the menu
for (const label of ["View", "Open", "Edit", "Details"]) {
  const opt = page.locator(`.cdk-overlay-container >> text=${label}`).first();
  if (await opt.count()) {
    console.log("clicking menu option:", label);
    await opt.click().catch(() => {});
    await sleep(2500);
    await page.screenshot({ path: `${OUT}/probe4-item-open.png` });
    console.log("url now:", page.url());
    break;
  }
}
const overlayText = await page.locator(".cdk-overlay-container").innerText().catch(() => "");
console.log("overlay text:", overlayText.slice(0, 600));
await page.screenshot({ path: `${OUT}/probe4-final.png` });
await context.close();
