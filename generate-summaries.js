#!/usr/bin/env node

/**
 * Generate AI Summaries for Release Notes
 *
 * This script generates concise, user-friendly summaries for work items
 * and updates Azure DevOps Custom.ReleaseNote fields.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Strip HTML tags
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate summary guidelines based on work item type
function getSummaryGuidelines(type) {
  switch (type) {
    case 'User Story':
      return `Create a concise, user-friendly release note (3-5 sentences) that:
- Explains WHAT was added/changed in clear language
- Focuses on business value and user benefits
- Includes relevant technical context for SMEs (training, support, executives)
- Uses bullet points for key features if needed
- Mentions feature flags or configuration if relevant
Format as markdown. Start with a brief bold header, then details.`;

    case 'Bug':
      return `Create a brief release note (2-3 sentences) that:
- States what issue was fixed
- Explains the impact on users
- Keep technical but clear
Format as markdown. Start with a brief bold header like "Fixed [Issue]", then 1-2 sentences of detail.`;

    case 'Spike':
      return `Create a concise release note (3-4 sentences) that:
- Summarizes what was researched
- States the key findings or recommendations
- Explains the next steps or business value
Format as markdown. Start with a brief bold header, then findings.`;

    default:
      return 'Create a concise, user-friendly release note summary in markdown format.';
  }
}

// Generate summary for a work item
function generateSummary(workItem) {
  const plainTitle = stripHtml(workItem.title);
  const plainDescription = stripHtml(workItem.description).substring(0, 4000);
  const plainExistingNote = stripHtml(workItem.existingReleaseNote || '').substring(0, 1000);

  const guidelines = getSummaryGuidelines(workItem.type);

  // For this version, we'll create a placeholder that indicates manual review needed
  // In production, this would call Claude API or similar

  const summary = {
    workItemId: workItem.id,
    title: plainTitle,
    type: workItem.type,
    guidelines: guidelines,
    context: {
      description: plainDescription,
      existingNote: plainExistingNote
    },
    // Placeholder for generated summary
    generatedSummary: null,
    needsReview: true
  };

  return summary;
}

// Process work items from a directory
function processDirectory(dirPath, sprintName) {
  console.log(`\n=== Processing ${sprintName} ===\n`);

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.json'))
    .sort();

  const summaries = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const workItem = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const summary = generateSummary(workItem);
    summaries.push(summary);

    console.log(`[${summaries.length}/${files.length}] Prepared #${workItem.id} - ${workItem.type}`);
  }

  // Save summaries for review
  const outputPath = path.join(dirPath, '_summaries-to-generate.json');
  fs.writeFileSync(outputPath, JSON.stringify(summaries, null, 2));

  console.log(`\n✅ Saved ${summaries.length} summaries to: ${outputPath}`);

  return summaries;
}

// Main execution
(async () => {
  try {
    console.log('🚀 Generating Release Note Summaries\n');

    const baseDir = './temp';

    // Process both sprints
    const sprint0107 = processDirectory(
      path.join(baseDir, 'release-notes-CX-2026.01.07'),
      'CX-2026.01.07'
    );

    const sprint0128 = processDirectory(
      path.join(baseDir, 'release-notes-CX-2026.01.28'),
      'CX-2026.01.28'
    );

    console.log('\n📊 Summary:');
    console.log(`   Sprint 01.07: ${sprint0107.length} work items`);
    console.log(`   Sprint 01.28: ${sprint0128.length} work items`);
    console.log(`   Total: ${sprint0107.length + sprint0128.length} work items`);
    console.log('\n💡 Next: Use Claude to generate actual summaries based on the prepared data\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
