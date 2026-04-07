# CX Sprint 2026.04.01 Release Notes

**Sprint Dates:** March 12 - April 1, 2026
**Release Date:** TBD

---

## Home Portal (3 items)

### 🆕 NEW: Create Document Delivery Task - Action Screen
**Ticket:** [#79214](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/79214)
**Type:** User Story

**Summary:**
- Built the Document Delivery Task Detail Page for Borrowers
- What changed: Added a Document Delivery task action screen to the Home Portal that shows task details in both Pending and Completed states, with a 'Done' button borrowers can tap to acknowledge receipt.
- Who benefits: Borrowers can open a staged document task, review what their Loan Officer has sent them, and mark it complete � with instant on-screen confirmation and graceful handling if anything goes wrong.
- Technical context: The 'Done' action sends a POST to set the BorrowerViewable tag in Clear Docs; UI uses optimistic updates with toast notifications and silent failure fallback.

**Screenshots:**
- `screenshots/79214_1.png`

---

### 🆕 NEW: Create Document Delivery Task - Task List
**Ticket:** [#79220](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/79220)
**Type:** User Story

**Summary:**
- Added Document Delivery Tasks to the Home Portal Task List
- What changed: Surfaced Document Delivery tasks in the borrower's Home Portal task list, pulling from Clear Docs documents tagged for borrower delivery.
- Who benefits: Borrowers can now see at a glance which documents their Loan Officer has staged for them to review, without needing a separate notification or login to another system.
- Technical context: Tasks are sourced from Clear Docs documents with the BorrowerDeliverable tag, served via the home-portal-document-delivery repository.

**Screenshots:**
- `screenshots/79220_1.png`

---

### 🆕 NEW: Phase 3 Localization - Okta Hosted Login Page Language Support
**Ticket:** [#98918](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98918)
**Type:** User Story

**Summary:**
- Extended Spanish Language Support to the Okta Login Page
- What changed: The Okta-hosted login page now reads the borrower's language preference from the Angular app and displays in Spanish when selected, closing the final gap in end-to-end localization.
- Who benefits: Spanish-speaking borrowers experience a fully consistent Spanish interface from the first screen through authentication no unexpected switch to English at login.
- Technical context: Phase 3 of the Transloco-based EN/ES localization effort; passes the active language to the Okta login template via the existing ?lang= parameter, wiring okta-templates/login.html to the app's language state.

**Screenshots:**
- `screenshots/98918_1.png`

---

## Sitewide (1 items)

### 🆕 NEW: Configure JV Domain & Okta SSO Authentication | Next Mortgage
**Ticket:** [#98957](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98957)
**Type:** User Story

**Summary:**
- Enabled Branded SSO Authentication for Next Mortgage Joint Venture Domain
- What changed: Configured Okta SSO so borrowers entering through the Next Mortgage joint venture domain are routed through the centralized auth.securecmg.com login page and returned to the correct JV-branded experience after authentication.
- Who benefits: Borrowers accessing the platform via a Next Mortgage URL see a seamless, brand-consistent login experience without being redirected to an unbranded or mismatched page.
- Technical context: Involves JV domain routing configuration and Okta SSO setup linking the partner domain to the shared Okta-hosted login at auth.securecmg.com.

**Screenshots:**
- `screenshots/98957_1.png`

---

## Tech Enhancements (2 items)

### 🔧 TECH: Upgrade to Angular 21
**Ticket:** [#66812](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/66812)
**Type:** User Story

**Summary:**
- Upgraded the Application Framework to Angular 21
- What changed: Migrated the CX application from Angular 19 to Angular 21 via the official two-step path (v19 to v20 to v21), including updates to PrimeNG and other Angular-dependent libraries.
- Who benefits: Engineering teams gain access to the latest framework improvements, security patches, and performance enhancements that keep the platform current and maintainable.
- Technical context: Migration followed the angular.dev update guide; Aspen Grove widgets were coordinated to upgrade simultaneously to maintain compatibility.

**Screenshots:**
- `screenshots/66812_1.png`

---

### 🔧 TECH: Update firewall rule in pipelines
**Ticket:** [#99914](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/99914)
**Type:** User Story

**Summary:**
- Fixed Race Condition Causing Intermittent Firewall Rule Failures in CI/CD Pipelines
- What changed: Resolved a race condition in the deployment pipelines where firewall rule additions would sporadically fail, causing build interruptions.
- Who benefits: Engineering teams see more reliable, consistent pipeline runs with fewer intermittent deployment failures requiring manual retries.
- Technical context: Pipeline script updated to handle firewall rule provisioning sequentially, eliminating the timing conflict that triggered the failure.

**Screenshots:**
- `screenshots/99914_1.png`

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

**Generated:** 2026-04-07
**Source:** Azure DevOps - Consumer Experience Project
