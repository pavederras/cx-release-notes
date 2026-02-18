#!/usr/bin/env node
/**
 * Create Enhanced Release Notes from Azure DevOps data
 * Includes detailed descriptions for User Stories and Spikes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load enhanced work items
function loadEnhancedWorkItems() {
    const filePath = path.join(__dirname, 'enhanced-work-items.json');
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return [];
}

// Get all work items from iteration
function getIterationWorkItems(iterationPath) {
    try {
        const wiql = `SELECT [System.Id], [System.Title], [System.WorkItemType], [System.State] FROM WorkItems WHERE [System.IterationPath] = '${iterationPath}' AND [System.State] IN ('Closed', 'Done', 'Resolved', 'Pending Deployment', 'Code Review') ORDER BY [System.WorkItemType], [System.Id]`;

        const cmd = `az boards query --wiql "${wiql}" --output json`;
        const result = execSync(cmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
        const workItems = JSON.parse(result);

        return workItems.map(wi => ({
            id: wi.id,
            title: wi.fields['System.Title'],
            type: wi.fields['System.WorkItemType'],
            state: wi.fields['System.State']
        }));
    } catch (error) {
        console.error('Error querying work items:', error.message);
        return [];
    }
}

// Get sort order for work item type (User Story first, Spike second)
function getTypeSortOrder(type) {
    if (type === 'User Story') return 1;
    if (type === 'Spike') return 2;
    return 3; // anything else sorts last (shouldn't appear)
}

const PARTNER = '__PARTNER__';

// Resolve area category from a work item title.
// Returns PARTNER constant for partner items, null for unrecognized, or a category string.
function resolveCategory(title) {
    const titleParts = title.split('|');
    const fullTitle = title.toLowerCase();

    if (titleParts.length > 1) {
        const areaPath = titleParts[0].trim().toLowerCase();
        if (areaPath.includes('partner')) return PARTNER;
        if (areaPath.includes('home portal')) return 'Home Portal';
        if (areaPath.includes('smartapp') || areaPath.includes('smart app')) return 'SmartApp';
        if (areaPath.includes('servicing')) return 'Servicing';
        if (areaPath.includes('admin portal')) return 'Admin Portal';
        if (areaPath.includes('tech debt') || areaPath === 'spike') return 'Tech Enhancements';
        if (areaPath.includes('sitewide')) return 'Sitewide';
    }

    if (fullTitle.includes('partner')) return PARTNER;
    if (fullTitle.includes('home portal')) return 'Home Portal';
    if (fullTitle.includes('smartapp') || fullTitle.includes('smart app')) return 'SmartApp';
    if (fullTitle.includes('servicing')) return 'Servicing';
    if (fullTitle.includes('admin portal')) return 'Admin Portal';
    if (fullTitle.includes('tech debt')) return 'Tech Debt';

    return null; // unrecognized area — ok for bugs, skip for stories/spikes
}

// Categorize work items — only User Stories and Spikes, by area path.
// Tasks, Bugs, Defects, and partner items are excluded entirely.
function categorizeWorkItems(workItems, enhancedItems) {
    const categories = {};
    const enhancedMap = new Map(enhancedItems.map(item => [item.id, item]));

    for (const item of workItems) {
        const type = item.type;

        // Only include User Stories and Spikes
        if (type !== 'User Story' && type !== 'Spike') continue;

        const category = resolveCategory(item.title);

        // Skip partner items and anything without a recognized area path
        if (!category || category === PARTNER) continue;

        const enhanced = enhancedMap.get(item.id);
        if (!categories[category]) categories[category] = [];
        categories[category].push({
            ...item,
            summary: enhanced?.summary || null,
            sortOrder: getTypeSortOrder(type)
        });
    }

    // Sort each section: User Story first, then Spike, then by ID
    for (const category in categories) {
        categories[category].sort((a, b) =>
            a.sortOrder !== b.sortOrder ? a.sortOrder - b.sortOrder : a.id - b.id
        );
    }

    return categories;
}

// Determine status emoji and label
function getStatus(type, title) {
    const titleLower = title.toLowerCase();

    if (type === 'Bug' || type === 'Defect') {
        return { emoji: '🐛', label: 'FIX' };
    }

    if (type === 'Spike') {
        return { emoji: '🔍', label: 'SPIKE' };
    }

    if (titleLower.includes('tech debt') || titleLower.includes('upgrade')) {
        return { emoji: '🔧', label: 'TECH' };
    }

    if (titleLower.includes('remove') || titleLower.includes('deprecate')) {
        return { emoji: '🗑️', label: 'REMOVED' };
    }

    if (titleLower.includes('enhance') || titleLower.includes('update') || titleLower.includes('improve')) {
        return { emoji: '✨', label: 'ENHANCED' };
    }

    return { emoji: '🆕', label: 'NEW' };
}

// Clean title — strip area path prefix (everything before and including the first "|")
function cleanTitle(title) {
    return title.replace(/^[^|]+\|\s*/, '').trim();
}

