# Component Documentation

This document provides comprehensive documentation for the Portal's UI components and their usage patterns.

## Overview

The Portal uses a layered component architecture:

- **`app/ui/`** - Primitive UI components (based on Radix UI + shadcn/ui)
- **`app/components/`** - Application-specific composed components
- **`stories/`** - Storybook stories for component development

## Component Architecture

### Design System Foundation

The component system is built on top of:
- **Radix UI** - Accessible, unstyled primitives
- **Tailwind CSS** - Utility-first styling
- **Class Variance Authority (CVA)** - Component variant management
- **Storybook** - Component development and documentation

## UI Primitives (`app/ui/`)

### Button Component

**File**: `app/ui/button.tsx`

A flexible button component with multiple variants and sizes.

#### Variants
- `default` - Primary blue button
- `destructive` - Red button for dangerous actions
- `outline` - Outlined button
- `secondary` - Secondary gray button
- `ghost` - Transparent button
- `link` - Link-styled button
- `none` - Unstyled button

#### Sizes
- `default` - Standard height (36px)
- `sm` - Small (32px)
- `lg` - Large (40px)
- `icon` - Square icon button (36x36px)

#### Usage Example
```tsx
import { Button } from '@/app/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="lg">Large Outline</Button>

// As different element
<Button asChild>
  <Link href="/profile">Profile</Link>
</Button>
```

### Form Components

**File**: `app/ui/form.tsx`

Comprehensive form components built with React Hook Form integration.

#### FormField
```tsx
<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Input Components

**File**: `app/ui/input.tsx`

Text input with consistent styling and validation states.

```tsx
<Input 
  type="email" 
  placeholder="Enter your email"
  className="w-full"
/>
```

### Card Component

**File**: `app/ui/card.tsx`

Container component for grouping related content.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog Component

**File**: `app/ui/dialog.tsx`

Modal dialog component for overlays and confirmations.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Chart Components

The portal includes several chart components for data visualization:

#### AreaChart (`app/ui/area-chart-grad.tsx`)
```tsx
<AreaChart data={chartData} />
```

#### PieChart (`app/ui/pie-chart.tsx`)
```tsx
<PieChart data={pieData} />
```

#### RadialChart (`app/ui/radial-chart.tsx`)
```tsx
<RadialChart value={75} />
```

## Application Components (`app/components/`)

### Form Components

The form system provides specialized field components for different data types:

#### InputField
**File**: `app/components/Form/InputField.tsx`

```tsx
<InputField
  name="firstName"
  label="First Name"
  placeholder="Enter first name"
  required
/>
```

#### SelectField
**File**: `app/components/Form/SelectField.tsx`

```tsx
<SelectField
  name="department"
  label="Department"
  options={departmentOptions}
  placeholder="Select department"
/>
```

#### DateField
**File**: `app/components/Form/DateField.tsx`

```tsx
<DateField
  name="startDate"
  label="Start Date"
  minDate={new Date()}
/>
```

#### AttachmentsField
**File**: `app/components/Form/AttachmentsField.tsx`

```tsx
<AttachmentsField
  name="documents"
  label="Required Documents"
  maxFiles={3}
  allowedTypes={['pdf', 'jpg', 'png']}
/>
```

#### SubmitButton
**File**: `app/components/Form/SubmitButton.tsx`

```tsx
<SubmitButton
  isLoading={isSubmitting}
  loadingText="Submitting..."
>
  Submit Request
</SubmitButton>
```

### Navigation Components

#### Navbar
**File**: `app/components/Navbar/`

Main navigation bar with user menu and notifications.

```tsx
<Navbar 
  user={currentUser}
  notifications={unreadNotifications}
/>
```

#### Sidebar
**File**: `app/components/Sidebar/`

Collapsible sidebar navigation with role-based menu items.

```tsx
<Sidebar 
  isCollapsed={sidebarCollapsed}
  userRole={user.role}
