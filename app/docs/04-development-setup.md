# 04 - Development Setup

This comprehensive guide provides step-by-step instructions for setting up a complete development environment for the Portal application.

## 📋 Prerequisites

### Required Software

| Software | Minimum Version | Recommended | Installation |
|----------|----------------|-------------|--------------|
| Node.js | 18.x | 20.x LTS | [nodejs.org](https://nodejs.org/) |
| pnpm | 9.x | Latest | `npm install -g pnpm` |
| Git | 2.0+ | Latest | [git-scm.com](https://git-scm.com/) |

### Development Tools (Recommended)

- **VS Code** with recommended extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier - Code formatter
  - Auto Rename Tag
  - GitLens

### System Requirements

- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB free space for dependencies
- **OS**: Windows 10+, macOS 10.15+, or Linux

## 🚀 Quick Start Guide

### 1. Repository Setup

```bash
# Clone the repository
git clone <repository-url>
cd Internal-Portal

# Verify Node.js and pnpm versions
node --version  # Should be 18+
pnpm --version  # Should be 9+
```

### 2. Dependency Installation

```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm list --depth=0
```

### 3. Environment Configuration

#### Required Environment Variables

The application requires specific environment variables located in `app/storage/environment/`:

```bash
# Core API Configuration
API_ROOT_URL=http://localhost:3001/api
API_KEY=your_development_api_key
API_KEY_HEADER_NAME=X-API-Key
BEARER_TOKEN=your_bearer_token

# Authentication
AUTH_SECRET=your_super_secure_development_secret
AUTH_GOOGLE_ID=google_oauth_client_id
AUTH_GOOGLE_SECRET=google_oauth_client_secret
SESSION_ID=dev_session_id

# Email Configuration
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@yourcompany.com

# Database
DATABASE_PATH=./app/db/db.json

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

#### Environment Setup Steps

1. **Create Environment File**
   ```bash
   # Copy example file (if available)
   cp .env.example .env.local
   
   # Or create new file
   touch .env.local
   ```

2. **Configure Variables**
   Edit `.env.local` with your development values:
   ```bash
   # Development-specific values
   NODE_ENV=development
   API_ROOT_URL=http://localhost:3001/api
   DATABASE_PATH=./app/db/db.json
   AUTH_SECRET=dev-secret-change-in-production
   ```

3. **Validate Configuration**
   ```bash
   # Check environment loading
   pnpm dev --dry-run
   ```

### 4. Database Initialization

The application uses a JSON file-based database system:

```bash
# Create database directory
mkdir -p app/db

# Initialize database (if db.json doesn't exist)
cp app/db/db.example.json app/db/db.json

# Verify database permissions
ls -la app/db/db.json
```

#### Database Structure
```json
{
  "users": [],
  "requests": [],
  "news": [],
  "departments": [],
  "settings": {}
}
```

### 5. Build and Run

#### Development Mode
```bash
# Start development server with hot reloading
pnpm dev

# Alternative: Development with debugging
pnpm dev:debug

# Access application at http://localhost:3000
```

#### Production Mode Testing
```bash
# Build for production
pnpm build

# Copy required files for standalone mode
mkdir -p .next/standalone/app/db
cp app/db/db.json .next/standalone/app/db/
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Run production server
node .next/standalone/server.js

# Alternative: Use Next.js server (with limitations)
pnpm start
```

## 🛠️ Development Tools Setup

### VS Code Configuration

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.configFile": "./tailwind.config.ts",
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "eamodio.gitlens"
  ]
}
```

### Storybook Setup

```bash
# Start Storybook for component development
pnpm storybook

# Build Storybook for deployment
pnpm build-storybook
```

Access Storybook at `http://localhost:6006`

### Git Hooks Setup

Install pre-commit hooks for code quality:

```bash
# Install husky (if not already installed)
pnpm add --save-dev husky

# Initialize git hooks
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "pnpm lint-staged"
```

## 🔧 Advanced Configuration

### Docker Development

```bash
# Build development Docker image
docker build -f Dockerfile.dev -t portal-dev .

# Run with volume mounting for hot reloading
docker run -p 3000:3000 -v $(pwd):/app portal-dev
```

### Database Configuration

#### Local Database Options

1. **File-based (Default)**
   ```bash
   DATABASE_TYPE=file
   DATABASE_PATH=./app/db/db.json
   ```

2. **SQLite (Alternative)**
   ```bash
   DATABASE_TYPE=sqlite
   DATABASE_PATH=./app/db/portal.db
   ```

3. **External Database**
   ```bash
   DATABASE_TYPE=postgres
   DATABASE_URL=postgresql://user:pass@localhost:5432/portal
   ```

### API Configuration

#### Local API Development
```bash
# Start mock API server
pnpm api:mock

# Or use JSON server for development
npx json-server --watch app/db/db.json --port 3001
```

#### External API Integration
```bash
# Configure for external API
API_ROOT_URL=https://api.yourcompany.com/v1
API_KEY=your_production_api_key
BEARER_TOKEN=your_production_bearer_token
```

## 🧪 Testing Setup

### Test Environment

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test useFormAction.test.tsx
```

### Test Database

Create test-specific database:
```bash
# Copy production structure for testing
cp app/db/db.json app/db/db.test.json

# Set test environment variable
DATABASE_PATH=./app/db/db.test.json pnpm test
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Port Already in Use
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

#### Node Modules Issues
```bash
# Complete cleanup and reinstall
rm -rf node_modules
rm -rf .next
rm pnpm-lock.yaml
pnpm install
```

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear TypeScript cache
rm -rf .tsbuildinfo

# Rebuild
pnpm build
```

#### Database Permission Issues
```bash
# Fix database permissions
chmod 666 app/db/db.json
chmod 755 app/db/
```

#### Environment Variable Issues
```bash
# Debug environment loading
node -e "console.log(process.env)" | grep API

# Validate .env.local format
cat .env.local | grep -v '^#' | grep -v '^$'
```

### Performance Optimization

#### Development Mode
```bash
# Enable turbopack for faster builds
pnpm dev --turbopack

# Reduce memory usage
NODE_OPTIONS="--max-old-space-size=4096" pnpm dev
```

#### Build Optimization
```bash
# Analyze bundle size
pnpm analyze-bundles

# Enable experimental features
NEXT_EXPERIMENTAL=true pnpm build
```

### Debug Mode

#### Server-side Debugging
```bash
# Start with Node.js inspector
NODE_OPTIONS='--inspect' pnpm dev

# Debug specific port
NODE_OPTIONS='--inspect=0.0.0.0:9229' pnpm dev
```

#### Client-side Debugging
```bash
# Enable React DevTools
NEXT_PUBLIC_DEBUG=true pnpm dev

# Enable verbose logging
DEBUG=* pnpm dev
```

## 📚 Development Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools and Extensions
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools) (if using Redux)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Community Resources
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/docs/)

## 🔄 Development Workflow

### Daily Development Process
1. **Pull Latest Changes**
   ```bash
   git pull origin main
   ```

2. **Update Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development**
   ```bash
   pnpm dev
   ```

4. **Run Tests**
   ```bash
   pnpm test:watch
   ```

5. **Code Quality Checks**
   ```bash
   pnpm lint
   pnpm format
   ```

### Branch Management
```bash
# Create feature branch
git checkout -b feature/new-feature

# Regular commits
git add .
git commit -m "feat: add new feature"

# Push changes
git push origin feature/new-feature
```

This setup guide ensures a robust development environment that supports efficient coding, testing, and debugging workflows.
