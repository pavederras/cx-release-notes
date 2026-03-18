# CX Sprint 2026.03.18 Release Notes

**Sprint Dates:** February 19 - March 18, 2026
**Release Date:** TBD

---

## Home Portal (4 items)

### 🆕 NEW: View Authorized Third Party
**Ticket:** [#33066](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/33066)
**Type:** User Story

**Summary:**
- Authorized Third Parties Viewer Added to Home Portal Profile
- What changed: Added a dedicated Authorized Third Parties section to the borrower's Home Portal profile page.
- Who benefits: Borrowers can now view a list of people authorized to speak about their loan on their behalf, along with the full authorization history, without contacting support.

**Screenshots:**
- `screenshots/33066_1.png`

---

### 🆕 NEW: Add Mortgage Periodic Statement - Prior Servicer to Documents
**Ticket:** [#80067](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/80067)
**Type:** User Story

**Summary:**
- Prior Servicer Mortgage Statements Now Available in Documents
- What changed: Added Mortgage Periodic Statement documents from prior servicers to the Home Portal Documents section.
- Who benefits: Borrowers with transferred loans can now access prior servicer statements directly in their document library, eliminating the need to call support.

**Screenshots:**
- `screenshots/80067_1.png`

---

### 🆕 NEW: Create Document Page
**Ticket:** [#89829](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89829)
**Type:** User Story

**Summary:**
- Dedicated Documents Page Added to Home Portal
- What changed: Built a new Documents page in the Home Portal, accessible from the Dashboard via the Documents card.
- Who benefits: Borrowers can browse and access all their mortgage documents from a single organized page instead of navigating multiple sections.

**Screenshots:**
- `screenshots/89829_1.png`

---

### ✨ ENHANCED: Update HouseCanary API calls to use correct ClientID/Secret for BankCMG domain
**Ticket:** [#93519](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93519)
**Type:** User Story

**Summary:**
- Corrected HouseCanary API Credentials for BankCMG Domain
- What changed: Updated HouseCanary API calls to use the correct ClientID and Secret for the BankCMG domain.
- Who benefits: BankCMG users can now successfully claim properties, save homes, and use all home value features that were previously failing due to incorrect API credentials.

**Screenshots:**
- `screenshots/93519_1.png`

---

## SmartApp (2 items)

### ✨ ENHANCED: Update permissible purpose
**Ticket:** [#95040](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/95040)
**Type:** User Story

**Summary:**
- Updated LexisNexis Permissible Purpose Code in SmartApp
- What changed: Updated the permissible purpose value sent to LexisNexis in identity verification API calls to use the correct regulatory code.
- Who benefits: Loan applicants' identity verification requests are submitted with the correct compliance purpose code, ensuring adherence to LexisNexis data usage requirements.

**Screenshots:**
- `screenshots/95040_1.png`

---

### 🆕 NEW: Fix TRUV Timeout Issue
**Ticket:** [#95438](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/95438)
**Type:** User Story

**Summary:**
- Fixed TRUV Session Timeout Leaving Mortgage Applications Stuck
- What changed: Fixed a bug where a TRUV income and employment verification session that times out or is abandoned by the borrower could leave the mortgage application in an unrecoverable state.
- Who benefits: Borrowers who start but don't complete TRUV income verification can now continue their application without needing a support team member to manually reset the process.

**Screenshots:**
- `screenshots/95438_1.png`

---

## Servicing (6 items)

### 🆕 NEW: Add Payoff Quicker Function to Payment Card
**Ticket:** [#93311](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93311)
**Type:** User Story

**Summary:**
- Added a payoff calculator to the payment card in the servicing view.
- What changed: Introduced a 'Pay Off Quicker' calculator widget on the Home Portal payment card that lets borrowers model the impact of additional payments.
- Who benefits: Borrowers can instantly see how extra payments reduce their outstanding loan balance and shorten their payoff timeline, without leaving the portal.

**Screenshots:**
- `screenshots/93311_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.55.0
**Ticket:** [#95551](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/95551)
**Type:** User Story

**Summary:**
- Upgraded Aspen Grove Servicing Widgets to v1.55.0
- What changed: Updated the Aspen Grove servicing widget library to version 1.55.0, incorporating multiple feedback-driven improvements to escrow and payment displays.
- Who benefits: Borrowers see improved messaging in Escrow Details, clearer escrow shortage notifications, and the AutoPay setup button now correctly disables when setup is unavailable.

**Screenshots:**
- `screenshots/95551_1.png`

---

### ✨ ENHANCED: Updates to Payoff Quicker and Lump Sum calculators
**Ticket:** [#97318](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/97318)
**Type:** User Story

**Summary:**
- Updated Payoff Quicker and Lump Sum Payment Calculators
- What changed: Made accuracy and clarity improvements to the Payoff Quicker and Lump Sum principal payment calculators in the Home Portal.
- Who benefits: Borrowers get more accurate projections when exploring how extra principal payments would reduce their loan term and total interest paid.

**Screenshots:**
- `screenshots/97318_1.png`

---

### 🆕 NEW: Add feature flag for Calculator page
**Ticket:** [#97375](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/97375)
**Type:** User Story

**Summary:**
- Added Feature Flag to Control Calculator Page Visibility in Navigation
- What changed: Introduced a feature flag in the Admin Portal that controls whether the Calculator page appears in the Home Portal's top navigation menu.
- Who benefits: Administrators can enable or disable the Calculator navigation item per environment without requiring a code deployment.

**Screenshots:**
- `screenshots/97375_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.56.0
**Ticket:** [#98104](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98104)
**Type:** User Story

**Summary:**
- Upgraded Aspen Grove Servicing Widgets to v1.56.0
- What changed: Updated the Aspen Grove servicing widget library to version 1.56.0, introducing a new 'Paid in Full' account detection feature with tailored UI changes.
- Who benefits: Borrowers with fully paid-off loans see a streamlined UI that hides irrelevant actions like future payment scheduling, while their full payment history remains accessible.

**Screenshots:**
- `screenshots/98104_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.57.0
**Ticket:** [#98876](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98876)
**Type:** User Story

**Summary:**
- Upgraded Aspen Grove Servicing Widgets to v1.57.0
- What changed: Updated the Aspen Grove servicing widget library to version 1.57.0, adding a 'Maximum Pre Pay' safeguard to the Payments widget.
- Who benefits: Borrowers who have reached their maximum prepayment limit for the current month see a clear explanatory message and cannot accidentally submit a duplicate one-time payment.

**Screenshots:**
- `screenshots/98876_1.png`

---

## Sitewide (3 items)

### 🆕 NEW: Long-Term SSO : Switch to Hosted Login
**Ticket:** [#92590](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92590)
**Type:** User Story

**Summary:**
- Seamless Single Sign-On Across CMG Domains via Hosted Login
- What changed: Switched the SSO login flow to a hosted login experience that supports seamless cross-domain authentication between BankCMG and CMG Home Loans.
- Who benefits: Borrowers can move between BankCMG and CMG Home Loans sites without re-entering credentials, while each domain's login page reflects the correct brand identity.
- Technical context: Migrated to a hosted login integration to support long-term SSO, resolving cross-domain session management limitations of the previous implementation.

**Screenshots:**
- `screenshots/92590_1.png`

---

### 🆕 NEW: Implement Spanish translation to SmartApp/HomePortal using native Angular localization
**Ticket:** [#93148](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93148)
**Type:** User Story

**Summary:**
- Implemented Spanish language localization for SmartApp and Home Portal.
- What changed: Added Spanish translation support using Angular's native i18n localization framework across SmartApp and Home Portal.
- Who benefits: Spanish-speaking borrowers can now navigate the application in their preferred language, improving accessibility for a broader customer base.
- Technical context: Built on Angular's built-in localization system for long-term maintainability and straightforward addition of future languages.

**Screenshots:**
- `screenshots/93148_1.png`

---

### 🆕 NEW: Implement Spanish translation Phase 2 (API/Alerts)
**Ticket:** [#95525](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/95525)
**Type:** User Story

**Summary:**
- Spanish Language Support Extended to API Responses and System Alerts
- What changed: Extended Spanish localization to cover API response messages and system alerts across the Home Portal and SmartApp.
- Who benefits: Spanish-speaking borrowers now see system messages, notifications, and alerts in Spanish, completing the second phase of the platform's localization rollout.
- Technical context: Builds on Phase 1 Angular UI localization by adding Spanish translations to back-end API messages and the alerting infrastructure.

**Screenshots:**
- `screenshots/95525_1.png`

---

## Tech Enhancements (8 items)

### 🔧 TECH: Fix duplicate claimHome API calls causing 109K+ weekly 409 errors
**Ticket:** [#93412](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93412)
**Type:** User Story

**Summary:**
- Fixed Duplicate Home-Claim API Calls That Generated 109K+ Weekly Errors
- What changed: Resolved the root cause of duplicate claimHome API calls that were generating over 109,000 failed requests per week in the ConX API.
- Who benefits: Borrowers experience fewer background errors during Home Portal initialization, and the platform's API reliability improves significantly on home claim requests.
- Technical context: Fixed the trigger logic for the claimHome endpoint, eliminating duplicate calls and reducing weekly 409 conflict errors from 109,724 to near zero (17.7% failure rate resolved).

**Screenshots:**
- `screenshots/93412_1.png`

---

### 🔧 TECH: Modify Home Portal to use new Alert Endpoints
**Ticket:** [#93862](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93862)
**Type:** User Story

**Summary:**
- Home Portal Migrated to Updated Alert API Endpoints
- What changed: Updated the Home Portal's announcement and alert display infrastructure to consume the new Alerts API endpoints.
- Who benefits: Borrowers continue to receive timely system alerts and announcements, now powered by a more reliable and maintainable alerting backend.
- Technical context: Aligns Home Portal with the new alerting system, replacing the legacy endpoint integration.

**Screenshots:**
- `screenshots/93862_1.png`

---

### 🔧 TECH: Change Alert Messages to explicitly use "en-US" as fallback culture
**Ticket:** [#95273](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/95273)
**Type:** User Story

**Summary:**
- Standardized Alert Message Locale to English (US)
- What changed: Alerts now explicitly use 'en-US' as the fallback culture instead of inheriting the server's current culture setting.
- Who benefits: Borrowers consistently receive alert messages in English rather than seeing unexpected language or formatting variations caused by server locale differences.
- Technical context: Replaces the implicit CultureInfo.CurrentCulture fallback in the Alerts API with an explicit 'en-US' override.

**Screenshots:**
- `screenshots/95273_1.png`

---

### 🔧 TECH: Allow for "Global All/Any" for Tag Matching in Alerts
**Ticket:** [#96601](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/96601)
**Type:** User Story

**Summary:**
- Added Global All/Any Tag Matching Option to the Alerts System
- What changed: Extended the Alerts API to support a global 'All' or 'Any' matching mode across tag criteria, in addition to per-tag matching rules.
- Who benefits: System administrators can configure more precise alert targeting rules, ensuring borrowers only receive alerts that match all, or at least one, of a defined tag set.

**Screenshots:**
- `screenshots/96601_1.png`

---

### 🔧 TECH: Add web app restart to CX deployments
**Ticket:** [#96701](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/96701)
**Type:** User Story

**Summary:**
- Added Automatic Web App Restart to CX Deployment Pipeline
- What changed: Added an automatic web app restart step to the CX deployment process to ensure updated code is picked up correctly after each release.
- Who benefits: Reduces the risk of deployments silently running stale code, improving the reliability and predictability of production releases across all CX applications.

**Screenshots:**
- `screenshots/96701_1.png`

---

### 🔧 TECH: Add documentation for local container support
**Ticket:** [#97881](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/97881)
**Type:** User Story

**Summary:**
- Added Local Container Documentation for SQL Server Development Setup
- What changed: Added developer documentation for running SQL Server locally using Docker containers as an alternative to direct installation.
- Who benefits: Developers can set up a consistent local SQL environment without installing SQL Server 2025 natively, reducing onboarding friction and resolving local setup compatibility issues.

**Screenshots:**
- `screenshots/97881_1.png`

---

### 🔧 TECH: Add Google Tag Manager back to SmartApp
**Ticket:** [#98006](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/98006)
**Type:** User Story

**Summary:**
- Restored Google Tag Manager Integration in SmartApp
- What changed: Re-added Google Tag Manager (GTM) to SmartApp after cross-team alignment confirmed its active usage requirements.
- Who benefits: Analytics and marketing teams regain the ability to track user events in SmartApp through GTM without requiring additional engineering changes.

**Screenshots:**
- `screenshots/98006_1.png`

---

### 🔧 TECH: Update Docker documentation
**Ticket:** [#99123](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/99123)
**Type:** User Story

**Summary:**
- Improved Docker Local Database Setup Documentation
- What changed: Updated LOCAL_DATABASE_SETUP.md with clarity improvements, including SQL Server memory limit configuration (MSSQL_MEMORY_LIMIT_MB=2048) across all Docker run commands.
- Who benefits: Developers setting up local environments experience less memory pressure and have clearer, more reliable guidance for Docker-based SQL Server configuration.

**Screenshots:**
- `screenshots/99123_1.png`

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

**Generated:** 2026-03-18
**Source:** Azure DevOps - Consumer Experience Project
