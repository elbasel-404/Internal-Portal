# Project Documentation

Welcome to the project documentation for this internal portal. This portal serves as a central hub for employees, providing access to various internal services, information, and request management systems.

## Overview

This application is a comprehensive web portal designed to streamline employee workflows and communication within the organization. Key functionalities include:

- **Personalized Homepage:** Widgets for quick access to information and actions.
- **News & Announcements:** Stay updated with company news, family news, and internal ads.
- **Profile Management:** View and manage personal and employment-related information.
- **Request System:** Submit and track various types of requests (e.g., vacations, HR letters, medical claims, etc.).
- **Employee Information:** Search for colleagues, view department structures.
- **And much more...**

## Architecture Summary

The portal is built using a modern web technology stack:

- **Frontend:** Next.js (with App Router), React, Tailwind CSS
- **State Management:** Jotai
- **Backend & API:** Integrated within Next.js using server components/actions and API routes. Data exchange is structured using `api-schemas`.
- **Authentication:** Handled via server-side mechanisms.
- **Database:** Utilizes a file-based database (`app/db/db.json`) for storing application data.

## Documentation Sections

For more detailed information, please refer to the following sections:

- [01 - Architecture](./01-architecture.md): Detailed explanation of the technical architecture and directory structure.
- [02 - Features](./02-features.md): In-depth look at the key features and modules of the application.
- [03 - UI and State](./03-ui-and-state.md): Overview of UI components and state management with Jotai.
- [04 - Development Setup](./04-development-setup.md): Instructions for setting up the development environment.
- [05 - Project Tour](./05-project-tour.md): A guided walkthrough of common user scenarios.
- [06 - Project Map](./06-project-map.md): A map of key features to their file paths.

## Changelog

Changes to the application and its documentation are tracked in the [CHANGELOG.md](./CHANGELOG.md).
