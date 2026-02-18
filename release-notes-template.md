# Release Notes Template
## Sprint: CX (02) 2026.01.28

---

## 🎉 New Features & Enhancements

### Home Portal
- **Loan Number Privacy**: Partially hide loan number by default with ability to view full number ([#65133](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/65133))
- **Identity Verification Flow**: Allow users to navigate to dashboard from Verify Identity page ([#86711](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/86711))
- **Document Upload Improvements**:
  - Enhanced GET Document Upload Task workflow ([#87188](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87188))
  - Add document types to completed upload tasks ([#89824](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/89824))
  - Removed feature flag for Miscellaneous Upload Document Task ([#87516](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87516))
- **eSign Integration**:
  - Get eSign Tasks Item ([#69460](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/69460))
  - eSign Tasks Action Page ([#79993](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/79993))
- **Mortgage Calculator**: Updated computational logic with CMG fees ([#92249](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92249))
- **Site Introduction Modal**: Deprecated for users after 8/8 ([#28599](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/28599))

### Servicing Portal
- **Document Management**:
  - Preview document functionality ([#42244](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/42244))
  - Display and filter documents for Appraisal, Closing Disclosure, etc. ([#90377](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90377))
  - Updated messaging when no documents available ([#90375](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/90375))
- **Dashboard Updates**:
  - Changed "Loan Amount" to "Loan Balance" on primary dashboard ([#92003](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92003))
  - Upgraded Aspen Grove widgets to v1.50.0 ([#92082](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92082))
  - Extended SSN search to include coborrowers ([#92256](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92256))
- **1098 Tax Forms**: Added banner prior to delivery ([#92871](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92871))

### SmartApp
- **Phone Consent**: Updated phone consent message for primary borrower ([#78782](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/78782))
- **Co-Borrower Enhancements**: Added phone type and consent disclaimer to co-borrower page ([#91498](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91498))

### Bank CMG Branding
- **HouseCanary Integration**: Applied Bank CMG branding to HouseCanary ([#92269](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92269))
- **Email Branding**: Updated SmartApp email branding ([#93046](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93046))
- **Your Homes Dashboard**: Turned off via feature flag for BankCMG ([#93137](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93137))

### Partner Co-Branding
- **Real Estate Agent Card**: Enhanced with headshot and company logo visibility ([#91976](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91976))

---

## 🐛 Bug Fixes

### SmartApp
- Fixed incorrect loan officer displayed after login when prompted as returning user ([#81268](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/81268))

### Home Portal
- Fixed cached mortgage information display issue ([#87983](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87983))
- Fixed Verify Identity form submission without required fields ([#91752](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91752))
- Fixed tasks disappearing after uploading Miscellaneous Document ([#93403](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93403))

### Bank CMG Branding Issues
- Fixed missing green background on BankCMG branded "My Claimed Home" ([#93127](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93127))
- Fixed mobile logout issue when clicking on Home Search ([#93149](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93149))
- Fixed Real Estate card spacing/text/formatting issues ([#93173](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93173))
- Fixed SVG file cropping in circle borders ([#93246](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93246))
- Fixed headshot not loading on Secure Upload Page ([#93273](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93273))
- Fixed Loan Number Created email for BankCMG displaying as CMG Home Loans ([#93556](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93556))

### General Defects
- Fixed duplicate Pre-Disclosure packages display ([#92317](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92317))
- Fixed package label translation for Pre-Disclosure package type ([#92894](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92894))

---

## 🔧 Technical Improvements

### Performance
- Performance improvements to `usp_GetPipelineLoanApplications` database procedure ([#92559](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92559))
- Database query improvements for `ExternalController.GetLoan` ([#92561](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92561))

### Code Quality & Tech Debt
- Removed route history for ApplicationJSONState in SmartApp ([#87916](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/87916))
- Removed unused Aspose.PDF.Drawing-related document generator dependencies ([#91669](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91669))
- Added claude initialization to UI repo ([#93426](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/93426))
- Sent Loan-Conversion Service Bus Messages to additional endpoints ([#92294](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92294))

### Research & Planning
- Defined Alert Display API Requirements for Home Portal ([#91672](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/91672))
- Investigated instituting a "Pre-Deploy" process ([#92275](https://cmgfidev.visualstudio.com/Consumer%20Experience/_workitems/edit/92275))

---

## 📊 Sprint Summary

- **Total Completed Items**: 73
- **User Stories**: 29
- **Bugs/Defects Fixed**: 11
- **Technical Debt**: 7
- **Testing Tasks**: 25
- **Spikes (Research)**: 2

---

## 📝 Notes

- Sprint ran from January 14, 2026 to January 28, 2026
- Major focus areas: Bank CMG branding, document management enhancements, and performance improvements
- Significant QA effort with 25+ verification tasks completed

---

### Template Instructions

**Note:** This template shows a high-level grouped format. For detailed per-item release notes (the current automated process), follow the workflow in TODO.md.

**How to use this template for executive summaries:**

1. **Review generated release notes**:
   - Generated HTML files include all work items with detailed summaries
   - Use those as the source for this high-level summary

2. **Create executive summary**:
   - Group features by product area and theme
   - Highlight major features and bug fixes
   - Include sprint statistics
   - Note focus areas and accomplishments

3. **Format for presentation**:
   - Use this grouped format for executive presentations
   - Use the detailed HTML release notes for training and support teams
   - Both formats serve different audiences

**For automated detailed release notes, see:** TODO.md and SUMMARY-GUIDELINES.md
