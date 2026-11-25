// BioApex Lesson Content Helpers
// The curriculum stores lightweight markdown (bullets, numbered steps, bold terms,
// inline/display math). These helpers turn it into readable, scannable lesson HTML
// so learners see structure instead of a wall of text.

const MATH_PLACEHOLDER = /@@M(\d+)@@/g;

function formatInline(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em class="italic text-slate-100">$2</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-800/80 text-indigo-200 text-[0.92em] font-mono">$1</code>');
}

function mathBlock(html) {
  return `<div class="my-3 px-4 py-3 rounded-xl bg-indigo-950/40 border border-indigo-500/25 text-center overflow-x-auto text-[15px] text-indigo-100">${html}</div>`;
}

/**
 * Render a curriculum section body as structured HTML.
 * Supports: display math ($$...$$), inline math ($...$), bullet and numbered lists
 * (including indented sub-bullets), markdown headings, bold/italic terms and `code`.
 */
export function formatLessonContent(content) {
  if (!content) return '';
  const math = [];
  const protect = (match, display) => {
    math.push({ html: match, display });
    return `@@M${math.length - 1}@@`;
  };

  let text = String(content).replace(/\r/g, '');
  text = text.replace(/\$\$[\s\S]*?\$\$/g, (m) => protect(m, true));
  text = text.replace(/\$[^$\n]+?\$/g, (m) => protect(m, false));

  const out = [];
  let para = [];
  let listType = null;
  let listItems = [];

  const flushPara = () => {
    if (!para.length) return;
    const joined = para.join(' ').trim();
    para = [];
    if (!joined) return;
    const onlyMath = joined.match(/^@@M(\d+)@@$/);
    if (onlyMath && math[Number(onlyMath[1])].display) {
      out.push(mathBlock(math[Number(onlyMath[1])].html));
      return;
    }
    out.push(`<p class="text-[13.5px] leading-7 text-slate-300">${formatInline(joined)}</p>`);
  };

  const flushList = () => {
    if (!listItems.length) return;
    const cls = listType === 'ol'
      ? 'my-3 space-y-1.5 pl-5 list-decimal marker:text-indigo-400 marker:font-bold text-[13.5px] leading-7 text-slate-300'
      : 'my-3 space-y-1.5 text-[13.5px] leading-7 text-slate-300';
    out.push(`<${listType} class="${cls}">${listItems.join('')}</${listType}>`);
    listItems = [];
    listType = null;
  };

  const closeBlocks = () => {
    flushPara();
    flushList();
  };

  for (const rawLine of text.split('\n')) {
    const line = rawLine.replace(/\s+$/, '');
    if (!line.trim()) {
      closeBlocks();
      continue;
    }

    const bullet = line.match(/^(\s*)[-\u2022]\s+(.*)$/);
    const numbered = line.match(/^\s{0,3}\d+\.\s+(.*)$/);
    const heading = line.match(/^#{2,4}\s+(.*)$/);

    // A formula on its own line becomes its own block, not part of a paragraph.
    const mathOnly = line.trim().match(/^@@M(\d+)@@$/);
    if (mathOnly) {
      closeBlocks();
      out.push(mathBlock(math[Number(mathOnly[1])].html));
      continue;
    }

    if (bullet) {
      flushPara();
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      const nested = bullet[1].length > 0;
      listItems.push(
        `<li class="flex gap-2 ${nested ? 'ml-5 text-slate-400' : ''}"><span class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${nested ? 'bg-slate-600' : 'bg-indigo-400'}"></span><span>${formatInline(bullet[2])}</span></li>`
      );
      continue;
    }

    if (numbered) {
      flushPara();
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(`<li class="pl-1">${formatInline(numbered[1])}</li>`);
      continue;
    }

    if (heading) {
      closeBlocks();
      out.push(`<h4 class="mt-4 text-[12px] font-bold uppercase tracking-wider text-indigo-300">${formatInline(heading[1])}</h4>`);
      continue;
    }

    // Indented continuation of the previous list item (wrapped source line).
    if (listType && /^\s{2,}\S/.test(rawLine) && listItems.length) {
      const last = listItems.length - 1;
      listItems[last] = listItems[last].replace(/<\/li>$/, ` ${formatInline(line.trim())}</li>`);
      continue;
    }

    flushList();
    para.push(line.trim());
  }

  closeBlocks();
  return out.join('\n').replace(MATH_PLACEHOLDER, (_, i) => math[Number(i)].html);
}

/** Pull the bolded key terms out of a section — used as a self-check checklist. */
export function extractKeyTerms(content, limit = 6) {
  if (!content) return [];
  const terms = [];
  const re = /\*\*([^*]+)\*\*/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const term = match[1].replace(/\s+/g, ' ').replace(/[:;,.]+$/, '').trim();
    if (term && term.length <= 60 && !terms.includes(term)) terms.push(term);
    if (terms.length >= limit) break;
  }
  return terms;
}

/** Stripped, truncated plain text — used for compact previews of long prompts. */
export function toPlainText(content, maxLen = 180) {
  if (!content) return '';
  const text = String(content)
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+?\$/g, ' ')
    .replace(/\*\*?/g, '')
    .replace(/[#>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLen ? `${text.slice(0, maxLen).trim()}\u2026` : text;
}

/** Deterministic shuffle so a step's answer order is stable across re-renders. */
export function seededShuffle(items, seed) {
  let h = 2166136261;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const random = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) / 4294967296);
  };
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
