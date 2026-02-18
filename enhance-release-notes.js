#!/usr/bin/env node
/**
 * Enhance Release Notes with Work Item Descriptions
 * Adds detailed descriptions to User Stories and Spikes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Strip HTML tags and clean up text, preserving list item structure as newline-separated bullets
function stripHtml(html) {
    if (!html) return '';

    // Convert list items to newline-prefixed bullets before stripping other tags
    let text = html
        .replace(/<li[^>]*>/gi, '\n')
        .replace(/<\/li>/gi, '');

    // Remove remaining HTML tags
    text = text.replace(/<[^>]+>/g, ' ');

    // Decode HTML entities
    text = text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

    // Clean up each line individually, then rejoin
    const lines = text.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean);

    return lines.join('\n');
}

// Extract meaningful summary from description
function extractSummary(html) {
    if (!html) return '';

    const text = stripHtml(html);

    // Try to find user story format
    const userStoryMatch = text.match(/As a (.+?),?\s*(?:when|I want to|I need to)\s*(.+?)(?:\.|$)/i);
    if (userStoryMatch) {
        return `As a ${userStoryMatch[1]}, ${userStoryMatch[2].trim()}.`;
    }

    // Try to find acceptance criteria
    const acMatch = text.match(/(?:Acceptance Criteria|AC1?)[:\s]+(.+?)(?:AC2|Given|When|Then|$)/i);
    if (acMatch) {
        const criteria = acMatch[1].trim();
        if (criteria.length > 20 && criteria.length < 300) {
            return criteria;
        }
    }

    // Try to find first meaningful sentence
    const sentences = text.split(/\.\s+/);
    for (const sentence of sentences) {
        const trimmed = sentence.trim();
        if (trimmed.length > 30 && trimmed.length < 300 && !trimmed.startsWith('http')) {
            return trimmed + '.';
        }
    }

    // Return first 200 characters
    return text.substring(0, 200).trim() + (text.length > 200 ? '...' : '');
}

// Get work item details
function getWorkItemDetails(workItemId) {
    try {
        const cmd = `az boards work-item show --id ${workItemId} --output json`;
        const result = execSync(cmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
        const workItem = JSON.parse(result);

        return {
            id: workItem.id,
            title: workItem.fields['System.Title'],
            type: workItem.fields['System.WorkItemType'],
            state: workItem.fields['System.State'],
            description: workItem.fields['System.Description'] || '',
            acceptanceCriteria: workItem.fields['Microsoft.VSTS.Common.AcceptanceCriteria'] || '',
            releaseNote: workItem.fields['Custom.ReleaseNote'] || ''
        };
    } catch (error) {
        console.error(`Error fetching work item ${workItemId}:`, error.message);
        return null;
    }
}

// Get all work items from iteration
function getIterationWorkItems(iterationPath) {
    try {
        const wiql = `SELECT [System.Id], [System.Title], [System.WorkItemType], [System.State] FROM WorkItems WHERE [System.IterationPath] = '${iterationPath}' AND [System.State] IN ('Closed', 'Done', 'Resolved', 'Pending Deployment') ORDER BY [System.WorkItemType], [System.Id]`;

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

// Main function
function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log('Usage: node enhance-release-notes.js <iteration-path>');
        console.log('Example: node enhance-release-notes.js "Consumer Experience\\\\CX (01) 2026.01.07"');
        process.exit(1);
    }

    const iterationPath = args[0];
    console.log(`\n📊 Fetching work items from: ${iterationPath}\n`);

    // Get all work items
    const workItems = getIterationWorkItems(iterationPath);
    console.log(`Found ${workItems.length} completed work items\n`);

    // Filter User Stories and Spikes only
    const itemsToEnhance = workItems.filter(wi =>
        wi.type === 'User Story' || wi.type === 'Spike'
    );

    console.log(`Enhancing ${itemsToEnhance.length} User Stories, Spikes, and Bugs...\n`);

    const enhancedItems = [];

    for (const item of itemsToEnhance) {
        process.stdout.write(`  Fetching #${item.id} - ${item.title.substring(0, 50)}... `);

        const details = getWorkItemDetails(item.id);
        if (details) {
            // Prefer Custom.ReleaseNote if available, otherwise extract from description
            const summary = details.releaseNote
                ? stripHtml(details.releaseNote)
                : extractSummary(details.description);

            enhancedItems.push({
                ...item,
                summary: summary || 'No description available',
                fullDescription: details.description,
                releaseNote: details.releaseNote
            });

            console.log('✓');
        } else {
            console.log('✗');
        }
    }

    // Save to JSON file
    const outputFile = path.join(__dirname, 'enhanced-work-items.json');
    fs.writeFileSync(outputFile, JSON.stringify(enhancedItems, null, 2));

    console.log(`\n✓ Enhanced work items saved to: ${outputFile}`);
    console.log(`\nSummary:`);
    console.log(`  Total items: ${workItems.length}`);
    console.log(`  Enhanced: ${enhancedItems.length}`);
    console.log(`  User Stories: ${enhancedItems.filter(i => i.type === 'User Story').length}`);
    console.log(`  Spikes: ${enhancedItems.filter(i => i.type === 'Spike').length}`);
}

main();
