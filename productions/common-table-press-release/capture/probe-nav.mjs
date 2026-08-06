import { chromium } from "playwright";
const SHOT = process.env.SHOT_DIR || "/private/tmp/claude-501/-Users-rebeccakern-Repositories-bemo-studios/80be43f1-83d5-4567-9def-5602501b5ce0/scratchpad";
const context = await chromium.launchPersistentContext("/Users/rebeccakern/Repositories/bemo-studios/capture/.auth/profile", { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3000);
console.log("landed:", page.url());
await page.screenshot({ path: `${SHOT}/nav-01-landing.png` });
// dump every link and button label visible
const links = await page.$$eval("a[href]", as => as.map(a => `${a.getAttribute("href")}  |  ${(a.innerText || "").trim().replace(/\n/g, " / ").slice(0, 80)}`));
console.log("--- links ---");
console.log([...new Set(links)].join("\n"));
const buttons = await page.$$eval("button", bs => bs.map(b => (b.innerText || b.getAttribute("aria-label") || "").trim().replace(/\n/g, " / ").slice(0, 60)).filter(Boolean));
console.log("--- buttons ---");
console.log([...new Set(buttons)].join("\n"));
await context.close();
