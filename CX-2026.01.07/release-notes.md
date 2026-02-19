# CX Sprint 2026.01.07 Release Notes

**Sprint Dates:** December 11, 2025 - January 7, 2026
**Release Date:** TBD

---

## Home Portal (12 items)

### 🗑️ REMOVED: Remove 'Change Since' on Home Value card
**Ticket:** [#29709](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/29709)
**Type:** User Story

**Summary:**
- Removed the 'Change Since' date field from Home Value cards across the Home Portal dashboard and Your Homes page to reduce borrower confusion. This field was not functioning correctly in production, and removing it streamlines the home value information display. The estimated equity field now takes its place for improved clarity.

**Screenshots:**
- `screenshots/29709_1.png`

---

### 🆕 NEW: Workflow - Borrower Auth Doc Request
**Ticket:** [#85234](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85234)
**Type:** User Story

**Summary:**
- Enabled automatic ordering of the Borrower Authentication Verification disclosure package immediately upon SmartApp submission, rather than waiting until the loan reaches LE Pending status. When the OrdBorrAuth feature flag is enabled, the system validates required borrower data (phone, email, SSN) and triggers the Pre-Disclosure package via Docutech. This improves borrower onboarding, accelerates identity verification, and increases application-to-disclosure conversion rates.

**Screenshots:**
- `screenshots/85234_1.png`

---

### ✨ ENHANCED: After Mortgage Account SSO Redirect, update header links to use referral domain
**Ticket:** [#87521](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87521)
**Type:** User Story

**Summary:**
- Enhanced the Home Portal navigation to maintain referral domain context after SSO redirects. When borrowers from Bank CMG or JV domains are redirected to view CMG-serviced loan details on the CMGHL domain, all header navigation links now route users back to their original domain, providing a seamless cross-domain experience while preserving brand-specific navigation context.

**Screenshots:**
- `screenshots/87521_1.png`

---

### 🆕 NEW: Create Your Homes feature flag
**Ticket:** [#89994](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89994)
**Type:** User Story

**Summary:**
- Added user-level feature flag control for the Your Homes page in the Home Portal, allowing administrators to control access per user. When enabled, the Your Homes navigation link is removed from both desktop header navigation and mobile/tablet footer navigation. The feature defaults to disabled (Your Homes visible) in production.

**Screenshots:**
- `screenshots/89994_1.png`

---

### 🐛 FIX: Showing multiple loading states when loading a loan detail dashboard
**Ticket:** [#87544](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87544)
**Type:** Bug

**Summary:**
- Resolved an issue where multiple loading states were displaying simultaneously when accessing the loan detail dashboard, providing users with a single, consistent loading indicator for improved visual clarity.

**Screenshots:**
- `screenshots/87544_1.png`

---

### 🐛 FIX: My Profile - Back button takes the user to the Oops! page.
**Ticket:** [#87623](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87623)
**Type:** Bug

**Summary:**
- Corrected a navigation issue where clicking the back button on the My Profile page incorrectly redirected users to an error page. The back button now properly returns users to their previous page location.

**Screenshots:**
- `screenshots/87623_1.png`

---

### 🐛 FIX: User is not redirected to the login screen when they get a 401 error while unauthenticated
**Ticket:** [#90879](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90879)
**Type:** Bug

**Summary:**
- Corrected an issue where unauthenticated users receiving a 401 error were not automatically redirected to the login screen. Users now receive proper authentication prompts when their session expires or authentication is required.

**Screenshots:**
- `screenshots/90879_1.png`

---

### 🐛 FIX: Verify with Plaid/Truv button does nothing after you refresh the page while on the autofill accounts route
**Ticket:** [#91080](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91080)
**Type:** Bug

**Summary:**
- Resolved an issue where the 'Verify with Plaid' or 'Verify with Truv' buttons became unresponsive after refreshing the page on the autofill accounts route. The verification buttons now function correctly even after page reloads during the asset verification process.

**Screenshots:**
- `screenshots/91080_1.png`

---

### 🐛 FIX: SSO Redirect - Opening Nav links in a new tab does not redirect.
**Ticket:** [#91146](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91146)
**Type:** Defect

**Summary:**
- Resolved a defect where navigation links opened in a new tab from the BankCMG portal failed to redirect users through SSO to the correct domain. Links opened in new tabs now properly complete the SSO redirect, ensuring users land on the correct domain-specific page.

**Screenshots:**
- `screenshots/91146_1.png`

---

### 🐛 FIX: Login Dialog is not closing after logging in during loan application flow
**Ticket:** [#91539](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91539)
**Type:** Bug

**Summary:**
- Corrected an issue where the login dialog remained open after successful authentication during the loan application flow. The login modal now properly closes upon successful login, allowing users to continue their application seamlessly.

**Screenshots:**
- `screenshots/91539_1.png`

---

### 🐛 FIX: Home Affordability Calculator Displaying Incorrect Principal Calculation
**Ticket:** [#91691](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91691)
**Type:** Bug

**Summary:**
- Corrected an inaccurate principal calculation in the Home Affordability Calculator. The calculator now displays the correct principal amount based on user inputs, providing borrowers with accurate home affordability estimates for better financial planning.

**Screenshots:**
- `screenshots/91691_1.png`

---

### 🐛 FIX: Clicking any of the header links does not navigate you away from the tasks dashboard
**Ticket:** [#92070](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92070)
**Type:** Bug

**Summary:**
- Resolved a navigation issue where clicking header links from the tasks dashboard failed to navigate users to the intended pages. All header navigation links now function correctly from the tasks dashboard, allowing users to freely navigate throughout the portal.

**Screenshots:**
- `screenshots/92070_1.png`

---

## SmartApp (8 items)

### ✨ ENHANCED: Update to Plaid VOA prefill question to match Truv VOIE
**Ticket:** [#64816](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/64816)
**Type:** User Story

**Summary:**
- Updated the SmartApp asset verification flow to provide a consistent experience between Plaid and Truv VOIE integrations. When borrowers choose to auto-fill their assets, they now see a redesigned selection screen with security badges and detailed descriptions for both verification options. This feature is gated behind the isTruvVOIEEnabled feature flag and remains disabled in production.

**Screenshots:**
- `screenshots/64816_1.png`

---

### 🆕 NEW: Truv Branding CMG Template
**Ticket:** [#86402](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86402)
**Type:** User Story

**Summary:**
- Implemented domain-specific branding for the Truv income verification component within SmartApp. Borrowers applying through Bank CMG domains now see Bank CMG-branded Truv templates, while those on CMG Home Loans domains see CMG Home Loans branding. Once an order is created with specific branding, it persists even if the user crosses domains.

**Screenshots:**
- `screenshots/86402_1.png`

---

### 🆕 NEW: Reroute View Button to SSO
**Ticket:** [#87510](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87510)
**Type:** User Story

**Summary:**
- Implemented single sign-on redirect functionality for borrowers viewing CMG-serviced loans from Bank CMG or JV domains. When users click 'View' on a CMG-serviced loan, they are automatically redirected via SSO to the secure.cmghomeloans.com domain, ensuring payment management and servicing functionality remain centralized on the CMG Home Loans domain.

**Screenshots:**
- `screenshots/87510_1.png`

---

### 🆕 NEW: Plaid Branding Bank CMG Template
**Ticket:** [#89963](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89963)
**Type:** User Story

**Summary:**
- Implemented domain-specific branding for the Plaid asset verification component within SmartApp. Borrowers applying through Bank CMG domains now see Bank CMG-branded messaging, while those on CMG Home Loans domains see CMG Home Loans branding. Once a Plaid order is created with specific branding, it persists even if the user crosses domains.

**Screenshots:**
- `screenshots/89963_1.png`

---

### 🐛 FIX: Wrong SmartApp Date in Byte
**Ticket:** [#86150](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86150)
**Type:** Bug

**Summary:**
- Corrected an issue where SmartApp submission dates were being recorded incorrectly in Byte, ensuring accurate date/time stamps are properly synchronized between SmartApp and Byte for improved loan tracking and reporting accuracy.

**Screenshots:**
- `screenshots/86150_1.png`

---

### 🐛 FIX: Name mismatch check should be case insensitive and trim whitespace
**Ticket:** [#90029](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90029)
**Type:** Bug

**Summary:**
- Improved SmartApp name mismatch validation to be case-insensitive and automatically trim whitespace, preventing false validation errors when borrower names contain different capitalization or extra spaces during the application process.

**Screenshots:**
- `screenshots/90029_1.png`

---

### 🐛 FIX: User receives error when progressing in loan application - no BorrowerGUID when redirected back to in-progress application after logging in after being logged out for inactivity
**Ticket:** [#90042](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90042)
**Type:** Bug

**Summary:**
- Resolved an error where borrowers were unable to continue their loan application after being logged out due to inactivity. The fix ensures BorrowerGUID is properly restored when users log back in and are redirected to their in-progress application, allowing seamless continuation.

**Screenshots:**
- `screenshots/90042_1.png`

---

### 🐛 FIX: Smart App | Mobile User borrower information has no active borrowers, no primary borrower, data gets split across borrowers
**Ticket:** [#91566](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91566)
**Type:** Bug

**Summary:**
- Resolved a critical data integrity issue where mobile SmartApp users experienced borrower information being split across multiple borrower records with no active or primary borrower designation. The fix ensures borrower data is properly consolidated and maintains correct active and primary borrower flags during mobile application sessions.

**Screenshots:**
- `screenshots/91566_1.png`

---

## Servicing (5 items)

### 🆕 NEW: Add 'Notice of Service Transfer' to Documents
**Ticket:** [#89926](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89926)
**Type:** User Story

**Summary:**
- Added 'Notice of Servicing Transfer' (also known as 'Goodbye Letter') as a viewable document type in the Documents Center for servicing accounts. This document informs borrowers when their mortgage loan servicing is being transferred to a new servicer in compliance with RESPA requirements, appearing under the 'Transfers' filter category. Documents remain accessible until the end of the year following the transfer year.

**Screenshots:**
- `screenshots/89926_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.48.0
**Ticket:** [#91079](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91079)
**Type:** User Story

**Summary:**
- Upgraded Aspen Grove widgets to version 1.48.0, addressing critical payment timing and validation issues. Key improvements include fixed monthly AutoPay eligibility logic, corrected monthly payment amount calculations for one-time payments, enhanced error messaging for bank account validations, and comprehensive unit tests for date calculations across all time zones. These changes ensure accurate payment processing regardless of user location.

**Screenshots:**
- `screenshots/91079_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.49.0
**Ticket:** [#91546](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91546)
**Type:** User Story

**Summary:**
- Upgraded Aspen Grove widgets to version 1.49.0, adding support for escrow-only additional payments during off-cycle payment scenarios. The update enables three distinct payment types: Additional Principal only, Additional Escrow only, and combined Additional Escrow and Principal. These options are only available when the loan is not due and during off-cycle periods.

**Screenshots:**
- `screenshots/91546_1.png`

---

### 🔍 SPIKE: Research "Payoff Quicker" Calculator [8 hours]
**Ticket:** [#89593](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89593)
**Type:** Spike

**Summary:**
- Completed research on integrating the existing Pay-Off Sooner/Additional Principal Payment calculator into the Servicing Portal. The spike identified that the calculator code resides in ConX UI and should be migrated to the cmg-calculators NPM package for broader reuse. The proposed solution involves extracting the component into the shared NPM package and providing Aspen Grove widgets with a custom URL pattern to serve relevant loan data.

**Screenshots:**
- `screenshots/89593_1.png`

---

### 🔍 SPIKE: Research Feasibility for Standalone Bi-Weekly Mortgage Calculator [8 hours]
**Ticket:** [#89863](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89863)
**Type:** Spike

**Summary:**
- Completed feasibility research for integrating the bi-weekly mortgage calculator as a standalone tool linkable from multiple servicing areas. The calculator exists in the consumer-experience-calculators NPM package and includes complete amortization logic, graph generation, and downloadable CSV export functionality. Recommendations include avoiding embedding the NPM package directly in Aspen Grove widgets to prevent dependency chain complications.

**Screenshots:**
- `screenshots/89863_1.png`

---

## Admin Portal (1 items)

### ✅ TASK: Perform regression testing on Admin portal
**Ticket:** [#91488](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91488)
**Type:** Task

---

## Tech Enhancements (7 items)

### 🔧 TECH: Remove unwanted encoding done to support '+' in contact email
**Ticket:** [#80137](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/80137)
**Type:** User Story

**Summary:**
- Eliminated unnecessary encoding of '+' characters in email addresses within the Conx API, as the Loan Serv API now handles these characters natively. This prevents double encoding and data inconsistencies when users add or update email addresses containing plus signs at both global and account-level Email Preferences pages.

**Screenshots:**
- `screenshots/80137_1.png`

---

### 🔧 TECH: Upgrade ConX API to .NET 10/.SLNX Format
**Ticket:** [#85568](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85568)
**Type:** User Story

**Summary:**
- Upgraded the ConX API solution to .NET 10 framework and converted to the new .SLNX solution format. The updated API builds successfully in both local development environments and CI/CD pipelines, and has been deployed and validated in lower environments to ensure compatibility and responsiveness.

**Screenshots:**
- `screenshots/85568_1.png`

---

### 🔧 TECH: Upgrade ConX Admin API to .NET 10/.SLNX Format
**Ticket:** [#85569](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85569)
**Type:** User Story

**Summary:**
- Upgraded the ConX Admin API solution to .NET 10 framework and converted to the new .SLNX solution format. The updated API builds successfully in both local development environments and CI/CD pipelines, and has been deployed and validated in lower environments to ensure compatibility and responsiveness.

**Screenshots:**
- `screenshots/85569_1.png`

---

### 🔧 TECH: Upgrade ConX Third Party API to .NET 10/.SLNX Format
**Ticket:** [#85570](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85570)
**Type:** User Story

**Summary:**
- Upgraded the ConX Third Party API solution to .NET 10 framework and converted to the new .SLNX solution format. The updated API builds successfully in both local development environments and CI/CD pipelines, and has been deployed and validated in lower environments to ensure compatibility and responsiveness.

**Screenshots:**
- `screenshots/85570_1.png`

---

### 🔧 TECH: Update admin api base url
**Ticket:** [#90656](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90656)
**Type:** User Story

**Summary:**
- Updated the admin API base URL configuration to resolve connectivity issues in the development environment, ensuring proper API endpoint routing for admin portal functionality across all environments.

**Screenshots:**
- `screenshots/90656_1.png`

---

### 🔍 SPIKE: Research code related house canary loan officer sync job.
**Ticket:** [#90097](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90097)
**Type:** Spike

**Summary:**
- Investigated recurring 400 Bad Request errors in the HouseCanaryLoanOfficerSync Azure Function related to NMLS ID validation. The research identified that HouseCanary's API requires NMLS IDs to contain only letters and digits, but some loan officers have NMLS IDs with special characters. Findings document root causes and proposed fixes to cleanse and validate NMLS ID data before syncing to prevent synchronization failures.

**Screenshots:**
- `screenshots/90097_1.png`

---

### 🔍 SPIKE: Identify causes and remediation options for build warnings in Conx API, Conx Admin API and Third Party API [16 Hrs]
**Ticket:** [#91638](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91638)
**Type:** Spike

**Summary:**
- Completed comprehensive investigation of build warnings across ConX API, ConX Admin API, and Third Party API solutions. The spike identified root causes of compilation warnings and documented remediation options to improve code quality and ensure cleaner builds. Findings will guide future user stories to systematically address and eliminate build warnings across all three API solutions.

**Screenshots:**
- `screenshots/91638_1.png`

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

**Generated:** 2026-02-11
**Source:** Azure DevOps - Consumer Experience Project
