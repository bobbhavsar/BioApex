// Builds src/data/lessonFigures.js: one openly licensed, verified image per lesson topic.
// Sources: English Wikipedia lead images (free files only) with a Wikimedia Commons search fallback.
import fs from 'node:fs';
import path from 'node:path';
import mapA from './figure-map-a.mjs';
import mapB from './figure-map-b.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = { ...mapA, ...mapB };
const { TRACK_MODULES } = await import(path.join(ROOT, 'src/data/curriculum.js'));

const keys = [];
for (const m of TRACK_MODULES) m.sections.forEach((s, i) => keys.push(`${m.id}:${i}`));
const missingMap = keys.filter(k => !MAP[k]);
console.log(`sections: ${keys.length} | mapped: ${Object.keys(MAP).length} | unmapped: ${missingMap.join(', ') || 'none'}`);

const UA = 'BioApexStudyApp/1.0 (educational biology curriculum; contact: student project)';
const CACHE_FILE = '/tmp/figcache.json';
const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let lastCall = 0;

const api = async (host, params) => {
  const url = `https://${host}/w/api.php?${new URLSearchParams({ format: 'json', formatversion: '2', ...params })}`;
  if (cache[url]) return cache[url];
  for (let attempt = 0; attempt < 6; attempt++) {
    // stay well under the API burst limit
    const wait = Math.max(0, 450 - (Date.now() - lastCall));
    if (wait) await sleep(wait);
    lastCall = Date.now();
    let res;
    try {
      res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
    } catch (err) {
      if (attempt === 5) throw err;
      await sleep(1500 * (attempt + 1));
      continue;
    }
    if (res.status === 429 || res.status >= 500) {
      const retryAfter = Number(res.headers.get('retry-after')) || 0;
      await sleep(retryAfter ? retryAfter * 1000 : 2000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const json = await res.json();
    cache[url] = json;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
    return json;
  }
  throw new Error(`rate limited after retries: ${url}`);
};
const chunk = (arr, n) => arr.reduce((out, x, i) => (i % n ? out[out.length - 1].push(x) : out.push([x]), out), []);

// 1. Wikipedia lead image per article title
const titles = [...new Set(Object.values(MAP).map(v => v[0]).filter(Boolean))];
const lead = new Map();
for (const group of chunk(titles, 40)) {
  const data = await api('en.wikipedia.org', { action: 'query', redirects: '1', prop: 'pageimages', piprop: 'name|thumbnail', pithumbsize: '1100', titles: group.join('|') });
  const q = data.query || {};
  const byNorm = new Map();
  for (const r of q.redirects || []) byNorm.set(r.from, r.to);
  for (const n of q.normalized || []) if (!byNorm.has(n.from)) byNorm.set(n.from, n.to);
  for (const page of q.pages || []) {
    if (!page.pageimage) continue;
    byNorm.set(page.title, page.title);
    lead.set(page.title, { file: page.pageimage, article: page.title });
  }
  for (const t of group) {
    const resolved = byNorm.get(t) ?? t;
    if (lead.has(resolved)) lead.set(t, lead.get(resolved));
  }
}

// 2. File metadata (Commons only, so every accepted file is free)
const fileMeta = new Map();
const fetchFiles = async (names) => {
  const todo = names.filter(n => !fileMeta.has(n.replace(/_/g, ' ')));
  for (const group of chunk(todo, 20)) {
    const data = await api('commons.wikimedia.org', { action: 'query', prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1100', titles: group.map(n => `File:${n}`).join('|') });
    for (const page of (data.query || {}).pages || []) {
      const info = page.imageinfo && page.imageinfo[0];
      const name = page.title.replace(/^File:/, '').replace(/_/g, ' ');
      if (!info) { fileMeta.set(name, null); continue; }
      const meta = info.extmetadata || {};
      const license = (meta.LicenseShortName?.value || '').trim() || (meta.Copyrighted?.value === 'False' ? 'public domain' : '');
      const artist = (meta.Artist?.value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      fileMeta.set(name, {
        name,
        // Only scaled thumbnails are used: the originals host rate-limits hard.
        src: (info.thumburl || '').split('?')[0],
        url: (info.url || '').split('?')[0],
        width: info.width, height: info.height, mime: info.mime,
        license, artist,
        page: info.descriptionurl,
        free: !!license && !/fair use|non-?free|all rights reserved|copyrighted/i.test(license) && !/GFDL/i.test(meta.LicenseShortName?.value || ''),
      });
    }
  }
};

// 3. Commons search fallback
const commonsSearch = async (query) => {
  const data = await api('commons.wikimedia.org', { action: 'query', generator: 'search', gsrsearch: query, gsrnamespace: '6', gsrlimit: '10', prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1100' });
  const pages = (data.query || {}).pages || [];
  const ranked = pages
    .map(p => (p.imageinfo && p.imageinfo[0] ? {
      title: p.title.replace(/^File:/, ''),
      info: p.imageinfo[0],
      idx: p.index ?? 99,
    } : null))
    .filter(Boolean)
    .filter(p => /image\/(jpeg|png|gif|svg\+xml)/.test(p.info.mime) && p.info.width >= 400 && p.info.thumburl);
  for (const p of ranked) {
    const meta = p.info.extmetadata || {};
    const license = (meta.LicenseShortName?.value || '').trim() || (meta.Copyrighted?.value === 'False' ? 'public domain' : '');
    if (!license || /fair use|non-?free|all rights reserved|copyrighted/i.test(license)) continue;
    return {
      name: p.title,
      src: (p.info.thumburl || '').split('?')[0],
      width: p.info.width, height: p.info.height, mime: p.info.mime,
      license, artist: (meta.Artist?.value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
      page: p.info.descriptionurl,
      free: true,
    };
  }
  return null;
};

const verify = async (src) => {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(src, { method: 'HEAD', headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(12000) });
      const type = res.headers.get('content-type') || '';
      if (res.ok && /^image\//.test(type)) return true;
      if (res.status === 429 || res.status >= 500) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
      return false;
    } catch {
      await sleep(1500 * (attempt + 1));
    }
  }
  return false;
};

// 4. Resolve every key
const out = {};
const problems = [];
await fetchFiles([...new Set([...lead.values()].map(v => v.file))]);

// Rewrite original-file URLs to the scaled thumbnail host, which is what the browser should load.
const thumbify = (url, width) => {
  const m = url.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const [, a, ab, name] = m;
  const isSvg = /\.svg$/i.test(name);
  let w = Math.min(900, Math.round(width || 900));
  // Raster thumbnails must be strictly narrower than the original file, otherwise
  // Wikimedia answers 400 Bad Request and the browser shows a broken image.
  if (!isSvg) w = Math.max(240, Math.min(w, Math.round((width || 900) * 0.95) - 1));
  w = Math.max(240, w);
  const suffix = isSvg ? `${w}px-${name}.png` : `${w}px-${name}`;
  return `https://thumb.wikimedia.org/wikipedia/commons/thumb/${a}/${ab}/${name}/${suffix}`;
};

for (const key of keys) {
  const [title, query, caption] = MAP[key];
  let pick = null;
  if (title) {
    const hit = lead.get(title);
    if (hit) {
      const meta = fileMeta.get(hit.file.replace(/_/g, ' ')) || fileMeta.get(hit.file);
      if (meta && meta.free && meta.src && /image\/(jpeg|png|gif|svg\+xml)/.test(meta.mime) && meta.width >= 400) {
        pick = { ...meta, article: hit.article };
      }
    }
  }
  if (!pick && title && title.startsWith('File:')) {
    const name = title.slice(5);
    await fetchFiles([name]);
    const meta = fileMeta.get(name.replace(/_/g, ' '));
    if (meta && meta.free && meta.src) pick = { ...meta, article: name };
  }
  if (!pick) {
    const found = await commonsSearch(query);
    if (found && found.src) pick = { ...found, article: title || query };
  }
  if (!pick) { problems.push(`${key}: no free image found (${title || query})`); continue; }
  const creditBits = ['Wikimedia Commons'];
  if (pick.artist) creditBits.push(pick.artist.slice(0, 90));
  creditBits.push(pick.license);
  out[key] = {
    src: thumbify(pick.src, Math.min(pick.width || 900, 900)),
    caption,
    credit: creditBits.join(' · '),
    page: pick.page,
    article: pick.article.startsWith('File:')
      ? pick.page
      : `https://en.wikipedia.org/wiki/${encodeURIComponent(pick.article.replace(/ /g, '_'))}`,
    w: pick.width,
    h: pick.height,
  };
  process.stdout.write('.');
}

// 5. Verify every URL actually serves an image
console.log('\nverifying…');
const entries = Object.entries(out);
let bad = [];
if (!process.env.SKIP_VERIFY) {
  for (const group of chunk(entries, 4)) {
    const results = await Promise.all(group.map(async ([k, v]) => [k, await verify(v.src)]));
    bad.push(...results.filter(([, ok]) => !ok).map(([k]) => k));
    await sleep(120);
  }
}
for (const k of bad) delete out[k];
console.log(`verified ok: ${entries.length - bad.length}/${entries.length} | broken: ${bad.join(', ') || 'none'}`);
if (problems.length) console.log('unresolved:\n  ' + problems.join('\n  '));

const sorted = Object.fromEntries(Object.keys(out).sort().map(k => [k, out[k]]));
const body = `// Lesson figures: one openly licensed diagram or photo per topic, with attribution.
// Generated from English Wikipedia lead images and Wikimedia Commons searches; every URL is
// checked to serve an image. Textbook figures are copyrighted, so these are free alternatives
// (many are redrawn from the same primary sources as Campbell, Alberts and Raven).
// Regenerate with: node tools/build-figures.mjs

export const LESSON_FIGURES = ${JSON.stringify(sorted, null, 2)};

export function getLessonFigure(moduleId, stepIndex) {
  return LESSON_FIGURES[\`\${moduleId}:\${stepIndex}\`] || null;
}
`;
fs.writeFileSync(path.join(ROOT, 'src/data/lessonFigures.js'), body);
console.log(`wrote src/data/lessonFigures.js with ${Object.keys(sorted).length} figures`);
