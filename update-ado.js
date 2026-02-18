#!/usr/bin/env node

/**
 * Update Azure DevOps with Generated Release Notes
 *
 * This script updates the Custom.ReleaseNote field in ADO
 * with the AI-generated summaries.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Convert markdown to HTML (simple conversion)
function markdownToHtml(markdown) {
  if (!markdown) return '';

  let html = markdown
    // Bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // Wrap in paragraph tags
  if (!html.startsWith('<p>')) {
    html = '<p>' + html;
  }
  if (!html.endsWith('</p>')) {
    html = html + '</p>';
  }

  // Handle bullet points
  html = html.replace(/- (.+?)(<br>|<\/p>)/g, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

  return html;
}

// Update a single work item in ADO
function updateWorkItem(workItemId, summary) {
  try {
    // Convert markdown to HTML
    const htmlSummary = markdownToHtml(summary);

    // Escape the HTML for JSON
    const escapedHtml = JSON.stringify(htmlSummary);

    // Create the JSON patch document
    const patchDoc = `[{"op":"add","path":"/fields/Custom.ReleaseNote","value":${escapedHtml}}]`;

    // Write to temp file to avoid command line length issues
    const tempFile = `/tmp/ado-patch-${workItemId}.json`;
    fs.writeFileSync(tempFile, patchDoc);

    // Update using Azure CLI
    const result = execSync(
      `az boards work-item update --id ${workItemId} --fields Custom.ReleaseNote=${escapedHtml}`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );

    return true;
  } catch (error) {
    console.error(`Error updating work item ${workItemId}:`, error.message);
    return false;
  }
}

// Process a sprint's summaries
function processSprint(summaryFile, sprintName) {
  console.log(`\n=== Updating ${sprintName} ===\n`);

  if (!fs.existsSync(summaryFile)) {
    console.error(`❌ Summary file not found: ${summaryFile}`);
    return { updated: 0, failed: 0 };
  }

  const summaries = JSON.parse(fs.readFileSync(summaryFile, 'utf8'));

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < summaries.length; i++) {
    const item = summaries[i];

    console.log(`[${i + 1}/${summaries.length}] Updating #${item.workItemId} - ${item.type}...`);

    if (updateWorkItem(item.workItemId, item.generatedSummary)) {
      console.log(`  ✅ Updated successfully`);
      updated++;
    } else {
      console.log(`  ❌ Failed to update`);
      failed++;
    }

    // Small delay to avoid rate limiting
    execSync('sleep 0.5');
  }

  console.log(`\n✅ Sprint complete: ${updated} updated, ${failed} failed`);
  return { updated, failed };
}

// Main execution
(async () => {
  try {
    console.log('🚀 Updating Azure DevOps with Release Notes\n');

    const baseDir = './temp';

    // Process both sprints
    const sprint0107 = processSprint(
      path.join(baseDir, 'release-notes-CX-2026.01.07/generated-summaries.json'),
      'CX-2026.01.07'
    );

    const sprint0128 = processSprint(
      path.join(baseDir, 'release-notes-CX-2026.01.28/generated-summaries.json'),
      'CX-2026.01.28'
    );

    console.log('\n📊 Final Summary:');
    console.log(`   Sprint 01.07: ${sprint0107.updated} updated, ${sprint0107.failed} failed`);
    console.log(`   Sprint 01.28: ${sprint0128.updated} updated, ${sprint0128.failed} failed`);
    console.log(`   Total: ${sprint0107.updated + sprint0128.updated} updated, ${sprint0107.failed + sprint0128.failed} failed\n`);

    if (sprint0107.failed + sprint0128.failed === 0) {
      console.log('✅ All work items updated successfully!\n');
    } else {
      console.log('⚠️  Some work items failed to update. Check logs above.\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