/>
```

#### Breadcrumbs
**File**: `app/components/Breadcrumbs.tsx`

Navigation breadcrumb component.

```tsx
<Breadcrumbs 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Requests', href: '/requests' },
    { label: 'Vacation Request' }
  ]}
/>
```

### Data Display Components

#### Table
**File**: `app/components/Table/`

Advanced table component with sorting, filtering, and pagination.

```tsx
<Table
  data={employees}
  columns={employeeColumns}
  pagination={paginationState}
  onSort={handleSort}
  onFilter={handleFilter}
/>
```

#### EmployeeCard
**File**: `app/components/EmployeeCard.tsx`

Card component for displaying employee information.

```tsx
<EmployeeCard 
  employee={employeeData}
  showActions={true}
  onContact={handleContact}
/>
```

#### RequestStatus
**File**: `app/components/RequestStatus.tsx`

Status indicator for request workflows.

```tsx
<RequestStatus 
  status="pending"
  workflow={requestWorkflow}
/>
```

### Utility Components

#### Loader
**File**: `app/components/Loader.tsx`

Loading spinner component.

```tsx
<Loader size="lg" text="Loading data..." />
```

#### FullPageLoader
**File**: `app/components/FullPageLoader.tsx`

Full-screen loading overlay.

```tsx
<FullPageLoader message="Preparing your dashboard..." />
```

#### FileAttachment
**File**: `app/components/FileAttachment.tsx`

File preview and download component.

```tsx
<FileAttachment 
  file={attachmentData}
  onDownload={handleDownload}
  onDelete={handleDelete}
/>
```

## Layout Components

### Main
**File**: `app/components/Main.tsx`

Main content area wrapper with proper spacing and responsive behavior.

### Body
**File**: `app/components/Body.tsx`

Body wrapper that handles the overall page layout structure.

### Footer
**File**: `app/components/Footer.tsx`

Application footer with links and information.

## Specialized Components

### Charts
**Directory**: `app/components/charts/`

Business-specific chart components for dashboards and reporting.

### Modals
**Directory**: `app/components/modals/`

Application-specific modal dialogs for complex interactions.

### Providers
**Directory**: `app/components/providers/`

Context providers for state management and theming.

## Storybook Integration

Most components have corresponding Storybook stories for development and testing:

```bash
# Start Storybook
pnpm storybook
```

Access Storybook at `http://localhost:6006` to:
- View component variations
- Test different props and states
- Access interactive documentation
- Export code snippets

## Component Development Guidelines

### File Structure
```
ComponentName/
  ├── index.ts          # Main export
  ├── ComponentName.tsx # Main component
  ├── types.ts          # TypeScript types
  └── utils.ts          # Helper functions
```

### Component Template
```tsx
import { forwardRef } from 'react';
import { cn } from '@utils';

interface ComponentProps {
  className?: string;
  // ... other props
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("base-styles", className)}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";

export { Component };
```

### Props Interface Pattern
```tsx
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}
```

### Styling Guidelines

1. **Use Tailwind classes** for styling
2. **Implement variants** with CVA for consistent API
3. **Support className overrides** for customization
4. **Follow responsive design** patterns
5. **Ensure accessibility** (ARIA labels, keyboard navigation)

### State Management

Components should:
- Accept props for external state
- Use internal state only for UI-specific logic
- Emit events for parent communication
- Support controlled and uncontrolled modes

## Testing Components

### Unit Testing
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### Visual Testing
Components are tested visually through Storybook and Chromatic integration.

## Accessibility

All components follow WCAG 2.1 guidelines:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

## Performance Considerations

- Components use `React.memo` when appropriate
- Heavy computations are memoized with `useMemo`
- Event handlers are memoized with `useCallback`
- Large lists use virtualization
- Images use lazy loading

For more specific component documentation, refer to the individual component files and their corresponding Storybook stories.