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

    // Set viewport to Letter content width (8.5" minus 0.5" margins at 96dpi = 768px)
    // This forces the browser to lay out at PDF width before we capture
    await page.setViewport({ width: 880, height: 1056, deviceScaleFactor: 1 });

    // Load the HTML file
    await page.goto(`file:///${htmlFile.replace(/\\/g, '/')}`, {
        waitUntil: 'networkidle0'
    });

    // Apply PDF-only modifications — does not affect the HTML file
    await page.evaluate(() => {
        // Force light mode
        document.documentElement.setAttribute('data-theme', 'light');

        // Remove sprint dropdown and theme toggle from header/nav
        const sprintSelector = document.getElementById('sprint-selector');
        if (sprintSelector) sprintSelector.remove();

        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) themeToggle.remove();

        // Remove the markdown source link
        const markdownLink = document.querySelector('.markdown-link');
        if (markdownLink) markdownLink.remove();
    });

    // Inject PDF-only CSS: full-width content, no sticky nav, no transition artifacts
    await page.addStyleTag({ content: `
        * { transition: none !important; box-sizing: border-box !important; }
        html { font-size: 13px !important; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        .navigation { position: static !important; padding: 0.4rem 1rem !important; }
        .nav-links { justify-content: flex-start !important; }
        .container {
            max-width: none !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0.5rem 0 !important;
        }
        .release-section {
            width: 100% !important;
            margin-bottom: 1.25rem !important;
        }
        .release-section h2 {
            font-size: 1.5rem !important;
            margin-bottom: 0.75rem !important;
            padding-bottom: 0.3rem !important;
        }
        .features-container { width: 100% !important; display: block !important; }
        .feature-item {
            width: 100% !important;
            padding: 0.75rem !important;
            margin-bottom: 0.6rem !important;
            break-inside: avoid !important;
        }
        .feature-header { margin-bottom: 0.5rem !important; }
        .feature-title { font-size: 1.1rem !important; }
        .feature-summary {
            width: 100% !important;
            margin-top: 0.5rem !important;
            padding: 0.6rem 0.75rem !important;
        }
        .feature-summary ul {
            margin-top: 0.25rem !important;
            margin-bottom: 0 !important;
        }
        .feature-summary li { margin-bottom: 0.25rem !important; }
        .header { padding: 1.25rem 1rem !important; }
        .header-content { justify-content: center !important; }
    `});

    // Wait for theme transition to settle
    await new Promise(r => setTimeout(r, 500));

    await page.pdf({
        path: pdfFile,
        format: 'Letter',
        printBackground: true,
        margin: {
            top: '0.4in',
            right: '0.25in',
            bottom: '0.4in',
            left: '0.25in'
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
