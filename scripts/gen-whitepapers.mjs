#!/usr/bin/env node

/**
 * Script to generate PDF whitepapers from Typst source files.
 * Requires typst to be installed locally.
 *
 * Usage: npm run genwhitepapers
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { basename, join } from 'path';

const DOCS_DIR = 'docs';
const OUTPUT_DIR = 'public/whitepaper';

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created directory: ${OUTPUT_DIR}`);
}

// Get all .typ files from docs directory
const typFiles = readdirSync(DOCS_DIR).filter(file => file.endsWith('.typ'));

if (typFiles.length === 0) {
  console.log('No .typ files found in docs directory.');
  process.exit(0);
}

console.log(`Found ${typFiles.length} whitepaper(s) to compile...\n`);

let successCount = 0;
let errorCount = 0;

for (const typFile of typFiles) {
  const inputPath = join(DOCS_DIR, typFile);
  const pdfName = basename(typFile, '.typ') + '.pdf';
  const outputPath = join(OUTPUT_DIR, pdfName);

  try {
    console.log(`Compiling ${typFile}...`);
    execSync(`typst compile "${inputPath}" "${outputPath}"`, { stdio: 'pipe' });
    console.log(`  ✓ Generated ${outputPath}`);
    successCount++;
  } catch (error) {
    console.error(`  ✗ Failed to compile ${typFile}`);
    if (error.stderr) {
      console.error(`    ${error.stderr.toString()}`);
    }
    errorCount++;
  }
}

console.log(`\nDone! ${successCount} succeeded, ${errorCount} failed.`);

if (errorCount > 0) {
  process.exit(1);
}

