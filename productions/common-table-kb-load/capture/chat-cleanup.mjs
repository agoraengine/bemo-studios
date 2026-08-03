#!/usr/bin/env node
// Deletes every existing chat in the sidebar so recorded footage shows only
// Common Table chats. Approved by Becky 2026-08-03 (all old chats, including
// the Wrenfield-named ones and stale test chats).
// Kebabs are hover-revealed: hover the row by title, then its kebab, then Delete.
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = path.join(HERE, "..", "..", "..", "capture", ".auth", "profile");
const context = await chromium.launchPersistentContext(PROFILE, { headless: true, viewport: { width: 1440, height: 900 } });
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://app.bemointel.ai/", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(3000);
await page.screenshot({ path: "/tmp/chats-before.png" });

async function firstChatTitle() {
  const body = await page.locator("body").innerText();
  const lines = body.split("\n").map((s) => s.trim());
  const start = lines.indexOf("CHATS");
  if (start === -1) return null;
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (!l || l === "more_vert") continue;
    if (l === "See All" || l === "bookmark") return null;
    return l;
  }
  return null;
}

let removed = 0;
for (let i = 0; i < 60; i++) {
  const title = await firstChatTitle();
  if (!title) break;
  const row = page.getByText(title, { exact: true }).first();
  await row.hover();
  await page.waitForTimeout(500);
  await page.locator("text=more_vert").first().click();
  await page.waitForTimeout(900);
  const del = page.locator(".cdk-overlay-container").getByText("Delete", { exact: true }).last();
  if (!(await del.count())) {
    console.log("no delete option for:", title, "- stopping");
    await page.screenshot({ path: "/tmp/chats-stuck.png" });
    break;
  }
  await del.click();
  await page.waitForTimeout(1000);
  const confirm = page.locator(".cdk-overlay-container button").filter({ hasText: /Delete|Confirm|Yes/ }).last();
  if (await confirm.count()) { await confirm.click().catch(() => {}); await page.waitForTimeout(1000); }
  removed++;
  console.log("deleted chat:", title);
  await page.waitForTimeout(600);
}
console.log("chats removed:", removed, "| first remaining:", await firstChatTitle());
await page.screenshot({ path: "/tmp/chats-after.png" });
await context.close();
