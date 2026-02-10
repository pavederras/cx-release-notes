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
        const wiql = `SELECT [System.Id], [System.Title], [System.WorkItemType], [System.State] FROM WorkItems WHERE [System.IterationPath] = '${iterationPath}' AND [System.State] IN ('Closed', 'Done', 'Resolved') ORDER BY [System.WorkItemType], [System.Id]`;

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

// Get sort order for work item type
function getTypeSortOrder(type) {
    // Sort by actual work item type only, not by title keywords
    if (type === 'User Story') return 1;
    if (type === 'Spike') return 2;
    if (type === 'Bug' || type === 'Defect') return 3;
    if (type === 'Task') return 4;
    return 5;
}

// Categorize work items
function categorizeWorkItems(workItems, enhancedItems) {
    const categories = {};
    const enhancedMap = new Map(enhancedItems.map(item => [item.id, item]));

    for (const item of workItems) {
        // Extract area path from title (everything before the first "|")
        let category = null;
        const titleParts = item.title.split('|');
        const fullTitle = item.title.toLowerCase();

        // First try to get area path from title structure
        if (titleParts.length > 1) {
            const areaPath = titleParts[0].trim().toLowerCase();

            // Skip partner-related items entirely
            if (areaPath.includes('partner')) {
                continue;
            }

            // Normalize area path names
            if (areaPath.includes('home portal')) {
                category = 'Home Portal';
            } else if (areaPath.includes('smartapp') || areaPath.includes('smart app')) {
                category = 'SmartApp';
            } else if (areaPath.includes('servicing')) {
                category = 'Servicing';
            } else if (areaPath.includes('admin portal')) {
                category = 'Admin Portal';
            } else if (areaPath.includes('tech debt')) {
                category = 'Tech Debt';
            }
        }

        // If no category yet, infer from title keywords
        if (!category) {
            // Skip partner items
            if (fullTitle.includes('partner')) {
                continue;
            }

            if (fullTitle.includes('home portal')) {
                category = 'Home Portal';
            } else if (fullTitle.includes('smartapp') || fullTitle.includes('smart app')) {
                category = 'SmartApp';
            } else if (fullTitle.includes('servicing')) {
                category = 'Servicing';
            } else if (fullTitle.includes('admin portal')) {
                category = 'Admin Portal';
            } else if (fullTitle.includes('tech debt')) {
                category = 'Tech Debt';
            } else {
                // Skip items that don't match any category
                continue;
            }
        }

        if (!categories[category]) {
            categories[category] = [];
        }

        // Add enhanced description if available
        const enhanced = enhancedMap.get(item.id);
        categories[category].push({
            ...item,
            summary: enhanced?.summary || null,
            sortOrder: getTypeSortOrder(item.type)
        });
    }

    // Sort each category by type order
    for (const category in categories) {
        categories[category].sort((a, b) => {
            if (a.sortOrder !== b.sortOrder) {
                return a.sortOrder - b.sortOrder;
            }
            return a.id - b.id; // Secondary sort by ID
        });
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

    if (type === 'Task') {
        return { emoji: '✅', label: 'TASK' };
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

// Clean title
function cleanTitle(title) {
    // Remove category prefix
    return title
        .replace(/^(SmartApp|Smartapp|Home Portal|Servicing|Partner Co-Branding MVP|Partner Portal|Tech Debt)\s*\|\s*/i, '')
        .trim();
}

// Generate markdown for an item
function generateItemMarkdown(item) {
    const status = getStatus(item.type, item.title);
    const cleanedTitle = cleanTitle(item.title);
    const ticketUrl = `https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/${item.id}`;

    let md = `### ${status.emoji} ${status.label}: ${cleanedTitle}\n`;
    md += `**Ticket:** [#${item.id}](${ticketUrl})\n`;
    md += `**Type:** ${item.type}\n\n`;

    // Add summary for User Stories and Spikes
    if (item.summary && (item.type === 'User Story' || item.type === 'Spike')) {
        // Format as bulleted summary for better scanning
        const summaryText = item.summary.trim();

        // If it starts with "As a", format it nicely
        if (summaryText.startsWith('As a')) {
            md += `**Summary:**\n- ${summaryText}\n\n`;
        } else {
            // Otherwise just add as bullet
            md += `**Summary:**\n- ${summaryText}\n\n`;
        }
    }

    // Add screenshots placeholder for non-Tasks
    if (item.type !== 'Task') {
        md += `**Screenshots:**\n`;
        md += `- \`screenshots/${item.id}_1.png\`\n\n`;
    }

    md += `---\n\n`;

    return md;
}

// Generate full markdown
function generateMarkdown(sprintName, sprintDates, categories, workItems) {
    let md = `# CX Sprint ${sprintName} Release Notes\n\n`;
    md += `**Sprint Dates:** ${sprintDates}\n`;
    md += `**Release Date:** TBD\n\n`;
    md += `---\n\n`;

    // Generate sections in specified order
    const sectionOrder = ['Home Portal', 'SmartApp', 'Servicing', 'Admin Portal', 'Tech Debt'];

    // Add any remaining categories not in the specified order
    for (const category in categories) {
        if (!sectionOrder.includes(category) && categories[category].length > 0) {
            sectionOrder.push(category);
        }
    }

    for (const category of sectionOrder) {
        if (categories[category] && categories[category].length > 0) {
            const items = categories[category];
            md += `## ${category} (${items.length} items)\n\n`;

            for (const item of items) {
                md += generateItemMarkdown(item);
            }
        }
    }

    // Summary
    const userStories = workItems.filter(i => i.type === 'User Story').length;
    const bugs = workItems.filter(i => i.type === 'Bug' || i.type === 'Defect').length;
    const spikes = workItems.filter(i => i.type === 'Spike').length;
    const techDebt = workItems.filter(i => i.title.toLowerCase().includes('tech debt')).length;

    md += `## Sprint Summary\n\n`;
    md += `### By Type\n`;
    md += `- 🆕 **User Stories:** ${userStories}\n`;
    md += `- 🐛 **Bugs/Defects:** ${bugs}\n`;
    md += `- 🔍 **Spikes:** ${spikes}\n`;
    md += `- 🔧 **Technical Debt:** ${techDebt}\n\n`;
    md += `### Total Completed: ${workItems.length} items\n\n`;
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
    const markdown = generateMarkdown(sprintName, sprintDates, categories, workItems);

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
