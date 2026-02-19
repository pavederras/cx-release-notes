# Release Notes System - Documentation

## ✅ System Status: PRODUCTION READY

The release notes system is fully operational. All 3 completed sprints are published to GitHub Pages with uniform formatting, PDF exports, and AI-generated summaries written back to Azure DevOps.

---

## 🚀 Quick Start

**To generate release notes for a new sprint, run the Claude Code skill:**

```
/cx-generate-release-notes 04 2026.03.11
```

The skill handles all 10 steps automatically:
1. Parse sprint info and confirm configuration
2. Create folder structure
3. Pull work items from Azure DevOps
4. AI-generate summaries for items missing release notes
5. Write summaries back to ADO (`Custom.ReleaseNote`)
6. Generate Markdown
7. Generate HTML (dark/light mode, sprint dropdown)
8. Generate PDF (letter format, light mode)
9. Publish to GitHub Pages
10. Report results

---

## 📋 Completed Sprints

All sprints use uniform formatting: verb-first summaries, labeled bullet points (What changed / Who benefits / Technical context), no Sprint Summary section, Tech Enhancements (not Tech Debt).

| Sprint | Date Range | Items | HTML | PDF | Published |
|--------|-----------|-------|------|-----|-----------|
| CX (01) 2026.01.07 | Dec 11, 2025 – Jan 7, 2026 | ~35 | ✅ | ✅ | ✅ |
| CX (02) 2026.01.28 | Jan 8 – Jan 28, 2026 | ~33 | ✅ | ✅ | ✅ |
| CX (03) 2026.02.18 | Jan 29 – Feb 18, 2026 | 18 | ✅ | ✅ | ✅ |

**Live site:** https://pavederras.github.io/cx-release-notes/

---

## 🗓️ Upcoming Sprints

| Sprint | End Date | Date Range |
|--------|----------|-----------|
| CX (04) | 2026.03.11 | February 19 – March 11, 2026 |
| CX (05) | 2026.04.01 | March 12 – April 1, 2026 |
| CX (06) | 2026.04.22 | April 2 – April 22, 2026 |
| CX (07) | 2026.05.13 | April 23 – May 13, 2026 |
| CX (08) | 2026.06.03 | May 14 – June 3, 2026 |
| CX (09) | 2026.06.24 | June 4 – June 24, 2026 |

---

## 📁 Folder Structure

```
C:/GitHub-Projects/Release Notes/
├── enhance-release-notes.js         ← Pulls work items from ADO (User Stories & Spikes only)
├── create-enhanced-release-notes.js ← Generates Markdown from sprint data
├── generate-html.js                 ← Converts Markdown to HTML (dark/light mode)
├── generate-pdf.js                  ← Generates PDF via Puppeteer-core (light mode, letter)
├── index.html                       ← Root redirect to latest sprint (GitHub Pages)
├── .nojekyll                        ← Disables Jekyll on GitHub Pages
├── vercel.json                      ← Vercel project config (name: cx-release-notes)
├── .gitignore                       ← Excludes node_modules/, temp/, enhanced-work-items.json, *.docx
├── TODO.md                          ← This file
│
├── CX-2026.01.07/
│   ├── release-notes.md
│   ├── release-notes.html
│   ├── release-notes.pdf
│   └── screenshots/
│
├── CX-2026.01.28/
│   ├── release-notes.md
│   ├── release-notes.html
│   ├── release-notes.pdf
│   └── screenshots/
│
└── CX-2026.02.18/
    ├── release-notes.md
    ├── release-notes.html
    ├── release-notes.pdf
    └── screenshots/
```

---

## 🎯 Completed Features

### ✅ Azure DevOps Integration
- Azure DevOps CLI configured and authenticated
- Queries work items in states: `Closed`, `Done`, `Resolved`, `Pending Deployment`, `Code Review`
- Only User Stories and Spikes are included (Bugs, Defects, Tasks excluded)
- Reads `Custom.ReleaseNote` field, falls back to `System.Description`
- AI-generated summaries written back to `Custom.ReleaseNote` via `az boards work-item update`

