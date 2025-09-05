# Contributing Guidelines

Welcome to the Portal project! We appreciate your interest in contributing. This document provides guidelines and information for contributors.

## 🤝 Getting Started

### Prerequisites

Before contributing, ensure you have:
- **Node.js** 18+ (20+ recommended)
- **pnpm** 9+ package manager
- **Git** 2.0+
- **Code editor** (VS Code recommended)
- Understanding of **TypeScript**, **React**, and **Next.js**

### Development Setup

1. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub
   git clone https://github.com/YOUR_USERNAME/temp-portal-repo.git
   cd temp-portal-repo
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Environment**
   ```bash
   cp .env.example .env.local
   # Configure your local environment variables
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

5. **Verify Setup**
   - Open [http://localhost:3000](http://localhost:3000)
   - Ensure the application loads correctly
   - Run tests: `pnpm test`
   - Run linting: `pnpm lint`

## 🌟 Ways to Contribute

### Bug Reports

**Before Submitting**:
- Check existing issues to avoid duplicates
- Test with the latest version
- Collect relevant information (browser, OS, steps to reproduce)

**Bug Report Template**:
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Navigate to...
2. Click on...
3. Expected vs. actual result

## Environment
- Browser: Chrome 120.0
- OS: Windows 11 / macOS 14 / Ubuntu 20.04
- Portal Version: v1.0.0

## Screenshots
[Attach screenshots if applicable]

## Additional Context
Any other relevant information
```

### Feature Requests

**Feature Request Template**:
```markdown
## Feature Description
Clear description of the proposed feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've considered

## Additional Context
Mockups, references, or examples
```

### Code Contributions

**Types of Contributions Welcome**:
- Bug fixes
- New features
- Performance improvements
- Documentation updates
- Test additions
- UI/UX enhancements
- Accessibility improvements

## 📋 Development Workflow

### Branch Strategy

```
main                 # Production-ready code
├── develop         # Integration branch
├── feature/*       # New features
├── bugfix/*        # Bug fixes
├── hotfix/*        # Critical fixes
└── docs/*          # Documentation updates
```

### Creating a Contribution

1. **Create Issue** (if not exists)
   - Describe the change you want to make
   - Get feedback from maintainers
   - Wait for approval before starting work

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/fix-description
   ```

3. **Make Changes**
   - Write clean, maintainable code
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   pnpm test          # Run unit tests
   pnpm lint          # Check code style
   pnpm build         # Verify build works
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): add new feature"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

## 💻 Coding Standards

### TypeScript Guidelines

**Type Safety**:
```typescript
// ✅ Good - Explicit types
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User | null {
  // Implementation
}

// ❌ Avoid - Any types
function getUser(id: any): any {
  // Implementation
}
```

**Naming Conventions**:
```typescript
// ✅ Good
const userName = 'john_doe';           // camelCase for variables
const API_BASE_URL = 'https://...';    // UPPER_CASE for constants
interface UserProfile { }             // PascalCase for interfaces
type UserRole = 'admin' | 'user';      // PascalCase for types
function calculateTotal() { }          // camelCase for functions
class UserService { }                  // PascalCase for classes
```

### React Component Guidelines

**Component Structure**:
```typescript
// ✅ Good component structure
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  children 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        disabled && 'btn-disabled'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

**Hooks Usage**:
```typescript
// ✅ Good - Custom hook
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

### CSS and Styling

**Tailwind CSS Usage**:
```typescript
// ✅ Good - Organized classes
<div className={cn(
  // Layout
  'flex items-center justify-between',
  // Spacing
  'p-4 gap-2',
  // Appearance
  'bg-white border border-gray-200 rounded-lg',
  // Responsive
  'sm:p-6 md:gap-4',
  // Conditional
  isActive && 'ring-2 ring-blue-500'
)} />

