# Unified Server Data Fetching

This document explains how to use the unified `getData()` function for server data fetching.

## Overview

The `getData()` function provides a standardized way to fetch, validate, and transform data from API endpoints. It handles:

1. Variable initialization
2. API fetching
3. Response validation
4. Data parsing

## Usage

Import the function from the server index:

```typescript
import { getData } from "app/server"
```

## Parameters

The function accepts a configuration object with the following properties:

| Parameter         | Type                                            | Required | Description                                                        |
| ----------------- | ----------------------------------------------- | -------- | ------------------------------------------------------------------ |
| url               | string                                          | Yes      | API endpoint path (without root URL)                               |
| method            | "GET" \| "POST" \| "PUT" \| "DELETE" \| "PATCH" | No       | HTTP method (default: "POST")                                      |
| includeEmployeeId | boolean                                         | No       | Whether to include employee ID in the request body (default: true) |
| additionalBody    | object                                          | No       | Additional properties to include in the request body               |
| responseSchema    | z.ZodType                                       | No       | Zod schema for validating the API response                         |
| dataSchema        | z.ZodType                                       | No       | Zod schema for validating the data property of the response        |
| parseData         | function                                        | No       | Function to transform the raw data to the desired format           |
| dummyData         | T[]                                             | Yes      | Data to use in demo mode or if the request fails                   |
| debug             | boolean                                         | No       | Whether to log debug information (default: false)                  |

## Example

```typescript
// Fetching vacation requests
export const getVacationRequests = async (): Promise<VacationRequest[]> => {
  return getData<VacationRequest>({
    url: "api/po/hr/holidays/request",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: HolidayElementSchema,
    parseData: (data) => {
      return data.map((item: any) => ({
        id: item.id.toString(),
        date: item.date,
        description: item.holiday_status_id[1].toString(),
        startDate: item.date_from,
        endDate: item.date_to,
        durationInDays: item.duration,
        approvalDate: item.done_date?.split(" ")[0],
        status: item.state,
      }))
    },
    dummyData: [
      /* Your dummy data here */
    ],
  })
}
```

## Common Patterns

### Adding Employee ID as a Number

```typescript
{
  // This will convert the employee ID to a number
  additionalBody: {
    employee_id: Number
  }
}
```

### Skipping Employee ID

```typescript
{
  includeEmployeeId: false
}
```

### Custom Request Body

```typescript
{
  includeEmployeeId: false,
  additionalBody: {
    custom_param1: "value1",
    custom_param2: 123
  }
}
```

### Debugging API Calls

```typescript
{
  debug: true
}
```
