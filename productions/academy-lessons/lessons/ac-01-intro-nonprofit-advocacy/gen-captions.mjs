// Builds captions.srt for AC-01 from the locked script text and the measured
// duration of each avatar segment (probed from the downloaded renders, so the
// captions always match the real audio). Sentences within a segment get time
// proportional to their length.
//
//   node gen-captions.mjs        (from this folder)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const FF = require("ffmpeg-static");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const AV = path.join(HERE, "../../capture/out/ac-01/avatar");

const dur = (f) => {
  const out = execFileSync(FF, ["-i", path.join(AV, f)], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).toString();
  return 0; // unreachable; ffmpeg exits 1 without output file
};
const probe = (f) => {
  try { execFileSync(FF, ["-i", path.join(AV, f)]); } catch (e) {
    const m = (e.stderr || "").toString().match(/Duration: (\d+):(\d+):([\d.]+)/);
    if (m) return (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]);
  }
  throw new Error("no duration for " + f);
};

// locked narration per segment (script.md is the record; this mirrors it)
const SEGMENTS = [
  ["a1.mp4", "Somewhere in a board meeting near you, someone is about to say the sentence that quietly disables more small nonprofits than any budget cut: we can't do advocacy, we're a 501(c)(3). This lesson unwinds that sentence. In the next few minutes you'll be able to name the four kinds of civic action, and know which of them you're free to use."],
  ["a2.mp4", "The cost of that sentence is years of pure service work while policy makes the problem worse. A literacy nonprofit watches reading minutes get cut, and never says a word to the school board. A food bank expands capacity while eligibility rules tighten. A youth program loses a third of its kids every June and never asks the city why summer funding hasn't moved in a decade."],
  ["a3.mp4", "The confusion has one source: advocacy is one word doing the work of four very different activities. Boards import worry from one category into the other three, and the fear disables all four. The fix is to separate them, so let's do that."],
  ["a4.mp4", "Category one: education. Category two: issue advocacy. Category three: lobbying. Category four: political activity. Three of these are green lights with no limits. One is allowed within limits you will almost certainly never hit. Exactly one is prohibited. If your mental picture is a wholesale ban, you've collapsed all four into the last one. They are not the same."],
  ["a5.mp4", "Education is teaching people about an issue. A fact sheet on the school funding formula. A community forum on housing data. A neutral training on what's actually in a bill. None of that is restricted. Do as much as you want."],
  ["a6.mp4", "Issue advocacy is taking a public position without tying it to a specific bill. Our community needs more affordable housing. Full-day kindergarten in every district. You can organize around those positions: petitions, op-eds, rallies. Still not lobbying."],
  ["a7.mp4", "Lobbying is narrower than everyday speech suggests: asking a legislator, or asking the public to ask a legislator, to support or oppose specific legislation. We need more housing funding: not lobbying. Tell your state senator to vote yes on HB 412: lobbying. Same idea, different sides of the line. And here's what almost no board has been told: 501(c)(3)s are allowed to lobby, within limits far above what a small nonprofit would ever spend."],
  ["a8.mp4", "Political activity is the one red category: supporting or opposing a candidate for office. That's it. That's the actual ban. Everything else you just heard is open to you."],
  ["a9.mp4", "So when the sentence comes up, name the category. Three green lights, one high ceiling, one red line. The full lesson, the reference card, and a board conversation script are in Academy, in Introduction to Nonprofit Advocacy. And when you're ready for the limits themselves, the next course is 501(c)(3) Advocacy: What You Can Do."],
];

const ts = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(Math.floor(sec)).padStart(2, "0")},${String(Math.round((sec % 1) * 1000)).padStart(3, "0")}`;
};

let t = 0, n = 1;
const blocks = [];
for (const [file, text] of SEGMENTS) {
  const d = probe(file);
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g).map((s) => s.trim());
  const chars = sentences.reduce((a, s) => a + s.length, 0);
  let st = t;
  for (const s of sentences) {
    const sd = (s.length / chars) * d;
    blocks.push(`${n++}\n${ts(st)} --> ${ts(Math.min(st + sd, t + d))}\n${s}\n`);
    st += sd;
  }
  t += d;
  console.log(`${file}: ${d.toFixed(2)}s (ends ${t.toFixed(2)})`);
}
fs.writeFileSync(path.join(HERE, "captions.srt"), blocks.join("\n"));
console.log(`captions.srt written, total ${t.toFixed(1)}s`);
