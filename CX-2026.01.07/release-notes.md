# CX Sprint 2026.01.07 Release Notes

**Sprint Dates:** December 11, 2025 - January 7, 2026
**Release Date:** TBD

---

## Home Portal (12 items)

### 🗑️ REMOVED: Remove 'Change Since' on Home Value card
**Ticket:** [#29709](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/29709)
**Type:** User Story

**Summary:**
- Problem Statement: As a Home Portal user, I want the Change Since date to be removed so that I am not confused.

**Screenshots:**
- `screenshots/29709_1.png`
- `screenshots/29709_2.png`

---

### 🆕 NEW: Workflow - Borrower Auth Doc Request
**Ticket:** [#85234](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85234)
**Type:** User Story

**Summary:**
- ID Acceptance Criteria AC1

**Screenshots:**
- `screenshots/85234-workflow-borrower-auth-doc-request.png`

---

### ✨ ENHANCED: After Mortgage Account SSO Redirect, update header links to use referral domain
**Ticket:** [#87521](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87521)
**Type:** User Story

**Summary:**
- As a borrower, if I am on the BankCMG domain or a JV domain, and I click "view" on the mortgage account, I will arrive on the cmghomeloans.com domain's view of the mortgage account details page (see #87510). While I am on that page, I want all header links to route back to the domain I came from. Acceptance Criteria: Pre-conditions: I am a borrower on BankCMG or JV and I've selected to view a cmg serviced loan., I land on the CMGHL servicing page, I can view the servicing details of that loan that I selected (same behavior as today) When I select the top navigation, the expected behavior is as follows: All navigation links below should return the user to that page, using the domain they came from : Dashboard Home Search* (doesn't need to change, because it is an external link to HouseCanary) Your Home Calculators Apply Now All sub links under Avatar menu My Profile Logout.

**Screenshots:**
- `screenshots/87521-after-mortgage-account-sso-redirect-upda.png`

---

### 🆕 NEW: Create Your Homes feature flag
**Ticket:** [#89994](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89994)
**Type:** User Story

**Summary:**
- As a user, I want the Your Homes page to behind a feature flag so I can control by user if needed. Features to add additional homes for tracking value will remain within comehome, they use Home Search and View Home.

**Screenshots:**
- `screenshots/89994-create-your-homes-feature-flag.png`

---

### 🐛 FIX: Showing multiple loading states when loading a loan detail dashboard
**Ticket:** [#87544](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87544)
**Type:** Bug

**Screenshots:**
- `screenshots/87544-showing-multiple-loading-states-when-loa.png`

---

### 🐛 FIX: My Profile - Back button takes the user to the Oops! page.
**Ticket:** [#87623](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87623)
**Type:** Bug

**Screenshots:**
- `screenshots/87623-my-profile-back-button-takes-the-user-to.png`

---

### 🐛 FIX: User is not redirected to the login screen when they get a 401 error while unauthenticated
**Ticket:** [#90879](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90879)
**Type:** Bug

**Screenshots:**
- `screenshots/90879-user-is-not-redirected-to-the-login-scre.png`

---

### 🐛 FIX: Verify with Plaid/Truv button does nothing after you refresh the page while on the autofill accounts route
**Ticket:** [#91080](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91080)
**Type:** Bug

**Screenshots:**
- `screenshots/91080-verify-with-plaid-truv-button-does-nothi.png`

---

### 🐛 FIX: SSO Redirect - Opening Nav links in a new tab does not redirect.
**Ticket:** [#91146](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91146)
**Type:** Defect

**Screenshots:**
- `screenshots/91146-sso-redirect-opening-nav-links-in-a-new-.png`

---

### 🐛 FIX: Login Dialog is not closing after logging in during loan application flow
**Ticket:** [#91539](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91539)
**Type:** Bug

**Screenshots:**
- `screenshots/91539-login-dialog-is-not-closing-after-loggin.png`

---

### 🐛 FIX: Home Affordability Calculator Displaying Incorrect Principal Calculation
**Ticket:** [#91691](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91691)
**Type:** Bug

**Screenshots:**
- `screenshots/91691-home-affordability-calculator-displaying.png`

---

### 🐛 FIX: Clicking any of the header links does not navigate you away from the tasks dashboard
**Ticket:** [#92070](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92070)
**Type:** Bug

**Screenshots:**
- `screenshots/92070-clicking-any-of-the-header-links-does-no.png`

---

## SmartApp (8 items)

### ✨ ENHANCED: Update to Plaid VOA prefill question to match Truv VOIE
**Ticket:** [#64816](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/64816)
**Type:** User Story

**Summary:**
- As a SmartApp borrower, I choose to autofill my assets, I want to be able to verify my assets using Plaid and have that experience similar to Truv VOIE.

**Screenshots:**
- `screenshots/64816_1.png`
- `screenshots/64816_2.png`

---

### 🆕 NEW: Truv Branding CMG Template
**Ticket:** [#86402](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86402)
**Type:** User Story

**Summary:**
- As a borrower, If I'm applying for a loan via Smartapp and use Truv, I see the brand that I started applying with reflected in Truv, so that there is brand consistency. What needs to happen: As a user applying for a loan using SmartApp hosted on the Bank CMG domain (currently securemortgage.bankcmg.com), I use Truv, I want to see BankCMG branding applied to the Truv Bridge component.

**Screenshots:**
- `screenshots/86402_1.png`

---

### 🆕 NEW: Reroute View Button to SSO
**Ticket:** [#87510](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87510)
**Type:** User Story

**Summary:**
- As a user, I should only be able to view and manage payments for my CMG serviced loan on the secure.cmghomeloans.com domain. Selecting the "view" button while I am on my dashboard using the the BankCMG domain or a JV domain will trigger redirect SSO to the secure.cmghomeloan.com domain's mortgage account details page. Related SSO research: https://dev.azure.com/cmgfidev/Consumer%20Experience/_workitems/edit/87414 Acceptance Criteria: Pre-conditions: I am a borrower on the Bank CMG or JV domain and have a loan that is serviced by CMGHL, I am on Bank CMG and select "View" on a CMG serviced loan, I get redirected to the CMGHL servicing domain.

**Screenshots:**
- `screenshots/87510-reroute-view-button-to-sso.png`

---

### 🆕 NEW: Plaid Branding Bank CMG Template
**Ticket:** [#89963](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89963)
**Type:** User Story

**Summary:**
- As a borrower, I use Plaid to verify my assets, I see the customized Plaid template related to the domain that I'm on, so that there is brand consistency.

**Screenshots:**
- `screenshots/89963_1.png`

---

### 🐛 FIX: Wrong SmartApp Date in Byte
**Ticket:** [#86150](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86150)
**Type:** Bug

**Screenshots:**
- `screenshots/86150-wrong-smartapp-date-in-byte.png`

---

### 🐛 FIX: Name mismatch check should be case insensitive and trim whitespace
**Ticket:** [#90029](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90029)
**Type:** Bug

**Screenshots:**
- `screenshots/90029-name-mismatch-check-should-be-case-insen.png`

---

### 🐛 FIX: User receives error when progressing in loan application - no BorrowerGUID when redirected back to in-progress application after logging in after being logged out for inactivity
**Ticket:** [#90042](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90042)
**Type:** Bug

**Screenshots:**
- `screenshots/90042-user-receives-error-when-progressing-in-.png`

---

### 🐛 FIX: Smart App | Mobile User borrower information has no active borrowers, no primary borrower, data gets split across borrowers
**Ticket:** [#91566](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91566)
**Type:** Bug

**Screenshots:**
- `screenshots/91566-smart-app-mobile-user-borrower-informati.png`

---

## Servicing (5 items)

### 🆕 NEW: Add 'Notice of Service Transfer' to Documents
**Ticket:** [#89926](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89926)
**Type:** User Story

**Summary:**
- As a user, be able to access additional document types so that I can view them without contacting support.

**Screenshots:**
- `screenshots/89926_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.48.0
**Ticket:** [#91079](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91079)
**Type:** User Story

**Summary:**
- As a general rule, we always assume that everything Sagent sends us is in ET, and all validations must be performed in ET; that is, the users local time is always converted to ET to validate things like cut-off times, duplicate payments, whether the current month has been paid, etc. In this particular case, I have been creating test cases and improving the code around the method that determines whether the current month has already been paid. To do this, I established the following principle: - A month is NOT paid by default. - It is only considered paid if the backend has advanced the dueDate to the next cycle. This implies that: - dueDate always represents the date of the next pending payment. - If the user has paid July, the dueDate moves to August. - If we still see dueDate = July 1 and today = July 2 (or even today = July 1), then July is NOT paid. -, ever the field daysPastDue > 0, it means the current month is still unpaid and there is a delay.

**Screenshots:**
- `screenshots/91079-upgrade-aspen-grove-widgets-to-1-48-0.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.49.0
**Ticket:** [#91546](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91546)
**Type:** User Story

**Summary:**
- new version ( 1.49 ) sent by email with latest fix's on Escrow Only payments.

**Screenshots:**
- `screenshots/91546-upgrade-aspen-grove-widgets-to-1-49-0.png`

---

### 🔍 SPIKE: Research "Payoff Quicker" Calculator [8 hours]
**Ticket:** [#89593](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89593)
**Type:** Spike

**Summary:**
- Description Servicing has indicated that the Pay-Off Sooner/Additional Principal Payment calculator is one of the most-used calculator functions that exists and would like it to be integrated into Servicing Portal.

**Screenshots:**
- `screenshots/89593-research-payoff-quicker-calculator-8-hou.png`

---

### 🔍 SPIKE: Research  Feasibility for Standalone Bi-Weekly Mortgage Calculator [8 hours]
**Ticket:** [#89863](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89863)
**Type:** Spike

**Summary:**
- As a .csv(excel) file, they make changes to the adjacent inputs.

**Screenshots:**
- `screenshots/89863-research-feasibility-for-standalone-bi-w.png`

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
- As a developer, remove the unnecessary encoding of contact email addresses containing a '+' sign in the Conx API, so that Loan Serv API can correctly handle these emails without relying on pre-encoded input.

**Screenshots:**
- `screenshots/80137-remove-unwanted-encoding-done-to-support.png`

---

### 🔧 TECH: Upgrade ConX API to .NET 10/.SLNX Format
**Ticket:** [#85568](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85568)
**Type:** User Story

**Summary:**
- - ConX API solution is upgraded to .NET 10 and builds successfully both locally and in build pipelines. - ConX API is successfully deployed to lower environments and responds to calls. - ConX API solution file is converted to `.slnx` format.

**Screenshots:**
- `screenshots/85568-upgrade-conx-api-to-net-10-slnx-format.png`

---

### 🔧 TECH: Upgrade ConX Admin API to .NET 10/.SLNX Format
**Ticket:** [#85569](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85569)
**Type:** User Story

**Summary:**
- - ConX Admin API solution is upgraded to .NET 10 and builds successfully both locally and in build pipelines. - ConX Admin API is successfully deployed to lower environments and responds to calls. - ConX Admin API solution file is converted to `.slnx` format.

**Screenshots:**
- `screenshots/85569-upgrade-conx-admin-api-to-net-10-slnx-fo.png`

---

### 🔧 TECH: Upgrade ConX Third Party API to .NET 10/.SLNX Format
**Ticket:** [#85570](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/85570)
**Type:** User Story

**Summary:**
- - ConX Third Party API solution is upgraded to .NET 10 and builds successfully both locally and in build pipelines. - ConX Third Party API is successfully deployed to lower environments and responds to calls. - ConX Third Party API solution file is converted to `.slnx` format.

**Screenshots:**
- `screenshots/85570-upgrade-conx-third-party-api-to-net-10-s.png`

---

### 🔧 TECH: Update admin api base url
**Ticket:** [#90656](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90656)
**Type:** User Story

**Summary:**
- Update admin base url to fix dev env.

**Screenshots:**
- `screenshots/90656-update-admin-api-base-url.png`

---

### 🔍 SPIKE: Research code related house canary loan officer sync job.
**Ticket:** [#90097](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90097)
**Type:** Spike

**Summary:**
- As a Home Portal Developer, understand the behavior of "HouseCanaryLoanOfficerSync" azure function, identify root causes for below 400 Bad Request responses, and propose fixes with product team's feedback.

**Screenshots:**
- `screenshots/90097-research-code-related-house-canary-loan-.png`

---

### 🔍 SPIKE: Identify causes and remediation options for  build warnings in Conx API, Conx Admin API and Third Party API [16 Hrs]
**Ticket:** [#91638](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91638)
**Type:** Spike

**Summary:**
- Investigate current build warnings for the Conx API, Conx Admin API and Third Party API, identify causes and remediation options..

**Screenshots:**
- `screenshots/91638-identify-causes-and-remediation-options-.png`

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

**Generated:** 2026-02-10
**Source:** Azure DevOps - Consumer Experience Project
