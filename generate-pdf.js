#!/usr/bin/env node
/**
 * Generate PDF from Release Notes HTML
 * Uses system Chrome via puppeteer-core — no Chromium download needed.
 *
 * Usage:
 *   node generate-pdf.js <sprint-folder>
 * Example:
 *   node generate-pdf.js CX-2026.02.18
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function generatePdf(sprintFolder) {
    const htmlFile = path.resolve(__dirname, sprintFolder, 'release-notes.html');
    const pdfFile = path.resolve(__dirname, sprintFolder, 'release-notes.pdf');

    if (!fs.existsSync(htmlFile)) {
        console.error(`Error: ${htmlFile} not found`);
        process.exit(1);
    }

    console.log(`\n📄 Generating PDF for ${sprintFolder}...`);

    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Load the HTML file
    await page.goto(`file:///${htmlFile.replace(/\\/g, '/')}`, {
        waitUntil: 'networkidle0'
    });

    // Force light mode for PDF — easier to print and distribute
    await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
    });

    // Wait a moment for theme transition
    await new Promise(r => setTimeout(r, 500));

    await page.pdf({
        path: pdfFile,
        format: 'Letter',
        printBackground: true,
        margin: {
            top: '0.75in',
            right: '0.75in',
            bottom: '0.75in',
            left: '0.75in'
        },
        displayHeaderFooter: true,
        headerTemplate: `
            <div style="font-size: 9px; color: #666; width: 100%; text-align: center; font-family: sans-serif;">
                CX Sprint Release Notes
            </div>`,
        footerTemplate: `
            <div style="font-size: 9px; color: #666; width: 100%; display: flex; justify-content: space-between; padding: 0 0.75in; font-family: sans-serif; box-sizing: border-box;">
                <span>Consumer Experience Team</span>
                <span><span class="pageNumber"></span> of <span class="totalPages"></span></span>
            </div>`
    });

    await browser.close();

    const stats = fs.statSync(pdfFile);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`✓ PDF generated: ${pdfFile}`);
    console.log(`  Size: ${sizeMB} MB`);
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Usage: node generate-pdf.js <sprint-folder>');
    console.log('Example: node generate-pdf.js CX-2026.02.18');
    process.exit(1);
}

generatePdf(args[0]).catch(err => {
    console.error('PDF generation failed:', err.message);
    process.exit(1);
});
