// Downloads each lesson figure into assets/figures so it always renders (and works offline).
// Wikimedia only serves pre-generated thumbnail widths, so several URL forms are tried per file.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, 'src/data/lessonFigures.js');
const OUT = path.join(ROOT, 'assets/figures');
fs.mkdirSync(OUT, { recursive: true });

const raw = fs.readFileSync(DATA, 'utf8');
const header = raw.slice(0, raw.indexOf('{'));
const body = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('};') + 1));
const UA = 'BioApexStudyApp/1.0 (educational biology curriculum)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const kindOf = (b) => {
  if (b[0] === 0x89 && b[1] === 0x50) return 'png';
  if (b[0] === 0xff && b[1] === 0xd8) return 'jpg';
  if (b[0] === 0x47 && b[1] === 0x49) return 'gif';
  if (b.slice(0, 2).toString() === 'RI') return 'webp';
  return null;
};

const variants = (src) => {
  const list = [src];
  const m = src.match(/^(.*\/thumb\/)([^/]+\/[^/]+\/[^/]+)\/(?:\d+px-)([^/]+?)(\.png)?$/);
  if (m) {
    const [, pre, mid, name, pngSuffix] = m;
    for (const w of [1280, 1024, 800, 640]) list.push(`${pre}${mid}/${w}px-${name}${pngSuffix || ''}`);
    // fall back to the original upload, which needs no thumbnail generation
    const original = `https://upload.wikimedia.org/wikipedia/commons/${mid}`;
    list.push(original);
  } else if (src.includes('/commons/thumb/')) {
    list.push(src.replace('/commons/thumb/', '/commons/').replace(/\/[^/]+$/, ''));
  }
  return [...new Set(list)];
};

const download = async (src) => {
  for (const url of variants(src)) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
        if (!res.ok) {
          if (res.status === 429 || res.status >= 500) { await sleep(4000 * (attempt + 1)); continue; }
          break; // 400/404: try the next URL form
        }
        const buf = Buffer.from(await res.arrayBuffer());
        if (!kindOf(buf)) { break; }
        return buf;
      } catch {
        await sleep(3000 * (attempt + 1));
      }
    }
  }
  return null;
};

const shrink = (file) => {
  try {
    execFileSync('python3', ['-c', `
from PIL import Image
p = ${JSON.stringify(file)}
im = Image.open(p)
im.seek(0)
im = im.convert("RGB")
if im.width > 1000:
    h = round(im.height * 1000 / im.width)
    im = im.resize((1000, h), Image.LANCZOS)
im.save(p, "JPEG", quality=86, optimize=True, progressive=True)
`], { stdio: 'ignore' });
    return true;
  } catch { return false; }
};

const keys = Object.keys(body);
const kept = {};
let ok = 0;
const failed = [];
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const entry = body[key];
  const buf = await download(entry.src);
  if (!buf) { failed.push(key); continue; }
  const outFile = path.join(OUT, `${key.replace(/[^a-z0-9]+/gi, '_')}.jpg`);
  fs.writeFileSync(outFile, buf);
  if (!shrink(outFile)) { failed.push(key); fs.unlinkSync(outFile); continue; }
  kept[key] = { ...entry, src: `assets/figures/${path.basename(outFile)}` };
  ok++;
  if (i % 10 === 0) process.stdout.write(`[${i}/${keys.length}] `);
  await sleep(400);
}
console.log(`\nbundled ${ok} | failed ${failed.length}`);
if (failed.length) console.log('  missing: ' + failed.join(', '));
fs.writeFileSync(DATA, header + JSON.stringify(kept, null, 2) + `;\n\nexport function getLessonFigure(moduleId, stepIndex) {\n  return LESSON_FIGURES[\`\${moduleId}:\${stepIndex}\`] || null;\n}\n`);
console.log('wrote', Object.keys(kept).length, 'figure entries pointing at assets/figures');
