# CX Sprint 2026.01.28 Release Notes

**Sprint Dates:** January 14 - January 28, 2026
**Release Date:** TBD

---

## Home Portal (14 items)

### 🗑️ REMOVED: Deprecate Site Introduction Modal for users after 8/8/2024 launch
**Ticket:** [#28599](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/28599)
**Type:** User Story

**Summary:**
- As a Home Portal user, I do not need to be made aware of launch upgrades after the site has been live for some time. Acceptance Criteria: Remove the Home Portal 8/8/2024 launch site introduction modal built via #24095 so that it no longer shows in any of the following scenarios on and after 9/18/2024: Upon any existing user clicking "Log In" on the Log In page ( https://dev.secure.cmghomeloans.com/login ) with accurate credentials who has not yet seen this modal (i.e., it is only shown to each user once after the release, and not again after that) Upon activating a new account via the Activate Account page, after the user has logged in with the new account Upon creating an account via the Create Account page Note: per 7/29/2024 conversation with @Cory Chandler this is just a database change on the announcement table to add an end-date to the modal, but this will be left in the code for if/, a message similar to this is reinstated in the future.

**Screenshots:**
- `screenshots/28599-deprecate-site-introduction-modal-for-us.png`

---

### 🆕 NEW: Partially hide loan number by default and add ability to view or hide full number
**Ticket:** [#65133](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/65133)
**Type:** User Story

**Summary:**
- As a user, I want my loan number to be partially hidden unless, view it so that my information is more secure.

**Screenshots:**
- `screenshots/65133_1.png`

---

### 🆕 NEW: Docutech - Get eSign Tasks Item
**Ticket:** [#69460](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/69460)
**Type:** User Story

**Summary:**
- ID Acceptance Criteria AC1 eSign Task Type displays only

**Screenshots:**
- `screenshots/69460_1.png`

---

### 🆕 NEW: Docutech - eSign Tasks Action Page
**Ticket:** [#79993](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/79993)
**Type:** User Story

**Summary:**
- ID Acceptance Criteria AC1 eSign Action Page accessible via Sign (To Do) and View (Completed) buttons from Task Framework.

**Screenshots:**
- `screenshots/79993_1.png`
- `screenshots/79993_2.png`

---

### 🆕 NEW: Allow user to navigate to dashboard from Verify Identity page after redirect for an app in servicing
**Ticket:** [#86711](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86711)
**Type:** User Story

**Summary:**
- As a user, be able to return to my dashboard without verifying my identity so that I can complete other tasks.

**Screenshots:**
- `screenshots/86711-allow-user-to-navigate-to-dashboard-from.png`

---

### ✨ ENHANCED: Enhance GET Document Upload Task workflow
**Ticket:** [#87188](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87188)
**Type:** User Story

**Summary:**
- ID Acceptance Criteria AC1 System calls enhanced Clear Docs API and receives borrower names and application ID data.

**Screenshots:**
- `screenshots/87188-enhance-get-document-upload-task-workflo.png`

---

### 🗑️ REMOVED: Remove Feature Flag Miscellaneous Upload Document Task
**Ticket:** [#87516](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87516)
**Type:** User Story

**Summary:**
- Scope Remove feature flag: MiscDocTask ..

**Screenshots:**
- `screenshots/87516-remove-feature-flag-miscellaneous-upload.png`

---

### 🆕 NEW: Upload Document - Add Doc Type(s) to Completed Task
**Ticket:** [#89824](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89824)
**Type:** User Story

**Summary:**
- As a borrower, I want the ability to see the doctype(s) of the document(s) I uploaded to my completed tasks. Objective Provide borrower visibility to the doctype of documents used to complete a document upload task. Personas Persona Description Borrower Needs to upload miscellaneous documents securely in support of their loan application. Loan Officer (LO) Receives documents from borrower Requirements Current behavior:, a document is uploaded via tasks, the completed task then displays in the Completed tasks view with the task label used to upload.

**Screenshots:**
- `screenshots/89824_1.png`

---

### ✨ ENHANCED: Update Mortgage Calculator Computational Logic with Code Fix for 1/8 Point Interest Values
**Ticket:** [#92249](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92249)
**Type:** User Story

**Summary:**
- As a Home Portal user, I want the Mortgage Calculator to correctly calculate payments for interest rates ending in 1/8th increments (.125, .375, .625, .875), so that mortgage payment calculations are accurate and consistent with expected financial standards The existing Mortgage Calculator rounds up incorrectly, calculating payments for interest rates ending in 1/8th point increments (.

**Screenshots:**
- `screenshots/92249-update-mortgage-calculator-computational.png`

---

### 🆕 NEW: Bank CMG HouseCanary Branding
**Ticket:** [#92269](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92269)
**Type:** User Story

**Summary:**
- As a BankCMG borrower, I use comehome, I need to see BankCMG branding and when I hit back to dashboard it retains the branding from the source.

**Screenshots:**
- `screenshots/92269-bank-cmg-housecanary-branding.png`

---

### 🆕 NEW: Turn off Your Homes Dashboard for BankCMG via feature flag temporarily
**Ticket:** [#93137](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93137)
**Type:** User Story

**Summary:**
- Purpose Currently the BankCMG branded HouseCanary site has been created, and the SAML integration has been setup and is working between our the BankCMG Home Portal and the BankCMG HouseCanary site.

**Screenshots:**
- `screenshots/93137-turn-off-your-homes-dashboard-for-bankcm.png`

---

### 🐛 FIX: User can see cached information when viewing mortgage
**Ticket:** [#87983](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87983)
**Type:** Bug

**Screenshots:**
- `screenshots/87983-user-can-see-cached-information-when-vie.png`

---

### 🐛 FIX: Verify Identity - User can submit the form without the DOB field filled out
**Ticket:** [#91752](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91752)
**Type:** Bug

**Screenshots:**
- `screenshots/91752-verify-identity-user-can-submit-the-form.png`

---

### 🐛 FIX: Tasks disappeared after uploading Miscellaneous Document
**Ticket:** [#93403](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93403)
**Type:** Defect

**Screenshots:**
- `screenshots/93403-tasks-disappeared-after-uploading-miscel.png`

---

## SmartApp (4 items)

### ✨ ENHANCED: CX | SmartApp | Update phone consent message for primary borrower
**Ticket:** [#78782](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/78782)
**Type:** User Story

**Summary:**
- Problem Statement: As a user, I want the consent message to be updated so that I have more information.

**Screenshots:**
- `screenshots/78782-cx-smartapp-update-phone-consent-message.png`

---

### 🆕 NEW: CX | SmartApp | Add Phone Type and consent disclaimer to co-borrower information page
**Ticket:** [#91498](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91498)
**Type:** User Story

**Summary:**
- Lisa WolfeProblem Statement: As a user, I want the consent message to be updated so that I have more information.

**Screenshots:**
- `screenshots/91498_1.png`

---

### 🆕 NEW: BankCMG Email Branding
**Ticket:** [#93046](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93046)
**Type:** User Story

**Summary:**
- As a BankCMG consumer, apply for a mortgage through SmartApp I want my emails branded to BankCMG so I receive brand I expect throughout process.

**Screenshots:**
- `screenshots/93046-bankcmg-email-branding.png`

---

### 🐛 FIX: Incorrect loan officer displayed after logging in when prompted as returning user
**Ticket:** [#81268](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/81268)
**Type:** Bug

**Screenshots:**
- `screenshots/81268-incorrect-loan-officer-displayed-after-l.png`

---

## Servicing (10 items)

### ✨ ENHANCED: Update message shown when there are no documents available
**Ticket:** [#90375](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90375)
**Type:** User Story

**Summary:**
- As a user, be given more information about when to expect my documents so that I know when to check again.

**Screenshots:**
- `screenshots/90375_1.png`

---

### 🆕 NEW: Display and Filter documents for Appraisal, Closing Disclosure, Funding Package, PMI Removal Notices, and 1099s
**Ticket:** [#90377](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90377)
**Type:** User Story

**Summary:**
- As a user, be able to access additional document types so that I can view them without contacting support.

**Screenshots:**
- `screenshots/90377-display-and-filter-documents-for-apprais.png`

---

### 🆕 NEW: Change Loan Amount to Loan Balance on primary dashboard
**Ticket:** [#92003](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92003)
**Type:** User Story

**Summary:**
- "Loan Amount" will be changed to "Loan Balance" on the Mortgage Account cards which appear on the primary dashboard, for Cenlar and LoanServ loans. Current Appearance:

**Screenshots:**
- `screenshots/92003_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.50.0
**Ticket:** [#92082](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92082)
**Type:** User Story

**Summary:**
- This version includes a few minor but significant changes: AP 1.50: The business-day control logic has been adjusted (3 business days, or 4 if past the cutoff time) when accessing the Edit / Delete AutoPay view.

**Screenshots:**
- `screenshots/92082-upgrade-aspen-grove-widgets-to-1-50-0.png`

---

### 🆕 NEW: Extend SSN search to include coborrowers for displaying servicing dashboard
**Ticket:** [#92256](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92256)
**Type:** User Story

**Summary:**
- As a user, be able to view my mortgage account dashboard so that I can manage my loan.

**Screenshots:**
- `screenshots/92256-extend-ssn-search-to-include-coborrowers.png`

---

### 🆕 NEW: Add Banner for 1098 - Prior to Delivery
**Ticket:** [#92871](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92871)
**Type:** User Story

**Summary:**
- Banner is present for all servicing clients as expected Email from stakeholders attached .

**Screenshots:**
- `screenshots/92871_1.png`

---

### 🔍 SPIKE: Preview document
**Ticket:** [#42244](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/42244)
**Type:** Spike

**Summary:**
- As a user, be able to preview the PDF for my documents so that I do not need to leave the page.

**Screenshots:**
- `screenshots/42244-preview-document.png`

---

### 🔍 SPIKE: Define Alert Display API Requirements for Home Portal [16 hours]
**Ticket:** [#91672](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91672)
**Type:** Spike

**Summary:**
- Background The Borrower Portal already supports rendering alert banners for users and loan accounts.

**Screenshots:**
- `screenshots/91672-define-alert-display-api-requirements-fo.png`

---

### ✅ TASK: Verify existing servicing dashboards (Regression)
**Ticket:** [#92543](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92543)
**Type:** Task

---

### ✅ TASK: Verify that user can navigate to dashboard from Verify Identity page after redirect for an app in servicing.
**Ticket:** [#93362](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93362)
**Type:** Task

---

## Tech Debt (7 items)

### 🔧 TECH: Smart App | Remove Route History for ApplicationJSONStateString
**Ticket:** [#87916](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87916)
**Type:** User Story

**Summary:**
- Currently, we really only seed the sectionURL and routeURL to update the application state for a user.

**Screenshots:**
- `screenshots/87916-smart-app-remove-route-history-for-appli.png`

---

### 🔧 TECH: Remove unused Aspose.PDF.Drawing-related document generation code and clean up Docker components from TP API
**Ticket:** [#91669](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91669)
**Type:** User Story

**Summary:**
- As a Home Portal Developer, remove unused document-generation code that depends on Aspose.

**Screenshots:**
- `screenshots/91669-remove-unused-aspose-pdf-drawing-related.png`

---

### 🔧 TECH: Send Loan-Conversion Service Bus Messages to Additional Topic
**Ticket:** [#92294](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92294)
**Type:** User Story

**Summary:**
- CMG is working to standardize/unify the Service Bus setup across the organization.

**Screenshots:**
- `screenshots/92294-send-loan-conversion-service-bus-message.png`

---

### 🔧 TECH: Performance Improvements to usp_GetPipelineLoanApplicationList
**Ticket:** [#92559](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92559)
**Type:** User Story

**Summary:**
- When Clear calls the `/api/v1/external/loanapplications/pipeline` endpoint, this eventually gets to the `usp_GetPipelineLoanApplicationList` stored procedure.

**Screenshots:**
- `screenshots/92559-performance-improvements-to-usp-getpipel.png`

---

### 🔧 TECH: Database Query Improvements for ExternalController.GetLoanApplicationsByGUIDsAsync
**Ticket:** [#92561](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92561)
**Type:** User Story

**Summary:**
- When the `/api/v1/external/loanapplications` is called with a list of Loan Application GUID's, each GUID is retrieved separately, and each GUID process results in four separate database queries.

**Screenshots:**
- `screenshots/92561-database-query-improvements-for-external.png`

---

### 🔧 TECH: Add claude initialization to UI repo
**Ticket:** [#93426](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93426)
**Type:** User Story

**Summary:**
- We need to set up a claude.md file in the UI repo..

**Screenshots:**
- `screenshots/93426-add-claude-initialization-to-ui-repo.png`

---

### 🔍 SPIKE: Investigate Instituting a "Pre-Deploy" Process
**Ticket:** [#92275](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92275)
**Type:** Spike

**Summary:**
- Look into splitting our deployment process into two steps: - Deploying artifacts to deployment slot - Swapping slots Splitting these steps allows us to do a "pre-deploy" of artifacts so that any deployment issues can be addressed separately (e.g.

**Screenshots:**
- `screenshots/92275-investigate-instituting-a-pre-deploy-pro.png`

---

## Sprint Summary

### By Type
- 🆕 **User Stories:** 27
- 🐛 **Bugs/Defects:** 12
- 🔍 **Spikes:** 3
- 🔧 **Technical Debt:** 7

### Total Completed: 71 items

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