// Generate markdown for a User Story or Spike (full card with summary + screenshots)
function generateItemMarkdown(item) {
    const status = getStatus(item.type, item.title);
    const cleanedTitle = cleanTitle(item.title);
    const ticketUrl = `https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/${item.id}`;

    let md = `### ${status.emoji} ${status.label}: ${cleanedTitle}\n`;
    md += `**Ticket:** [#${item.id}](${ticketUrl})\n`;
    md += `**Type:** ${item.type}\n\n`;

    if (item.summary) {
        const lines = item.summary.split('\n').map(l => l.trim()).filter(Boolean);
        md += `**Summary:**\n`;
        for (const line of lines) {
            md += `- ${line}\n`;
        }
        md += '\n';
    }

    md += `**Screenshots:**\n`;
    md += `- \`screenshots/${item.id}_1.png\`\n\n`;

    md += `---\n\n`;

    return md;
}


// Generate full markdown
function generateMarkdown(sprintName, sprintDates, categories) {
    let md = `# CX Sprint ${sprintName} Release Notes\n\n`;
    md += `**Sprint Dates:** ${sprintDates}\n`;
    md += `**Release Date:** TBD\n\n`;
    md += `---\n\n`;

    const sectionOrder = ['Home Portal', 'SmartApp', 'Servicing', 'Admin Portal', 'Sitewide', 'Tech Enhancements'];

    for (const category of sectionOrder) {
        if (categories[category] && categories[category].length > 0) {
            const items = categories[category];
            md += `## ${category} (${items.length} items)\n\n`;
            for (const item of items) {
                md += generateItemMarkdown(item);
            }
        }
    }

    md += `---\n\n`;

    md += `## CX Team\n\n`;
    md += `### Product\n- TBD\n\n`;
    md += `### Development\n- TBD\n\n`;
    md += `### QA\n- TBD\n\n`;
    md += `### Experience Design\n- TBD\n\n`;
    md += `---\n\n`;
    md += `**Generated:** ${new Date().toISOString().split('T')[0]}\n`;
    md += `**Source:** Azure DevOps - Consumer Experience Project\n`;

    return md;
}

// Main function
function main() {
    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.log('Usage: node create-enhanced-release-notes.js <iteration-path> <sprint-name> <sprint-dates> <output-folder>');
        console.log('Example: node create-enhanced-release-notes.js "Consumer Experience\\\\CX (01) 2026.01.07" "2026.01.07" "December 11, 2025 - January 7, 2026" "CX-2026.01.07"');
        process.exit(1);
    }

    const iterationPath = args[0];
    const sprintName = args[1];
    const sprintDates = args[2];
    const outputFolder = args[3] || `CX-${sprintName}`;

    console.log(`\n📝 Creating enhanced release notes for: ${sprintName}\n`);

    // Load enhanced work items
    const enhancedItems = loadEnhancedWorkItems();
    console.log(`Loaded ${enhancedItems.length} enhanced items with descriptions`);

    // Get all work items
    const workItems = getIterationWorkItems(iterationPath);
    console.log(`Found ${workItems.length} total completed work items`);

    // Categorize
    const categories = categorizeWorkItems(workItems, enhancedItems);

    // Generate markdown
    const markdown = generateMarkdown(sprintName, sprintDates, categories);

    // Write to file
    const outputPath = path.join(__dirname, outputFolder, 'release-notes.md');
    fs.writeFileSync(outputPath, markdown, 'utf-8');

    console.log(`\n✓ Enhanced release notes created: ${outputPath}\n`);

    // Show summary
    console.log('Summary by category:');
    for (const [category, items] of Object.entries(categories)) {
        const withDescriptions = items.filter(i => i.summary).length;
        console.log(`  ${category}: ${items.length} items (${withDescriptions} with descriptions)`);
    }
}

main();
