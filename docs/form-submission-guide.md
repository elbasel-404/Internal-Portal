# Form Submission Unification Guide

This guide explains how to use the unified form submission logic we've implemented across the application.

## Key Components

1. **`createData` Function** (`app/lib/createData.ts`)

   - Centralizes form submission logic
   - Handles validation using Zod schemas
   - Processes API requests and error handling
   - Returns a consistent state format

2. **State Interface**

   ```typescript
   interface State {
     success: boolean
     errors: string[] | null
     id: number | null
   }
   ```

3. **`useFormAction` Hook** (`app/hooks/useFormAction.ts`)
   - Simplifies form state management
   - Handles loading states, success/error toasts
   - Provides a reusable action function for form submission

## Implementation Steps for a New Form

### 1. Create a Schema for Request Body Validation

```typescript
// app/(pages)/request/your-form/components/helpers/requestBodySchema.ts
import { z } from "zod"

export const requestBodySchema = z.object({
  field1: z.string(),
  field2: z.string(),
  // Add more fields as needed
})
```

### 2. Create a Form Action Function

```typescript
// app/(pages)/request/your-form/components/helpers/formAction.ts
"use server"

import { createData } from "../../../../../lib/createData"
import { requestBodySchema } from "./requestBodySchema"

export async function formAction(formData: FormData) {
  const endpointUrl = "api/path/to/your/endpoint"
  return createData(endpointUrl, requestBodySchema, formData)
}
```

### 3. Create a Form Component Using the Hook

```tsx
// app/(pages)/request/your-form/components/YourForm.tsx
"use client"

import { useFormAction } from "@hooks"
import { formAction } from "./helpers/formAction"
import { State } from "../../../../lib/createData"
// Import other necessary components

export const YourForm = () => {
  const { state, action, pending } = useFormAction(formAction)

  // Form state management
  const [yourField, setYourField] = useState("")

  // Success case
  if (state.success) {
    return (
      <div className="bg-white text-black text-lg p-4 space-y-4">
        <p className="text-center">تم انشاء الطلب بنجاح</p>
        <p className="text-center">رقم الطلب: {state.id}</p>
      </div>
    )
  }

  return (
    <form action={action} className="bg-white rounded-lg p-4 space-y-4">
      {/* Your form fields */}
      <InputField
        name="field1"
        label="Field 1"
        value={yourField}
        onChange={(e) => setYourField(e.target.value)}
      />

      {/* Attachments field with error handling */}
      <AttachmentsField
        files={files}
        handleFileUpload={fileHandler.upload}
        handleRemoveFile={(index) => fileHandler.remove(files[index].id)}
        errors={
          state.errors?.filter((error) =>
            error.toLowerCase().includes("attachment"),
          ) || []
        }
      />

      <SubmitButton />
    </form>
  )
}
```

## Note on Error Handling

Errors are returned as a flat array of strings from the `createData` function. You can filter them to find field-specific errors for display next to specific form fields:

```typescript
const fieldErrors =
  state.errors?.filter((error) => error.toLowerCase().includes("field_name")) ||
  []
```

## Benefits

- Consistent error handling across all forms
- Unified loading and success states
- Centralized form submission logic
- Reusable components for common functionality
- Type safety with TypeScript
