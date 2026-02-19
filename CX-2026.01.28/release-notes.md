# CX Sprint 2026.01.28 Release Notes

**Sprint Dates:** January 14 - January 28, 2026
**Release Date:** TBD

---

## Home Portal (14 items)

### 🗑️ REMOVED: Deprecate Site Introduction Modal for users after 8/8/2024 launch
**Ticket:** [#28599](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/28599)
**Type:** User Story

**Summary:**
- Deprecated the site introduction modal that displayed to users following the August 8, 2024 Home Portal launch. Users no longer see the launch announcement modal when logging in, activating accounts, or creating new accounts, simplifying the login experience for users already familiar with the updated portal. The removal was implemented via a database configuration change to add an end-date to the announcement.

**Screenshots:**
- `screenshots/28599_1.png`

---

### 🆕 NEW: Partially hide loan number by default and add ability to view or hide full number
**Ticket:** [#65133](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/65133)
**Type:** User Story

**Summary:**
- Added privacy protection for loan numbers across the Home Portal by displaying only the last 4 digits by default, with an eye icon to reveal or hide the full number. This feature appears on Loan Application and Mortgage Account cards on the primary dashboard, individual loan dashboards, and the Documents page, improving information security while maintaining easy access for account management or support interactions.

**Screenshots:**
- `screenshots/65133_1.png`

---

### 🆕 NEW: Docutech - Get eSign Tasks Item
**Ticket:** [#69460](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/69460)
**Type:** User Story

**Summary:**
- Introduced eSign task cards within the Home Portal Task Framework to display Docutech disclosure packages requiring electronic signature. The new task type appears in both To Do and Completed views, showing package information, assigned borrowers, status, and action buttons. This enhancement integrates with the Solex eSigning system and supports multiple disclosure package types including Initial Disclosures, Revised Disclosures, and Closing Disclosures.

**Screenshots:**
- `screenshots/69460_1.png`

---

### 🆕 NEW: Docutech - eSign Tasks Action Page
**Ticket:** [#79993](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/79993)
**Type:** User Story

**Summary:**
- Launched the eSign Action Page enabling borrowers to electronically sign Docutech disclosure packages directly through the Home Portal via Solex integration. When users click on an eSign task, they are directed to a dedicated page displaying package details, assigned borrowers, guided instructions, and a direct link to the Solex signing room. The page provides distinct experiences for pending versus completed tasks, with conditional action buttons (Go eSign, View, View/eSign) and status banners throughout.

**Screenshots:**
- `screenshots/79993_1.png`

---

### 🆕 NEW: Allow user to navigate to dashboard from Verify Identity page after redirect for an app in servicing
**Ticket:** [#86711](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86711)
**Type:** User Story

**Summary:**
- Enhanced the Verify Identity page to allow users to navigate away to other portal areas rather than being locked on the page. When a loan application is found in servicing data and users are redirected to verify their identity, they can now return later to complete verification. Note that Loan Applications continue to show as post-funded until identity verification is completed.

**Screenshots:**
- `screenshots/86711_1.png`

---

### ✨ ENHANCED: Enhance GET Document Upload Task workflow
**Ticket:** [#87188](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87188)
**Type:** User Story

**Summary:**
- Improved the accuracy and performance of Document Upload Task display by leveraging enhanced Clear Docs API capabilities that now include borrower and co-borrower names directly in the payload. The system uses email matching logic to identify the logged-in borrower, eliminating secondary API calls while providing more reliable document task visibility with an improved 'Assigned To' field.

**Screenshots:**
- `screenshots/87188_1.png`

---

### 🗑️ REMOVED: Remove Feature Flag Miscellaneous Upload Document Task
**Ticket:** [#87516](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87516)
**Type:** User Story

**Summary:**
- Removed the MiscDocTask feature flag, making the Miscellaneous Document Upload Task functionality permanently available to all users. This task type allows borrowers to securely upload additional documents as requested by their loan team and is now part of the standard Task Framework experience.

**Screenshots:**
- `screenshots/87516_1.png`

---

### 🆕 NEW: Upload Document - Add Doc Type(s) to Completed Task
**Ticket:** [#89824](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89824)
**Type:** User Story

**Summary:**
- Enhanced completed upload tasks to display the document types of files uploaded by borrowers. When viewing a completed document upload task, users now see a 'Files Received' section listing all document types associated with the upload, providing better visibility into what was submitted and helping borrowers confirm the correct documents were received.

**Screenshots:**
- `screenshots/89824_1.png`

---

### ✨ ENHANCED: Update Mortgage Calculator Computational Logic with Code Fix for 1/8 Point Interest Values
**Ticket:** [#92249](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92249)
**Type:** User Story

**Summary:**
- Corrected a calculation error in the Mortgage Calculator where interest rates ending in 1/8th point increments (.125, .375, .625, .875) were rounding incorrectly. The calculator now produces accurate monthly payment calculations that align with industry-standard formulas, ensuring borrowers receive precise payment estimates when exploring mortgage options with these common interest rate values.

**Screenshots:**
- `screenshots/92249_1.png`

---

### 🆕 NEW: Bank CMG HouseCanary Branding
**Ticket:** [#92269](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92269)
**Type:** User Story

**Summary:**
- Implemented BankCMG branding for the HouseCanary Home Search integration using SAML SSO authentication. BankCMG borrowers now see consistent BankCMG branding when accessing the HouseCanary home search tool from the Home Portal, providing a seamless co-branded experience throughout their home search and mortgage journey.

**Screenshots:**
- `screenshots/92269_1.png`

---

### 🆕 NEW: Turn off Your Homes Dashboard for BankCMG via feature flag temporarily
**Ticket:** [#93137](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93137)
**Type:** User Story

**Summary:**
- Temporarily disabled the Your Homes dashboard for BankCMG branded Home Portal users via feature flag while API integration work is completed. The BankCMG portal currently uses the CMG-branded HouseCanary credentials for API calls, preventing saved properties and searches from syncing correctly. The Your Homes link no longer appears in the BankCMG header and will be re-enabled once the API is updated to use BankCMG-specific credentials.

**Screenshots:**
- `screenshots/93137_1.png`

---

### 🐛 FIX: User can see cached information when viewing mortgage
**Ticket:** [#87983](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87983)
**Type:** Bug

**Summary:**
- Resolved a caching issue where users could see outdated mortgage information when viewing their loan details. The system now properly refreshes data to ensure users always see current and accurate mortgage account information.

**Screenshots:**
- `screenshots/87983_1.png`

---

### 🐛 FIX: Verify Identity - User can submit the form without the DOB field filled out
**Ticket:** [#91752](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91752)
**Type:** Bug

**Summary:**
- Resolved a validation issue on the Verify Identity page where users could submit the form without completing the required Date of Birth field. The form now properly enforces all required fields before submission, ensuring complete identity verification data.

**Screenshots:**
- `screenshots/91752_1.png`

---

### 🐛 FIX: Tasks disappeared after uploading Miscellaneous Document
**Ticket:** [#93403](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93403)
**Type:** Defect

**Summary:**
- Resolved a defect where tasks disappeared from the Task Framework after a borrower uploaded a Miscellaneous Document. The fix ensures document upload tasks persist correctly after submission, maintaining the complete task list for the borrower.

**Screenshots:**
- `screenshots/93403_1.png`

---

## SmartApp (4 items)

### ✨ ENHANCED: CX | SmartApp | Update phone consent message for primary borrower
**Ticket:** [#78782](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/78782)
**Type:** User Story

**Summary:**
- Updated the phone consent message on the primary borrower information page in SmartApp to reflect clearer communication preferences language. Borrowers now see updated consent language regarding autodialed and prerecorded messages, opt-out options, and ESIGN requirements, ensuring informed consent during the application process.

**Screenshots:**
- `screenshots/78782_1.png`

---

### 🆕 NEW: CX | SmartApp | Add Phone Type and consent disclaimer to co-borrower information page
**Ticket:** [#91498](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91498)
**Type:** User Story

**Summary:**
- Added Phone Type selection (Mobile, Home, or Work) and updated consent language on the Co-Borrower Information page in SmartApp. Users now select their phone type, ensuring the number is mapped to the correct field in Byte, and must acknowledge a scrollable consent disclaimer before continuing. This enhancement provides clearer consent language and aligns with ESIGN requirements for electronic signatures.

**Screenshots:**
- `screenshots/91498_1.png`

---

### 🆕 NEW: BankCMG Email Branding
**Ticket:** [#93046](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93046)
**Type:** User Story

**Summary:**
- Implemented BankCMG branding for all SmartApp transactional emails sent to borrowers, including account creation, activation, password reset, account updates, and loan application submission notifications. Emails now display the BankCMG logo, sender, contact information, and footer disclaimers, providing a consistent brand experience for BankCMG customers throughout their application journey.

**Screenshots:**
- `screenshots/93046_1.png`

---

### 🐛 FIX: Incorrect loan officer displayed after logging in when prompted as returning user
**Ticket:** [#81268](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/81268)
**Type:** Bug

**Summary:**
- Resolved an issue where returning SmartApp users were shown the wrong loan officer information after logging in. The system now correctly displays the assigned loan officer associated with the user's account, ensuring accurate contact information and an improved user experience.

**Screenshots:**
- `screenshots/81268_1.png`

---

## Servicing (10 items)

### ✨ ENHANCED: Update message shown when there are no documents available
**Ticket:** [#90375](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90375)
**Type:** User Story

**Summary:**
- Updated the message displayed when no documents are available on the servicing Documents page to provide clearer expectations. The new message informs users that documents should be available within approximately 10 business days from loan close, reducing confusion while keeping error messages for retrieval issues distinct and clearly styled.

**Screenshots:**
- `screenshots/90375_1.png`

---

### 🆕 NEW: Display and Filter documents for Appraisal, Closing Disclosure, Funding Package, PMI Removal Notices, and 1099s
**Ticket:** [#90377](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90377)
**Type:** User Story

**Summary:**
- Added nine additional document types to the servicing Documents page, giving users access to more loan-related documents without contacting support. New types include Funding Package, Appraisal, Closing Disclosure, Mortgage Insurance Removal notices (Denial, Approval, Confirmation), and IRS tax forms (1099-MISC, 1099-A, 1099-C). Filter options dynamically display only the document types available for each specific loan.

**Screenshots:**
- `screenshots/90377_1.png`

---

### 🆕 NEW: Change Loan Amount to Loan Balance on primary dashboard
**Ticket:** [#92003](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92003)
**Type:** User Story

**Summary:**
- Updated the label on Mortgage Account cards on the primary dashboard from 'Loan Amount' to 'Loan Balance' for Cenlar and LoanServ loans. This change provides a more accurate description of the value displayed — the current outstanding balance rather than the original loan amount — helping borrowers better understand their servicing account information.

**Screenshots:**
- `screenshots/92003_1.png`

---

### 🔧 TECH: Upgrade Aspen Grove widgets to 1.50.0
**Ticket:** [#92082](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92082)
**Type:** User Story

**Summary:**
- Upgraded Aspen Grove servicing widgets to version 1.50.0, ensuring compatibility, security, and access to the latest features. The update provides improved performance and stability for payment management, transaction history, and account details widgets, maintaining seamless integration between the Home Portal and Aspen Grove servicing platforms.

**Screenshots:**
- `screenshots/92082_1.png`

---

### 🆕 NEW: Extend SSN search to include coborrowers for displaying servicing dashboard
**Ticket:** [#92256](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92256)
**Type:** User Story

**Summary:**
- Enhanced identity verification logic to include co-borrowers when determining access to mortgage account servicing dashboards. Users who originated a loan in SmartApp and completed identity verification can now access their servicing dashboard even if they are not the primary borrower, resolving an issue where secondary borrowers were unable to view their post-funded mortgage accounts.

**Screenshots:**
- `screenshots/92256_1.png`

---

### 🆕 NEW: Add Banner for 1098 - Prior to Delivery
**Ticket:** [#92871](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92871)
**Type:** User Story

**Summary:**
- Added an informational blue banner to servicing mortgage account dashboards notifying users that their 1098 tax form is being prepared and will be mailed and available in the Documents Center by January 31. This proactive communication helps borrowers understand when to expect their tax documents, reducing support inquiries during tax season.

**Screenshots:**
- `screenshots/92871_1.png`

---

### 🔍 SPIKE: Preview document
**Ticket:** [#42244](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/42244)
**Type:** Spike

**Summary:**
- Investigated implementing an in-page PDF document preview modal for servicing documents to eliminate the need for users to leave the current page. Research covered zoom controls, page navigation, download functionality, mobile gestures, and error handling patterns. Findings will inform the development of a seamless document viewing experience within the Home Portal.

**Screenshots:**
- `screenshots/42244_1.png`

---

### 🔍 SPIKE: Define Alert Display API Requirements for Home Portal [16 hours]
**Ticket:** [#91672](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91672)
**Type:** Spike

**Summary:**
- Defined API requirements for a new alert banner system that allows business users to create and manage alerts without engineering involvement. Research covered API endpoints, request parameters for user-level and loan-level contexts, alert payload fields (message content, severity, dismissibility, placement, priority, CTA links), and handling of compliance-controlled alerts. Key recommendations include borrower targeting, multi-alert stacking, dismissal state persistence, and API versioning to support the Admin alert management capability.

**Screenshots:**
- `screenshots/91672_1.png`

---

### ✅ TASK: Verify existing servicing dashboards (Regression)
**Ticket:** [#92543](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92543)
**Type:** Task

---

### ✅ TASK: Verify that user can navigate to dashboard from Verify Identity page after redirect for an app in servicing.
**Ticket:** [#93362](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93362)
**Type:** Task

---

## Tech Enhancements (7 items)

### 🔧 TECH: Smart App | Remove Route History for ApplicationJSONStateString
**Ticket:** [#87916](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87916)
**Type:** User Story

**Summary:**
- Cleaned up technical debt by removing the routeHistory property from ApplicationJSONStateString and all related references throughout SmartApp. This property was originally used for navigation tracking but has been replaced by the progress indicator logic, reducing complexity and improving maintainability without impacting user-facing functionality.

**Screenshots:**
- `screenshots/87916_1.png`

---

### 🔧 TECH: Remove unused Aspose.PDF.Drawing-related document generation code and clean up Docker components from TP API
**Ticket:** [#91669](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91669)
**Type:** User Story

**Summary:**
- Cleaned up technical debt by removing unused Aspose.PDF.Drawing document generation code from the Third Party API, along with associated Docker components previously used for the deprecated AccountChek flow. Removing these dependencies reduces the attack surface, simplifies builds and containers, lowers maintenance costs, and improves overall system performance.

**Screenshots:**
- `screenshots/91669_1.png`

---

### 🔧 TECH: Send Loan-Conversion Service Bus Messages to Additional Topic
**Ticket:** [#92294](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92294)
**Type:** User Story

**Summary:**
- Configured loan conversion service bus messages to publish to both the legacy topic and the new standardized topic (origination-cx-loanapplicationconversion), supporting CMG's organization-wide effort to standardize Service Bus naming. The legacy topic retirement is planned for a future release once all consumers have migrated to the new topic structure.

**Screenshots:**
- `screenshots/92294_1.png`

---

### 🔧 TECH: Performance Improvements to usp_GetPipelineLoanApplicationList
**Ticket:** [#92559](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92559)
**Type:** User Story

**Summary:**
- Improved the performance of the pipeline loan application retrieval process by optimizing the usp_GetPipelineLoanApplicationList stored procedure with better handling of loan officer list processing and addition of missing indexes. These enhancements reduce query execution time and improve system responsiveness when Clear calls the pipeline API endpoint, particularly under high load.

**Screenshots:**
- `screenshots/92559_1.png`

---

### 🔧 TECH: Database Query Improvements for ExternalController.GetLoanApplicationsByGUIDsAsync
**Ticket:** [#92561](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92561)
**Type:** User Story

**Summary:**
- Refactored the loan application retrieval process to fetch all loan data in a single database call rather than separate queries for each GUID. Previously, retrieving multiple loan applications resulted in numerous individual database queries that could cause timeout errors under high load. The consolidated approach reduces database I/O and enhances system stability.

**Screenshots:**
- `screenshots/92561_1.png`

---

### 🔧 TECH: Add claude initialization to UI repo
**Ticket:** [#93426](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93426)
**Type:** User Story

**Summary:**
- Established Claude AI assistant integration in the UI repository by adding a claude.md configuration file, enabling developers to leverage AI-assisted development capabilities for improved code quality, faster development cycles, and better documentation.

**Screenshots:**
- `screenshots/93426_1.png`

---

### 🔍 SPIKE: Investigate Instituting a "Pre-Deploy" Process
**Ticket:** [#92275](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92275)
**Type:** Spike

**Summary:**
- Researched splitting the deployment process into two distinct steps: deploying artifacts to a deployment slot and swapping slots. This approach allows for pre-deployment of artifacts outside the deployment window, enabling issues to be addressed separately and creating a smoother, more reliable deployment experience. Next steps include implementing the two-step process and establishing pre-deploy validation procedures.

**Screenshots:**
- `screenshots/92275_1.png`

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
