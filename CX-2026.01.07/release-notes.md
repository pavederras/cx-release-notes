# CX Sprint 2026.01.07 Release Notes

**Sprint Dates:** December 11, 2025 - January 7, 2026
**Release Date:** TBD

---

## Home Portal (12 items)

### 🗑️ REMOVED: Remove 'Change Since' on Home Value card
**Ticket:** [#29709](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/29709)
**Type:** User Story

**Summary:**
- Simplified Home Value Display Removed the 'Change Since' date field from Home Value cards across the Home Portal dashboard and Your Homes page to reduce borrower confusion. This field was not functioning correctly in production, and removing it streamlines the home value information display. The estimated equity field now takes the place of the removed date field for improved clarity.

**Screenshots:**
- `screenshots/29709_1.png`

---

### 🆕 NEW: Workflow - Borrower Auth Doc Request
**Ticket:** [#85234](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85234)
**Type:** User Story

**Summary:**
- Early Borrower Authentication Verification Ordering Enabled automatic ordering of the Borrower Authentication Verification disclosure package immediately upon SmartApp submission, rather than waiting until the loan reaches LE Pending status. When the OrdBorrAuth feature flag is enabled, the system validates required borrower data (phone, email, SSN), augments the Byte loan creation with predefined field values, and triggers the Pre-Disclosure package via Docutech. This early ordering improves borrower onboarding, accelerates identity verification, and increases application-to-disclosure conversion rates. The feature includes validation safeguards and does not block loan creation if validation fails.

**Screenshots:**
- `screenshots/85234_1.png`

---

### ✨ ENHANCED: After Mortgage Account SSO Redirect, update header links to use referral domain
**Ticket:** [#87521](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87521)
**Type:** User Story

**Summary:**
- Persistent Domain Navigation After SSO Redirect Enhanced the Home Portal navigation to maintain referral domain context after SSO redirects. When borrowers from Bank CMG or JV domains are redirected to view CMG-serviced loan details on the CMGHL domain, all header navigation links (Dashboard, Your Homes, Calculators, Apply Now, and avatar menu options) now route users back to their original domain. This provides a seamless cross-domain experience while preserving brand-specific navigation context.

**Screenshots:**
- `screenshots/87521_1.png`

---

### 🆕 NEW: Create Your Homes feature flag
**Ticket:** [#89994](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89994)
**Type:** User Story

**Summary:**
- Your Homes Feature Flag Implementation Added user-level feature flag control for the Your Homes page in the Home Portal. When enabled, the Your Homes navigation link is removed from both desktop header navigation and mobile/tablet footer navigation, allowing administrators to control access per user. The feature defaults to disabled (Your Homes visible) in production. All other features within the Home Portal, including Home Search and property value tracking, continue to function normally regardless of flag status.

**Screenshots:**
- `screenshots/89994_1.png`

---

### 🐛 FIX: Showing multiple loading states when loading a loan detail dashboard
**Ticket:** [#87544](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87544)
**Type:** Bug

**Summary:**
- Fixed Multiple Loading Indicators Resolved an issue where multiple loading states were displaying simultaneously when accessing the loan detail dashboard. Users now see a single, consistent loading indicator for improved user experience and visual clarity.

**Screenshots:**
- `screenshots/87544_1.png`

---

### 🐛 FIX: My Profile - Back button takes the user to the Oops! page.
**Ticket:** [#87623](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87623)
**Type:** Bug

**Summary:**
- Fixed My Profile Back Button Navigation Corrected a navigation issue where clicking the back button on the My Profile page incorrectly redirected users to an error page. The back button now properly returns users to their previous page location.

**Screenshots:**
- `screenshots/87623_1.png`

---

### 🐛 FIX: User is not redirected to the login screen when they get a 401 error while unauthenticated
**Ticket:** [#90879](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90879)
**Type:** Bug

**Summary:**
- Fixed Authentication Redirect on 401 Error Corrected an issue where unauthenticated users receiving a 401 error were not automatically redirected to the login screen. Users now receive proper authentication prompts when their session expires or authentication is required.

**Screenshots:**
- `screenshots/90879_1.png`

---

### 🐛 FIX: Verify with Plaid/Truv button does nothing after you refresh the page while on the autofill accounts route
**Ticket:** [#91080](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91080)
**Type:** Bug

**Summary:**
- Fixed Plaid/Truv Button After Page Refresh Resolved an issue where the "Verify with Plaid" or "Verify with Truv" buttons became unresponsive after refreshing the page on the autofill accounts route. The verification buttons now function correctly even after page reloads during the asset verification process.

**Screenshots:**
- `screenshots/91080_1.png`

---

### 🐛 FIX: SSO Redirect - Opening Nav links in a new tab does not redirect.
**Ticket:** [#91146](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91146)
**Type:** Defect

**Summary:**
- Copied from Repro Steps when changed from Bug to Defect Steps to Reproduce: 1) Navigate to the BankCMG Login page in an Incognito browser, at: https://uat.secure.bankcmg.com/login 2) Login on UAT with cchandler+ssotest@cmgfi.com / Test1234! 3) From the Dashboard, click the View button.

**Screenshots:**
- `screenshots/91146_1.png`

---

### 🐛 FIX: Login Dialog is not closing after logging in during loan application flow
**Ticket:** [#91539](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91539)
**Type:** Bug

**Summary:**
- Fixed Login Dialog Persistence Issue Corrected an issue where the login dialog remained open after successful authentication during the loan application flow. The login modal now properly closes upon successful login, allowing users to continue their application seamlessly.

**Screenshots:**
- `screenshots/91539_1.png`

---

### 🐛 FIX: Home Affordability Calculator Displaying Incorrect Principal Calculation
**Ticket:** [#91691](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91691)
**Type:** Bug

**Summary:**
- Fixed Home Affordability Calculator Principal Amount Corrected an inaccurate principal calculation in the Home Affordability Calculator. The calculator now displays the correct principal amount based on user inputs, providing borrowers with accurate home affordability estimates for better financial planning.

**Screenshots:**
- `screenshots/91691_1.png`

---

### 🐛 FIX: Clicking any of the header links does not navigate you away from the tasks dashboard
**Ticket:** [#92070](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92070)
**Type:** Bug

**Summary:**
- Fixed Header Navigation from Tasks Dashboard Resolved a navigation issue where clicking header links from the tasks dashboard failed to navigate users to the intended pages. All header navigation links now function correctly from the tasks dashboard, allowing users to freely navigate throughout the portal.

**Screenshots:**
- `screenshots/92070_1.png`

---

## SmartApp (8 items)

### ✨ ENHANCED: Update to Plaid VOA prefill question to match Truv VOIE
**Ticket:** [#64816](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/64816)
**Type:** User Story

**Summary:**
- Enhanced Asset Verification Experience with Plaid Updated the SmartApp asset verification flow to provide a consistent experience between Plaid and Truv VOIE integrations. When borrowers choose to auto-fill their assets, they now see a redesigned selection screen that clearly explains both verification options with security badges and detailed descriptions. The new interface includes "Verify with Plaid" and "Enter Manually" buttons, with appropriate routing for both primary borrowers and co-borrowers. This feature is gated behind the isTruvVOIEEnabled feature flag and remains disabled in production.

**Screenshots:**
- `screenshots/64816_1.png`

---

### 🆕 NEW: Truv Branding CMG Template
**Ticket:** [#86402](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86402)
**Type:** User Story

**Summary:**
- Domain-Specific Truv Branding Implementation Implemented domain-specific branding for the Truv income verification component within SmartApp. Borrowers applying through Bank CMG domains now see Bank CMG-branded Truv templates, while those on CMG Home Loans domains see CMG Home Loans branding. The system dynamically maps domain names to organization template IDs using the EPS VOE templates endpoint, ensuring brand consistency throughout the verification process. Once an order is created with specific branding, it persists even if the user crosses domains.

**Screenshots:**
- `screenshots/86402_1.png`

---

### 🆕 NEW: Reroute View Button to SSO
**Ticket:** [#87510](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87510)
**Type:** User Story

**Summary:**
- Cross-Domain SSO for Mortgage Account Viewing Implemented single sign-on redirect functionality for borrowers viewing CMG-serviced loans from Bank CMG or JV domains. When users click "View" on a CMG-serviced loan from these domains, they are automatically redirected via SSO to the secure.cmghomeloans.com domain's mortgage account details page. This ensures all payment management and mortgage servicing functionality remains centralized on the CMG Home Loans domain while maintaining seamless access across brand portals.

**Screenshots:**
- `screenshots/87510_1.png`

---

### 🆕 NEW: Plaid Branding Bank CMG Template
**Ticket:** [#89963](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89963)
**Type:** User Story

**Summary:**
- Domain-Specific Plaid Branding Implementation Implemented domain-specific branding for the Plaid asset verification component within SmartApp. Borrowers applying through Bank CMG domains now see "Bank CMG uses Plaid to connect your bank" messaging, while those on CMG Home Loans domains see "CMG Home Loans uses Plaid to connect your bank." The system dynamically applies the appropriate template ID (link_customization_name) and client_name based on the application domain. Once a Plaid order is created with specific branding, it persists even if the user crosses domains, ensuring brand consistency throughout the asset verification process.

**Screenshots:**
- `screenshots/89963_1.png`

---

### 🐛 FIX: Wrong SmartApp Date in Byte
**Ticket:** [#86150](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86150)
**Type:** Bug

**Summary:**
- Fixed SmartApp Date Synchronization Issue Corrected an issue where SmartApp submission dates were being recorded incorrectly in Byte. The fix ensures accurate date/time stamps are now properly synchronized between SmartApp and Byte for improved loan tracking and reporting accuracy.

**Screenshots:**
- `screenshots/86150_1.png`

---

### 🐛 FIX: Name mismatch check should be case insensitive and trim whitespace
**Ticket:** [#90029](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90029)
**Type:** Bug

**Summary:**
- Fixed Name Validation Sensitivity Improved SmartApp name mismatch validation to be case-insensitive and automatically trim whitespace. This prevents false validation errors when borrower names contain different capitalization or extra spaces, reducing friction during the application process.

**Screenshots:**
- `screenshots/90029_1.png`

---

### 🐛 FIX: User receives error when progressing in loan application - no BorrowerGUID when redirected back to in-progress application after logging in after being logged out for inactivity
**Ticket:** [#90042](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90042)
**Type:** Bug

**Summary:**
- Fixed Session Timeout Redirect Issue Resolved an error where borrowers were unable to continue their loan application after being logged out due to inactivity. The fix ensures BorrowerGUID is properly restored when users log back in and are redirected to their in-progress application, allowing seamless continuation of the application process.

**Screenshots:**
- `screenshots/90042_1.png`

---

### 🐛 FIX: Smart App | Mobile User borrower information has no active borrowers, no primary borrower, data gets split across borrowers
**Ticket:** [#91566](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91566)
**Type:** Bug

**Summary:**
- Fixed Mobile Borrower Data Integrity Issue Resolved a critical data integrity issue where mobile SmartApp users experienced borrower information being split across multiple borrower records with no active or primary borrower designation. The fix ensures borrower data is properly consolidated and maintains correct active and primary borrower flags during mobile application sessions.

**Screenshots:**
- `screenshots/91566_1.png`

---

## Servicing (5 items)

### 🆕 NEW: Add 'Notice of Service Transfer' to Documents
**Ticket:** [#89926](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89926)
**Type:** User Story

**Summary:**
- New Document Type: Notice of Servicing Transfer Added "Notice of Servicing Transfer" (also known as "Goodbye Letter") as a viewable document type in the Documents Center for servicing accounts. This document informs borrowers when their mortgage loan servicing is being transferred to a new servicer in compliance with RESPA requirements. The new document type appears under the "Transfers" filter category, enabling borrowers to access servicing transfer notifications without contacting support. Documents remain accessible until the end of the year following the transfer year.

**Screenshots:**
- `screenshots/89926_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.48.0
**Ticket:** [#91079](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91079)
**Type:** User Story

**Summary:**
- Aspen Grove Widgets 1.48.0: Payment and AutoPay Enhancements Upgraded Aspen Grove widgets to version 1.48.0, addressing critical payment timing and validation issues. Key improvements include: fixed monthly AutoPay eligibility logic to display appropriate error messages when setting up after the 15th and past cutoff time; corrected monthly payment amount calculation on one-time payments to properly determine if current month has been paid; enhanced error messaging and bank account validations for routing and account numbers; and implemented comprehensive unit tests for date calculations across all time zones. These changes ensure accurate payment processing regardless of user location.

**Screenshots:**
- `screenshots/91079_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.49.0
**Ticket:** [#91546](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91546)
**Type:** User Story

**Summary:**
- Aspen Grove Widgets 1.49.0: Escrow-Only Payment Support Upgraded Aspen Grove widgets to version 1.49.0, adding support for escrow-only additional payments during off-cycle payment scenarios. The update enables three distinct payment types: Additional Principal only (PrincipalOnly), Additional Escrow only (EscrowOnly), and combined Additional Escrow and Principal (MonthlyPayment). These payment options are only available when the loan is not due and during off-cycle periods, with regular monthly payments remaining unchanged. All payment types have been verified to correctly impact Sagent servicing data.

**Screenshots:**
- `screenshots/91546_1.png`

---

### 🔍 SPIKE: Research "Payoff Quicker" Calculator [8 hours]
**Ticket:** [#89593](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89593)
**Type:** Spike

**Summary:**
- Payoff Sooner Calculator Reusability Assessment Completed research on integrating the existing Pay-Off Sooner/Additional Principal Payment calculator into the Servicing Portal. The spike identified that the calculator code currently resides in ConX UI and should be migrated to the cmg-calculators NPM package for broader reuse. Key findings include working amortization logic, existing template structure, and the need for dynamic loan data injection via query parameters. The proposed solution involves extracting the component into the shared NPM package and providing Aspen Grove widgets with a custom URL pattern to serve relevant loan data, opening the calculator in a separate tab to maintain widget state and reduce cross-team dependencies.

**Screenshots:**
- `screenshots/89593_1.png`

---

### 🔍 SPIKE: Research  Feasibility for Standalone Bi-Weekly Mortgage Calculator [8 hours]
**Ticket:** [#89863](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89863)
**Type:** Spike

**Summary:**
- Bi-Weekly Mortgage Calculator Integration Research Completed feasibility research for integrating the bi-weekly mortgage calculator as a standalone tool linkable from multiple servicing areas. The calculator exists in the consumer-experience-calculators NPM package and includes complete amortization logic, graph generation, and downloadable CSV export functionality. Key findings confirm the calculator can be reused by configuring it to display only the bi-weekly template and passing loan data via JSON object to pre-fill form fields. The solution requires Angular 19.X+ and PrimeNG 19-20, with recommendations to avoid embedding the NPM package directly in Aspen Grove widgets to prevent dependency chain complications.

**Screenshots:**
- `screenshots/89863_1.png`

---

## Admin Portal (1 items)

### ✅ TASK: Perform regression testing on Admin portal
**Ticket:** [#91488](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91488)
**Type:** Task

---

## Tech Debt (7 items)

### 🔧 TECH: Remove unwanted encoding done to support '+' in contact email
**Ticket:** [#80137](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/80137)
**Type:** User Story

**Summary:**
- Removed Redundant Email Encoding for Plus Sign Characters Eliminated unnecessary encoding of '+' characters in email addresses within the Conx API, as the Loan Serv API now handles these characters natively. This technical improvement prevents double encoding and data inconsistencies when users add or update email addresses containing plus signs (e.g., test+123@email.com) at both global and account-level Email Preferences pages. The change depends on upstream fixes from the Loan Serv API team.

**Screenshots:**
- `screenshots/80137_1.png`

---

### 🔧 TECH: Upgrade ConX API to .NET 10/.SLNX Format
**Ticket:** [#85568](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85568)
**Type:** User Story

**Summary:**
- ConX API Upgraded to .NET 10 Upgraded the ConX API solution to .NET 10 framework and converted to the new .SLNX solution format. The updated API builds successfully in both local development environments and CI/CD pipelines, and has been deployed and validated in lower environments to ensure compatibility and responsiveness.

**Screenshots:**
- `screenshots/85568_1.png`

---

### 🔧 TECH: Upgrade ConX Admin API to .NET 10/.SLNX Format
**Ticket:** [#85569](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85569)
**Type:** User Story

**Summary:**
- ConX Admin API Upgraded to .NET 10 Upgraded the ConX Admin API solution to .NET 10 framework and converted to the new .SLNX solution format. The updated API builds successfully in both local development environments and CI/CD pipelines, and has been deployed and validated in lower environments to ensure compatibility and responsiveness.

**Screenshots:**
- `screenshots/85569_1.png`

---

### 🔧 TECH: Upgrade ConX Third Party API to .NET 10/.SLNX Format
**Ticket:** [#85570](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85570)
**Type:** User Story

**Summary:**
- ConX Third Party API Upgraded to .NET 10 Upgraded the ConX Third Party API solution to .NET 10 framework and converted to the new .SLNX solution format. The updated API builds successfully in both local development environments and CI/CD pipelines, and has been deployed and validated in lower environments to ensure compatibility and responsiveness.

**Screenshots:**
- `screenshots/85570_1.png`

---

### 🔧 TECH: Update admin api base url
**Ticket:** [#90656](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90656)
**Type:** User Story

**Summary:**
- Admin API Base URL Configuration Update Updated the admin API base URL configuration to resolve connectivity issues in the development environment. This technical fix ensures proper API endpoint routing for admin portal functionality across all environments.

**Screenshots:**
- `screenshots/90656_1.png`

---

### 🔍 SPIKE: Research code related house canary loan officer sync job.
**Ticket:** [#90097](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90097)
**Type:** Spike

**Summary:**
- HouseCanary Loan Officer Sync Issue Analysis Investigated recurring 400 Bad Request errors in the HouseCanaryLoanOfficerSync Azure Function related to NMLS ID validation. The research identified that HouseCanary's API requires NMLS IDs to contain only letters and digits, but some loan officers have NMLS IDs with special characters or formatting issues. The spike documented root causes and proposed fixes to cleanse and validate NMLS ID data before syncing to prevent synchronization failures.

**Screenshots:**
- `screenshots/90097_1.png`

---

### 🔍 SPIKE: Identify causes and remediation options for  build warnings in Conx API, Conx Admin API and Third Party API [16 Hrs]
**Ticket:** [#91638](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91638)
**Type:** Spike

**Summary:**
- Build Warnings Analysis for ConX APIs Completed comprehensive investigation of build warnings across ConX API, ConX Admin API, and Third Party API solutions. The spike identified root causes of compilation warnings and documented remediation options to improve code quality, reduce technical debt, and ensure cleaner builds. Findings will guide future user stories to systematically address and eliminate build warnings across all three API solutions.

**Screenshots:**
- `screenshots/91638_1.png`

---

## Sprint Summary

### By Type
- 🆕 **User Stories:** 21
- 🐛 **Bugs/Defects:** 16
- 🔍 **Spikes:** 4
- 🔧 **Technical Debt:** 7

### Total Completed: 70 items

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
