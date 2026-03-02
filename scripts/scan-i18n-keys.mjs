#!/usr/bin/env node

/**
 * Scan HTML files for i18n keys
 * 
 * This script scans all HTML files for data-i18n attributes and reports:
 * - Keys used in HTML but missing from en.json
 * - Keys in en.json not used in any HTML
 * - Overview of all keys found
 * 
 * Usage: npm run i18n:scan
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const i18nDir = path.join(repoRoot, 'assets/i18n');

/**
 * Extract all keys from nested translation object
 * @param {object} obj - Translation object
 * @param {string} prefix - Current prefix
 * @returns {set} Set of all keys
 */
function extractAllKeys(obj, prefix = '') {
    const keys = new Set();

    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            keys.add(fullKey);
        } else if (typeof value === 'object' && value !== null) {
            const nestedKeys = extractAllKeys(value, fullKey);
            nestedKeys.forEach(k => keys.add(k));
        }
    }

    return keys;
}

/**
 * Find all data-i18n attribute values in HTML files
 * @returns {object} Object with file paths and their keys
 */
function scanHTMLFiles() {
    const htmlFiles = fs.readdirSync(repoRoot).filter(file => file.endsWith('.html'));
    const scanResults = {
        filesScanned: [],
        keysUsed: new Set(),
        keysByFile: {}
    };

    // Regex patterns to match data-i18n* attributes
    const patterns = [
        /data-i18n="([^"]+)"/g,
        /data-i18n-html="([^"]+)"/g,
        /data-i18n-placeholder="([^"]+)"/g,
        /data-i18n-value="([^"]+)"/g
    ];

    for (const file of htmlFiles) {
        const filePath = path.join(repoRoot, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const fileKeys = new Set();

        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                fileKeys.add(match[1]);
                scanResults.keysUsed.add(match[1]);
            }
        }

        if (fileKeys.size > 0) {
            scanResults.filesScanned.push(file);
            scanResults.keysByFile[file] = Array.from(fileKeys).sort();
        }
    }

    return scanResults;
}

/**
 * Main scan function
 */
function main() {
    console.log('🔍 Scanning HTML files for i18n keys...\n');

    // Read source translations
    const enPath = path.join(i18nDir, 'en.json');
    let en;
    try {
        const enContent = fs.readFileSync(enPath, 'utf-8');
        en = JSON.parse(enContent);
    } catch (error) {
        console.error(`❌ Error reading en.json: ${error.message}`);
        process.exit(1);
    }

    // Extract all keys from en.json
    const enKeys = extractAllKeys(en);

    // Scan HTML files
    const htmlScan = scanHTMLFiles();

    // Compare
    const usedKeys = htmlScan.keysUsed;
    const missingInEN = new Set([...usedKeys].filter(k => !enKeys.has(k)));
    const unusedInEN = new Set([...enKeys].filter(k => !usedKeys.has(k)));

    // Print results
    console.log(`📁 Files Scanned: ${htmlScan.filesScanned.length}`);
    if (htmlScan.filesScanned.length > 0) {
        htmlScan.filesScanned.forEach(file => {
            console.log(`   - ${file} (${htmlScan.keysByFile[file].length} keys)`);
        });
    }

    console.log(`\n📊 Statistics:`);
    console.log(`   Total unique keys in HTML: ${usedKeys.size}`);
    console.log(`   Total keys in en.json: ${enKeys.size}`);

    // Missing keys in en.json
    if (missingInEN.size > 0) {
        console.log(`\n⚠️  Missing in en.json (${missingInEN.size}):`);
        const missingArray = Array.from(missingInEN).sort();
        missingArray.slice(0, 20).forEach(key => {
            console.log(`   - "${key}"`);
        });
        if (missingArray.length > 20) {
            console.log(`   ... and ${missingArray.length - 20} more`);
        }
    } else {
        console.log(`\n✅ All HTML keys exist in en.json`);
    }

    // Unused keys in en.json (optional - commented out by default but visible)
    if (unusedInEN.size > 0) {
        console.log(`\n💡 Not used in HTML (${unusedInEN.size}):`);
        const unusedArray = Array.from(unusedInEN).sort();
        const exampleCount = Math.min(10, unusedArray.length);
        unusedArray.slice(0, exampleCount).forEach(key => {
            console.log(`   - "${key}"`);
        });
        if (unusedArray.length > exampleCount) {
            console.log(`   ... and ${unusedArray.length - exampleCount} more`);
        }
        console.log(`   (These keys might be used dynamically or be legacy entries)`);
    }

    console.log(`\n✨ Scan complete!`);

    // Exit with error if there are missing keys
    if (missingInEN.size > 0) {
        process.exit(1);
    }
}

main();
