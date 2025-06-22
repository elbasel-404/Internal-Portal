# Form Submission Test Plan

This document outlines a testing plan to verify that the unified form submission logic works correctly across all forms.

## Test Cases for Each Form

For each form that has been migrated to use the unified form submission logic, perform the following tests:

### 1. Successful Form Submission

**Steps:**

1. Fill out all required fields with valid data
2. Submit the form
3. Observe the response

**Expected Results:**

- Loading state is shown during submission
- Success toast notification appears
- Form redirects to success state
- Request ID is displayed correctly

### 2. Form Validation

**Steps:**

1. Leave required fields empty
2. Submit the form
3. Observe the response

**Expected Results:**

- Form displays validation errors
- Error toast notifications appear
- Form remains in editable state

### 3. Server Error Handling

**Steps:**

1. Fill out the form with data that will trigger a server error (e.g., invalid format)
2. Submit the form
3. Observe the response

**Expected Results:**

- Error toast notification appears with server error message
- Form remains in editable state
- Form values are retained

### 4. Attachments Handling

**Steps:**

1. Add attachments to the form
2. Submit the form
3. Observe the response

**Expected Results:**

- Attachments are correctly uploaded
- Form submission includes attachment references
- Success state is shown if submission is successful

### 5. Employee ID Handling

**Steps:**

1. Fill out the form
2. Submit the form
3. Use browser developer tools to inspect the request

**Expected Results:**

- The employee_id field is automatically added to the request body
- The employee ID matches the currently logged-in user

## Forms to Test

1. VacationForm
2. PermissionForm
3. OvertimeAssignmentForm
4. CustodyForm
5. RemoteWorkForm
6. HrLetterForm
7. BankAccountForm
8. OvertimeConfirmForm
9. RefactoredFormExample (for testing purposes only)

## Bug Reporting

When reporting bugs, please include:

1. The name of the form component
2. The steps to reproduce the issue
3. Screenshots if applicable
4. Browser and device information
5. Any console errors or network errors in developer tools

## Notes

- Ensure tests are performed with different user accounts to verify employee ID handling
- Test on both desktop and mobile devices to ensure responsive behavior
- Test with different languages to ensure RTL support works correctly
