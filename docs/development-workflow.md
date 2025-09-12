# Development Workflow Guide

This guide covers the complete development workflow for the Portal application, including setup, coding standards, testing, and deployment processes.

## 🚀 Getting Started

### Development Environment Setup

1. **Prerequisites**
   ```bash
   # Check your versions
   node --version    # Should be 18+
   pnpm --version    # Should be 9+
   git --version     # Should be 2.0+
   ```

2. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd Internal-Portal
   pnpm install
   cp .env.example .env.local
   ```

3. **Configure Environment**
   ```bash
   # Edit .env.local with your configuration
   DATABASE_PATH=./app/db/db.json
   AUTH_SECRET=your-development-secret
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start Development Server**
   ```bash
   pnpm dev          # Standard development
   pnpm dev:debug    # With Node.js debugging
   ```

### IDE Configuration

#### VS Code (Recommended)
The project includes VS Code configuration in `.vscode/`:

**Recommended Extensions:**
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer

**Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.configFile": "./tailwind.config.ts"
}
```

## 📝 Coding Standards

### TypeScript Guidelines

1. **Type Definitions**
   ```typescript
   // Use interfaces for object shapes
   interface UserProfile {
     id: number;
     name: string;
     email: string;
     role: UserRole;
   }

   // Use type aliases for unions and primitives
   type UserRole = 'admin' | 'employee' | 'manager';
   type Status = 'pending' | 'approved' | 'rejected';
   ```

2. **Import Organization**
   ```typescript
   // 1. Node modules
   import React from 'react';
   import { z } from 'zod';

   // 2. Internal modules (absolute paths)
   import { Button } from '@/app/ui/button';
   import { UserSchema } from '@/api-schemas';

   // 3. Relative imports
   import { formatDate } from '../utils/dateUtils';
   import type { ComponentProps } from './types';
   ```

3. **Component Type Patterns**
   ```typescript
   // Component props interface
   interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
     label: string;
     error?: string;
     isRequired?: boolean;
   }

   // Component with forwardRef
   const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
     ({ label, error, isRequired, className, ...props }, ref) => {
       // Implementation
     }
   );
   ```

### File Naming Conventions

```
components/
├── UserProfile/
│   ├── index.ts              # Re-exports
│   ├── UserProfile.tsx       # Main component (PascalCase)
│   ├── UserProfile.types.ts  # Type definitions
│   └── UserProfile.test.tsx  # Tests
├── ui/
│   ├── button.tsx           # Lowercase for primitives
│   └── form.tsx
└── utils/
    ├── dateUtils.ts         # camelCase for utilities
    └── apiHelpers.ts
```

### React Component Patterns

1. **Functional Components**
   ```tsx
   interface ComponentProps {
     title: string;
     onAction: () => void;
   }

   export function Component({ title, onAction }: ComponentProps) {
     return (
       <div>
         <h2>{title}</h2>
         <Button onClick={onAction}>Action</Button>
       </div>
     );
   }
   ```

2. **Custom Hooks**
   ```tsx
   function useFormSubmission<T>(action: (data: T) => Promise<void>) {
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const submit = useCallback(async (data: T) => {
       setIsLoading(true);
       setError(null);
       try {
         await action(data);
       } catch (err) {
         setError(err instanceof Error ? err.message : 'Unknown error');
       } finally {
         setIsLoading(false);
       }
     }, [action]);

     return { submit, isLoading, error };
   }
   ```

3. **State Management with Jotai**
   ```tsx
   // atoms/userAtom.ts
   export const userAtom = atom<User | null>(null);
   export const userProfileAtom = atom(
     (get) => get(userAtom)?.profile,
     (get, set, profile: UserProfile) => {
       const user = get(userAtom);
       if (user) {
         set(userAtom, { ...user, profile });
       }
     }
   );

   // Component usage
   function UserComponent() {
     const [user, setUser] = useAtom(userAtom);
     // Use atom state
   }
   ```

## 🧪 Testing Strategy

### Unit Testing with Vitest

1. **Test File Structure**
   ```bash
   src/
   ├── components/
   │   ├── Button/
   │   │   ├── Button.tsx
   │   │   └── __tests__/
   │   │       └── Button.test.tsx
   └── utils/
       ├── dateUtils.ts
       └── __tests__/
           └── dateUtils.test.ts
   ```

2. **Component Testing**
   ```tsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import { describe, it, expect, vi } from 'vitest';
   import { Button } from '../Button';

   describe('Button', () => {
     it('renders with correct text', () => {
       render(<Button>Click me</Button>);
       expect(screen.getByRole('button')).toHaveTextContent('Click me');
     });

     it('calls onClick when clicked', () => {
       const onClick = vi.fn();
       render(<Button onClick={onClick}>Click me</Button>);
       fireEvent.click(screen.getByRole('button'));
       expect(onClick).toHaveBeenCalledOnce();
     });
   });
   ```

3. **Hook Testing**
   ```tsx
   import { renderHook, act } from '@testing-library/react';
   import { useFormSubmission } from '../useFormSubmission';

   describe('useFormSubmission', () => {
     it('handles successful submission', async () => {
       const mockAction = vi.fn().mockResolvedValue(undefined);
       const { result } = renderHook(() => useFormSubmission(mockAction));

       await act(async () => {
         await result.current.submit({ data: 'test' });
       });

       expect(mockAction).toHaveBeenCalledWith({ data: 'test' });
       expect(result.current.error).toBeNull();
     });
   });
   ```

### Testing Commands
```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage report
pnpm test:ui           # Visual test runner
```

## 🎨 Storybook Development

### Creating Stories
```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};
```

### Storybook Commands
```bash
pnpm storybook         # Start Storybook dev server
pnpm build-storybook   # Build static Storybook
pnpm chromatic         # Visual regression testing
```

## 🔄 Git Workflow

### Branch Naming
```
feature/user-profile-update
bugfix/form-validation-error
hotfix/security-patch
refactor/component-restructure
```

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code formatting changes
- `refactor`: Code restructuring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add password reset functionality

fix(forms): resolve validation error display issue

docs(api): update schema documentation

refactor(components): extract common form fields
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Development Cycle**
   ```bash
   # Make changes
   git add .
   git commit -m "feat(scope): description"
   
   # Keep branch updated
   git fetch origin
   git rebase origin/main
   ```

3. **Before Opening PR**
   ```bash
   pnpm lint          # Fix linting issues
   pnpm test          # Ensure tests pass
   pnpm build         # Verify build success
   ```

4. **PR Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests are added/updated
   - [ ] Documentation is updated
   - [ ] PR description explains changes
   - [ ] No merge conflicts
   - [ ] CI/CD passes

## 🚀 Build and Deployment

### Build Process
```bash
# Development build
pnpm build

