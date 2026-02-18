#!/usr/bin/env node
/**
 * Release Notes HTML Generator
 * Converts markdown release notes to polished HTML for stakeholder distribution
 */

const fs = require('fs');
const path = require('path');

function parseMarkdown(mdContent) {
    const sections = [];
    let currentSection = null;
    let currentItem = null;

    // Handle different line endings
    const lines = mdContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

    for (const line of lines) {
        // Section headers (## Section Name)
        if (line.startsWith('## ')) {
            // Close out current item and section first
            if (currentItem && currentSection) {
                currentSection.items.push(currentItem);
                currentItem = null;
            }
            if (currentSection) {
                sections.push(currentSection);
                currentSection = null;
            }

            // Skip non-content sections — reset to null so their ### children are ignored
            if (line.startsWith('## Sprint Summary') || line.startsWith('## CX Team')) {
                // intentionally left empty — currentSection stays null
            } else {
                const sectionMatch = line.match(/^## (.+?)(?:\s*\((\d+)\s*items?\))?$/);
                if (sectionMatch) {
                    currentSection = {
                        name: sectionMatch[1],
                        count: sectionMatch[2] || '0',
                        items: [],
                        anchor: sectionMatch[1].toLowerCase().replace(/\s+/g, '-')
                    };
                }
            }
        }
        // Feature items (### with emoji and status)
        else if (line.startsWith('### ') && currentSection) {
            if (currentItem) {
                currentSection.items.push(currentItem);
            }

            // More flexible pattern - match any emoji and status
            const featureMatch = line.match(/^### (.+?) (\w+):\s*(.+)$/);
            if (featureMatch) {
                const emoji = featureMatch[1].trim();
                const status = featureMatch[2];
                const title = featureMatch[3];

                // Map status text to class
                const statusClassMap = {
                    'NEW': 'new',
                    'ENHANCED': 'enhanced',
                    'FIX': 'fix',
                    'PERFORMANCE': 'performance',
                    'TECH': 'technical',
                    'SPIKE': 'spike',
                    'DEPRECATED': 'deprecated',
                    'REMOVED': 'deprecated'
                };

                currentItem = {
                    emoji,
                    status,
                    statusClass: statusClassMap[status] || 'new',
                    title,
                    ticket: '',
                    ticketUrl: '',
                    type: '',
                    details: [],
                    screenshots: [],
                    inDetails: false,
                    inScreenshots: false
                };
            }
        }
        // Ticket links
        else if (line.startsWith('**Ticket:**') && currentItem) {
            const ticketMatch = line.match(/\[#(\d+)\]\((.*?)\)/);
            if (ticketMatch) {
                currentItem.ticket = ticketMatch[1];
                currentItem.ticketUrl = ticketMatch[2];
            }
        }
        // Type
        else if (line.startsWith('**Type:**') && currentItem) {
            currentItem.type = line.replace('**Type:**', '').trim();
        }
        // Summary section
        else if (line.startsWith('**Summary:**') && currentItem) {
            currentItem.inSummary = true;
            currentItem.inDetails = false;
            currentItem.inScreenshots = false;
        }
        // Details section
        else if (line.startsWith('**Details:**') && currentItem) {
            currentItem.inDetails = true;
            currentItem.inSummary = false;
            currentItem.inScreenshots = false;
        }
        // Screenshots
        else if (line.startsWith('**Screenshots:**') && currentItem) {
            currentItem.inScreenshots = true;
            currentItem.inDetails = false;
            currentItem.inSummary = false;
        }
        // Collect summary
        else if (currentItem && currentItem.inSummary) {
            if (line.trim() && !line.startsWith('**')) {
                if (!currentItem.summary) {
                    currentItem.summary = [];
                }
                currentItem.summary.push(line.trim());
            }
        }
        // Collect details
        else if (currentItem && currentItem.inDetails) {
            if (line.trim() && !line.startsWith('**')) {
                currentItem.details.push(line.trim());
            }
        }
        // Collect screenshots
        else if (currentItem && currentItem.inScreenshots) {
            if (line.trim().startsWith('- `screenshots/')) {
                const screenshot = line.trim().replace(/^- `/, '').replace(/`$/, '');
                currentItem.screenshots.push(screenshot);
            }
        }
    }

    // Add last item and section
    if (currentItem && currentSection) {
        currentSection.items.push(currentItem);
    }
    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}

function generateHTML(sections, sprintName, sprintDates, allSprints, currentSprintFolder) {
    // Build navigation
    const navItems = sections
        .map(section =>
            `<a href="#${section.anchor}" class="nav-link">${section.name} (${section.count})</a>`
        )
        .join('\n');

    // Build sprint dropdown options
    const sprintOptions = allSprints
        .map(sprint => {
            const selected = sprint.folder === currentSprintFolder ? 'selected' : '';
            return `<option value="${sprint.folder}" ${selected}>${sprint.name}</option>`;
        })
        .join('\n');

    // Build sections
    const sectionsHtml = sections.map(section => {
        const itemsHtml = section.items.map(item => {
            // Build summary
            let summaryHtml = '';
            if (item.summary && item.summary.length > 0) {
                const summaryList = item.summary
                    .map(s => `<li>${s.replace(/^-\s*/, '')}</li>`)
                    .join('');
                summaryHtml = `
                <div class="feature-summary">
                    <strong>Summary:</strong>
                    <ul>${summaryList}</ul>
                </div>
                `;
            }

            // Build details
            let detailsHtml = '';
            if (item.details && item.details.length > 0) {
                const detailsList = item.details
                    .filter(d => d.startsWith('-'))
                    .map(d => `<li>${d.substring(2)}</li>`)
                    .join('');

                const detailsText = item.details
                    .filter(d => !d.startsWith('-'))
                    .join(' ');

                if (detailsList) {
                    detailsHtml = `
                    <div class="feature-details">
                        <p>${detailsText}</p>
                        <ul>${detailsList}</ul>
                    </div>
                    `;
                } else if (detailsText) {
                    detailsHtml = `<div class="feature-details"><p>${detailsText}</p></div>`;
                }
            }

            // Build screenshots
            let screenshotsHtml = '';
            if (item.screenshots.length > 0) {
                const screenshotItems = item.screenshots
                    .map(screenshot => `
                    <div class="screenshot-item">
                        <img src="${screenshot}" alt="${item.title}" onclick="enlargeImage(this)" onerror="this.parentElement.style.display='none'">
                        <p class="screenshot-caption">Click to enlarge</p>
                    </div>
                    `)
                    .join('');
                screenshotsHtml = `<div class="screenshots-grid">${screenshotItems}</div>`;
            }

            // Build ticket link
            const ticketHtml = item.ticket
                ? `<a href="${item.ticketUrl}" class="ticket-link" target="_blank">#${item.ticket}</a>`
                : '';

            return `
            <div class="feature-item">
                <div class="feature-header">
                    <span class="status-badge status-${item.statusClass}">${item.emoji} ${item.status}</span>
                    <h3 class="feature-title">${item.title}</h3>
                    ${ticketHtml}
                </div>
                ${summaryHtml}
                ${detailsHtml}
                ${screenshotsHtml}
            </div>
            `;
        }).join('\n');

        return `
        <section id="${section.anchor}" class="release-section">
            <h2 class="section-header">${section.name} <span class="count">(${section.count} items)</span></h2>
            <div class="features-container">
                ${itemsHtml}
            </div>
        </section>
        `;
    }).join('\n');

    // Complete HTML template
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CX Sprint ${sprintName} Release Notes</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            /* Dark Mode (Default) */
            --bg-primary: #0d0d0d;
            --bg-secondary: #1a1a1a;
            --bg-tertiary: #2a2a2a;
            --text-primary: #e0e0e0;
            --text-secondary: #b0b0b0;
            --text-muted: #666;
            --accent-primary: #0078FF;
            --border-color: #2a2a2a;
            --shadow-color: rgba(0,0,0,0.3);
            --hover-glow: rgba(0,120,255,0.2);

            /* Status badge colors - Dark */
            --status-new-bg: rgba(0, 120, 255, 0.15);
            --status-new-text: #4da3ff;
            --status-new-border: rgba(0, 120, 255, 0.3);

            --status-enhanced-bg: rgba(0, 200, 255, 0.15);
            --status-enhanced-text: #5dbbff;
            --status-enhanced-border: rgba(0, 200, 255, 0.3);

            --status-fix-bg: rgba(255, 100, 100, 0.15);
            --status-fix-text: #ff8080;
            --status-fix-border: rgba(255, 100, 100, 0.3);

            --status-performance-bg: rgba(255, 200, 0, 0.15);
            --status-performance-text: #ffcc66;
            --status-performance-border: rgba(255, 200, 0, 0.3);

            --status-technical-bg: rgba(150, 150, 150, 0.15);
            --status-technical-text: #b0b0b0;
            --status-technical-border: rgba(150, 150, 150, 0.3);

            --status-spike-bg: rgba(100, 200, 255, 0.15);
            --status-spike-text: #80d4ff;
            --status-spike-border: rgba(100, 200, 255, 0.3);

            --status-deprecated-bg: rgba(255, 150, 150, 0.15);
            --status-deprecated-text: #ff9999;
            --status-deprecated-border: rgba(255, 150, 150, 0.3);
        }

        [data-theme="light"] {
            /* Light Mode */
            --bg-primary: #f5f5f5;
            --bg-secondary: #ffffff;
            --bg-tertiary: #f0f0f0;
            --text-primary: #333;
            --text-secondary: #666;
            --text-muted: #999;
            --accent-primary: #0078FF;
            --border-color: #e0e0e0;
            --shadow-color: rgba(0,0,0,0.08);
            --hover-glow: rgba(0,120,255,0.12);

            /* Status badge colors - Light */
            --status-new-bg: #d4edda;
            --status-new-text: #155724;
            --status-new-border: #c3e6cb;

            --status-enhanced-bg: #cce5ff;
            --status-enhanced-text: #004085;
            --status-enhanced-border: #b8daff;

            --status-fix-bg: #f8d7da;
            --status-fix-text: #721c24;
            --status-fix-border: #f5c6cb;

            --status-performance-bg: #fff3cd;
            --status-performance-text: #856404;
            --status-performance-border: #ffeaa7;

            --status-technical-bg: #e2e3e5;
            --status-technical-text: #383d41;
            --status-technical-border: #d6d8db;

            --status-spike-bg: #d1ecf1;
            --status-spike-text: #0c5460;
            --status-spike-border: #bee5eb;

            --status-deprecated-bg: #f5c6cb;
            --status-deprecated-text: #721c24;
            --status-deprecated-border: #f1aeb5;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--bg-primary);
            transition: background 0.3s ease, color 0.3s ease;
        }

        .header {
            background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
            color: var(--text-primary);
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 2px 10px var(--shadow-color);
            border-bottom: 1px solid var(--border-color);
            transition: background 0.3s ease;
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .header h1 {
            font-size: 2.5rem;
            margin: 0;
        }

        .sprint-dropdown {
            font-size: 1rem;
            padding: 0.4rem 2rem 0.4rem 0.8rem;
            background: var(--bg-tertiary);
            color: var(--accent-primary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 500;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230078FF' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.5rem center;
            background-size: 12px;
        }

        .sprint-dropdown:hover {
            background-color: var(--hover-glow);
            border-color: var(--accent-primary);
        }

        .sprint-dropdown:focus {
            outline: none;
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 3px var(--hover-glow);
        }

        .header .sprint-dates {
            font-size: 1rem;
            opacity: 0.9;
            margin-top: 1rem;
        }

        .markdown-link {
            color: var(--accent-primary);
            text-decoration: none;
            padding: 0.5rem 1rem;
            background: var(--bg-tertiary);
            border-radius: 6px;
            border: 1px solid var(--border-color);
            transition: all 0.3s;
            display: inline-block;
        }

        .markdown-link:hover {
            background: var(--accent-primary);
            color: white;
            border-color: var(--accent-primary);
            transform: translateY(-2px);
        }

        .navigation {
            background: var(--bg-secondary);
            padding: 1rem 2rem;
            box-shadow: 0 2px 5px var(--shadow-color);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            gap: 1rem;
            overflow-x: auto;
            align-items: center;
            transition: background 0.3s ease;
        }

        .nav-links {
            display: flex;
            gap: 1rem;
            flex: 1;
            overflow-x: auto;
            justify-content: center;
        }

        .nav-link {
            padding: 0.5rem 1rem;
            background: var(--bg-tertiary);
            border-radius: 8px;
            text-decoration: none;
            color: var(--text-secondary);
            white-space: nowrap;
            transition: all 0.3s;
            border: 1px solid var(--border-color);
            font-weight: bold;
        }

        .nav-link:hover {
            background: var(--accent-primary);
            color: white;
            border-color: var(--accent-primary);
        }

        .theme-toggle {
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 0.5rem 1rem;
            cursor: pointer;
            color: var(--text-secondary);
            font-size: 0.9rem;
            transition: all 0.3s;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .theme-toggle:hover {
            background: var(--accent-primary);
            color: white;
            border-color: var(--accent-primary);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .release-section {
            margin-bottom: 3rem;
        }

        .section-header {
            font-size: 2rem;
            color: var(--accent-primary);
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--accent-primary);
        }

        .section-header .count {
            font-size: 1.2rem;
            color: var(--text-muted);
            font-weight: normal;
        }

        .features-container {
            display: grid;
            gap: 1.5rem;
        }

        .feature-item {
            background: var(--bg-secondary);
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px var(--shadow-color);
            border: 1px solid var(--border-color);
            transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, background 0.3s;
        }

        .feature-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px var(--hover-glow);
            border-color: var(--accent-primary);
        }

        .feature-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .status-badge {
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .status-new {
            background: var(--status-new-bg);
            color: var(--status-new-text);
            border: 1px solid var(--status-new-border);
        }

        .status-enhanced {
            background: var(--status-enhanced-bg);
            color: var(--status-enhanced-text);
            border: 1px solid var(--status-enhanced-border);
        }

        .status-fix {
            background: var(--status-fix-bg);
            color: var(--status-fix-text);
            border: 1px solid var(--status-fix-border);
        }

        .status-performance {
            background: var(--status-performance-bg);
            color: var(--status-performance-text);
            border: 1px solid var(--status-performance-border);
        }

        .status-technical {
            background: var(--status-technical-bg);
            color: var(--status-technical-text);
            border: 1px solid var(--status-technical-border);
        }

        .status-spike {
            background: var(--status-spike-bg);
            color: var(--status-spike-text);
            border: 1px solid var(--status-spike-border);
        }

        .status-deprecated {
            background: var(--status-deprecated-bg);
            color: var(--status-deprecated-text);
            border: 1px solid var(--status-deprecated-border);
        }

        .feature-title {
            flex: 1;
            font-size: 1.3rem;
            color: var(--text-primary);
        }

        .ticket-link {
            color: var(--accent-primary);
            text-decoration: none;
            font-weight: 600;
            padding: 0.3rem 0.6rem;
            background: var(--bg-tertiary);
            border-radius: 4px;
            font-size: 0.9rem;
            border: 1px solid var(--border-color);
            transition: all 0.3s;
        }

        .ticket-link:hover {
            background: var(--accent-primary);
            color: white;
            border-color: var(--accent-primary);
        }

        .feature-summary {
            margin-top: 1rem;
            color: var(--text-primary);
            line-height: 1.8;
            background: var(--bg-tertiary);
            padding: 1rem;
            border-radius: 8px;
            border-left: 3px solid var(--accent-primary);
        }

        .feature-summary strong {
            color: var(--accent-primary);
            display: block;
            margin-bottom: 0.5rem;
        }

        .feature-summary ul {
            margin-left: 1.5rem;
            margin-top: 0.5rem;
        }

        .feature-summary li {
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }

        .feature-details {
            margin-top: 1rem;
            color: var(--text-secondary);
            line-height: 1.8;
        }

        .feature-details ul {
            margin-left: 1.5rem;
            margin-top: 0.5rem;
        }

        .feature-details li {
            margin-bottom: 0.3rem;
        }

        .screenshots-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .screenshot-item {
            text-align: center;
        }

        .screenshot-item img {
            width: 100%;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            cursor: pointer;
            transition: transform 0.3s, border-color 0.3s;
        }

        .screenshot-item img:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 12px var(--hover-glow);
            border-color: var(--accent-primary);
        }

        .screenshot-caption {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 0.5rem;
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            max-width: 90%;
            max-height: 90%;
        }

        .close-modal {
            position: absolute;
            top: 20px;
            right: 40px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }

        footer {
            background: var(--bg-secondary);
            color: var(--text-muted);
            text-align: center;
            padding: 2rem;
            margin-top: 3rem;
            border-top: 1px solid var(--border-color);
            transition: background 0.3s ease;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8rem;
            }

            .navigation {
                padding: 0.5rem 1rem;
            }

            .container {
                padding: 1rem;
            }

            .feature-header {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <h1>CX Sprint ${sprintName}</h1>
            <select id="sprint-selector" class="sprint-dropdown" onchange="switchSprint(this.value)" aria-label="Switch to different sprint">
                ${sprintOptions}
            </select>
        </div>
        <p class="sprint-dates">
            <a href="release-notes.md" class="markdown-link" download>📄 View Markdown Source</a>
        </p>
    </div>

    <nav class="navigation">
        <div class="nav-links">
            ${navItems}
        </div>
        <button class="theme-toggle" onclick="toggleTheme()">
            <span id="theme-icon">🌙</span>
            <span id="theme-text">Light</span>
        </button>
    </nav>

    <div class="container">
        ${sectionsHtml}
    </div>

    <footer>
        <p>&copy; 2026 Consumer Experience Team | Generated from Azure DevOps</p>
    </footer>

    <div id="imageModal" class="modal" onclick="closeModal()">
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>

    <script>
        // Sprint switching functionality
        function switchSprint(sprintFolder) {
            // Navigate to the selected sprint's HTML file
            window.location.href = '../' + sprintFolder + '/release-notes.html';
        }

        // Theme toggle functionality
        function toggleTheme() {
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            const themeText = document.getElementById('theme-text');

            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update button text and icon
            if (newTheme === 'light') {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Dark';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Light';
            }
        }

        // Load saved theme on page load
        (function() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            const themeText = document.getElementById('theme-text');

            html.setAttribute('data-theme', savedTheme);

            if (savedTheme === 'light') {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Dark';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Light';
            }
        })();

        function enlargeImage(img) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modal.style.display = 'flex';
            modalImg.src = img.src;
        }

        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    </script>
</body>
</html>`;
}

function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log('Usage: node generate-html.js <markdown-file>');
        process.exit(1);
    }

    const mdFile = path.resolve(args[0]);

    if (!fs.existsSync(mdFile)) {
        console.error(`Error: ${mdFile} not found`);
        process.exit(1);
    }

    // Read markdown
    const mdContent = fs.readFileSync(mdFile, 'utf-8');

    // Extract sprint info
    const sprintMatch = mdContent.match(/# CX Sprint (.+?) Release Notes/);
    const sprintName = sprintMatch ? sprintMatch[1] : 'Unknown';

    const datesMatch = mdContent.match(/\*\*Sprint Dates:\*\* (.+?)$/m);
    const sprintDates = datesMatch ? datesMatch[1] : 'TBD';

    // Get all sprint folders (CX-*)
    const releaseNotesDir = path.dirname(path.dirname(mdFile));
    const currentSprintFolder = path.basename(path.dirname(mdFile));

    const allSprints = fs.readdirSync(releaseNotesDir)
        .filter(item => {
            const fullPath = path.join(releaseNotesDir, item);
            return fs.statSync(fullPath).isDirectory() && item.startsWith('CX-');
        })
        .map(folder => {
            // Extract date from folder name (CX-YYYY.MM.DD)
            const dateMatch = folder.match(/CX-(\d{4})\.(\d{2})\.(\d{2})/);
            return {
                folder: folder,
                name: folder.replace('CX-', ''),
                sortDate: dateMatch ? new Date(dateMatch[1], parseInt(dateMatch[2]) - 1, dateMatch[3]) : new Date(0)
            };
        })
        .sort((a, b) => a.sortDate - b.sortDate); // Oldest to newest

    // Parse and generate
    const sections = parseMarkdown(mdContent);
    const html = generateHTML(sections, sprintName, sprintDates, allSprints, currentSprintFolder);

    // Write output
    const outputFile = path.join(path.dirname(mdFile), 'release-notes.html');
    fs.writeFileSync(outputFile, html, 'utf-8');

    console.log(`✓ Generated: ${outputFile}`);
    console.log(`  Sprint: ${sprintName}`);
    console.log(`  Sections: ${sections.length}`);
    console.log(`  Total items: ${sections.reduce((sum, s) => sum + s.items.length, 0)}`);
}

main();
