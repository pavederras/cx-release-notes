# Release Note Summary Guidelines

## Overview
All release note summaries are stored in Azure DevOps in the `Custom.ReleaseNote` field and automatically flow into generated release notes. Summaries should be concise, user-friendly, and focused on business value.

## Audience
Release notes are shared with:
- Training teams
- Support staff
- Executives
- Product stakeholders
- Other subject matter experts (SMEs)

## Summary Format by Work Item Type

### User Stories (3-5 sentences)
**Format:**
- Start with a **bold header** summarizing the feature
- Explain WHAT was added or changed
- Focus on business value and user benefits
- Include technical context appropriate for SMEs
- Mention feature flags, configuration, or dependencies if relevant

**Example:**
```markdown
**Early Borrower Authentication Verification Ordering**

Enabled automatic ordering of the Borrower Authentication Verification disclosure package immediately upon SmartApp submission, rather than waiting until the loan reaches LE Pending status. When the OrdBorrAuth feature flag is enabled, the system validates required borrower data (phone, email, SSN), augments the Byte loan creation with predefined field values, and triggers the Pre-Disclosure package via Docutech. This early ordering improves borrower onboarding, accelerates identity verification, and increases application-to-disclosure conversion rates.
```

### Bugs (2-3 sentences)
**Format:**
- Start with **"Fixed [Issue]"** as bold header
- State what was broken
- Explain what's now fixed
- Keep technical but clear

**Example:**
```markdown
**Fixed Multiple Loading Indicators**

Resolved an issue where multiple loading states were displaying simultaneously when accessing the loan detail dashboard. Users now see a single, consistent loading indicator for improved user experience and visual clarity.
```

### Spikes (3-4 sentences)
**Format:**
- Start with bold header describing the research topic
- Summarize what was researched
- State key findings or recommendations
- Explain next steps or business value

**Example:**
```markdown
**Payoff Quicker Calculator Integration Research**

Completed technical research to integrate the existing Payoff Quicker calculator into the Servicing Portal. The spike evaluated existing calculator architecture, data dependencies, and loan information integration. Recommended approach: Extract calculator into the cmg-calculators NPM package and provide Aspen Grove with a custom URL to serve loan-specific data via query parameters. This research enables future deployment of one of Servicing's most-used calculator tools.
```

## Writing Guidelines

### Do's:
- ✅ Use clear, concise language
- ✅ Focus on the "what" and "why," not implementation details
- ✅ Include technical terms when necessary for SME audience
- ✅ Use bullet points for multiple features within one story
- ✅ Mention cross-team dependencies or integrations
- ✅ Note if something is behind a feature flag
- ✅ Write in past tense (completed work)

### Don'ts:
- ❌ Don't use jargon unnecessarily
- ❌ Don't include acceptance criteria verbatim
- ❌ Don't write implementation step-by-step details
- ❌ Don't mention developer names or team assignments
- ❌ Don't include verbose requirement language
- ❌ Don't write more than 5 sentences for User Stories
- ❌ Don't use "we" or "I" - use passive voice or "the system"

## Markdown Formatting

All summaries use HTML formatting when stored in Azure DevOps:
- `<strong>Bold Header</strong>` for headers
- `<p>Paragraph text</p>` for body
- `<code>featureFlagName</code>` for code/config references
- Line breaks with `<br>` if needed

The scripts automatically convert between markdown and HTML.

## Quality Checklist

Before finalizing a summary, verify:
- [ ] Bold header is present and descriptive
- [ ] Length is appropriate (2-5 sentences based on type)
- [ ] Business value is clear
- [ ] Technical context is included for SMEs
- [ ] Free of typos and grammatical errors
- [ ] Reads well when scanned quickly
- [ ] Makes sense to someone not familiar with the work item

## Updating Summaries

### Manual Updates in Azure DevOps:
1. Open the work item in ADO
2. Edit the `Custom.ReleaseNote` field
3. Save the work item
4. Re-run the enhancement and generation scripts

### Bulk AI Generation:
Use the process documented in TODO.md for generating summaries for entire sprints.

---

**Last Updated:** 2026-02-11
**Version:** 1.0
