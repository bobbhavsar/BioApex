#!/usr/bin/env python3
"""Splice authored deep-lesson text into src/data/curriculum.js.

Content files use a tiny plain-text format so LaTeX can be written raw:

    @@module cell-9-biomolecules
    @@section Heading text
    body text (blank lines allowed)

Backslashes are doubled and backticks/`${` escaped when the body is written
into a JS template literal.
"""
import json
import re
import sys

CURRICULUM = 'src/data/curriculum.js'


def parse(path):
    modules, current, section = {}, None, None
    for raw in open(path, encoding='utf-8').read().split('\n'):
        line = raw.rstrip()
        if line.startswith('@@module '):
            current = line[len('@@module '):].strip()
            modules[current] = []
            section = None
        elif line.startswith('@@section '):
            section = {'heading': line[len('@@section '):].strip(), 'lines': []}
            modules[current].append(section)
        elif section is not None:
            section['lines'].append(line)
    out = {}
    for mod, secs in modules.items():
        out[mod] = [
            {'heading': s['heading'], 'content': '\n'.join(s['lines']).strip()}
            for s in secs
        ]
    return out


def escape(text):
    text = text.replace('\\', '\\\\')
    text = text.replace('`', '\\`')
    text = text.replace('${', '\\${')
    return text


def render(sections):
    parts = []
    for s in sections:
        heading = s['heading'].replace('"', '\\"')
        parts.append('      {\n        heading: "%s",\n        content: `%s`\n      }' % (heading, escape(s['content'])))
    return '    sections: [\n' + ',\n'.join(parts) + '\n    ]'


def find_array_end(src, start):
    """Return index just past the ']' closing the array starting at `start`."""
    depth = 0
    i = start
    while i < len(src):
        ch = src[i]
        if ch == '`':
            i += 1
            while i < len(src) and src[i] != '`':
                if src[i] == '\\':
                    i += 1
                i += 1
        elif ch in '\'"':
            quote = ch
            i += 1
            while i < len(src) and src[i] != quote:
                if src[i] == '\\':
                    i += 1
                i += 1
        elif ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    raise ValueError('unbalanced array')


def main(paths):
    batches = [parse(p) for p in paths]
    data = {}
    for batch in batches:
        data.update(batch)

    src = open(CURRICULUM, encoding='utf-8').read()
    changed = []
    for mod_id, sections in data.items():
        anchor = 'id: "%s"' % mod_id
        pos = src.find(anchor)
        if pos < 0:
            raise SystemExit('module not found: %s' % mod_id)
        start = src.index('sections: [', pos)
        end = find_array_end(src, start + len('sections: ') - 1 + 1)
        src = src[:start] + render(sections) + src[end:]
        changed.append((mod_id, len(sections)))

    open(CURRICULUM, 'w', encoding='utf-8').write(src)
    for mod_id, n in changed:
        print('spliced %-32s %d sections' % (mod_id, n))
    print(json.dumps({'modules': len(changed)}))


if __name__ == '__main__':
    main(sys.argv[1:])
