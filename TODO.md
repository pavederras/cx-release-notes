# Release Notes System - Documentation

## ✅ System Status: PRODUCTION READY

The release notes system is fully operational and ready for use. All core features have been implemented and tested.

---

## 📌 PICK UP HERE — Session Notes (2026-02-17)

### What Was Accomplished This Session
- ✅ Created `/cx-generate-release-notes` Claude Code slash command skill (`~/.claude/commands/cx-generate-release-notes.md`)
- ✅ Generated CX(03) 2026.02.18 release notes — **18 items** (Home Portal 3, Servicing 6, Tech Debt 9)
- ✅ AI summaries generated for all 18 work items and written to ADO `Custom.ReleaseNote` field
- ✅ Fixed WIQL query to include `Pending Deployment` state (previously missing ~7 items)
- ✅ Removed Bugs/Defects and Tasks from output — only **User Stories and Spikes** shown
- ✅ All changes committed to git (commit `eb556ce`)

### Next Steps — Pick Up Tomorrow

#### 1. Add Screenshots to CX(03)
The release notes reference screenshot files that don't exist yet:
```
C:\GitHub-Projects\Release Notes\CX-2026.02.18\screenshots\
```
- Download screenshots from ADO work item attachments for each ticket
- Naming convention: `{work-item-id}_1.png`, `{work-item-id}_2.png`, etc.
- Key items needing screenshots: #93207, #94281, #94315, #92873, #93601, #93949, #93993, #94057, #94744, #66813, #67332, #85782, #93401, #94048, #94473, #94483, #95355, #93622

#### 2. Review the Skill File
The Claude slash command skill lives **outside this repo** at:
```
C:\Users\dperras\.claude\commands\cx-generate-release-notes.md
```
- Review it to confirm it reflects all final rules (no bugs, Pending Deployment included)
- Test it on the next sprint: `CX (04) 2026.03.11`

#### 3. Consider Regenerating Older Sprints (Optional)
CX(01) and CX(02) release notes were generated before the "no bugs" rule. They still contain bug items. If you want consistency:
```powershell
# Re-run pipeline for old sprints (will pull from ADO Custom.ReleaseNote — summaries already exist)
node enhance-release-notes.js "Consumer Experience\CX (01) 2026.01.07"
node create-enhanced-release-notes.js "Consumer Experience\CX (01) 2026.01.07" "2026.01.07" "December 11 - January 7, 2026" "CX-2026.01.07"
node generate-html.js "CX-2026.01.07/release-notes.md"
# Repeat for CX (02) 2026.01.28
```

#### 4. "Sitewide" Category (Low Priority)
Items with `Sitewide |` prefix currently map to **Tech Debt**. Consider whether Sitewide should be its own section. In `create-enhanced-release-notes.js`, the `resolveCategory()` function handles this mapping.

---

## 🚀 Quick Start - Generate Release Notes (Single Command!)

**For any new sprint, simply run:**

```powershell
.\generate-sprint.ps1
```

Or double-click: `generate-sprint.bat`

The script will:
1. ✅ Check prerequisites (Node.js, Azure CLI)
2. ✅ Prompt for sprint information
3. ✅ Create folder structure
4. ✅ Pull work items from Azure DevOps
5. ✅ Generate markdown with AI summaries
6. ✅ Generate HTML with dark/light mode
7. ✅ Optionally open in browser

**That's it!** No manual steps required.

---

## 📋 Pending Work - Pick Up Tomorrow

### Phase 1: Clean Up Existing Sprints ✅ COMPLETED (2026-02-11)
- [x] Generated AI summaries for all **CX-2026.01.07** work items (36 User Stories, Bugs, and Spikes)
- [x] Generated AI summaries for all **CX-2026.01.28** work items (33 User Stories, Bugs, and Spikes)
- [x] Updated Azure DevOps `Custom.ReleaseNote` field for all 68 work items
- [x] Regenerated markdown files with AI summaries
- [x] Regenerated HTML for both sprints

**Approach Used:** Instead of manually editing markdown, we used AI to generate concise, user-friendly summaries and stored them directly in Azure DevOps. This creates a single source of truth for all future release notes.

### Phase 2: Update Template for Future Sprints ✅ COMPLETED (2026-02-11)
- [x] Created `SUMMARY-GUIDELINES.md` with standard format/style documentation
- [x] Defined summary format for User Stories (3-5 sentences), Bugs (2-3 sentences), and Spikes (3-4 sentences)
- [x] Updated `release-notes-template.md` to clarify its purpose (executive summaries vs. detailed release notes)
- [x] Updated TODO.md with refined ADO-based workflow documentation