### ✅ AI Summary Generation
- Verb-first summaries (no noun-phrase title fragments)
- Labeled bullet points: **What changed** / **Who benefits** / **Technical context**
- User Story format and Spike format defined in skill
- Grammar and quality checks built into skill instructions
- Summaries stored in ADO as single source of truth

### ✅ Markdown Generation
- Work items organized by area path in defined order:
  1. Home Portal
  2. SmartApp
  3. Servicing
  4. Admin Portal
  5. Tech Enhancements
  6. Sitewide
- Sorted: User Story → Spike within each section
- Partner items and non-matching area paths excluded
- No Sprint Summary section

### ✅ HTML Generation
- Dark/Light mode toggle with localStorage persistence
- Sprint dropdown for switching between sprints
- Click-to-enlarge screenshot modal
- Status badges (NEW, ENHANCED, etc.)
- Summary boxes for User Stories and Spikes

### ✅ PDF Generation
- Light mode, letter format with header/footer and page numbers
- Generated via `puppeteer-core` + system Chrome
- Viewport 880px, margins 0.25in left/right, base font 13px
- Tight spacing for compact, printable output

### ✅ GitHub Pages Publishing
- Repo: https://github.com/pavederras/cx-release-notes
- Live site: https://pavederras.github.io/cx-release-notes/
- `.nojekyll` disables Jekyll for instant build
- `index.html` at root redirects to latest sprint
- Sprint published by: `git add "CX-YYYY.MM.DD/" && git commit && git push`

---

## 📋 Area Path Categories

Work items categorized in this display order:
1. **Home Portal** — Home Portal items
2. **SmartApp** — SmartApp / Smart App items
3. **Servicing** — Servicing items
4. **Admin Portal** — Admin Portal items
5. **Tech Enhancements** — Technical improvements (formerly Tech Debt)
6. **Sitewide** — Items spanning multiple areas

**Excluded:** Partner Co-Branding, Partner Portal, unrecognized area paths, all Bugs/Defects/Tasks

---

## 📸 Screenshots

- Naming: `{work-item-id}_1.png` (increment for multiples: `_2.png`, `_3.png`)
- Saved to: `CX-YYYY.MM.DD/screenshots/`
- HTML renders them with click-to-enlarge modal
- Add screenshots after generating HTML; no re-run needed

---

## 💡 Future Enhancements

- [ ] Automated screenshot download from Azure DevOps attachments
- [ ] Email template generation
- [ ] Slack/Teams notification on publish
- [ ] Sprint metrics dashboard
- [ ] Diff view between sprints
- [ ] Search across sprints

---

## 🛠️ Useful Commands

```powershell
# List sprint iterations
az boards iteration project list --project "Consumer Experience" --depth 3

# View a specific work item
az boards work-item show --id [WORK-ITEM-ID] --output json

# Query sprint work items
az boards query --wiql "SELECT [System.Id], [System.Title] FROM WorkItems WHERE [System.IterationPath] = 'Consumer Experience\CX (##) YYYY.MM.DD' AND [System.State] IN ('Closed', 'Done', 'Resolved', 'Pending Deployment', 'Code Review')" --output table
```

---

## 🎯 System Configuration

### Azure DevOps
- **Organization:** cmgfidev (https://cmgfidev.visualstudio.com)
- **Project:** Consumer Experience

### GitHub
- **Repo:** https://github.com/pavederras/cx-release-notes
- **Pages:** https://pavederras.github.io/cx-release-notes/
- **Default branch:** main

### Node.js
- **Path (fnm):** `C:\Users\dperras\AppData\Roaming\fnm\node-versions\v24.13.1\installation\node.exe`

---

**Last Updated:** 2026-02-18
**Status:** ✅ Production Ready
