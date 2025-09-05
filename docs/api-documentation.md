# API Documentation

This document provides comprehensive documentation for the Portal API schemas and endpoints.

## Overview

The Portal uses a well-defined schema system built with [Zod](https://zod.dev/) for type-safe API contracts. All schemas are located in the `api-schemas/` directory and provide both TypeScript types and runtime validation.

## Schema Architecture

### Base Schemas

The API uses several foundational schemas that form the building blocks for all endpoints:

#### ResponseSchema
```typescript
{
  jsonrpc: string,
  id: string | null,
  result: ResultSchema
}
```

#### ResultSchema
Generic result wrapper for API responses.

#### CreateSuccessSchema
```typescript
{
  status: string,
  message: string,
  data: {
    id: number
  }
}
```

#### CreateErrorSchema
Used for validation error responses.

## API Categories

### 📋 Request Management

#### Vacation Requests
- **Schema**: `VacationTypeSchema`
- **Description**: Handles vacation type definitions and vacation requests
- **Fields**: Vacation types, duration, approval workflow

#### HR Letters
- **Schema**: `HrLetterTypeSchema`
- **Description**: Various HR letter types (employment letters, salary certificates, etc.)
- **Fields**: Letter type, purpose, language preferences

#### Medical Insurance
- **Schema**: `MedicalInsuranceElementSchema`
- **Description**: Medical insurance claims and requests
- **Fields**: Policy details, claim amounts, medical provider information

#### Custody Requests
- **Schema**: `CustodyElementSchema`
- **Description**: Equipment and asset custody management
- **Fields**: Asset details, custody period, responsibility assignments

#### Deputation
- **Schema**: `DeputationElementSchema`, `DeputationTypeSchema`
- **Description**: Employee deputation and secondment requests
- **Fields**: Destination, duration, purpose, approval chain

#### Remote Work
- **Schema**: `RemoteWorkElementSchema`
- **Description**: Remote work arrangement requests
- **Fields**: Work schedule, duration, equipment needs

#### Training Requests
- **Schema**: `TrainingElementSchema`, `TrainingFieldSchema`
- **Description**: Training program enrollments and course management
- **Fields**: Course details, schedule, certification requirements

### 👥 Employee Management

#### Employee Directory
- **Schema**: `EmployeeMemberSchema`, `EmployeeMembersFieldSchema`
- **Description**: Employee information and organizational structure
- **Fields**: Personal details, department, role, contact information

#### Employee Department
- **Schema**: `EmployeeDepartmentElementSchema`
- **Description**: Department structure and hierarchy
- **Fields**: Department codes, names, reporting structure

#### Employee Lists
- **Schema**: `EmployeesListElementSchema`
- **Description**: Filterable and searchable employee listings
- **Fields**: Search criteria, sorting options, pagination

#### Substitute Employees
- **Schema**: `SubstituteEmployeesSchema`
- **Description**: Temporary replacement and substitution management
- **Fields**: Substitute assignments, duration, responsibilities

### 💰 Financial Management

#### Bank Account Changes
- **Schema**: `ChangeBankAccountElementSchema`
- **Description**: Employee bank account update requests
- **Fields**: New account details, verification documents

#### Salary Identification
- **Schema**: `SalaryIdentificationElementSchema`
- **Description**: Salary certificates and identification documents
- **Fields**: Salary details, purpose, language preferences

#### Purchase Requests
- **Schema**: `PurchaseSchema`, `PurchaseFieldSchema`
- **Description**: Purchase requisitions and approval workflow
- **Fields**: Item details, budget codes, approval chain

#### Batch Products
- **Schema**: `BatchProductSchema`
- **Description**: Bulk product processing and inventory management
- **Fields**: Product codes, quantities, batch information

### 📊 Attendance & Time Management

#### Attendance Tracking
- **Schema**: `AttendanceSchema`
- **Description**: Employee attendance records and reporting
- **Fields**: Check-in/out times, attendance status, overtime

#### Overtime Management
- **Schemas**: 
  - `OvertimeAssignmentElementSchema`
  - `OvertimeConfirmElementSchema`
  - `OvertimeListElementSchema`
- **Description**: Overtime request, approval, and tracking system
- **Fields**: Overtime hours, justification, approval status

#### Permission Requests
- **Schema**: `PermissionElementSchema` (commented out - in development)
- **Description**: Short-term leave and permission requests
- **Fields**: Duration, reason, approval workflow

### 📰 Communication & News

#### Company News
- **Schema**: `NewsElementSchema`
- **Description**: Internal company announcements and news
- **Fields**: Title, content, category, publication date

#### Family News
- **Schema**: `FamilyNewSchema`
- **Description**: Employee family-related announcements
- **Fields**: Event type, employee, announcement details

#### Advertisements
- **Schema**: `AdNewSchema`
- **Description**: Internal job postings and advertisements
- **Fields**: Position details, requirements, application process

### 📋 Performance & Evaluation

#### Probation Evaluation
- **Schemas**:
  - `ProbationEvaluationElementSchema`
  - `ProbationEvaluationFieldsSchema`
  - `ProbationEvaluationEmployeeSchema`
- **Description**: Employee probation period evaluation system
- **Fields**: Evaluation criteria, scores, feedback, recommendations

#### Recommendations
- **Schema**: `RecommendationSchema`
- **Description**: Employee recommendation and referral system
- **Fields**: Candidate details, recommender, position applied

### 🏢 Administrative

#### Job Applications
- **Schema**: `JobApplicationSchema`
- **Description**: External job application processing
- **Fields**: Applicant information, position, qualifications

#### Passport Requests
- **Schema**: `PassportRequestSchema`
- **Description**: Business passport and visa requests
- **Fields**: Travel details, purpose, document requirements

#### Profile Management
- **Schema**: `ProfileElementSchema`
- **Description**: Employee profile information management
- **Fields**: Personal details, emergency contacts, preferences

#### Contractors
- **Schemas**:
  - `ContractorListElementSchema`
  - `RequestContractorFieldsElementSchema`
- **Description**: External contractor management
- **Fields**: Contractor details, contracts, performance metrics

## Workflow Schemas

### Request Creation Workflow
- **Schema**: `RequestCreateWorkflowElementSchema`
- **Description**: Defines the workflow for creating new requests
- **Fields**: Workflow steps, approvers, conditions

### Request Details Workflow
- **Schema**: `RequestDetailsWorkflowElementSchema`
- **Description**: Manages request processing and status updates
- **Fields**: Current status, next steps, history

## Utility Schemas

### Destinations
- **Schema**: `DestinationElementSchema`
- **Description**: Geographic destinations for travel and deputation
- **Fields**: Location codes, names, travel requirements

### Holidays
- **Schema**: `HolidayElementSchema`
- **Description**: Company holiday calendar management
- **Fields**: Holiday dates, types, regional variations

### Rules
- **Schema**: `RulesSchema`
- **Description**: Business rules and policy definitions
- **Fields**: Rule conditions, actions, exceptions

### Obligations
- **Schema**: `ObligationSchema`
- **Description**: Employee obligations and commitments
- **Fields**: Obligation type, duration, compliance status

## Usage Examples

### Creating a New Request

```typescript
import { VacationTypeSchema } from '@/api-schemas';

// Validate vacation request data
const vacationRequest = VacationTypeSchema.parse({
  startDate: '2024-01-15',
  endDate: '2024-01-20',
  vacationType: 'annual',
  reason: 'Family vacation'
});
```

### Handling API Responses

```typescript
import { ResponseSchema, CreateSuccessSchema } from '@/api-schemas';

// Validate API response
const response = ResponseSchema.parse(apiResponse);

if (response.result.success) {
  const successData = CreateSuccessSchema.parse(response.result);
  console.log('Request created with ID:', successData.data.id);
}
```

## Error Handling

All schemas include comprehensive validation that will throw descriptive errors for invalid data:

```typescript
try {
  const validatedData = SomeSchema.parse(inputData);
  // Process valid data
} catch (error) {
  if (error instanceof z.ZodError) {
    // Handle validation errors
    console.error('Validation failed:', error.errors);
  }
}
```

## Schema Versioning

The API schemas follow semantic versioning principles:
- **Major versions**: Breaking changes to existing schemas
- **Minor versions**: New optional fields or new schemas
- **Patch versions**: Bug fixes and clarifications

## Integration Notes

1. **Type Safety**: All schemas provide TypeScript types that can be imported and used throughout the application
2. **Runtime Validation**: Schemas validate data at runtime, ensuring data integrity
3. **Documentation**: Each schema serves as living documentation for the API contract
4. **Testing**: Schemas can be used to generate test data and validate test responses

## Contributing to API Schemas

When adding new schemas or modifying existing ones:

1. Follow the existing naming conventions
2. Add comprehensive field descriptions
3. Include examples in this documentation
4. Update the main index.ts export file
5. Add corresponding TypeScript types
6. Write tests for new schemas

For more detailed information about specific schemas, refer to the individual schema files in the `api-schemas/` directory.