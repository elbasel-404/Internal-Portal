# 02 - Key Features and Modules

This document outlines the main features and modules available in the portal. These are primarily accessible through the navigation defined in `app/(pages)/`.

## 1. Home Page (`app/(pages)/home/`)

The home page serves as the central dashboard for users upon logging in. It typically includes:

- **User Information (`@userInfo`)**: Displays key information about the logged-in user.
- **Approval Requests Table (`@approvalRequestsTable`)**: Shows pending approval requests that require the user's attention.
- **Attendance Information (`@attendance`)**: Provides a summary or quick access to attendance records.
- **Profile Completion Prompt (`@completeProfile`)**: Encourages users to complete their profiles if information is missing.
- **General Info Widgets (`@generalInfo`)**: Customizable section for various informational widgets.
- **News Feed (`@news`)**: Displays recent company news or announcements.
- **Sliders/Carousels (`@sliders`)**: For featured content or important updates.
- **Timeline Calendar (`@timelineCalendar`)**: Shows upcoming events, deadlines, or schedules.
- The layout and components are highly configurable, as seen in `app/(pages)/home/components/` and `app/(pages)/home/util/`.

## 2. News Section (`app/(pages)/news/`)

A dedicated section for all types of news and announcements, categorized into:

- **Internal Ads (`internal-ads/`)**: Company-specific advertisements or promotions.
- **Monshaat Family News (`monshaat-family/`)**: News related to employee events, achievements, etc. (Monshaat seems to be the organization's name).
- **General News (`news/`)**: Broader company news or industry updates.
- **Press File (`press-file/`)**: Repository for press releases or media content.
- Each category allows viewing lists and details of news items.

## 3. User Profile (`app/(pages)/profile/`)

Allows users to view and manage their personal and employment-related information. This section typically includes:

- Personal details.
- Contact information.
- Employment history.
- Skills and qualifications.
- Other relevant data points, configurable via components in `app/(pages)/profile/components/`.

## 4. Requests System (`app/(pages)/request/`)

This is a comprehensive module for managing various types of employee and administrative requests. It's one of the largest sections of the application.

- **General Workflow:** Users can typically create new requests, view the status of their existing requests, and see details of each request. Approvers will have interfaces to approve or reject requests.
- **Common Request Types Include:**
  - **Attendance Requests (`attendance/`)**: For rectifying attendance, requesting manual check-ins/outs.
  - **Bank Account Change (`bank-account-change/`)**: Requesting updates to bank details.
  - **Custody Requests (`custody/`)**: For requesting or managing company assets/custody items.
  - **Deputations (`deputations/`)**: Managing deputation assignments.
  - **HR Letter Requests (`hr-letter/`)**: Requesting various official HR letters (e.g., salary certificate, employment proof).
  - **Medical Insurance (`medical/`)**: Managing medical insurance claims or requests.
  - **Overtime Assignment/Confirmation (`overtime-assignment/`, `overtime-confirm/`)**: For managing overtime work.
  - **Passport Requests (`passport/`)**: For passport-related services or documentation.
  - **Permissions (`permissions/`)**: Requesting short leaves or permissions.
  - **Probation Period (`probation-period/`)**: Managing probation evaluations or related requests.
  - **Purchase Requests (`purchase/`)**: For internal procurement.
  - **Remote Work Requests (`remote-work/`)**: Requesting to work remotely.
  - **Resignation Requests (`resignation/`)**: Submitting resignations.
  - **Training Requests (`training/`)**: Enrolling in or requesting training programs.
  - **Vacations (`vacations/`)**: Requesting and managing leave.
- Each request type generally has its own subdirectory with components for forms, details display, and listing. Example: `app/(pages)/request/vacations/components/`.

## 5. Employee Department (`app/(pages)/employee-department/`)

- Allows viewing employees by department, likely showing organizational structure.

## 6. Employee Application (`app/(pages)/employee-application/`)

- This might be related to job applications or internal employee applications for programs/roles.

## 7. Evaluation (`app/(pages)/evaluation/`)

- Likely for performance evaluations, goal setting (`evaluation/goals/`), and tracking.

## 8. Obligation (`app/(pages)/obligation/`)

- This could refer to financial obligations, clearances, or other responsibilities that need tracking.

## 9. Rules & Policies (`app/(pages)/rules/`)

- A section to display company rules, policies, and guidelines.

## 10. Search Employee (`app/(pages)/search-employee/`)

- Provides functionality to search for employees within the organization.

## 11. Surveys (`app/(pages)/surveys/`)

- For conducting and participating in internal surveys.

## 12. Transaction List (`app/(pages)/transaction-list/`)

- Displays a list of transactions, which could be financial, system-related, or specific to certain request types.

This list covers the primary features visible from the page structure. Each feature area often contains its own set of components, forms, and data display logic.
