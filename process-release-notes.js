#!/usr/bin/env node

/**
 * Process Release Notes - Generate AI summaries and update Azure DevOps
 *
 * This script:
 * 1. Reads work item descriptions from Azure DevOps
 * 2. Generates concise, user-friendly release note summaries
 * 3. Updates the Custom.ReleaseNote field in ADO
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Read work items from query results
function getWorkItems(sprintFile) {
  const data = fs.readFileSync(sprintFile, 'utf8');
  const items = JSON.parse(data);
  return items.map(item => ({
    id: item.fields['System.Id'],
    title: item.fields['System.Title'],
    type: item.fields['System.WorkItemType']
  }));
}

// Get work item details from ADO
function getWorkItemDetails(workItemId) {
  try {
    const output = execSync(`az boards work-item show --id ${workItemId} --output json`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    });
    const workItem = JSON.parse(output);

    return {
      id: workItem.id,
      title: workItem.fields['System.Title'],
      type: workItem.fields['System.WorkItemType'],
      description: workItem.fields['System.Description'] || '',
      existingReleaseNote: workItem.fields['Custom.ReleaseNote'] || null
    };
  } catch (error) {
    console.error(`Error fetching work item ${workItemId}:`, error.message);
    return null;
  }
}

// Strip HTML tags for analysis
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate summary prompt based on work item type
function generateSummaryPrompt(workItem) {
  const plainDescription = stripHtml(workItem.description);
  const plainExistingNote = stripHtml(workItem.existingReleaseNote);

  const context = `
Work Item: #${workItem.id}
Type: ${workItem.type}
Title: ${workItem.title}

Description:
${plainDescription.substring(0, 3000)}

Existing Release Note:
${plainExistingNote ? plainExistingNote.substring(0, 1000) : 'None'}
`;

  return context;
}

// Save work item details to file for batch processing
function saveWorkItemForProcessing(workItem, outputDir) {
  const fileName = `${outputDir}/${workItem.id}-${workItem.type.replace(/\s+/g, '-')}.json`;
  fs.writeFileSync(fileName, JSON.stringify(workItem, null, 2));
  console.log(`Saved work item #${workItem.id} for processing`);
}

// Main processing function
async function processWorkItems(sprintFile, sprintName) {
  console.log(`\n=== Processing ${sprintName} ===\n`);

  const workItems = getWorkItems(sprintFile);
  console.log(`Found ${workItems.length} work items to process\n`);

  // Create output directory
  const outputDir = `./temp/release-notes-${sprintName}`;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let processed = 0;
  let skipped = 0;

  for (const item of workItems) {
    console.log(`[${processed + skipped + 1}/${workItems.length}] Processing #${item.id} - ${item.type} - ${item.title.substring(0, 60)}...`);

    const details = getWorkItemDetails(item.id);

    if (!details) {
      console.log(`  ⚠️  Skipped (error fetching details)\n`);
      skipped++;
      continue;
    }

    // Save for batch processing
    saveWorkItemForProcessing(details, outputDir);
    processed++;
  }

  console.log(`\n✅ Extraction complete: ${processed} work items saved to ${outputDir}`);
  console.log(`⚠️  Skipped: ${skipped} work items\n`);

  return outputDir;
}

// Main execution
(async () => {
  try {
    console.log('🚀 Starting Release Notes Processing\n');

    // Process both sprints
    const sprint0107Dir = await processWorkItems('./temp/sprint-01-07.json', 'CX-2026.01.07');
    const sprint0128Dir = await processWorkItems('./temp/sprint-01-28.json', 'CX-2026.01.28');

    console.log('\n📋 Next Steps:');
    console.log('1. Work items extracted to:');
    console.log(`   - ${sprint0107Dir}`);
    console.log(`   - ${sprint0128Dir}`);
    console.log('2. Ready for AI summary generation');
    console.log('3. After summaries generated, will update ADO\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
