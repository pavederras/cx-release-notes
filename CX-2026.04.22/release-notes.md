# CX Sprint 2026.04.22 Release Notes

**Sprint Dates:** April 2 - April 22, 2026
**Release Date:** TBD

---

## Home Portal (5 items)

### ✨ ENHANCED: Enhance Borrower Transition on Submit
**Ticket:** [#87017](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87017)
**Type:** User Story

**Summary:**
- Improved the Borrower Transition Experience After Application Submission in the Home Portal
- What changed: Borrowers now receive a smoother, more guided confirmation screen after successfully submitting their mortgage application.
- Who benefits: Borrowers no longer experience an abrupt or confusing handoff after hitting submit - the transition now confirms success and sets clear expectations for next steps.

**Screenshots:**
- `screenshots/87017_1.png`

---

### 🆕 NEW: Create Document Delivery Task - Action Screen - View Document
**Ticket:** [#98783](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98783)
**Type:** User Story

**Summary:**
- Added a 'View Document' Action to the Document Delivery Task in the Home Portal
- What changed: Borrowers can now open and review required documents inline directly from the Document Delivery task action screen in the Home Portal.
- Who benefits: Borrowers can review documents before downloading or acknowledging them, reducing confusion during the loan process.

**Screenshots:**
- `screenshots/98783_1.png`

---

### 🆕 NEW: Create Document Delivery Task - Action Screen - Download Document
**Ticket:** [#98784](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98784)
**Type:** User Story

**Summary:**
- Added a 'Download Document' Button to the Document Delivery Task in the Home Portal
- What changed: A clearly styled Download button with a download icon is now available on the Document Delivery task action screen, allowing borrowers to save required loan documents to their device.
- Who benefits: Borrowers can easily save required loan documents directly from the Home Portal task flow.

**Screenshots:**
- `screenshots/98784_1.png`

---

### 🆕 NEW: Implement Borrower Portal JV Brand Experience | Next Mortgage
**Ticket:** [#98959](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98959)
**Type:** User Story

**Summary:**
- Implemented Next Mortgage Joint Venture Branding in the Borrower Home Portal
- What changed: The Home Portal now displays the Next Mortgage brand for borrowers whose loans originated through a Next Mortgage joint venture loan officer.
- Who benefits: Borrowers see a consistent branded experience in the portal that matches the brand they applied through, reducing confusion after loan submission.
- Technical context: Portal branding is determined by the loan officer's JV domain association, extending the same branding logic used in the SmartApp.

**Screenshots:**
- `screenshots/98959_1.png`

---

### 🔍 SPIKE: Invite Borrower to Home Portal - Architecture/Implementation Design - 16 hrs
**Ticket:** [#87052](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87052)
**Type:** Spike

**Summary:**
- Completed Architecture Design Spike: Inviting Borrowers to the Home Portal
- What was researched: Architecture and implementation design for inviting borrowers to the Home Portal, including branding determination, loan data requirements, and borrower identity management.
- Key findings: JV loans will not be supported in the initial release; CMG Home Loans and Bank CMG branding will be determined by the URL domain; non-SmartApp loans require a minimal data profile; BorrowerID must be captured alongside LoanID to support multi-application borrowers.
- Next steps: Implementation can proceed using the defined EPS contract requirements and the architectural decisions documented here as guardrails.

**Screenshots:**
- `screenshots/87052_1.png`

---

## SmartApp (2 items)

### 🆕 NEW: SmartApp | [Phase 1] 1. Enable Team-Based �Apply Now URL� in SmartApp
**Ticket:** [#92996](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92996)
**Type:** User Story

**Summary:**
- Enabled Team-Based 'Apply Now' URLs in SmartApp So Lending Teams Can Share a Single Application Link
- What changed: SmartApp now recognizes team slugs in the URL alongside individual loan officer IDs, routing applicants to the correct team-based application workflow.
- Who benefits: Borrowers clicking a team's 'Apply Now' link are taken to the right application experience without errors, even when no specific loan officer is identified in the link.
- Technical context: URL query parameter parsing now distinguishes between individual LO IDs and team slugs, triggering separate data-fetching and rendering workflows accordingly.

**Screenshots:**
- `screenshots/92996_1.png`

---

### 🆕 NEW: Implement SmartApp JV Brand Experience | Next Mortgage
**Ticket:** [#98958](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98958)
**Type:** User Story

**Summary:**
- Implemented Next Mortgage Joint Venture Branding Throughout the SmartApp Loan Application
- What changed: The SmartApp now fully renders the Next Mortgage brand - logo, colors, and visual identity - for borrowers applying through a Next Mortgage joint venture loan officer.
- Who benefits: Borrowers applying with a Next Mortgage loan officer see a consistent branded experience from start to finish, confirming they are in the correct application.
- Technical context: Brand rendering is driven by the loan officer's associated JV domain, using the same domain-based branding pattern established for CMG Home Loans and Bank CMG.

**Screenshots:**
- `screenshots/98958_1.png`

---

## Servicing (4 items)

### 🆕 NEW: Add Paid in Full indicator to main dashboard
**Ticket:** [#90901](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90901)
**Type:** User Story

**Summary:**
- Added a 'Paid in Full' Indicator to the Main Loan Dashboard
- What changed: The primary mortgage dashboard now displays a clear 'Paid in Full' status for borrowers whose loans have been fully paid off.
- Who benefits: Borrowers who have paid off their mortgage can see their loan status accurately on the dashboard instead of seeing an active loan balance that no longer applies.
- Technical context: Status is sourced from the LoanServ servicing system of record via the Client Services API.

**Screenshots:**
- `screenshots/90901_1.png`

---

### ✨ ENHANCED: Paid in Full account Loan Details card updates
**Ticket:** [#90905](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90905)
**Type:** User Story

**Summary:**
- Updated the Loan Details Card to Reflect Accurate Information for Paid-Off Accounts
- What changed: The Loan Details card on the Mortgage Account dashboard now displays appropriate fields and messaging for LoanServ loans that have been paid in full.
- Who benefits: Borrowers with paid-off mortgages see relevant account details instead of active-loan fields that no longer apply to their situation.
- Technical context: Card rendering logic conditionally adjusts displayed fields based on Paid in Full status from LoanServ.

**Screenshots:**
- `screenshots/90905_1.png`

---

### 🆕 NEW: Add 'Paid in Full' to Documents
**Ticket:** [#99911](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/99911)
**Type:** User Story

**Summary:**
- New Document Type: Notice of Servicing Transfer Added "Notice of Servicing Transfer" (also known as "Goodbye Letter") as a viewable document type in the Documents Center for servicing accounts. This document informs borrowers when their mortgage loan servicing is being transferred to a new servicer in compliance with RESPA requirements. The new document type appears under the "Transfers" filter category, enabling borrowers to access servicing transfer notifications without contacting support. Documents remain accessible until the end of the year following the transfer year.

**Screenshots:**
- `screenshots/99911_1.png`

---

### 🆕 NEW: Bankruptcy disclaimer modal
**Ticket:** [#101485](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/101485)
**Type:** User Story

**Summary:**
- Added a Legal Disclaimer Modal for Borrowers With an Active Bankruptcy or Discharged Loan
- What changed: Borrowers with an active bankruptcy or a discharged loan are now shown a compliance disclaimer modal before accessing their loan details, requiring explicit acknowledgment.
- Who benefits: Borrowers are clearly informed that any payments made on a discharged debt are voluntary, and CMG gains an auditable acknowledgment record for regulatory compliance.
- Technical context: Modal display is triggered by bankruptcy or discharge status flags from LoanServ, and acknowledgment events are logged to create the compliance audit trail.

**Screenshots:**
- `screenshots/101485_1.png`

---

## Sitewide (3 items)

### 🆕 NEW: Implement Email Branding for LOs to reflect JV brand | Next Mortgage
**Ticket:** [#98961](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98961)
**Type:** User Story

**Summary:**
- Extended Email Branding to Reflect the Next Mortgage Joint Venture Brand for Loan Officers on That Domain
- What changed: Transactional emails sent through the platform for Next Mortgage loan officers now display Next Mortgage branding instead of the default CMG Home Loans branding.
- Who benefits: Loan officers at Next Mortgage send correctly branded emails to their borrowers, and borrowers receive communications that match the brand they applied through.
- Technical context: Email branding selection is driven by the loan officer's JV domain, using the new Email module to apply brand-specific templates.

**Screenshots:**
- `screenshots/98961_1.png`

---

### 🆕 NEW: Translations missing Modal
**Ticket:** [#101489](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/101489)
**Type:** User Story

**Summary:**
- Added a Notification Modal for Borrowers Who Navigate to a Page Not Yet Available in Spanish
- What changed: A modal now appears for Spanish-language borrowers when they navigate to a page on cmghomeloans.com that has not yet been fully translated.
- Who benefits: Spanish-speaking borrowers are clearly informed when content is not yet available in their preferred language, rather than encountering untranslated English text without explanation.

**Screenshots:**
- `screenshots/101489_1.png`

---

### 🆕 NEW: Spanish translation revisions required
**Ticket:** [#102017](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/102017)
**Type:** User Story

**Summary:**
- Revised Spanish Translations Across the Platform Based on Professional Translation Service Review
- What changed: Previously deployed Spanish translations were reviewed by a professional translation service and updated to correct inaccuracies across cmghomeloans.com.
- Who benefits: Spanish-speaking borrowers now see more accurate, natural-sounding translations that correctly convey the intended meaning of mortgage-related content.

**Screenshots:**
- `screenshots/102017_1.png`

---

## Tech Enhancements (6 items)

### 🔧 TECH: Initial Implementation of Email Module
**Ticket:** [#95532](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/95532)
**Type:** User Story

**Summary:**
- Implemented a New Email Module to Centralize and Standardize Transactional Email Delivery
- What changed: A dedicated Email module was built under the new modular architecture to encapsulate all email generation and delivery logic in a single, reusable service.
- Who benefits: Future email features can be delivered faster and more reliably, reducing the risk of inconsistent email delivery for borrowers and loan officers.
- Technical context: The module follows the platform's modular architecture pattern and serves as the foundation for upcoming email branding and notification features.

**Screenshots:**
- `screenshots/95532_1.png`

---

### 🔧 TECH: Fix selenium broken tests
**Ticket:** [#99913](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/99913)
**Type:** User Story

**Summary:**
- Fixed 33 Failing Selenium End-to-End Tests Caused by a SmartApp-Related Regression
- What changed: A known SmartApp issue causing 33 automated Selenium tests to fail was identified and resolved, restoring the end-to-end test suite to a passing state.
- Who benefits: The development team has reliable automated test coverage again, reducing the risk of undetected regressions in future releases.
- Technical context: The underlying issue was affecting Selenium test execution only and had no impact on production behavior.

**Screenshots:**
- `screenshots/99913_1.png`

---

### 🔧 TECH: Fix Aria-Description Translation Keys in Smart App
**Ticket:** [#101476](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/101476)
**Type:** User Story

**Summary:**
- Fixed Accessibility Labels in SmartApp That Were Displaying Raw Translation Keys Instead of Readable Text
- What changed: Aria-description attributes throughout the SmartApp now display properly translated, human-readable strings rather than raw translation keys such as CONSENT.PHONE.LABEL.
- Who benefits: Borrowers using screen readers and other assistive technology now hear meaningful descriptions instead of confusing internal identifiers when navigating the application.
- Technical context: Translation binding was applied to aria-description attributes across affected SmartApp components to resolve the i18n rendering gap.

**Screenshots:**
- `screenshots/101476_1.png`

---

### 🔧 TECH: Introduce SystemIntegrations Module Structure
**Ticket:** [#101648](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/101648)
**Type:** User Story

**Summary:**
- Introduced a Formal SystemIntegrations Module to Organize Third-Party Service Connections
- What changed: A dedicated SystemIntegrations module was introduced to consolidate and standardize how external service integrations are structured within the codebase.
- Who benefits: The development team gains a cleaner, more maintainable foundation for adding and managing integrations with external systems, reducing future technical debt.
- Technical context: The module follows the platform's modular architecture conventions and was created as a follow-on to prior SystemIntegrations scaffolding work.

**Screenshots:**
- `screenshots/101648_1.png`

---

### 🔧 TECH: Modify EF AuditInfo logic to use DateTimeOffset in Code
**Ticket:** [#101839](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/101839)
**Type:** User Story

**Summary:**
- Standardized Date and Time Handling in the Codebase to Use DateTimeOffset Throughout
- What changed: Entity Framework AuditInfo logic was updated to use DateTimeOffset instead of DateTime, aligning with the platform standard for timezone-aware date handling.
- Who benefits: Data integrity is improved for time-sensitive audit events, reducing the risk of timezone-related discrepancies in audit logs and compliance reporting.
- Technical context: Change targets the ConX EF audit infrastructure; both code and database usage of DateTime types are being standardized to DateTimeOffset per platform convention.

**Screenshots:**
- `screenshots/101839_1.png`

---

### 🔍 SPIKE: Improve Sensitive-Data Logging Infrastructure for Request Logging [16HRS]
**Ticket:** [#101112](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/101112)
**Type:** Spike

**Summary:**
- Researched a Targeted Strategy for Redacting Sensitive Data from Request Logs
- What was researched: A more precise approach for redacting sensitive data from request logs, as an improvement over the existing method that disables logging entirely for sensitive API paths.
- Key findings: The current brute-force approach sacrifices observability; configurable field-level redaction was evaluated as the preferred replacement to preserve audit capability while protecting sensitive borrower data.
- Next steps: Findings unblock a proper implementation of field-level log redaction that balances security and operational visibility.

**Screenshots:**
- `screenshots/101112_1.png`

---

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

**Generated:** 2026-04-23
**Source:** Azure DevOps - Consumer Experience Project
