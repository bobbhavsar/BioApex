#!/usr/bin/env python3
"""Normalise LaTeX inside $...$ segments of the lesson data files.

Three defects are repaired, in source-text terms:

1. Single `\\cmd` inside a JS template literal collapses to `cmd` at runtime,
   so it must be written as `\\\\cmd`.
2. Some content was written with `\\\\\\\\text` (four), which reaches KaTeX as a
   literal `\\\\text`; collapse four to two.
3. Bare command words (`pi`, `Delta`, `eta`, `bar`, ...) and stranded
   underscores (`A_B_`) inside math also break KaTeX.

The script is idempotent: running it twice changes nothing.
"""
import re

FILES = ['src/data/curriculum.js', 'src/data/unitTests.js', 'src/data/quizBank.js', 'src/app.js']
CMDS = [
    'alpha', 'beta', 'gamma', 'delta', 'kappa', 'lambda', 'sigma', 'omega', 'theta',
    'mu', 'nu', 'rho', 'tau', 'phi', 'chi', 'psi', 'pi', 'eta', 'epsilon', 'varepsilon',
    'Delta', 'Sigma', 'Omega', 'Phi', 'Psi', 'Gamma', 'Lambda', 'Theta',
    'times', 'cdot', 'dfrac', 'frac', 'sqrt', 'mathrm', 'operatorname', 'bar', 'hat',
    'leq', 'geq', 'neq', 'approx', 'rightarrow', 'leftarrow', 'infty', 'propto',
    'partial', 'quad', 'qquad', 'text', 'circ', 'sum', 'int', 'prime', 'ast',
]
CMD_ALT = '|'.join(sorted(CMDS, key=len, reverse=True))
QUAD = re.compile(r'\\\\\\\\(' + CMD_ALT + r')(?![A-Za-z])')          # 4 -> 2
SINGLE = re.compile(r'(?<!\\)\\(?!\\)(' + CMD_ALT + r')(?![A-Za-z])')  # 1 -> 2
BARE = re.compile(r'(?<![\\A-Za-z])(' + CMD_ALT + r')(?![A-Za-z])')   # 0 -> 2
TEXT_SPAN = re.compile(r'\\\\\\\\?text\{[^{}]*\}')
INLINE = re.compile(r'\$([^$\n]+?)\$')
DISPLAY = re.compile(r'\$\$([^$\n]+?)\$\$')

stats = {'quad': 0, 'single': 0, 'bare': 0, 'underscore': 0, 'lines': 0}


def repair(body):
    if '\\\\' not in body and '^' not in body and '_' not in body:
        return body

    kept = []

    def stash(mt):
        kept.append(mt.group(0))
        return '\x00%d\x00' % (len(kept) - 1)

    masked = TEXT_SPAN.sub(stash, body)

    def quad(mo):
        stats['quad'] += 1
        return '\\\\' + mo.group(1)

    def single(mo):
        stats['single'] += 1
        return '\\\\' + mo.group(1)

    def bare(mo):
        stats['bare'] += 1
        return '\\\\' + mo.group(1)

    fixed = QUAD.sub(quad, masked)
    fixed = SINGLE.sub(single, fixed)
    fixed = BARE.sub(bare, fixed)

    def underscore(mo):
        stats['underscore'] += 1
        return mo.group(1) + '\\_'

    # Escape an underscore that has nothing to subscript: `A_B_` -> `A_B\_`.
    fixed = re.sub(r'([A-Za-z0-9}])(?:_)(?=[^A-Za-z0-9{\\]|$)', underscore, fixed)
    fixed = re.sub(r'\x00(\d+)\x00', lambda mm: kept[int(mm.group(1))], fixed)
    return fixed


for path in FILES:
    lines = open(path, encoding='utf-8').read().split('\n')
    touched = 0
    for i, line in enumerate(lines):
        if line.count('$') < 2:
            continue
        # Display math on a single line is repaired first, so its delimiters do
        # not confuse the inline pass.
        display = DISPLAY.sub(lambda m: '$$' + repair(m.group(1)) + '$$', line)
        cleaned = display.replace('$$', '\x01')
        new = INLINE.sub(lambda m: '$' + repair(m.group(1)) + '$', cleaned)
        new = new.replace('\x01', '$$')
        if new != line:
            lines[i] = new
            touched += 1
    if touched:
        open(path, 'w', encoding='utf-8').write('\n'.join(lines))
    stats['lines'] += touched
    print(path, 'lines touched:', touched)

print(stats)
