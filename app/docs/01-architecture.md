# 01 - Detailed Architecture

This document provides a detailed overview of the project's technical architecture, including the frontend, backend, data handling, and directory structure.

## Frontend Architecture

The frontend is built using [Next.js](https://nextjs.org/) (version 13+ with the App Router) and [React](https://react.dev/).

- **Next.js App Router:** The primary routing mechanism is Next.js's App Router, located in the `app/(pages)/` directory. This convention allows for page and layout definitions.
- **React Components:** User interfaces are constructed with React functional components. Reusable components are organized into `app/components/` (application-specific complex components) and `app/ui/` (generic UI primitives, likely from a library like ShadCN/UI given the structure).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) is used for utility-first styling. Global styles are defined in `app/(pages)/globals.css`, and Tailwind configuration is in `tailwind.config.ts`.
- **Static Assets:** Publicly served static assets like images and fonts are located in the `public/` directory. Fonts are also managed via `app/fonts/`.

## Backend Architecture & API

The backend logic is tightly integrated within the Next.js application.

- **API Endpoints & Server Actions:** While there isn't a separate dedicated backend application, Next.js API routes and Server Actions handle backend tasks.
  - Server-side logic, including what would traditionally be API handlers, can be found in `app/server/`. These files likely contain functions for data fetching, mutations, and business logic.
  - The `app/api/` directory contains utilities for API interaction from the client-side (`post.ts`, `getApiCallback.ts`) and potentially some older or test-related API code.
- **Data Schemas:** `api-schemas/` directory contains TypeScript definitions for request and response payloads. This ensures type safety and a clear contract for data exchange between the client and server logic.
- **Authentication:** Authentication mechanisms are implemented server-side, likely within `app/server/auth/`. This could involve session management, token handling, or integration with identity providers.

## Database

The application uses a file-based database.

- **`app/db/db.json`:** This file acts as the primary data store.
- **Database Interaction:** Logic for reading from and writing to `db.json` is likely encapsulated in files within `app/db/actions/` and `app/db/schemas/`. This is suitable for smaller applications or development environments but might have limitations for scalability and concurrent access in a large production system.

## Key Directory Structure Overview

Here's a summary of important directories within the project:

- **`app/`**: The core Next.js application directory.
  - **`app/(pages)/`**: Contains the application's pages and routes. Special Next.js files like `layout.tsx`, `page.tsx`, `error.tsx`, and `loading.tsx` define the UI for different routes.
  - **`app/api/`**: Contains client-side utilities for API interactions and potentially some API route handlers or test files.
  - **`app/atoms/`**: Holds Jotai state management atoms.
  - **`app/components/`**: Contains application-specific React components.
  - **`app/db/`**: Manages the file-based database (`db.json`) and related actions/schemas.
  - **`app/docs/`**: Project documentation files (where this document resides).
  - **`app/hooks/`**: Custom React hooks.
  - **`app/icons/`**: SVG icons used throughout the application.
  - **`app/lib/`**: Utility functions, type definitions, and constants.
  - **`app/server/`**: Server-side logic, including API handlers, authentication, and data fetching functions.
  - **`app/ui/`**: Generic, reusable UI components/primitives.
  - **`app/utils/`**: General utility functions.
- **`api-schemas/`**: TypeScript schemas for API request and response validation.
- **`public/`**: Static assets (images, fonts, etc.) directly served by the web server.
- **`docs/`**: (Now `app/docs/`) General project documentation. The issue moves this into `app/docs/`.
- **`.github/`**: GitHub-specific files, including CI/CD workflows.
- **`stories/`**: Storybook files for component development and testing.

This structure promotes a separation of concerns and leverages Next.js conventions for building a modern web application.
