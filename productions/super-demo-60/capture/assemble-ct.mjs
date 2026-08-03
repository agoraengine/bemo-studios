#!/usr/bin/env node
// Super Demo 60, Common Table cut: the v4 edit re-pointed at the Common Table
// footage (productions/common-table-kb-load/capture/out/), per the Aug 3
// standing-universe decision. Same durations, VO offsets, music, captions, and
// treatment as assemble.mjs v4; only the sources, their in/out points (from the
// new action logs), and the corner chip text change. Spans chosen so each beat
// shows the same moment class as v4: empty KB, import flow, extraction wait,
// fact-card hold (slowed), approve-and-commit, timelapse to the full KB (~19x,
// the pace Becky approved at v3), the ask, the streaming answer.
import ffmpegPath from "ffmpeg-static";
import { execFile } from "node:child_process";
import fs from "node:fs"; import path from "node:path";
import { fileURLToPath } from "node:url"; import { promisify } from "node:util";
const run = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const SRC = path.join(HERE, "..", "..", "common-table-kb-load", "capture", "out");
const SER = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture");
const load = path.join(SRC, "page@7ac70fd50da4cff267db1c05c2b757e5.webm"); // 13-doc KB load, 4:38
const ask = path.join(SRC, "page@80a9e63c22763d1db98b8374549e445b.webm");  // board catch-up ask, 54s
const musicExt2 = path.join(OUT, "music-D-ext2.wav");

const FADE = 0.35;
const segs = [
  [path.join(OUT, "card-a.webm"), 0.4, 4.4, 4.5, false],
  [load, 3.0, 6.8, 2.0, false],       // empty KB (first import starts 7.6)
  [load, 7.6, 13.6, 4.5, false],      // Seed KB, Import file, browse, Upload (uploading 10.8)
  [load, 13.6, 24.7, 2.5, false],     // reading and extracting (facts found 25.7)
  [load, 25.5, 28.7, 5.5, true],      // extraction cards hold, slowed, push-in
  [load, 47.5, 53.5, 2.0, false],     // doc02: approve all high-confidence, Commit
  [load, 110.1, 271.0, 8.0, false],   // timelapse docs 06-13 to the full KB (~19x)
  [ask, 13.5, 21.9, 6.0, false],      // question typing (typed 20.8), sent 21.7
  [ask, 21.9, 49.9, 11.0, true],      // answer streams (stable 48.7), push-in
  [path.join(OUT, "card-d.webm"), 0.3, 6.8, 6.0, false],
  [path.join(OUT, "card-c.webm"), 0.3, 8.3, 8.0, false],
];
const inputs = [];
segs.forEach(([f]) => inputs.push("-i", f));
let fc = segs.map(([, tin, tout, dur, push], i) => {
  const pad = i < segs.length - 1 ? FADE : 0;
  const rate = ((dur + pad) / (tout - tin)).toFixed(5);
  const zoom = push ? `,zoompan=z='min(1.0+0.0008*on,1.07)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30` : "";
  return `[${i}:v]trim=${tin}:${tout},setpts=(PTS-STARTPTS)*${rate},fps=30,scale=1920:1080${zoom}[v${i}]`;
}).join(";");
let acc = segs[0][3] + FADE;
let prev = "v0";
for (let i = 1; i < segs.length; i++) {
  const off = (acc - FADE).toFixed(3);
  const outLabel = i === segs.length - 1 ? "vcat" : "x" + i;
  fc += `;[${prev}][v${i}]xfade=transition=fade:duration=${FADE}:offset=${off}[${outLabel}]`;
  acc += segs[i][3] + (i < segs.length - 1 ? FADE : 0) - FADE;
  prev = outLabel;
}
const VO = [["d1.wav",0.5],["d2.wav",6.7],["d3.wav",13.7],["d4.wav",21.2],["d5.wav",29.3],["d6-drafts.wav",35.3],["d7-fourapps.wav",46.5],["d8-close.wav",52.3]];
const n = segs.length;
VO.forEach(([f]) => inputs.push("-i", path.join(OUT, "vo", f)));
inputs.push("-i", musicExt2);
inputs.push("-i", path.join(SER, "out", "sfx", "typing.mp3"));
fc += ";" + VO.map(([, at], i) => `[${n + i}:a]adelay=${Math.round(at*1000)}|${Math.round(at*1000)}[a${i}]`).join(";");
const DUR = 60, SWELL = 52.0;
fc += `;[${n + VO.length}:a]volume='if(lt(t,${SWELL}),0.18,min(0.18+0.1*(t-${SWELL})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${DUR - 3}:d=3[mus]`;
fc += `;[${n + VO.length + 1}:a]atrim=0:4.5,asetpts=PTS-STARTPTS,volume=0.05,afade=t=in:d=0.3,afade=t=out:st=4.1:d=0.4,adelay=29500|29500[typ]`;
fc += ";" + VO.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${VO.length}:normalize=0[vob]`;
fc += `;[vob]highpass=f=75,dynaudnorm=f=250:g=15:p=0.9:m=4[voe]`;
fc += `;[mus][typ]amix=inputs=2:normalize=0[bed]`;
fc += `;[voe][bed]amix=inputs=2:normalize=0[mix];[mix]loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
const font = path.join(SER, "fonts", "Geist.ttf");
fc += `;[vcat]drawtext=fontfile='${font}':text='Common Table Food Pantry':fontsize=22:fontcolor=0x1A2A3A:box=1:boxcolor=0xFFFFFFCC:boxborderw=10:x=w-tw-28:y=24:enable='between(t,4.7,45.8)'[vc1]`;
fc += `;[vc1]drawtext=fontfile='${font}':text='(a fictitious demo organization)':fontsize=17:fontcolor=0x6B7A90:box=1:boxcolor=0xFFFFFFCC:boxborderw=8:x=w-tw-30:y=58:enable='between(t,4.7,45.8)'[vchip]`;
const srt = path.join(OUT, "bemo-super-demo-60.srt");
fc += `;[vchip]subtitles='${srt}':fontsdir='${path.join(SER, "fonts")}':force_style='FontName=Geist,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'[vout]`;
const final = path.join(OUT, "bemo-super-demo-60-review-v5-common-table.mp4");
await run(ffmpegPath, ["-y", ...inputs, "-filter_complex", fc,
  "-map", "[vout]", "-map", "[aout]", "-t", String(DUR),
  "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30",
  "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", final]);
console.log("Final:", final);
