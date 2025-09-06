#!/usr/bin/env node
// Post-export fixer: convert internal absolute URLs ("/_next/...", "/Images/...", "/menu")
// to relative URLs so the static site works when uploaded into a subfolder.
// Usage: node scripts/fix-out.js [outDir]

const fs = require('fs');
const path = require('path');

const outDir = process.argv[2] || path.join(process.cwd(), 'out');

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function fixHtml(filePath) {
  if (!filePath.endsWith('.html')) return;
  let s = fs.readFileSync(filePath, 'utf8');
  // Compute how deep this file is relative to outDir so we can build a correct prefix.
  // For example, out/menu/index.html -> prefix = ../
  const rel = path.relative(outDir, filePath);
  const dir = path.dirname(rel);
  let prefix = './';
  if (dir && dir !== '.') {
    const parts = dir.split(path.sep).filter(Boolean);
    prefix = parts.map(() => '..').join('/') + '/';
  }

  // Replace href= or src= attributes that start with "/" (but not with "//")
  s = s.replace(/(href=|src=)"\/(?!\/)"?/g, `$1"${prefix}`);
  s = s.replace(/(href=|src=)'\/(?!\/)'?/g, `$1'${prefix}`);

  // Replace url('/...') or url("/...") or url(/...)
  s = s.replace(/url\((['"]?)\/(?!\/)([^)'"]*)\1\)/g, (m, q, rest) => {
    return `url(${q}${prefix}${rest}${q})`;
  });
  fs.writeFileSync(filePath, s, 'utf8');
}

if (!fs.existsSync(outDir)) {
  console.error('Out directory not found:', outDir);
  process.exit(1);
}

walk(outDir, (file) => {
  try {
    fixHtml(file);
  } catch (err) {
    console.error('Error fixing', file, err.message);
  }
});

console.log('Post-export fix complete for:', outDir);
