# 06 - Project Map

This document provides a map of key features and their corresponding entry point files within the project structure. The paths are provided in a format that can be used for quick navigation in some IDEs.

## Main Application Pages (`app/(pages)/`)

*   **Global Layout:** `file://./app/(pages)/layout.tsx`
*   **Global Error Page:** `file://./app/(pages)/error.tsx`
*   **Global Styles:** `file://./app/(pages)/globals.css`

### Home Page
*   **Layout:** `file://./app/(pages)/home/layout.tsx`
*   **Main Page:** `file://./app/(pages)/home/page.tsx`
    *   Approval Requests Slot: `file://./app/(pages)/home/@approvalRequestsTable/page.tsx`
    *   Attendance Slot: `file://./app/(pages)/home/@attendance/page.tsx`
    *   Complete Profile Slot: `file://./app/(pages)/home/@completeProfile/page.tsx`
    *   General Info Slot: `file://./app/(pages)/home/@generalInfo/page.tsx`
    *   News Slot: `file://./app/(pages)/home/@news/page.tsx`
    *   Sliders Slot: `file://./app/(pages)/home/@sliders/page.tsx`
    *   Timeline Calendar Slot: `file://./app/(pages)/home/@timelineCalendar/page.tsx`
    *   User Info Slot: `file://./app/(pages)/home/@userInfo/page.tsx`

### Employee Application
*   **Page:** `file://./app/(pages)/employee-application/page.tsx`

### Employee Department
*   **Page:** `file://./app/(pages)/employee-department/page.tsx`

### Evaluation
*   **Goals Layout:** `file://./app/(pages)/evaluation/goals/layout.tsx`
*   **Goals Page:** `file://./app/(pages)/evaluation/goals/page.tsx`
    *   New Goal Page: `file://./app/(pages)/evaluation/goals/new/page.tsx`
    *   Goal Details Page: `file://./app/(pages)/evaluation/goals/details/[id]/page.tsx`


### Modal Views
*   **Default Modal Slot:** `file://./app/(pages)/@modalSlot/default.tsx`
*   **Named Modal Page:** `file://./app/(pages)/modal/[name]/page.tsx`

### News
*   **Main News Page:** `file://./app/(pages)/news/page.tsx`
*   **Internal Ads Page:** `file://./app/(pages)/news/internal-ads/page.tsx`
    *   Internal Ad Details: `file://./app/(pages)/news/internal-ads/details/[id]/page.tsx`
*   **Monshaat Family News Page:** `file://./app/(pages)/news/monshaat-family/page.tsx`
    *   Family News Details: `file://./app/(pages)/news/monshaat-family/details/[id]/page.tsx`
*   **General News Page (Sub-section):** `file://./app/(pages)/news/news/page.tsx`
    *   News Details: `file://./app/(pages)/news/news/details/[id]/page.tsx`
*   **Press File Page:** `file://./app/(pages)/news/press-file/page.tsx`
    *   Press File Details: `file://./app/(pages)/news/press-file/details/[id]/page.tsx`

### Obligation
*   **Page:** `file://./app/(pages)/obligation/page.tsx`

### Profile
*   **Page:** `file://./app/(pages)/profile/page.tsx`

### Rules
*   **Page:** `file://./app/(pages)/rules/page.tsx`

### Search Employee
*   **Page:** `file://./app/(pages)/search-employee/page.tsx`

### Surveys
*   **Page:** `file://./app/(pages)/surveys/page.tsx`

### Transaction List
*   **Layout:** `file://./app/(pages)/transaction-list/layout.tsx`
*   **Page:** `file://./app/(pages)/transaction-list/page.tsx`

## Request System (`app/(pages)/request/`)

This section outlines entry points for various request types. Most follow a pattern of a main page (listing), a `new/` page for creation, and `details/[id]/` for viewing.

*   **Attendance Requests:**
    *   Employee Attendance: `file://./app/(pages)/request/attendance/employee-attendance/page.tsx`
    *   Attendance List: `file://./app/(pages)/request/attendance/attendance-list/page.tsx`
*   **Bank Account Change:**
    *   Layout: `file://./app/(pages)/request/bank-account-change/layout.tsx`
    *   List Page: `file://./app/(pages)/request/bank-account-change/page.tsx`
    *   New Request: `file://./app/(pages)/request/bank-account-change/new/page.tsx`
    *   Details: `file://./app/(pages)/request/bank-account-change/details/[id]/page.tsx`
