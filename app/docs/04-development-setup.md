# 04 - Development Setup

This guide provides instructions for setting up the development environment for the portal.

## Prerequisites

*   Node.js (version recommended by the project, e.g., LTS)
*   pnpm (as indicated by `pnpm-lock.yaml` and `README.md` commands)

If you don't have pnpm, you can install it via npm:
`npm install -g pnpm`

## Local Setup Instructions

These instructions are based on the main `README.md` file.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Use pnpm to install the project dependencies.
    ```bash
    pnpm install
    ```

3.  **Environment Variables:**
    The application requires several environment variables for its operation, particularly for API access and authentication. The necessary variables are listed in `app/storage/environment/`. These include:
    *   `API_KEY`
    *   `API_KEY_HEADER_NAME`
    *   `API_ROOT_URL`
    *   `AUTH_GOOGLE_ID`
    *   `AUTH_GOOGLE_SECRET`
    *   `AUTH_SECRET`
    *   `BEARER_TOKEN`
    *   `EMAIL_FROM`
    *   `EMAIL_SERVER`
    *   `SESSION_ID`

    You will need to create a `.env.local` file in the root of the project and populate it with the correct values for your development environment. For example:
    ```env
    API_ROOT_URL=http://localhost:3001/api # Example value
    API_KEY=your_api_key_here
    # ... and so on for all required variables
    ```
    **Note:** Do not commit `.env.local` to version control. Obtain the actual values from your project administrator or development lead. The files in `app/storage/environment/` seem to indicate where the application *stores* these at runtime/deployment, not where developers should get them from initially.

4.  **Prepare the Database (if starting fresh):**
    The application uses a JSON file as a database (`app/db/db.json`). An example structure might be available in `app/db/db.example.json`. If `db.json` does not exist or needs to be reset:
    *   You might need to copy `app/db/db.example.json` to `app/db/db.json`.
    *   Ensure the `app/db/` directory is writable.
    The `README.md` mentions: "remove all data from `app/db/db.json`" as a troubleshooting step, implying it can be cleared or might need seeding for initial setup.

5.  **Build the application:**
    This step compiles the application and prepares it for running.
    ```bash
    pnpm build
    ```

6.  **Run the Node.js server (production-like standalone mode):**
    This runs the application using the output from the build process.
    ```bash
    node .next/standalone/server.js
    ```
    The `README.md` also mentions copying static files and the database for this mode:
    ```bash
    # Ensure these are copied after pnpm build if not handled automatically
    mkdir -p .next/standalone/app/db
    cp app/db/db.json .next/standalone/app/db/
    cp -r public .next/standalone/
    cp -r .next/static .next/standalone/.next/
    ```

7.  **Run the Next.js development server (optional, for development):**
    This command starts the Next.js development server with hot-reloading and other development features. It might not require manual copying of static files or the database as it serves them directly.
    ```bash
    pnpm start
    ```
    The `README.md` cautions that this "might produce unexpected results" compared to the standalone server, referring to the [Next.js Output documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/output). For most development tasks, `pnpm dev` (if available, typically it is for Next.js projects, though `pnpm start` is listed) or `pnpm start` is preferred. If `pnpm dev` is not standard in this project, `pnpm start` is the alternative.

## Troubleshooting

The main `README.md` suggests the following for cleaning local files if unexpected errors occur:
```bash
rm -rf node_modules
rm -rf .next
# Manually clear content from app/db/db.json if needed
rm -rf pnpm-lock.yaml
```
Then, reinstall and rebuild.

A combined command for a full reset (excluding `node_modules` removal, which `pnpm install` would handle) is also provided in the `README.md`:
```bash
rm -rf .next && rm -rf pnpm-lock.yaml && # The following line seems to have a typo `=pnpm build`, should be `pnpm build`
# mkdir -p .next/standalone/app/db && # cp app/db/db.json .next/standalone/app/db/ && # pnpm build && # cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/ && # node .next/standalone/server.js
```
(Note: I've commented on a potential typo in the original README command.)

Always refer to the main `README.md` for the most up-to-date build and run commands.
