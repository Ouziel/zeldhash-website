import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const messagesDir = path.join(root, 'messages');

function collectPaths(value, prefix = '') {
  const out = [];

  if (value === null || value === undefined) {
    out.push(prefix);
    return out;
  }

  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const nextPrefix = prefix ? `${prefix}[${i}]` : `[${i}]`;
      out.push(...collectPaths(item, nextPrefix));
    });
    if (value.length === 0) out.push(prefix);
    return out;
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) out.push(prefix);
    for (const key of keys) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      out.push(...collectPaths(value[key], nextPrefix));
    }
    return out;
  }

  out.push(prefix);
  return out;
}

async function readJson(filePath) {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function main() {
  const locales = (await readdir(messagesDir, {withFileTypes: true}))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  if (!locales.includes('en')) {
    console.error("Missing 'messages/en' (English is required as the source locale).");
    process.exit(1);
  }

  const namespaces = (await readdir(path.join(messagesDir, 'en')))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();

  if (namespaces.length === 0) {
    console.error("No namespaces found in 'messages/en'.");
    process.exit(1);
  }

  const base = {};
  for (const ns of namespaces) {
    base[ns] = await readJson(path.join(messagesDir, 'en', `${ns}.json`));
  }
  const basePaths = new Set(collectPaths(base));

  let hasErrors = false;

  for (const locale of locales) {
    if (locale === 'en') continue;

    const current = {};
    for (const ns of namespaces) {
      const file = path.join(messagesDir, locale, `${ns}.json`);
      current[ns] = await readJson(file);
    }
    const currentPaths = new Set(collectPaths(current));

    const missing = [...basePaths].filter((p) => !currentPaths.has(p)).sort();
    const extra = [...currentPaths].filter((p) => !basePaths.has(p)).sort();

    if (missing.length || extra.length) {
      hasErrors = true;
      console.error(`\nLocale '${locale}':`);
      if (missing.length) {
        console.error(`  Missing keys (${missing.length}):`);
        for (const k of missing) console.error(`    - ${k}`);
      }
      if (extra.length) {
        console.error(`  Extra keys (${extra.length}):`);
        for (const k of extra) console.error(`    - ${k}`);
      }
    }
  }

  if (hasErrors) process.exit(1);
  console.log(`OK: ${locales.length} locales checked across ${namespaces.length} namespaces.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


