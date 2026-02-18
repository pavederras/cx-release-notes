# CX Sprint 2026.02.18 Release Notes

**Sprint Dates:** January 29 - February 18, 2026
**Release Date:** TBD

---

## Home Portal (3 items)

### 🆕 NEW: Add 'IRS Form 1099-INT � Mortgage Interest Statement' to Documents
**Ticket:** [#93207](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93207)
**Type:** User Story

**Summary:**
- Added IRS Form 1099-INT (Mortgage Interest Statement) as a new document type in the Home Portal Documents page. Borrowers can now view and download their annual mortgage interest statement directly from the portal, eliminating the need to contact support for this commonly requested document. This enhancement improves the self-service document experience during tax season.

**Screenshots:**
- `screenshots/93207_1.png`

---

### 🗑️ REMOVED: Remove error message when loan detail returns 404, prevent navigation to specific loan detail on login
**Ticket:** [#94281](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/94281)
**Type:** User Story

**Summary:**
- Resolved an issue where borrowers following an outdated or bookmarked loan detail link would see a confusing red error message. The portal now gracefully handles unavailable loan detail pages by redirecting users to their dashboard instead of displaying an error. This improves the login and navigation experience for borrowers with inactive or transferred loans.

**Screenshots:**
- `screenshots/94281_1.png`

---

### 🆕 NEW: Workflow - Borrower Auth Doc Request - Data Fix
**Ticket:** [#94315](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/94315)
**Type:** User Story

**Summary:**
- Corrected a data issue in the Borrower Authentication Document Request workflow within SmartApp. The fix ensures that submitted application data is accurately passed through to the authentication document request process, preventing downstream data mismatches during the loan application flow.

**Screenshots:**
- `screenshots/94315_1.png`

---

## Servicing (6 items)

### 🆕 NEW: Add Banner for 1098 - After Delivery
**Ticket:** [#92873](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92873)
**Type:** User Story

**Summary:**
- Added an informational banner to the Servicing Portal that displays after a borrower's 1098 tax form has been delivered. The banner notifies servicing clients that their tax document is available, improving borrower awareness and reducing support inquiries during tax season. The banner displays to all applicable servicing clients once the 1098 delivery event is triggered.

**Screenshots:**
- `screenshots/92873_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.51.0
**Ticket:** [#93601](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93601)
**Type:** User Story

**Summary:**
- Upgraded the Aspen Grove third-party servicing widgets to version 1.51.0, incorporating Sagent-confirmed payload changes required for Escrow Shortage-only payment request submissions. This update ensures accurate escrow payment processing and improves compatibility with the Sagent servicing platform. Borrowers will experience improved reliability when interacting with escrow-related servicing features.

**Screenshots:**
- `screenshots/93601_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.52.0
**Ticket:** [#93949](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93949)
**Type:** User Story

**Summary:**
- Upgraded the Aspen Grove third-party servicing widgets to version 1.52.0, which addresses stability issues introduced in v1.51.0. This patch update ensures continued reliability of escrow and payment servicing features for borrowers.

**Screenshots:**
- `screenshots/93949_1.png`

---

### 🆕 NEW: 1098 issue in Production
**Ticket:** [#93993](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93993)
**Type:** User Story

**Summary:**
- Fixed a production issue where 1098 year-end tax documents were not loading correctly in the Servicing Portal. Borrowers affected by this issue can now access their 1098 mortgage interest statements without errors, ensuring tax document availability aligns with IRS delivery timelines.

**Screenshots:**
- `screenshots/93993_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.53.0
**Ticket:** [#94057](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/94057)
**Type:** User Story

**Summary:**
- Upgraded the Aspen Grove third-party servicing widgets to version 1.53.0, delivering continued stability improvements to the servicing widget suite. Borrowers will experience improved reliability across escrow and payment-related servicing features.

**Screenshots:**
- `screenshots/94057_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.54.0
**Ticket:** [#94744](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/94744)
**Type:** User Story

**Summary:**
- Upgraded the Aspen Grove third-party servicing widgets to version 1.54.0, incorporating several user-facing improvements including enhanced messaging in Escrow Details (ESC 1.21), a disabled Set Up AutoPay CTA state (STO 1.4), updated shortage messaging on the main Escrow container (ESC 1.20), and additional escrow-related fixes (STO 1.3). These enhancements improve the clarity and usability of escrow and autopay features for servicing borrowers.

**Screenshots:**
- `screenshots/94744_1.png`

---

## Sitewide (3 items)

### 🆕 NEW: Announcements - Extend character count
**Ticket:** [#93401](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93401)
**Type:** User Story

**Summary:**
- Extended the maximum character count for sitewide announcements to 2,000 characters. This change allows administrators to create more detailed and informative announcements for borrowers and users across the platform, supporting richer communication without requiring external links for longer messages.

**Screenshots:**
- `screenshots/93401_1.png`

---

### 🆕 NEW: Bank CMG Branding on LO Emails, Emails to Borrower +Misc Emails not already covered
**Ticket:** [#94048](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/94048)
**Type:** User Story

**Summary:**
- Applied Bank CMG co-branding to all remaining loan officer and borrower-facing emails originating from the Bank CMG domain that were not previously branded. Loan officers and borrowers interacting through Bank CMG now receive fully co-branded email communications consistent with the Bank CMG identity. This completes the Bank CMG email branding initiative across the SmartApp notification workflow.

**Screenshots:**
- `screenshots/94048_1.png`

---

### 🆕 NEW: Create a console app to call submitted loan apps migration endpoint to support Bank Loan Copy project
**Ticket:** [#94483](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/94483)
**Type:** User Story

**Summary:**
- Built a console application that processes loan lists generated during the Bank Loan Copy orchestration run and calls the submitted loan applications migration endpoint for each affected loan. This tool enables CX engineers to retry and complete migration steps that previously failed due to missing targetLO data during orchestration. The application directly supports the Bank Loan Copy project by ensuring all affected loan applications are fully migrated, reducing manual intervention and improving data integrity across the platform.

**Screenshots:**
- `screenshots/94483_1.png`

---

## Tech Debt (6 items)

### 🔧 TECH: Refactor login logic to ensure the loading indicator is not turned off until the user's dashboard is shown
**Ticket:** [#66813](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/66813)
**Type:** User Story

**Summary:**
- Refactored the login loading indicator logic to ensure it remains visible until the user's dashboard has fully loaded. Previously, the loading indicator would occasionally disappear too early, causing the login screen to briefly reappear before navigating the user to their dashboard. This fix eliminates the visual flicker during login, resulting in a smoother and more reliable authentication experience for all users.

**Screenshots:**
- `screenshots/66813_1.png`

---

### 🔧 TECH: Deprecate FinancialsVerificationProvider
**Ticket:** [#67332](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/67332)
**Type:** User Story

**Summary:**
- Removed the FinancialsVerificationProvider from the CX codebase as part of ongoing technical debt reduction. Financial data previously sourced through this provider is now derived directly from borrower employment and asset data associated with loan applications. This change simplifies the data access layer and reduces maintenance overhead.

**Screenshots:**
- `screenshots/67332_1.png`

---

### 🔧 TECH: Research on Improvement of performance of UI Unit Tests
**Ticket:** [#85782](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85782)
**Type:** User Story

**Summary:**
- Investigated root causes of slow UI unit test execution and identified opportunities to improve test suite performance. The research analyzed test configuration, dependency loading, and parallelization options to reduce overall test run times. Findings will inform future optimizations to the CI/CD pipeline and developer workflow.

**Screenshots:**
- `screenshots/85782_1.png`

---

### 🔧 TECH: Fix loan details dashboard skeleton
**Ticket:** [#94473](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/94473)
**Type:** User Story

**Summary:**
- Restored the skeleton loading component on the Loan Detail dashboard page, which had been inadvertently removed. The skeleton screen now displays while loan data is loading, providing users with a visual loading indicator and preventing layout shifts. This improves the perceived performance and visual consistency of the loan detail experience.

**Screenshots:**
- `screenshots/94473_1.png`

---

### 🔧 TECH: Fix API Build running out of disk space
**Ticket:** [#95355](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/95355)
**Type:** User Story

**Summary:**
- Fixed a recurring issue where the API build pipeline was running out of disk space, causing build failures and blocking deployments. The root cause was identified and resolved by implementing disk cleanup and optimizing build artifact management within the pipeline. This fix restores build reliability and prevents future deployment interruptions caused by insufficient disk capacity.

**Screenshots:**
- `screenshots/95355_1.png`

---

### 🔍 SPIKE: Construct Design for In-House E-Mail Management [16 Hrs]
**Ticket:** [#93622](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93622)
**Type:** Spike

**Summary:**
- Completed technical research and design work to replace SendGrid templating with a CX-owned in-house email management system for template creation and delivery. The spike evaluated architecture options, template management approaches, and sending infrastructure requirements to reduce vendor dependency and increase control over email customization. The recommended design establishes the foundation for an in-house email platform supporting dynamic branding, improved deliverability, and reduced SendGrid licensing costs. This research enables future development of a fully self-managed email solution.

**Screenshots:**
- `screenshots/93622_1.png`

---

## CX Team

### Product
- TBD

### Development
- TBD

### QA
- TBD

### Experience Design
- TBD

---

**Generated:** 2026-02-18
**Source:** Azure DevOps - Consumer Experience Project
