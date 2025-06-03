# API Documentation

## Table of Contents

- [API Configuration Interface](#api-configuration-interface)
  - [`ApiConfig`](#apiconfig)
- [Generic API Request Helper](#generic-api-request-helper)
  - [`apiRequest`](#apirequest)
- [HR: Holidays Endpoints](#hr-holidays-endpoints)
  - [`createHolidayRequest`](#createholidayrequest)
  - [`getHolidaysRequest`](#getholidaysrequest)
  - [`getHolidaysStatusByGender`](#getholidaysstatusbygender)
  - [`acceptHolidayRequest`](#acceptholidayrequest)
  - [`rejectHolidayRequest`](#rejectholidayrequest)
  - [`getSubstituteEmployees`](#getsubstituteemployees)
- [HR: Authorization Endpoints](#hr-authorization-endpoints)
  - [`createAuthorization`](#createauthorization)
  - [`getAuthorization`](#getauthorization)
  - [`acceptAuthorization`](#acceptauthorization)
  - [`rejectAuthorization`](#rejectauthorization)
- [HR: Attendance Endpoints](#hr-attendance-endpoints)
  - [`createHrAttendance`](#createhrattendance)
  - [`getHrAttendance`](#gethrattendance)
  - [`getEmployeePresence`](#getemployeepresence)
  - [`getAttendancePerYear`](#getattendanceperyear)
  - [`getAttendancePerYearV2`](#getattendanceperyearv2)
- [HR: Distance Work Endpoints](#hr-distance-work-endpoints)
  - [`createDistanceWork`](#createdistancework)
  - [`getDistanceWork`](#getdistancework)
  - [`acceptDistanceWork`](#acceptdistancework)
  - [`rejectDistanceWork`](#rejectdistancework)
- [HR: Change Bank Account Endpoints](#hr-change-bank-account-endpoints)
  - [`createChangeBankAccount`](#createchangebankaccount)
  - [`getChangeBankAccount`](#getchangebankaccount)
  - [`getBanks`](#getbanks)
  - [`acceptChangeBankAccount`](#acceptchangebankaccount)
  - [`rejectChangeBankAccount`](#rejectchangebankaccount)
- [HR: Probation Evaluation Endpoints](#hr-probation-evaluation-endpoints)
  - [`probationEvaluationRead`](#probationevaluationread)
  - [`probationEvaluationCreate`](#probationevaluationcreate)
- [HR: Custody Endpoints](#hr-custody-endpoints)
  - [`custodyCreate`](#custodycreate)
  - [`custodyRead`](#custodyread)
- [HR: Salary Identification Request Endpoints](#hr-salary-identification-request-endpoints)
  - [`createSalaryRequest`](#createsalaryrequest)
  - [`getSalaryRequest`](#getsalaryrequest)
  - [`acceptSalaryRequest`](#acceptsalaryrequest)
  - [`rejectSalaryRequest`](#rejectsalaryrequest)
- [HR: Medical Insurance Endpoints](#hr-medical-insurance-endpoints)
  - [`getMedicalInsurance`](#getmedicalinsurance)
  - [`createMedicalInsurance`](#createmedicalinsurance)
  - [`rejectMedicalInsurance`](#rejectmedicalinsurance)
  - [`acceptMedicalInsurance`](#acceptmedicalinsurance)
- [Helpdesk: Ticket Endpoints](#helpdesk-ticket-endpoints)
  - [`createTicket`](#createticket)
  - [`getTicket`](#getticket)
  - [`getTicketFields`](#getticketfields)

## API Configuration Interface

### `ApiConfig`

- **Description**: Interface for API configuration.
- **Properties**:
  - `baseUrl` (string): Base URL for the API endpoints.
  - `apiKey` (string): API key for authentication.
  - `bearerToken` (string): Bearer token for authorization.

---

## Generic API Request Helper

### `apiRequest`

- **Description**: A generic helper function for making API requests.
- **Parameters**:
  - `config` (ApiConfig): API configuration object.
  - `endpoint` (string): API endpoint path (should start with a slash).
  - `method` (string): HTTP method (e.g., GET, POST).
  - `body` (any, optional): Request body. Can be a `FormData` instance or a JSON object.
  - `queryParams` (Record<string, any>, optional): Query parameters as an object.
- **Returns**: A promise resolving to the parsed JSON response.

---

## HR: Holidays Endpoints

### `createHolidayRequest`

- **Description**: Creates a holiday request using a `FormData` body.
- **Parameters**:
  - `data` (object): Holiday request details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getHolidaysRequest`

- **Description**: Retrieves holiday requests using a raw JSON body.
- **Parameters**:
  - `data` (object): Parameters (e.g., `employee_id`).
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getHolidaysStatusByGender`

- **Description**: Retrieves holiday statuses by gender using a raw JSON body.
- **Parameters**:
  - `data` (Record<string, any>): Request payload.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `acceptHolidayRequest`

- **Description**: Accepts a holiday request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `holiday_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `rejectHolidayRequest`

- **Description**: Rejects a holiday request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `holiday_id` and `refuse_reason`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getSubstituteEmployees`

- **Description**: Retrieves substitute employees using query parameters.
- **Parameters**:
  - `query` (object): Query parameters (e.g., `employee_id`, `parent_id`).
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Authorization Endpoints

### `createAuthorization`

- **Description**: Creates an authorization request using a `FormData` body.
- **Parameters**:
  - `data` (object): Authorization request details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getAuthorization`

- **Description**: Retrieves an authorization request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id` and `type_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `acceptAuthorization`

- **Description**: Accepts an authorization request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains the authorization `id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `rejectAuthorization`

- **Description**: Rejects an authorization request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains the authorization `id` and `refuse_reason`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Attendance Endpoints

### `createHrAttendance`

- **Description**: Creates an HR attendance record using query parameters.
- **Parameters**:
  - `query` (object): Contains `employee_id` and `action` (e.g., `sign_in`).
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getHrAttendance`

- **Description**: Retrieves HR attendance records using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id` (and optionally `id`).
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getEmployeePresence`

- **Description**: Retrieves employee presence using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id`, `date_from`, and optionally `date_to`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getAttendancePerYear`

- **Description**: Retrieves attendance per year using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id`, `date_from`, and `date_to`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getAttendancePerYearV2`

- **Description**: Retrieves attendance per year (version 2) using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id`, `date_from`, and `date_to`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Distance Work Endpoints

### `createDistanceWork`

- **Description**: Creates a distance work request using a `FormData` body.
- **Parameters**:
  - `data` (object): Distance work details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getDistanceWork`

- **Description**: Retrieves a distance work request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains the `id` of the distance work request.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `acceptDistanceWork`

- **Description**: Accepts a distance work request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains the `id` of the distance work request.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `rejectDistanceWork`

- **Description**: Rejects a distance work request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains the `id` and `refuse_reason` for the request.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Change Bank Account Endpoints

### `createChangeBankAccount`

- **Description**: Creates a change bank account request using a `FormData` body.
- **Parameters**:
  - `data` (object): Details for bank account change.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getChangeBankAccount`

- **Description**: Retrieves change bank account requests using a raw JSON body.
- **Parameters**:
  - `data` (object): Request parameters (e.g., `id`).
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getBanks`

- **Description**: Retrieves a list of banks using a raw JSON body.
- **Parameters**:
  - `data` (Record<string, any>): Empty object or parameters if needed.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `acceptChangeBankAccount`

- **Description**: Accepts a change bank account request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains the request `id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `rejectChangeBankAccount`

- **Description**: Rejects a change bank account request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains the request `id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Probation Evaluation Endpoints

### `probationEvaluationRead`

- **Description**: Reads probation evaluation data using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `probationEvaluationCreate`

- **Description**: Creates a probation evaluation record using a `FormData` body.
- **Parameters**:
  - `data` (object): Probation evaluation details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Custody Endpoints

### `custodyCreate`

- **Description**: Creates a custody close request using a `FormData` body.
- **Parameters**:
  - `data` (object): Custody close details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `custodyRead`

- **Description**: Reads custody close requests using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Salary Identification Request Endpoints

### `createSalaryRequest`

- **Description**: Creates a salary identification request using a `FormData` body.
- **Parameters**:
  - `data` (object): Salary request details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getSalaryRequest`

- **Description**: Retrieves salary identification requests using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `employee_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `acceptSalaryRequest`

- **Description**: Accepts a salary identification request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `salary_request_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `rejectSalaryRequest`

- **Description**: Rejects a salary identification request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `salary_request_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## HR: Medical Insurance Endpoints

### `getMedicalInsurance`

- **Description**: Retrieves medical insurance details using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `id` (or other parameters).
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `createMedicalInsurance`

- **Description**: Creates a medical insurance request using a `FormData` body.
- **Parameters**:
  - `data` (object): Medical insurance details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `rejectMedicalInsurance`

- **Description**: Rejects a medical insurance request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `medical_insurance_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `acceptMedicalInsurance`

- **Description**: Accepts a medical insurance request using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `medical_insurance_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

---

## Helpdesk: Ticket Endpoints

### `createTicket`

- **Description**: Creates a helpdesk ticket using a `FormData` body.
- **Parameters**:
  - `data` (object): Ticket details.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getTicket`

- **Description**: Retrieves a helpdesk ticket using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains `id` and optional parameters.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.

### `getTicketFields`

- **Description**: Retrieves ticket fields using a raw JSON body.
- **Parameters**:
  - `data` (object): Contains parameters such as `class_id` or `ticket_type_id`.
  - `config` (ApiConfig): API configuration.
- **Returns**: API response.
