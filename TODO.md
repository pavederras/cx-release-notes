# Release Notes System - Documentation

## ✅ System Status: PRODUCTION READY

The release notes system is fully operational and ready for use. All core features have been implemented and tested.

---

## 📋 Pending Work - Pick Up Tomorrow

### Phase 1: Clean Up Existing Sprints
- [ ] Review and refine markdown summaries for **CX-2026.01.07** (35 items)
  - Edit summaries in `CX-2026.01.07/release-notes.md` for clarity and consistency
  - Ensure all User Stories and Spikes have concise, scannable summaries
  - Remove any unnecessary details or formatting issues

- [ ] Review and refine markdown summaries for **CX-2026.01.28** (38 items)
  - Edit summaries in `CX-2026.01.28/release-notes.md`
  - Apply same clarity and consistency standards
  - Verify all screenshots are properly referenced

- [ ] Regenerate HTML for both sprints after cleanup
  ```bash
  node generate-html.js "CX-2026.01.07/release-notes.md"
  node generate-html.js "CX-2026.01.28/release-notes.md"
  ```

### Phase 2: Update Template for Future Sprints
- [ ] Review `release-notes-template.md` and update based on learnings
- [ ] Decide on standard summary format/style for User Stories and Spikes
- [ ] Document any additional guidelines for manual editing
- [ ] Update TODO.md with refined workflow documentation

### Phase 3: Create Simple Command/Workflow
- [ ] Create a single command script (e.g., `generate-sprint.sh` or `generate-sprint.bat`)
- [ ] Script should prompt for sprint info and run all 3 steps:
  ```bash
  # Example workflow to automate:
  # 1. Create folder structure
  # 2. Run enhance-release-notes.js
  # 3. Run create-enhanced-release-notes.js
  # 4. Run generate-html.js
  ```
- [ ] Test with next sprint: **CX (03) 2026.02.18** (Jan 29 - Feb 18, 2026)
- [ ] Document the command in TODO.md

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

## 🚀 How to Generate Release Notes

### Step 1: Create Sprint Folder
```bash
mkdir "C:/github-projects/Release Notes/CX-YYYY.MM.DD"
mkdir "C:/github-projects/Release Notes/CX-YYYY.MM.DD/screenshots"
```

### Step 2: Enhance Work Items (Extract Descriptions)
```bash
cd "C:/github-projects/Release Notes"
node enhance-release-notes.js "Consumer Experience\\CX (##) YYYY.MM.DD"
```

### Step 3: Generate Markdown
```bash
node create-enhanced-release-notes.js "Consumer Experience\\CX (##) YYYY.MM.DD" "YYYY.MM.DD" "Month DD - Month DD, YYYY" "CX-YYYY.MM.DD"
```
**Example:**
```bash
node create-enhanced-release-notes.js "Consumer Experience\\CX (03) 2026.02.18" "2026.02.18" "January 29 - February 18, 2026" "CX-2026.02.18"
```

### Step 4: Generate HTML
```bash
node generate-html.js "CX-YYYY.MM.DD/release-notes.md"
```

### Step 5: Open in Browser
The HTML file will be at: `CX-YYYY.MM.DD/release-notes.html`

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

### Known Iterations for 2026:
- CX (03) 2026.02.18 - Jan 29 to Feb 18
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

**Last Updated:** 2026-02-06
**Status:** ✅ Production Ready (Pending Phase 1-3 Refinements)
**Version:** 2.0