**Summary Format Established:**
- **User Stories:** Bold header + business value + technical context for SMEs
- **Bugs:** "Fixed [Issue]" header + problem statement + resolution
- **Spikes:** Research topic header + findings + recommendations
- **Storage:** All summaries in Azure DevOps `Custom.ReleaseNote` field

### Phase 3: Create Simple Command/Workflow ✅ COMPLETED (2026-02-11)
- [x] Created PowerShell automation script (`generate-sprint.ps1`)
- [x] Created batch wrapper for easy execution (`generate-sprint.bat`)
- [x] Script prompts for sprint info and runs all steps automatically:
  1. Validates prerequisites (Node.js, Azure CLI, authentication)
  2. Prompts for sprint number, date, and date range
  3. Creates folder structure (`CX-YYYY.MM.DD/screenshots`)
  4. Enhances work items from ADO (`enhance-release-notes.js`)
  5. Generates markdown (`create-enhanced-release-notes.js`)
  6. Generates HTML (`generate-html.js`)
  7. Optionally opens in browser
- [x] Documented the command usage below

**How to Use:**
```powershell
# Option 1: Run PowerShell script directly
.\generate-sprint.ps1

# Option 2: Double-click generate-sprint.bat
# Or run from Command Prompt:
generate-sprint.bat
```

The script will prompt for:
- Sprint number (e.g., 03)
- Sprint end date (e.g., 2026.02.18)
- Date range (e.g., January 29 - February 18, 2026)

**Next Sprint to Test:**
- [ ] Test with: **CX (03) 2026.02.18** (Jan 29 - Feb 18, 2026)

### Remaining Sprints for 2026:
- CX (03) 2026.02.18 - January 29 - February 18, 2026
- CX (04) 2026.03.11 - February 19 - March 11, 2026
- CX (05) 2026.04.01 - March 12 - April 1, 2026
- CX (06) 2026.04.22 - April 2 - April 22, 2026
- CX (07) 2026.05.13 - April 23 - May 13, 2026
- CX (08) 2026.06.03 - May 14 - June 3, 2026
- CX (09) 2026.06.24 - June 4 - June 24, 2026

**Goal:** Once Phase 1-3 complete, generating release notes for any sprint should be a single command.

---

## 🎯 Completed Features

### ✅ Azure DevOps Integration
- Azure DevOps CLI configured and authenticated
- Automated work item querying from sprint iterations
- Enhanced work item descriptions extracted from ADO
- Automatic categorization by area path

### ✅ Markdown Generation
- Automated markdown generation from sprint data
- Work items organized by area path (Home Portal, SmartApp, Servicing, Admin Portal, Tech Debt)
- Proper sorting: User Story → Spike → Bug within each section
- Bulleted summaries for User Stories and Spikes
- Screenshot placeholders with work item ID
- Exclusion of partner-related items
- Exclusion of items without proper area paths

### ✅ HTML Generation
- **Dark/Light Mode Toggle** - Robinhood-inspired dark mode with blue accents
- **Sprint Dropdown** - Switch between sprints from the header
- **Centered Navigation** - Clean, scannable navigation matching area paths
- **Theme Persistence** - Remembers user's theme preference
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Markdown Link** - Direct link to source markdown file
- **Status Badges** - Color-coded badges for NEW, ENHANCED, FIX, etc.
- **Summary Boxes** - Highlighted summaries for User Stories and Spikes
- **Click-to-Enlarge Images** - Modal for screenshot viewing
- **Smooth Animations** - Professional transitions and hover effects

### ✅ Automation Scripts
- `enhance-release-notes.js` - Extracts descriptions from Azure DevOps
- `create-enhanced-release-notes.js` - Generates markdown from sprint data
- `generate-html.js` - Converts markdown to polished HTML

---

## 📁 Current Folder Structure

```
C:/github-projects/Release Notes/
├── generate-html.js                 ← HTML generator with theme toggle
├── generate-html.py                 ← Legacy Python version (not used)
├── enhance-release-notes.js         ← ADO description extractor
├── create-enhanced-release-notes.js ← Markdown generator
├── enhanced-work-items.json         ← Cached work item descriptions
├── release-notes-template.md        ← Original template (reference)
├── TODO.md                          ← This file
├── CX Sprint 2025.1.28 Release Notes.docx ← Original example
│
├── CX-2026.01.07/                   ← Sprint folder
│   ├── release-notes.md             ← Markdown source (35 items)
│   ├── release-notes.html           ← Generated HTML
│   └── screenshots/                 ← Screenshot folder
│
└── CX-2026.01.28/                   ← Sprint folder
    ├── release-notes.md             ← Markdown source (38 items)
    ├── release-notes.html           ← Generated HTML
    └── screenshots/                 ← Screenshot folder
```

---

## 🚀 How to Generate Release Notes (Updated Workflow)

