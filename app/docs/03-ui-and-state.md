# 03 - UI Components and State Management

This document provides an overview of how User Interface (UI) components are organized and how application state is managed.

## UI Components

The application utilizes a structured approach to UI components, separating them into two main categories:

- **`app/components/`**: This directory houses application-specific components. These are typically composite components built from smaller UI primitives and are tailored to the specific needs of different features within the portal. Examples could include a `UserProfileCard`, a `RequestListTable`, or a `NewsArticle`.
- **`app/ui/`**: This directory contains generic, reusable UI primitives. These are fundamental building blocks like buttons, inputs, modals, cards, etc. Observing the project structure and common Next.js/React ecosystem trends, these components might be based on or inspired by a utility-first UI library like [ShadCN/UI](https://ui.shadcn.com/), which often involves a `ui` folder for its components. These components are designed to be highly reusable and stylable, primarily using Tailwind CSS.

This separation helps in maintaining a clean and organized codebase, promoting reusability and consistency across the application's interface.

## State Management with Jotai

The application uses [Jotai](https://jotai.org/) for global state management. Jotai is an atomic state management library for React, meaning state is built from small, isolated pieces called atoms.

- **Atoms (`app/atoms/`)**: All Jotai atoms are defined in the `app/atoms/` directory. Each file typically defines one or more related atoms.
  - An atom represents a piece of state (e.g., a boolean, a string, an object).
  - Components can subscribe to these atoms, and they will re-render only when the specific atoms they depend on change.
- **Provider**: A Jotai `Provider` is likely set up at the root of the application (e.g., in `app/(pages)/layout.tsx` or a dedicated providers component) to make the atoms accessible throughout the component tree. This is visible in `app/components/providers/JotaiProvider.tsx`.

### Example Usage of an Atom

A common use case for an atom might be managing the open/closed state of a sidebar or a modal. For instance, the `app/atoms/isSideBarOpenAtom.ts` file likely defines an atom like this:

```typescript
// app/atoms/isSideBarOpenAtom.ts
import { atom } from "jotai"

export const isSideBarOpenAtom = atom(true) // Default state is open
```

Components that need to control or react to the sidebar's visibility would use this atom:

```tsx
// Example in a component
import { useAtom } from "jotai"
import { isSideBarOpenAtom } from "@/app/atoms/isSideBarOpenAtom" // Adjust path as necessary

function HeaderComponent() {
  const [isOpen, setIsOpen] = useAtom(isSideBarOpenAtom)

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? "Close Sidebar" : "Open Sidebar"}
    </button>
  )
}

function SidebarComponent() {
  const [isOpen] = useAtom(isSideBarOpenAtom)

  if (!isOpen) {
    return null
  }

  return <aside>{/* Sidebar content */}</aside>
}
```

This atomic approach helps in managing state in a predictable and efficient manner, avoiding unnecessary re-renders and prop-drilling. Other atoms like `apiErrorAtom` (for managing API error states) or `shouldRefreshAtom` (for triggering data re-fetches) would follow similar principles.
