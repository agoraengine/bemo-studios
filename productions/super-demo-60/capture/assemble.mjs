#!/usr/bin/env node
// Assembles the Super Demo 60 review cut from footage selects, cards, VO,
// music, and captions. One command, re-runnable.
import ffmpegPath from "ffmpeg-static";
import { execFile } from "node:child_process";
import fs from "node:fs"; import path from "node:path";
import { fileURLToPath } from "node:url"; import { promisify } from "node:util";
const run = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
const SRC = path.join(HERE, "..", "..", "wrenfield-kb-load", "capture", "out");
const SFX = path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "out", "sfx");

const run1 = path.join(SRC, "wrenfield-kb-load-doc01.mp4");
const run2 = path.join(SRC, "wrenfield-kb-load-docs02-13.mp4");
const ask = path.join(SRC, "wrenfield-ask-board-member.mp4");

// build extended music (two crossfade loops of track D, ~76s)
const musicExt2 = path.join(OUT, "music-D-ext2.wav");
if (!fs.existsSync(musicExt2)) {
  await run(ffmpegPath, ["-y", "-i", path.join(SFX, "music-D.wav"),
    "-filter_complex",
    "[0:a]asplit=3[x][y][z];[x]atrim=0:30,asetpts=PTS-STARTPTS[a1];[y]atrim=8:30,asetpts=PTS-STARTPTS[a2];[z]atrim=8:38,asetpts=PTS-STARTPTS[a3];[a1][a2]acrossfade=d=2[m1];[m1][a3]acrossfade=d=2[out]",
    "-map", "[out]", musicExt2]);
}

// Video segments: [source, in, out, outputDuration]
// setpts compresses/stretches to hit the target duration.
const segs = [
  [path.join(OUT, "card-a.webm"), 0.4, 3.6, 3.2],
  [run2, 0.5, 4.3, 3.8],            // empty KB
  [run1, 7.2, 13.2, 6.0],           // import dialog, choose, upload
  [run1, 13.2, 24.3, 3.0],          // extracting, sped
  [run2, 29.3, 32.5, 6.5],          // review: hold on the fact cards
  [run2, 32.5, 38.5, 3.5],          // approve, commit
  [run2, 38.5, 268.0, 8.5],         // KB timelapse
  [ask, 13.0, 21.0, 8.0],           // new chat, typing
  [ask, 21.0, 49.0, 11.0],          // answer streaming, sped
  [path.join(OUT, "card-b.webm"), 0.3, 4.8, 4.5],
  [path.join(OUT, "card-c.webm"), 0.3, 8.8, 8.5],
];

const inputs = [];
segs.forEach(([f]) => inputs.push("-i", f));
let fc = segs.map(([, tin, tout, dur], i) =>
  `[${i}:v]trim=${tin}:${tout},setpts=(PTS-STARTPTS)*${(dur / (tout - tin)).toFixed(5)},fps=30,scale=1920:1080[v${i}]`
).join(";");
fc += ";" + segs.map((_, i) => `[v${i}]`).join("") + `concat=n=${segs.length}:v=1:a=0[vcat]`;

// audio: VO at beat times, music bed, sfx-free (real UI has no audio)
const VO = [
  ["d1.wav", 0.5], ["d2.wav", 7.3], ["d3.wav", 16.3], ["d4.wav", 26.3],
  ["d5.wav", 34.8], ["d6.wav", 42.8], ["d7.wav", 53.8],
];
const n = segs.length;
VO.forEach(([f], i) => inputs.push("-i", path.join(OUT, "vo", f)));
inputs.push("-i", musicExt2);
fc += ";" + VO.map(([, at], i) => `[${n + i}:a]adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[a${i}]`).join(";");
const DUR = 64.5, SWELL = 53.8;
fc += `;[${n + VO.length}:a]volume='if(lt(t,${SWELL}),0.18,min(0.18+0.1*(t-${SWELL})/1.2,0.28))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${DUR - 3}:d=3[mus]`;
fc += ";" + VO.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${VO.length}:normalize=0[vob]`;
fc += `;[vob]highpass=f=75,dynaudnorm=f=250:g=15:p=0.9:m=4[voe]`;
fc += `;[voe][mus]amix=inputs=2:normalize=0[mix];[mix]loudnorm=I=-14:TP=-1.5:LRA=11[aout]`;
const srt = path.join(OUT, "bemo-super-demo-60.srt");
// persistent demo-org chip over all screen footage (not the cards)
const chip = "Demo organization\\: The Wrenfield Alliance (fictitious)";
fc += `;[vcat]drawtext=fontfile='${path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "fonts", "Geist.ttf")}':text='${chip}':fontsize=22:fontcolor=0x3D4F66:box=1:boxcolor=0xFFFFFFCC:boxborderw=10:x=w-tw-28:y=24:enable='between(t,3.4,53.3)'[vchip]`;
fc += `;[vchip]subtitles='${srt}':fontsdir='${path.join(HERE, "..", "..", "linkedin-sizzle-series", "capture", "fonts")}':force_style='FontName=Geist,FontSize=10.5,PrimaryColour=&H003A2A1A,BorderStyle=4,BackColour=&H14FFFFFF,OutlineColour=&H14FFFFFF,Outline=1.1,Shadow=0,Alignment=2,MarginV=24'[vout]`;

const final = path.join(OUT, "bemo-super-demo-60-review-v1.mp4");
await run(ffmpegPath, ["-y", ...inputs, "-filter_complex", fc,
  "-map", "[vout]", "-map", "[aout]", "-t", String(DUR),
  "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30",
  "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", final]);
console.log("Final:", final);
