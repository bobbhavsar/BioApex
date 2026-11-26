// Audit: does every lesson checkpoint ask about the section it is shown on?
// Usage: node tools/audit-checkpoints.mjs [moduleIdPrefix]
import fs from 'node:fs';
import { TRACK_MODULES } from '../src/data/curriculum.js';

const app = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
const slice = name => {
  const start = app.indexOf(`const ${name} = {`);
  if (start === -1) throw new Error(`${name} not found in src/app.js`);
  const open = app.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < app.length; i++) {
    if (app[i] === '{') depth++;
    else if (app[i] === '}' && --depth === 0) return eval('(' + app.slice(open, i + 1) + ')');
  }
  throw new Error(`${name} is not closed`);
};
const bank = slice('CHECKPOINT_BANK');
const topics = slice('CHECKPOINT_TOPICS');

const filter = process.argv[2] || '';
let problems = 0;
let covered = 0;
let sections = 0;

for (const mod of TRACK_MODULES) {
  if (filter && !mod.id.startsWith(filter)) continue;
  sections += mod.sections.length;
  const qs = bank[mod.id] || [];
  const map = topics[mod.id];
  console.log(`\n=== ${mod.id} (${mod.sections.length} sections, ${qs.length} checkpoints)`);

  if (!qs.length) { console.log('  !! no checkpoint bank entry'); problems++; continue; }
  if (!map) { console.log('  !! no topic mapping'); problems++; continue; }
  if (map.length !== qs.length) {
    console.log(`  !! topic mapping has ${map.length} entries for ${qs.length} questions`);
    problems++;
  }
  map.forEach((sec, i) => {
    if (sec === -1) return;
    if (!(sec >= 0 && sec < mod.sections.length)) {
      console.log(`  !! question ${i} maps to missing section ${sec}`);
      problems++;
    }
  });

  mod.sections.forEach((s, i) => {
    const qi = map.indexOf(i);
    const q = qi === -1 ? null : qs[qi];
    if (q) covered++;
    console.log(`  [${i}] ${s.heading}`);
    console.log(`      Q: ${q ? q.prompt.replace(/\s+/g, ' ').slice(0, 150) : '(no checkpoint - retrieval prompt)'}`);
  });

  const unused = map.map((sec, i) => (sec === -1 ? i : -1)).filter(i => i >= 0);
  if (unused.length) console.log(`  ! ${unused.length} question(s) not placed on a step: ${unused.join(', ')}`);
}

console.log(`\nTopics with a matching checkpoint: ${covered}/${sections}`);
console.log(`Problems: ${problems}`);
process.exitCode = problems ? 1 : 0;