### Prerequisites
- Azure CLI authenticated (`az login`)
- Azure DevOps defaults configured:
  ```bash
  az devops configure --defaults organization=https://cmgfidev.visualstudio.com project="Consumer Experience"
  ```

### Step 1: Create Sprint Folder
```bash
cd "C:/github-projects/Release Notes"
mkdir "CX-YYYY.MM.DD"
mkdir "CX-YYYY.MM.DD/screenshots"
```

### Step 2: Enhance Work Items (Pull from Azure DevOps)
This step extracts descriptions AND Custom.ReleaseNote fields from ADO for User Stories, Spikes, and Bugs.

```bash
node enhance-release-notes.js "Consumer Experience\\CX (##) YYYY.MM.DD"
```

**What it does:**
- Queries all completed work items from the sprint
- Extracts Custom.ReleaseNote field (AI-generated summaries)
- Falls back to System.Description if no release note exists
- Saves to `enhanced-work-items.json`

### Step 3: Generate Markdown (Immediately After Step 2)
**IMPORTANT:** Run this immediately after Step 2 while `enhanced-work-items.json` contains the correct sprint data.

```bash
node create-enhanced-release-notes.js "Consumer Experience\\CX (##) YYYY.MM.DD" "YYYY.MM.DD" "Month DD - Month DD, YYYY" "CX-YYYY.MM.DD"
```

**Example:**
```bash
node create-enhanced-release-notes.js "Consumer Experience\\CX (03) 2026.02.18" "2026.02.18" "January 29 - February 18, 2026" "CX-2026.02.18"
```

**What it does:**
- Reads `enhanced-work-items.json`
- Categorizes work items by area path
- Generates markdown with summaries
- Saves to `CX-YYYY.MM.DD/release-notes.md`

### Step 4: Generate HTML
```bash
node generate-html.js "CX-YYYY.MM.DD/release-notes.md"
```

**What it does:**
- Converts markdown to HTML
- Adds dark/light mode toggle
- Creates sprint dropdown navigation
- Saves to `CX-YYYY.MM.DD/release-notes.html`

### Step 5: Open in Browser
```bash
start "CX-YYYY.MM.DD/release-notes.html"
```

---

## 📝 Working with Release Note Summaries

### Viewing Summaries in Azure DevOps
1. Open any work item in ADO
2. Look for the **Custom.ReleaseNote** field
3. This field contains the AI-generated or manually-written summary

### Updating Summaries in Azure DevOps
1. Edit the work item in ADO
2. Update the **Custom.ReleaseNote** field (supports HTML)
3. Save the work item
4. Re-run Steps 2-4 above to regenerate release notes

### Bulk Generating AI Summaries
If work items don't have summaries yet, use the AI generation process:
1. Extract work items: `node process-release-notes.js` (creates JSON files)
2. Generate summaries using Claude AI (see `generate-summaries.js` or use agents)
3. Update ADO: `node update-ado.js` (writes Custom.ReleaseNote fields)
4. Follow normal workflow (Steps 2-4 above)

### Summary Guidelines
See **SUMMARY-GUIDELINES.md** for:
- Format standards by work item type
- Writing do's and don'ts
- Quality checklist
- Examples for User Stories, Bugs, and Spikes

---

## 📋 Area Path Categories

Work items are automatically categorized based on their area path (the prefix before `|` in the title):

**Displayed in this order:**
1. **Home Portal** - All Home Portal work items
2. **SmartApp** - SmartApp and Smart App items
3. **Servicing** - Servicing-related items
4. **Admin Portal** - Admin Portal items
5. **Tech Debt** - Technical debt items

**Excluded:**
- Partner Co-Branding items
- Partner Portal items
- Items without recognizable area paths
- Tasks without area path prefixes

---

## 🎨 Theme System

