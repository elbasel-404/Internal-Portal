# 05 - Project Tour: A Guided Walkthrough

This project tour provides a step-by-step walkthrough of common user scenarios in the portal. It helps illustrate how different features and modules are used in practice.

**Assumptions:**

- You have successfully set up and are running the application locally.
- You are logged in as a regular employee user (unless specified otherwise).

## Scenario 1: First Login and Exploring the Home Page

1.  **Login:**

    - Navigate to the application's root URL.
    - You'll be presented with a login page. Enter your credentials (or use any demo/test credentials provided for the development environment).
    - Upon successful login, you are redirected to the Home page.

2.  **Exploring the Home Page (`app/(pages)/home/`):**
    - **User Information:** Notice the section displaying your basic information (e.g., name, employee ID, department). This is often powered by the `@userInfo` slot.
    - **News Feed:** Scroll through the `@news` section to see the latest company announcements or articles.
    - **Approval Requests:** If your role involves approvals, the `@approvalRequestsTable` might show items pending your action.
    - **Timeline/Calendar:** Check the `@timelineCalendar` for any upcoming events or important dates.
    - **Widgets:** Observe other widgets like `@attendance` summaries or prompts like `@completeProfile`. Many home page sections are configurable by the user or admin.

## Scenario 2: Submitting a Vacation Request

1.  **Navigate to Requests:**

    - Locate the "Requests" or a similarly named section in the main navigation menu (likely managed by `app/components/Sidebar/` or `app/components/Navbar/`).
    - Within the Requests menu, find and click on "Vacations" (or "Leave Request"). This will take you to `app/(pages)/request/vacations/`.

2.  **View Existing Vacation Requests:**

    - The page usually displays a list or table of your past and current vacation requests, showing their status (e.g., Pending, Approved, Rejected).

3.  **Create a New Vacation Request:**

    - Look for a button like "New Vacation Request" or "Apply for Leave". Clicking this will likely navigate you to a `new/` sub-route, e.g., `app/(pages)/request/vacations/new/`.
    - **Fill the Form:**
      - **Vacation Type:** Select the type of leave (e.g., Annual Leave, Sick Leave). This might be populated from `api-schemas/vacation-types/`.
      - **Start Date & End Date:** Choose the desired dates using date pickers.
      - **Reason (Optional):** Enter a brief reason for your request.
      - **Attachments (Optional):** Upload any supporting documents if required.
    - **Submit:** Click the "Submit" button.

4.  **Confirmation and Tracking:**
    - You should see a confirmation message.
    - Your new request will appear in the list of vacation requests, typically with a "Pending Approval" status.
    - You can return to this page later to check for status updates.

## Scenario 3: Checking Your Profile

1.  **Navigate to Profile:**

    - Find a "Profile" link in the navigation menu or often accessible from a user dropdown menu in the header/sidebar. This leads to `app/(pages)/profile/`.

2.  **View Profile Information:**
    - The profile page will display various sections (tabs or cards) with your information:
      - Personal Details
      - Contact Information
      - Employment Details (Job Title, Department)
      - Emergency Contacts
      - Dependents
      - Skills, Qualifications, etc.
    - Some information might be editable, while other parts might be read-only (synced from HR systems).

## Scenario 4: Browsing Company News

1.  **Navigate to News:**

    - Select "News" from the main navigation. This takes you to `app/(pages)/news/`.

2.  **Explore News Categories:**

    - You'll likely see different categories like "General News," "Monshaat Family News," or "Internal Ads."
    - Click on a category to see a list of articles.

3.  **Read an Article:**
    - Click on an article title from the list.
    - This will navigate you to the article details page (e.g., `app/(pages)/news/news/details/[id]`), where you can read the full content.

## Scenario 5: Searching for an Employee

1.  **Navigate to Employee Search:**

    - Look for an "Employee Directory," "Search Employee," or "Colleagues" link in the navigation. This corresponds to `app/(pages)/search-employee/`.

2.  **Perform a Search:**

    - Enter the name, department, or other criteria of the employee you're looking for into the search bar.
    - The system will display a list of matching employees.

3.  **View Employee Details (Optional):**
    - Clicking on an employee's name might show a limited public profile or contact information, depending on the application's design and privacy settings.

## Scenario 6: (For Approvers) Managing an Approval Request

1.  **Check Home Page or Notifications:**

    - If you are an approver, new requests needing your attention might appear on your home page in the `@approvalRequestsTable`.
    - You might also receive notifications (check the bell icon or notification center, often part of `app/components/Navbar/`).

2.  **Navigate to the Specific Request Type:**

    - Alternatively, go to the relevant request section (e.g., "Vacations" under "Requests"). You might see a view or filter for "Requests to Approve."

3.  **Review the Request:**

    - Click on a pending request to view its details. This will show all the information submitted by the requester.

4.  **Approve or Reject:**
    - Look for "Approve" and "Reject" buttons.
    - If rejecting, you'll likely need to provide a reason.
    - Once actioned, the request status updates, and the requester is usually notified.

This tour covers some of the most common interactions within the portal. Explore other sections like "HR Letters," "Medical Insurance," or "Training" under "Requests" to understand their specific workflows. The exact navigation paths and UI elements might vary slightly, but the overall flow should align with these scenarios.
