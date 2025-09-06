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
  // Replace href/src starting with /_next/ or /Images/ or leading /menu with relative paths
  // Only rewrite internal absolute URLs that begin with '/'
  s = s.replace(/(href=|src=)"\//g, `$1"./`);
  // Also fix occurrences like href='/menu' or src='/Images/...'
  s = s.replace(/(href=|src=)'\//g, `$1'./`);
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