### Dark Mode (Default)
- Deep black background (#0d0d0d)
- Blue accents (#0078FF)
- Robinhood-inspired design
- High contrast for readability

### Light Mode
- Clean white backgrounds
- Same blue accents
- Traditional design
- Optimized for printing

### Toggle Button
Located in the navigation bar (top right), persists preference in localStorage.

---

## 🔄 Sprint Navigation

### Sprint Dropdown
- Located in header next to sprint title
- Shows: "CX Sprint 2026.01.28 [Switch Sprint ▼]"
- Lists all available sprints (oldest → newest)
- Auto-discovers sprint folders
- One-click navigation between sprints

---

## 📊 Work Item Organization

### Within Each Area Path:
1. **User Stories** (first) - All user stories grouped together
2. **Spikes** - Research and spike work items
3. **Bugs** (last) - Bug fixes and defects

### Display Format:
```
### 🆕 NEW: Feature Title
**Ticket:** #12345
**Type:** User Story

**Summary:**
- As a user, I want to... so that...

**Screenshots:**
- screenshots/12345-feature-name.png
```

---

## 📸 Screenshot Process

### Current Implementation:
- Screenshot placeholders automatically generated in markdown
- Naming convention: `{work-item-id}_{number}.png` (e.g., `79993_1.png`, `79993_2.png`)
- Multiple screenshots per work item supported with priority ordering
- Stored in: `CX-YYYY.MM.DD/screenshots/`
- Modal viewer in HTML for click-to-enlarge

### Recommended Workflow:
1. QA team attaches screenshots to Azure DevOps work items during testing
2. When creating release notes, manually download key screenshots
3. Save to `screenshots/` folder as `{work-item-id}_1.png` (increment number for multiple screenshots)
4. Edit markdown to reference actual screenshots if multiple exist
5. HTML will automatically display them with click-to-enlarge functionality

### Future Enhancement:
Create script to automatically download screenshots from work item attachments:
```bash
# Future script idea
node download-screenshots.js "CX-YYYY.MM.DD"
```

---

## 🛠️ Useful Commands

### Query Sprint Data
```bash
az boards query --wiql "SELECT [System.Id], [System.Title], [System.WorkItemType], [System.State] FROM WorkItems WHERE [System.IterationPath] = 'Consumer Experience\\CX (##) YYYY.MM.DD' AND [System.State] IN ('Closed', 'Done', 'Resolved')" --output table
```

### View Work Item Details
```bash
az boards work-item show --id [WORK-ITEM-ID] --output json
```

### List All Sprint Iterations
```bash
az boards iteration project list --project "Consumer Experience" --depth 3
```

### Regenerate All HTML Files
```bash
cd "C:/github-projects/Release Notes"
for dir in CX-*/; do
  node generate-html.js "${dir}release-notes.md"
done
```

---

## 🎯 System Configuration

### Azure DevOps
- **Organization:** cmgfidev (https://cmgfidev.visualstudio.com)
- **Project:** Consumer Experience
- **Process Template:** CX Dev Process
- **Default Team:** Consumer Experience Team

### Sprints Completed:
- CX (01) 2026.01.07 - Dec 11, 2025 to Jan 7, 2026 (35 items)
- CX (02) 2026.01.28 - Jan 14, 2026 to Jan 28, 2026 (38 items)
- CX (03) 2026.02.18 - Jan 29 to Feb 18, 2026 (18 items — User Stories & Spikes only) ✅

### Known Iterations for 2026:
- CX (04) 2026.03.11 - Feb 19 to Mar 11
- CX (05) 2026.04.01 - Mar 12 to Apr 1
- CX (06) 2026.04.22 - Apr 2 to Apr 22
- CX (07) 2026.05.13 - Apr 23 to May 13
- CX (08) 2026.06.03 - May 14 to Jun 3
- CX (09) 2026.06.24 - Jun 4 to Jun 24

---

## 💡 Future Enhancements

### Potential Improvements:
- [ ] Automated screenshot download from Azure DevOps
- [ ] PDF export functionality
- [ ] Email template generation
- [ ] Slack/Teams integration for auto-posting
- [ ] Sprint metrics dashboard
- [ ] Acceptance criteria extraction
- [ ] Automated deployment to Vercel/GitHub Pages
- [ ] Diff view between sprints
- [ ] Search functionality across sprints
- [ ] Export to Word/PowerPoint

### Nice-to-Have Features:
- [ ] Expandable/collapsible sections
- [ ] Print-optimized stylesheet
- [ ] Team credits auto-population from ADO
- [ ] Release notes comparison tool
- [ ] Burndown chart integration
- [ ] Custom branding options

---

## 📝 Notes

### Design Decisions:
- **Excluded Partner Items:** Per user request, all Partner Co-Branding and Partner Portal items are excluded from release notes
- **No "Other" Category:** Items must match one of the 5 defined area paths (Home Portal, SmartApp, Servicing, Admin Portal, Tech Debt)
- **Dark Mode Default:** Robinhood-inspired dark theme is the default, with blue accents instead of green
- **Centered Navigation:** Navigation items are centered for better visual balance
- **Area Path Sorting:** Sections always appear in defined order regardless of item count

### Maintenance:
- `enhanced-work-items.json` is overwritten each time `enhance-release-notes.js` runs
- HTML files can be regenerated anytime without losing data
- Markdown files are the source of truth
- Sprint dropdown auto-discovers new sprint folders

---

## 🔗 Reference Links

- **Original Example:** https://cx-sprint-release-2025.vercel.app/
- **Azure DevOps Project:** https://cmgfidev.visualstudio.com/Consumer%20Experience
- **Azure CLI Docs:** https://learn.microsoft.com/en-us/cli/azure/boards

---

**Last Updated:** 2026-02-17
**Status:** ✅ Production Ready
**Version:** 3.0