*   **Batch Details:** `file://./app/(pages)/request/batch/details/[id]/page.tsx`
*   **Custody Requests:**
    *   Layout: `file://./app/(pages)/request/custody/layout.tsx`
    *   List Page: `file://./app/(pages)/request/custody/page.tsx`
    *   New Request: `file://./app/(pages)/request/custody/new/page.tsx`
    *   Details: `file://./app/(pages)/request/custody/details/[id]/page.tsx`
*   **Deputations:**
    *   Layout: `file://./app/(pages)/request/deputations/layout.tsx`
    *   List Page: `file://./app/(pages)/request/deputations/page.tsx`
    *   New Request: `file://./app/(pages)/request/deputations/new/page.tsx`
    *   Details: `file://./app/(pages)/request/deputations/details/[id]/page.tsx`
*   **Employee Members:**
    *   Layout: `file://./app/(pages)/request/employee-members/layout.tsx`
    *   List Page: `file://./app/(pages)/request/employee-members/page.tsx`
    *   New Request: `file://./app/(pages)/request/employee-members/new/page.tsx`
    *   Details: `file://./app/(pages)/request/employee-members/details/[id]/page.tsx`
*   **HR Letter Requests:**
    *   Layout: `file://./app/(pages)/request/hr-letter/layout.tsx`
    *   List Page: `file://./app/(pages)/request/hr-letter/page.tsx`
    *   New Request: `file://./app/(pages)/request/hr-letter/new/page.tsx`
    *   Details: `file://./app/(pages)/request/hr-letter/details/[id]/page.tsx`
*   **Internal Courses Calendar:**
    *   Layout: `file://./app/(pages)/request/internal-courses-calendar/layout.tsx`
    *   Page: `file://./app/(pages)/request/internal-courses-calendar/page.tsx`
    *   Details: `file://./app/(pages)/request/internal-courses-calendar/details/[id]/page.tsx`
*   **Job Applications:**
    *   Layout: `file://./app/(pages)/request/job-applications/layout.tsx`
    *   List Page: `file://./app/(pages)/request/job-applications/page.tsx`
    *   New Request: `file://./app/(pages)/request/job-applications/new/page.tsx`
    *   Details: `file://./app/(pages)/request/job-applications/details/[id]/page.tsx`
*   **Medical Insurance Requests:**
    *   Layout: `file://./app/(pages)/request/medical/layout.tsx`
    *   List Page: `file://./app/(pages)/request/medical/page.tsx`
    *   New Request: `file://./app/(pages)/request/medical/new/page.tsx`
    *   Details: `file://./app/(pages)/request/medical/details/[id]/page.tsx`
*   **Overtime Assignment Requests:**
    *   Layout: `file://./app/(pages)/request/overtime-assignment/layout.tsx`
    *   List Page: `file://./app/(pages)/request/overtime-assignment/page.tsx`
    *   New Request: `file://./app/(pages)/request/overtime-assignment/new/page.tsx`
    *   Details: `file://./app/(pages)/request/overtime-assignment/details/[id]/page.tsx`
*   **Overtime Confirmation:**
    *   Layout: `file://./app/(pages)/request/overtime-confirm/layout.tsx`
    *   List Page: `file://./app/(pages)/request/overtime-confirm/page.tsx`
    *   New Request: `file://./app/(pages)/request/overtime-confirm/new/page.tsx`
    *   Details: `file://./app/(pages)/request/overtime-confirm/details/[id]/page.tsx`
*   **Passport Requests:**
    *   Layout: `file://./app/(pages)/request/passport/layout.tsx`
    *   List Page: `file://./app/(pages)/request/passport/page.tsx`
    *   New Request: `file://./app/(pages)/request/passport/new/page.tsx`
    *   Details: `file://./app/(pages)/request/passport/details/[id]/page.tsx` (Assuming details exist, path from ls was `app/(pages)/request/passport/components/[id]/...`)
*   **Permissions Requests:**
    *   Layout: `file://./app/(pages)/request/permissions/layout.tsx`
    *   List Page: `file://./app/(pages)/request/permissions/page.tsx`
    *   New Request: `file://./app/(pages)/request/permissions/new/page.tsx`
    *   Details: `file://./app/(pages)/request/permissions/details/[id]/page.tsx`
