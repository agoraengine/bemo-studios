// Redaction for capture runs.
//
// Capture uses seeded demo data, never a real customer's workspace. This is
// the second line of defense: if something real reaches the screen anyway,
// it gets covered before the frame is recorded, not fixed in the edit.

/** Blur elements matching selectors. Use for anything identifying. */
export async function blur(page, selectors) {
  await page.addStyleTag({
    content: `${selectors.join(", ")} { filter: blur(8px) !important; }`,
  });
}

/**
 * Replace text content in place. Prefer this to blur when the shot needs the
 * field to look normal, for example an org name in a header.
 */
export async function replaceText(page, replacements) {
  await page.evaluate((pairs) => {
    for (const [selector, value] of pairs) {
      document.querySelectorAll(selector).forEach((el) => {
        el.textContent = value;
      });
    }
  }, Object.entries(replacements));
}

/**
 * Sanity check before recording. Fails loudly rather than producing footage
 * with a real org in it, because that problem surfaces after the video ships.
 */
export async function assertDemoOrg(page, expectedName) {
  const body = await page.textContent("body");
  if (!body.includes(expectedName)) {
    throw new Error(
      `Demo org "${expectedName}" not found on page. Refusing to record: ` +
        `capture must run against seeded demo data, never a real workspace.`
    );
  }
}
