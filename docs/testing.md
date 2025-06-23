# Running Unit Tests

This project uses Vitest for unit testing. Here's how to run the tests for the unified form submission logic:

## Prerequisites

Make sure you have all dependencies installed:

```bash
pnpm install
```

## Running Tests

To run all tests:

```bash
pnpm test
```

To run tests in watch mode during development:

```bash
pnpm test:watch
```

To run tests with coverage:

```bash
pnpm test:coverage
```

## Test Files

The unit tests for the unified form submission logic are located in:

1. `/app/lib/__tests__/createData.test.ts` - Tests for the central createData function
2. `/app/hooks/__tests__/useFormAction.test.tsx` - Tests for the useFormAction hook

## Adding New Tests

When adding new tests:

1. Create test files in a `__tests__` directory next to the code being tested
2. Use the naming convention `[filename].test.ts` or `[filename].test.tsx`
3. Import Vitest testing utilities:
   ```typescript
   import { describe, it, expect, vi, beforeEach } from "vitest"
   ```
4. For React hooks, use React Testing Library:
   ```typescript
   import { renderHook, act } from "@testing-library/react"
   ```

## Mocking Dependencies

Example of mocking a dependency:

```typescript
vi.mock("path/to/dependency", () => ({
  someFunction: vi.fn(() => "mocked-value"),
}))
```
