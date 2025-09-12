# Internal Portal

Massive ERP gov project to handle/manage all hr related activities for governmentally funded startups, over 10,000 lines of code and a companion [tool](https://github.com/elbasel-404/portal-schema-generator).

With a team of 6 developers working on this project, I'm the team leader/senior developer and software architect.

---
Please note that below documentation has been generated using AI, expect a margin of error, however stable for the most part.

<!-- [![Docker CI/CD](https://github.com/elbasel42/temp-portal-repo-github/actions/workflows/docker.yml/badge.svg)](https://github.com/elbasel42/temp-portal-repo-github/actions/workflows/docker.yml) -->

A comprehensive enterprise portal built with Next.js that provides employees with centralized access to internal services, information management, and request processing systems.

## 🚀 Features

- **Personalized Dashboard** - Customizable widgets for quick access to information and actions
- **News & Announcements** - Company news, family updates, and internal advertisements
- **Profile Management** - Personal and employment information management
- **Request System** - Submit and track various requests (vacations, HR letters, medical claims)
- **Employee Directory** - Search colleagues and view department structures
- **Form Management** - Unified form submission system with validation
- **Multi-language Support** - Arabic and English interfaces

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **State Management**: Jotai
- **Forms**: React Hook Form with Zod validation
- **Database**: File-based storage (db.json)
- **Testing**: Vitest, React Testing Library
- **Development**: Storybook, ESLint, Prettier
- **Deployment**: Docker support

## 📚 Documentation

### Quick Start
- [Development Setup](./app/docs/04-development-setup.md) - Complete setup instructions
- [Project Tour](./app/docs/05-project-tour.md) - Guided walkthrough

### Architecture & Development
- [Architecture Overview](./app/docs/01-architecture.md) - Technical architecture details
- [Features Guide](./app/docs/02-features.md) - In-depth feature documentation
- [UI & State Management](./app/docs/03-ui-and-state.md) - Component and state patterns
- [Project Map](./app/docs/06-project-map.md) - Feature-to-file mapping

### Specialized Guides
- [Form Submission Guide](./docs/form-submission-guide.md) - Unified form submission logic
- [Migration Guide](./docs/migration-guide.md) - Form migration guidelines
- [Testing Guide](./docs/testing.md) - Running and writing tests
- [API Documentation](./docs/api-documentation.md) - API schemas and endpoints

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (20+ recommended)
- **pnpm** 9+ (package manager)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd temp-portal-repo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Initialize the database**
   ```bash
   # Ensure the database file exists
   mkdir -p app/db
   # Copy default database if needed
   cp app/db/db.json.example app/db/db.json
   ```

### Development

**Start the development server:**
```bash
pnpm dev
```
The application will be available at [http://localhost:3000](http://localhost:3000)

**Development with debugging:**
```bash
pnpm dev:debug
```

**Run Storybook for component development:**
```bash
pnpm storybook
```
Storybook will be available at [http://localhost:6006](http://localhost:6006)

### Building for Production

**Build the application:**
```bash
pnpm build
```

**Start the production server:**
```bash
pnpm serve
# or
node .next/standalone/server.js
```

**Using Next.js server (alternative):**
```bash
pnpm start
```
> ⚠️ **Note**: This method may produce unexpected results. See [Next.js Documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) for details.

## 🧪 Testing & Quality

**Run tests:**
```bash
pnpm test           # Run all tests
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage
```

**Linting and formatting:**
```bash
pnpm lint           # Run ESLint
pnpm format         # Format code with Prettier
```

## 🐳 Docker Deployment

**Build Docker image:**
```bash
pnpm docker-build
```

**Run Docker container:**
```bash
pnpm docker-run
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_PATH=./app/db/db.json

# Authentication (if applicable)
AUTH_SECRET=your-auth-secret
AUTH_URL=http://localhost:3000

# External API URLs (customize as needed)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_FEATURE_X=true
```

### Database Setup

The application uses a file-based database stored in `app/db/db.json`. For production deployments, ensure:

1. The database directory is writable
2. Regular backups are configured
3. Proper file permissions are set

## 🛠️ Troubleshooting

### Common Issues

**Node/pnpm version conflicts:**
```bash
node --version  # Should be 18+
pnpm --version  # Should be 9+
```

**Build failures:**
```bash
# Clean install
pnpm reset  # This runs: rm -rf .next && rm -rf node_modules && pnpm i
```

**Database issues:**
```bash
# Reset database to default state
cp app/db/db.json.example app/db/db.json
```

**Port conflicts:**
```bash
# Check if port 3000 is in use
lsof -i :3000
# Kill process if needed
kill -9 <PID>
```

### Complete Reset Procedure

If you encounter unexpected errors, run this complete reset:

```bash
# Clean all generated files
rm -rf .next
rm -rf node_modules  
rm -rf pnpm-lock.yaml

# Reinstall dependencies
pnpm install

# Rebuild the application
pnpm build

# Copy required files for standalone mode
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
mkdir -p .next/standalone/app/db
cp app/db/db.json .next/standalone/app/db/

# Start the server
node .next/standalone/server.js
```

### Debug Mode

For debugging issues:

```bash
# Enable debug output
NODE_OPTIONS='--inspect' pnpm dev

# For server debugging
pnpm dev-debug-server
```
