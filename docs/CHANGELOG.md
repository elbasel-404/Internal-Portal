# Changelog

## Changes

1. Removed the following files:

   - `app/api/config/index.ts`
   - `app/api/error/ApiValidationErrorMessage.tsx`
   - `app/api/error/page.tsx`
   - `app/api/get/get.ts`
   - `app/api/get/request/getVacationsByEmployeeId.ts`
   - `app/api/json/allVacations.json`
   - `app/api/json/vacation.json`
   - `app/api/layout.tsx`
   - `app/api/lib/apiEndpoints.ts`
   - `app/api/schemas/ApiEndpointsSchema.ts`
   - `app/api/schemas/request/VacationSchema.ts`
   - `app/api/types/ApiEndpoint.ts`
   - `app/api/types/ApiValidatoinError.ts`
   - `app/api/util/getApiResponseSchema.ts`
   - `app/api/util/getEndpointDataSchema.ts`
   - `app/api/util/getEndpointUrl.ts`
   - `app/api/util/inferSchema.ts`
   - `app/db/[a, b, c, d, e, f, g, h].txt`
   - `app/server/prism.text`
   - `app/server/validation/index.ts`
   - `app/server/validation/validateUser.ts`
   - `prisma/dev.db`
   - `prisma/migrations/20250101205417_/migration.sql`
   - `prisma/migrations/migration_lock.toml`
   - `script.ts`

2. Added the following files:

   - `app/api/getFormAction.ts`
   - `app/api/post.ts`
   - `app/api/test/layout.tsx`
   - `app/api/test/vacations/page.tsx`
   - `app/atoms/apiErrorAtom.ts`
   - `app/atoms/demoAtom.ts`
   - `app/atoms/shouldRefreshAtom.ts`
   - `declarations/env.d.ts`
   - `declarations/react-json-view-lite.d.ts`

3. Changed the following files:
   - `.env.example`
   - `Dockerfile`
   - `app/(pages)/request/error.tsx`
   - `app/components/ToggleDemo.tsx`
   - `app/db/db.json`
   - `app/db/validation/index.ts`
   - `app/server/getVacationRequests.ts`
   - `app/server/index.ts`
   - `app/server/toggleHomePageSetting.ts`
   - `entrypoint.sh`
   - `package.json`
   - `tailwind.config.ts`
   - `tsconfig.json`

## New Code API

### `getFormAction`

The `getFormAction` function is used to create a form action for a specific API endpoint and operation. It validates the request body, sends a POST request, and validates the response body.

#### Usage

```typescript
import { getFormAction } from "@api/getFormAction"

const formAction = getFormAction("vacations", "list")
const response = await formAction(formData)
```

### `post`

The `post` function is used to send a POST request to a specified URL with a request body and headers. It handles timeouts and returns the response.

#### Usage

```typescript
import { post } from "@api/post"

const response = await post({
  url: "/api/vacations",
  body: { employee_id: 1711 },
})
```

### `apiErrorAtom`

The `apiErrorAtom` is a Jotai atom used to store API errors.

#### Usage

```typescript
import { useAtomValue, useSetAtom } from "jotai"
import { apiErrorAtom } from "../atoms/apiErrorAtom"

const isApiError = useAtomValue(apiErrorAtom)
const setApiError = useSetAtom(apiErrorAtom)
```

### `demoAtom`

The `demoAtom` is a Jotai atom used to store the demo state.

#### Usage

```typescript
import { useAtomValue } from "jotai"
import { demoAtom } from "../atoms/demoAtom"

const isDemo = useAtomValue(demoAtom)
```

### `shouldRefreshAtom`

The `shouldRefreshAtom` is a Jotai atom used to store the refresh state.

#### Usage

```typescript
import { useAtomValue } from "jotai"
import { shouldRefreshAtom } from "../atoms/shouldRefreshAtom"

const shouldRefresh = useAtomValue(shouldRefreshAtom)
```

## Implementation Details

### `getFormAction`

The `getFormAction` function takes an endpoint and an operation as parameters. It validates the request body using Zod schemas, sends a POST request using the `post` function, and validates the response body. It returns a function that takes form data and returns the response.

### `post`

The `post` function takes a URL, request body, and optional timeout as parameters. It sends a POST request to the specified URL with the request body and headers. It handles timeouts and returns the response.

### `apiErrorAtom`

The `apiErrorAtom` is a Jotai atom that stores API errors. It is used to manage the state of API errors in the application.

### `demoAtom`

The `demoAtom` is a Jotai atom that stores the demo state. It is used to manage the state of the demo mode in the application.

### `shouldRefreshAtom`

The `shouldRefreshAtom` is a Jotai atom that stores the refresh state. It is used to manage the state of whether the application should refresh or not.

## Inline TODOs

### `app/(pages)/home/@approvalRequestsTable/page.tsx`

- TODO: Make the requests table a server component and fetch the data there.

### `app/(pages)/home/components/ApprovalRequestTable/ApprovalRequestsTable.tsx`

- TODO: Make this a server component and move state to another child client component.
- TODO: Ensure all requests have a description.

### `app/(pages)/home/components/Attendance.tsx`

- TODO: Move data to an API call and add props to the component.
- TODO: Use colors from the theme.
- TODO: Move pie chart config to `./config.ts`.
- TODO: Move area chart data to an API call.
- TODO: Move area chart config to `./config.ts`.
- TODO: Move attendance rates to a separate component.

### `app/(pages)/home/components/NewsSection/NewsCard.tsx`

- TODO: Make the date and bookmark elements buttons.

### `app/(pages)/home/components/NewsSection/NewsCarousel.tsx`

- TODO: Make the bookmark element a button.

### `app/(pages)/home/components/NewsSection/NewsGrid.tsx`

- TODO: Make the date and bookmark elements buttons.

### `app/(pages)/request/hr-letter/components/HrLetterData.tsx`

- TODO: Move data to a server action `getHRLetterGeneralInfo()`.

### `app/(pages)/request/hr-letter/components/HrLetterForm.tsx`

- TODO: Move schema to `@zodSchemas`.

### `app/(pages)/request/hr-letter/new/page.tsx`

- TODO: Add server action.

### `app/(pages)/request/job-applications/new/page.tsx`

- TODO: Add server action.

### `app/(pages)/request/medical/new/page.tsx`

- TODO: Add server action.

### `app/(pages)/request/permissions/new/page.tsx`

- TODO: Add server action.

### `app/(pages)/request/remote-work/components/RemoteWorksData.tsx`

- TODO: Move data to a server action `getRemoteWorkGeneralInfo()`.

### `app/(pages)/request/vacations/new/page.tsx`

- TODO: Add server action.

### `app/components/modals/HomePageSettingsModal/HomePageSettingsModal.tsx`

- TODO: Test with other values.

### `app/components/modals/Modal.tsx`

- TODO: Move internal handle click capture to modal components.

### `app/components/Table.tsx`

- TODO: Move status logic to rows variable.

### `app/components/TimePicker/time-picker-data.tsx`

- TODO: Rename `setDate` to `setDateAction`.

### `app/components/TimePicker/TimePicker.tsx`

- TODO: Rename `setDate` to `setDateAction`.
