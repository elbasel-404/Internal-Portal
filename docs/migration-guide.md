# Migration to Unified Form Submission

To migrate an existing form component to use the new unified form submission logic, follow these steps:

## Step 1: Update the Form Action File

```typescript
// Before
"use server"
import { getStoredEmployeeId } from "@auth"
import { z } from "zod"
import { CreateErrorSchema } from "../../../../../../api-schemas/CreateErrorSchema"
import { CreateSuccessSchema } from "../../../../../../api-schemas/CreateSuccessSchema"
import { getFetchHeaders } from "../../../../../server/getFetchHeaders"
import { requestBodySchema } from "./requestBodySchema"
import { State } from "./State"

export const formAction = async (formData: FormData): Promise<State> => {
  // Custom implementation with fetch, validation, etc.
}
```

```typescript
// After
"use server"
import { createData } from "../../../../../lib/createData"
import { requestBodySchema } from "./requestBodySchema"

export async function formAction(formData: FormData) {
  const endpointUrl = "api/po/hr/your/endpoint"
  return createData(endpointUrl, requestBodySchema, formData)
}
```

## Step 2: Update the Form Component

```tsx
// Before
export const YourForm = () => {
  const [state, setState] = useState<State>(initialState)
  const [pending, setPending] = useState(false)

  // Custom error and success handling
  useEffect(() => {
    // Custom handling
  }, [state])

  const action = async (formData: FormData) => {
    setPending(true)
    const result = await formAction(formData)
    setState(result)
    setPending(false)
  }

  // Form JSX
}
```

```tsx
// After
import { useFormAction } from "@hooks"

export const YourForm = () => {
  const { state, action, pending } = useFormAction(formAction)

  // Form state variables
  // ...

  // Success case
  if (state.success) {
    return (
      <div className="bg-white text-black text-lg p-4 space-y-4">
        <p className="text-center">تم انشاء الطلب بنجاح</p>
        <p className="text-center">رقم الطلب: {state.id}</p>
      </div>
    )
  }

  // Form JSX with action={action}
}
```

## Step 3: Update Error Handling

```tsx
// Before (with nested errors)
<InputField
  label="Field Name"
  name="field_name"
  error={state.errors?.field_name?.[0]}
/>

// After (with filtered errors)
<InputField
  label="Field Name"
  name="field_name"
/>
{state.errors?.filter(error =>
  error.toLowerCase().includes("field_name")).map((error, index) => (
    <p key={index} className="text-red-500 text-sm">{error}</p>
  ))
}
```

## Step 4: Update requestBodySchema.ts

Remove any `employee_id` field from the schema as it's now handled by the `createData` function.

```typescript
// Before
export const requestBodySchema = z.object({
  employee_id: z.string(),
  field1: z.string(),
  // ...
})

// After
export const requestBodySchema = z.object({
  field1: z.string(),
  // ...
})
```

## Benefits

- Reduced code duplication
- Consistent error handling
- Simplified form state management
- Better type safety
- Centralized form submission logic