# Production build with optimizations
NODE_ENV=production pnpm build

# Analyze bundle size
pnpm analyze-bundles
```

### Docker Deployment
```bash
# Build Docker image
pnpm docker-build

# Run container locally
pnpm docker-run

# Production deployment
docker build -t portal:latest .
docker run -d -p 3000:3000 portal:latest
```

### Environment-Specific Builds

**Development**
```bash
cp .env.development .env.local
pnpm build
```

**Staging**
```bash
cp .env.staging .env.local
pnpm build
```

**Production**
```bash
cp .env.production .env.local
NODE_ENV=production pnpm build
```

## 📊 Code Quality Tools

### ESLint Configuration
The project uses a comprehensive ESLint setup:

```bash
# Run linting
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

### Prettier Configuration
Code formatting is handled by Prettier:

```bash
# Format all files
pnpm format

# Check formatting
pnpm format --check
```

### Pre-commit Hooks
The project uses `lint-staged` for pre-commit quality checks:

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{md,json}": ["prettier --write"]
}
```

## 🔧 Performance Guidelines

### Code Splitting
```tsx
// Lazy load components
const LazyComponent = lazy(() => import('./HeavyComponent'));

// Use React.memo for expensive components
const ExpensiveComponent = memo(({ data }) => {
  // Heavy computation
});

// Memoize expensive calculations
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

### Bundle Optimization
```typescript
// Dynamic imports for code splitting
const loadFeature = async () => {
  const { FeatureComponent } = await import('./FeatureComponent');
  return FeatureComponent;
};

// Tree shaking friendly imports
import { specific } from 'library/specific';
// Instead of: import { specific } from 'library';
```

## 🐛 Debugging

### Development Debugging
```bash
# Start with Node.js debugger
pnpm dev:debug

# Browser debugging
# Open Chrome DevTools
# Go to chrome://inspect
# Click "Open dedicated DevTools for Node"
```

### Common Debug Scenarios

1. **API Issues**
   ```typescript
   // Add debugging to server actions
   export async function debugAction(data: FormData) {
     console.log('Action called with:', Object.fromEntries(data));
     // Implementation
   }
   ```

2. **State Issues**
   ```typescript
   // Debug Jotai atoms
   const DebugAtom = () => {
     const [value] = useAtom(someAtom);
     console.log('Atom value:', value);
     return null;
   };
   ```

3. **Performance Issues**
   ```typescript
   // Use React DevTools Profiler
   // Wrap components for profiling
   <Profiler id="ComponentName" onRender={onRenderCallback}>
     <Component />
   </Profiler>
   ```

## 📈 Monitoring and Analytics

### Error Tracking
```typescript
// Global error boundary
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service
    console.error('Component error:', error, errorInfo);
  }
}
```

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔐 Security Guidelines

### Input Validation
```typescript
// Always validate user input
const userInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

const validatedInput = userInputSchema.parse(userInput);
```

### Authentication Patterns
```typescript
// Protected routes
async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}
```

### Data Sanitization
```typescript
// Sanitize HTML content
import DOMPurify from 'dompurify';

const sanitizedHTML = DOMPurify.sanitize(userHTML);
```

This workflow guide ensures consistent development practices across the team and helps maintain code quality throughout the development lifecycle.