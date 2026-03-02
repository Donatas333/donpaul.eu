#!/usr/bin/env node

/**
 * Sync i18n translations
 * 
 * This script ensures all translation files have the same keys as the source language (en.json).
 * For missing keys in lt.json and nl.json, it sets the value to "__TODO_TRANSLATE__"
 * 
 * Usage: npm run i18n:sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, '../assets/i18n');

const PLACEHOLDER = '__TODO_TRANSLATE__';
const SUPPORTED_LANGS = ['lt', 'nl'];

/**
 * Deeply merge source into target, filling missing keys with placeholder
 * @param {object} source - Source object (en.json)
 * @param {object} target - Target object to update
 * @param {array} missingKeys - Array to collect missing keys
 * @param {string} prefix - Current key prefix for logging
 */
function syncObject(source, target, missingKeys = [], prefix = '') {
    for (const [key, value] of Object.entries(source)) {
        const currentKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            // It's a translation string
            if (!(key in target)) {
                target[key] = PLACEHOLDER;
                missingKeys.push(currentKey);
            } else if (typeof target[key] !== 'string') {
                // Target has wrong type, replace it
                target[key] = PLACEHOLDER;
                missingKeys.push(currentKey);
            }
        } else if (typeof value === 'object' && value !== null) {
            // It's a nested object
            if (!(key in target) || typeof target[key] !== 'object' || target[key] === null) {
                target[key] = {};
            }
            syncObject(value, target[key], missingKeys, currentKey);
        }
    }
}

/**
 * Main sync function
 */
function main() {
    console.log('🔄 Syncing i18n translations...\n');

    // Read source (English) translations
    const enPath = path.join(i18nDir, 'en.json');
    let en;
    try {
        const enContent = fs.readFileSync(enPath, 'utf-8');
        en = JSON.parse(enContent);
    } catch (error) {
        console.error(`❌ Error reading en.json: ${error.message}`);
        process.exit(1);
    }

    const report = {
        timestamp: new Date().toISOString(),
        languages: {},
        totalMissing: 0
    };

    // Sync each language
    for (const lang of SUPPORTED_LANGS) {
        const filePath = path.join(i18nDir, `${lang}.json`);
        const missingKeys = [];

        let langData;
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            langData = JSON.parse(content);
        } catch (error) {
            console.error(`❌ Error reading ${lang}.json: ${error.message}`);
            process.exit(1);
        }

        // Sync translations
        syncObject(en, langData, missingKeys);

        // Write back to file with proper formatting
        try {
            fs.writeFileSync(filePath, JSON.stringify(langData, null, 2) + '\n', 'utf-8');
        } catch (error) {
            console.error(`❌ Error writing ${lang}.json: ${error.message}`);
            process.exit(1);
        }

        // Add to report
        report.languages[lang] = {
            missingCount: missingKeys.length,
            missingKeys: missingKeys.length > 0 ? missingKeys : []
        };

        report.totalMissing += missingKeys.length;

        // Print summary for this language
        if (missingKeys.length > 0) {
            console.log(`⚠️  ${lang.toUpperCase()}: ${missingKeys.length} missing keys`);
            console.log(`   ${missingKeys.slice(0, 5).join(', ')}${missingKeys.length > 5 ? '...' : ''}`);
        } else {
            console.log(`✅ ${lang.toUpperCase()}: All keys present`);
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Total missing keys: ${report.totalMissing}`);
    console.log(`\n✨ Sync complete! Files updated with placeholder values for missing keys.`);
    console.log(`   Remember to translate "__TODO_TRANSLATE__" entries in each language file.`);
}

main();