// ❌ Avoid - Long className strings
<div className="flex items-center justify-between p-4 gap-2 bg-white border border-gray-200 rounded-lg sm:p-6 md:gap-4" />
```

### File Organization

**Directory Structure**:
```
components/
├── ui/                    # Primitive components
│   ├── button.tsx
│   └── input.tsx
├── forms/                 # Form components
│   ├── LoginForm.tsx
│   └── RequestForm.tsx
└── layout/                # Layout components
    ├── Header.tsx
    └── Sidebar.tsx

utils/
├── api.ts                 # API helpers
├── dates.ts               # Date utilities
└── validation.ts          # Validation helpers

types/
├── api.ts                 # API types
├── user.ts                # User types
└── common.ts              # Common types
```

## ✅ Testing Requirements

### Unit Tests

**Required for**:
- New functions and utilities
- Custom hooks
- Complex component logic
- API endpoints

**Testing Patterns**:
```typescript
// Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

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

// Hook testing
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

### Integration Tests

**Required for**:
- Form submissions
- API integrations
- User workflows

### Testing Commands

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
pnpm test:ui           # Visual test runner
```

## 📝 Documentation Requirements

### Code Documentation

**JSDoc Comments**:
```typescript
/**
 * Calculates the total price including tax
 * @param price - Base price before tax
 * @param taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns Total price including tax
 * @example
 * calculateTotal(100, 0.1) // Returns 110
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
```

**Component Documentation**:
```typescript
/**
 * A reusable button component with multiple variants
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Submit Form
 * </Button>
 * ```
 */
export function Button({ variant, size, onClick, children }: ButtonProps) {
  // Implementation
}
```

### README Updates

When adding new features:
- Update feature list in main README
- Add usage examples
- Update screenshots if UI changes
- Document any new environment variables

### Storybook Stories

For new UI components:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

## 🔍 Code Review Process

### Pull Request Guidelines

**PR Title Format**:
```
type(scope): brief description

Examples:
feat(auth): add password reset functionality
fix(forms): resolve validation error display
docs(api): update endpoint documentation
refactor(components): extract common form fields
```

**PR Description Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests pass locally
```

### Review Criteria

**Code Quality**:
- Follows TypeScript best practices
- Proper error handling
- Performance considerations
- Security implications

**Testing**:
- Adequate test coverage
- Tests are meaningful and comprehensive
- Edge cases considered

**Documentation**:
- Code is self-documenting
- Complex logic is commented
- README updates if needed

### Review Process

1. **Automated Checks**
   - CI/CD pipeline passes
   - Linting passes
   - Tests pass
   - Build succeeds

2. **Manual Review**
   - Code quality assessment
   - Architecture alignment
   - Performance impact
   - Security considerations

3. **Feedback and Iteration**
   - Address reviewer comments
   - Make requested changes
   - Re-request review

## 🏆 Recognition

### Contributor Recognition

**Contributors will be recognized through**:
- GitHub contributor listings
- Release notes mentions
- Annual contributor awards
- LinkedIn recommendations (upon request)

### Contribution Levels

**Types of Contributors**:
- **One-time Contributors**: Bug fixes, small features
- **Regular Contributors**: Multiple contributions over time
- **Core Contributors**: Significant feature development
- **Maintainers**: Long-term project stewardship

## 📞 Communication

### Channels

**GitHub**:
- Issues for bug reports and feature requests
- Discussions for general questions
- Pull requests for code contributions

**Development Team**:
- Email: dev-team@company.com
- Slack: #portal-development (if applicable)

### Getting Help

**For Contributors**:
- Check existing documentation
- Search GitHub issues
- Ask in GitHub Discussions
- Contact maintainers directly

**Response Times**:
- Issues: 1-3 business days
- Pull requests: 2-5 business days
- Security issues: Same day

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Thank You

We appreciate all contributions, whether it's code, documentation, testing, or feedback. Every contribution helps make the Portal better for all users.

**Special Thanks to**:
- All our contributors
- The open-source community
- Users who provide feedback and bug reports

Happy contributing! 🚀