*   **Probation Period Requests:**
    *   Layout: `file://./app/(pages)/request/probation-period/layout.tsx`
    *   List Page: `file://./app/(pages)/request/probation-period/page.tsx`
    *   New Request: `file://./app/(pages)/request/probation-period/new/page.tsx`
    *   Details: `file://./app/(pages)/request/probation-period/details/[id]/page.tsx`
*   **Purchase Requests:**
    *   Layout: `file://./app/(pages)/request/purchase/layout.tsx`
    *   List Page: `file://./app/(pages)/request/purchase/page.tsx`
    *   New Request: `file://./app/(pages)/request/purchase/new/page.tsx`
    *   Details: `file://./app/(pages)/request/purchase/details/[type]/[id]/page.tsx`
*   **Recommendations:**
    *   Layout: `file://./app/(pages)/request/recommendations/layout.tsx`
    *   Page: `file://./app/(pages)/request/recommendations/page.tsx`
    *   Details: `file://./app/(pages)/request/recommendations/details/[id]/page.tsx`
*   **Remote Work Requests:**
    *   Layout: `file://./app/(pages)/request/remote-work/layout.tsx`
    *   List Page: `file://./app/(pages)/request/remote-work/page.tsx`
    *   New Request: `file://./app/(pages)/request/remote-work/new/page.tsx`
    *   Details: `file://./app/(pages)/request/remote-work/details/[id]/page.tsx`
*   **Replacement Covenant:**
    *   Layout: `file://./app/(pages)/request/replacement-covenant/layout.tsx`
    *   Page: `file://./app/(pages)/request/replacement-covenant/page.tsx`
    *   New Request: `file://./app/(pages)/request/replacement-covenant/new/page.tsx`
    *   Details: `file://./app/(pages)/request/replacement-covenant/details/[id]/page.tsx`
*   **Resignation Requests:**
    *   Layout: `file://./app/(pages)/request/resignation/layout.tsx`
    *   Page: `file://./app/(pages)/request/resignation/page.tsx`
    *   New Request: `file://./app/(pages)/request/resignation/new/page.tsx`
    *   Details: `file://./app/(pages)/request/resignation/details/[id]/page.tsx`
*   **Supplier Evaluation:**
    *   Layout: `file://./app/(pages)/request/supplier-evaluation/layout.tsx`
    *   Page: `file://./app/(pages)/request/supplier-evaluation/page.tsx`
    *   New Request: `file://./app/(pages)/request/supplier-evaluation/new/page.tsx`
    *   Details: `file://./app/(pages)/request/supplier-evaluation/details/[id]/page.tsx`
*   **Ticket Requests:**
    *   Layout: `file://./app/(pages)/request/ticket/layout.tsx`
    *   List Page: `file://./app/(pages)/request/ticket/page.tsx`
    *   New Request: `file://./app/(pages)/request/ticket/new/page.tsx`
    *   Details: `file://./app/(pages)/request/ticket/details/[id]/page.tsx`
*   **Training Requests:**
    *   Layout: `file://./app/(pages)/request/training/layout.tsx`
    *   List Page: `file://./app/(pages)/request/training/page.tsx`
    *   New Request: `file://./app/(pages)/request/training/new/page.tsx`
    *   Details: `file://./app/(pages)/request/training/details/[id]/page.tsx`
*   **Vacation Requests:**
    *   Layout: `file://./app/(pages)/request/vacations/layout.tsx`
    *   List Page: `file://./app/(pages)/request/vacations/page.tsx`
    *   New Request: `file://./app/(pages)/request/vacations/new/page.tsx`
    *   Details: `file://./app/(pages)/request/vacations/details/[type]/[id]/page.tsx`
*   **Work Document Requests:**
    *   Layout: `file://./app/(pages)/request/work-document/layout.tsx`
    *   List Page: `file://./app/(pages)/request/work-document/page.tsx`
    *   New Request: `file://./app/(pages)/request/work-document/new/page.tsx`
    *   Details: `file://./app/(pages)/request/work-document/details/[id]/page.tsx`

This map is not exhaustive but covers the primary user-facing sections of the application. For component-level details, refer to the respective `components` subdirectories within each feature folder.
