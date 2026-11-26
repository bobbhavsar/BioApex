// BioApex Lesson Content Helpers
// The curriculum stores lightweight markdown (bullets, numbered steps, bold terms,
// inline/display math). These helpers turn it into readable, scannable lesson HTML
// so learners see structure instead of a wall of text.

const MATH_PLACEHOLDER = /@@M(\d+)@@/g;

// Some lesson and quiz sources lost backslashes on their LaTeX commands (a JS
// template literal turns "\\alpha" into "alpha"). Repair a formula before
// KaTeX sees it: collapse doubled escapes, restore known commands, and escape
// underscores that have nothing to subscript (genotype notation like A_B_).
const LATEX_COMMANDS = [
  'alpha', 'beta', 'gamma', 'delta', 'kappa', 'lambda', 'sigma', 'omega', 'theta',
  'mu', 'nu', 'rho', 'tau', 'phi', 'chi', 'psi', 'pi', 'eta', 'epsilon', 'varepsilon',
  'Delta', 'Sigma', 'Omega', 'Phi', 'Psi', 'Gamma', 'Lambda', 'Theta',
  'times', 'cdot', 'dfrac', 'frac', 'sqrt', 'mathrm', 'operatorname', 'bar', 'hat',
  'overline', 'underline', 'leq', 'geq', 'neq', 'approx', 'rightarrow', 'leftarrow',
  'infty', 'propto', 'partial', 'quad', 'qquad', 'text', 'circ', 'sum', 'int', 'prime', 'ast'
].sort((a, b) => b.length - a.length);
const BARE_COMMAND = new RegExp(`(^|[^\\\\A-Za-z])(${LATEX_COMMANDS.join('|')})(?![a-z])`, 'g');

const CONTROL_ESCAPES = { '\u0007': '\\a', '\b': '\\b', '\u000b': '\\v', '\f': '\\f', '\r': '\\r' };

export function repairLatex(tex) {
  // A single "\\f" in a template literal is a form feed by the time it gets here;
  // put the backslash+letter spelling back before the other repairs run.
  let out = String(tex).replace(/[\u0007\b\u000b\f\r]/g, ch => CONTROL_ESCAPES[ch] || ch);
  let previous;
  // Collapse any run of escaped backslashes down to a single TeX backslash.
  do {
    previous = out;
    out = out.replace(/\\{2,}([A-Za-z]+)/g, '\\$1');
  } while (out !== previous);
  // Leave the inside of \text{...} alone: prose there is not a command name.
  const spans = [];
  out = out.replace(/\\+text\{[^{}]*\}/g, (m) => {
    spans.push(m);
    return `\u0000${spans.length - 1}\u0000`;
  });
  out = out.replace(BARE_COMMAND, (_, pre, cmd) => `${pre}\\${cmd}`);
  out = out.replace(/([A-Za-z0-9}])(_)(?=[^A-Za-z0-9{\\]|$)/g, '$1\\_');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => spans[Number(i)]);
}

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
    const inner = display ? match.slice(2, -2) : match.slice(1, -1);
    const fixed = `${display ? '$$' : '$'}${repairLatex(inner)}${display ? '$$' : '$'}`;
    math.push({ html: fixed, display });
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
    out.push(`<p class="text-[13.5px] leading-7 text-slate-300 break-words">${formatInline(joined)}</p>`);
  };

  const flushList = () => {
    if (!listItems.length) return;
    const cls = listType === 'ol'
      ? 'my-3 space-y-1.5 pl-5 list-decimal marker:text-indigo-400 marker:font-bold text-[13.5px] leading-7 text-slate-300 min-w-0'
      : 'my-3 space-y-1.5 text-[13.5px] leading-7 text-slate-300 min-w-0';
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
    // Allow any indent: numbered sub-lists sit under bullets (e.g. 4 spaces).
    const numbered = line.match(/^(\s*)\d+\.\s+(.*)$/);
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
        `<li class="flex gap-2 ${nested ? 'ml-5 text-slate-400' : ''}"><span class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${nested ? 'bg-slate-600' : 'bg-indigo-400'}"></span><span class="min-w-0 flex-1 break-words">${formatInline(bullet[2])}</span></li>`
      );
      continue;
    }

    if (numbered) {
      flushPara();
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      // Indented numbered items are a sub-list under the preceding bullet.
      listItems.push(`<li class="pl-1 ${numbered[1].length >= 2 ? 'ml-5' : ''} break-words">${formatInline(numbered[2])}</li>`);
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
  return out.join('\n').replace(MATH_PLACEHOLDER, (_, i) => {
    const m = math[Number(i)];
    // Display math rendered outside a dedicated block still needs to be able to scroll.
    return m.display ? `<span class="block overflow-x-auto">${m.html}</span>` : m.html;
  });
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
