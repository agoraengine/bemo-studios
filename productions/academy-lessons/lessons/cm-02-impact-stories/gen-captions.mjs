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
const AV = path.join(HERE, "../../capture/out/cm-02/avatar");

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
  ["b1.mp4", "Tell a roomful of people that your organization served 1,200 individuals last year, and watch what happens: nothing. The number slides right off, because we are not built to feel a thousand people at once. We're built to feel one. This lesson is about the impact story: how to make a stranger lean in, and how to do it in a way the person in the story would be proud of."],
  ["b2.mp4", "The impact story takes the statistic and makes it a person someone can actually feel. One life, told well. It's the single most powerful tool in nonprofit communications, more persuasive than any data point, any brochure, any mission statement."],
  ["b3.mp4", "It's also the tool most easily misused. There's a name for getting it wrong: poverty porn. Storytelling that dwells on suffering, that crops a life down to its bleakest frame to open a wallet. So this lesson treats craft and ethics as one subject, because the most moving story and the most respectful one are almost always the same story."],
  ["b4.mp4", "Three principles keep a story on the right side of the line. Dignity: the person is a full human being, not a category. Agency: they are the actor in their own story; your organization is the guide, not the hero. And consent: informed, specific, documented, freely given. One test holds all three: would the person be proud of how they're portrayed?"],
  ["b5.mp4", "The difference shows up in the grammar. We lifted Maria out of poverty makes your organization the hero and Maria the cargo. With childcare she could finally rely on, Maria finished her degree makes Maria the hero who acted. Write the person doing the verbs. It's more ethical, and it's more persuasive: donors want to fund a real person's hard-won progress, not a rescue."],
  ["b6.mp4", "And consent is not a signature. It's a conversation that answers real questions: where will this appear, will we use your name or a pseudonym, your photo or none, and can you change your mind later? The person can say no, or yes with limits. And their access to services can never depend on it. Get it in writing, but the form is the record of the conversation, not a substitute for it."],
  ["b7.mp4", "With the ethics in place, the structure is three moves. Situation: where the person was, told with dignity, honest about hardship without exploiting it. Intervention: what your organization actually did, specifically, because that's the section funders read most closely. Transformation: what changed, concrete and honest. And resist the fairy-tale ending. The partial story is more credible than the miracle, and it respects the truth of the person's life."],
  ["b8.mp4", "Then pair the story with data. Maria's story is one of many: last year, 84% of parents in this program secured stable employment. The story earns the attention. The number earns the trust."],
  ["b9.mp4", "So: situation, intervention, transformation, with the person doing the verbs. Dignity, agency, and consent from the first draft. And a story bank so the stories reach you while they're fresh. The consent form, the story worksheet, and the story bank guide are all in this course, Writing Impact Stories That Move People, and BeMo's Impact Story template turns one strong story into a grant section, an appeal, and a social post in an afternoon."],
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
