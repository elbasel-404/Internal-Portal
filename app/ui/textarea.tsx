import { cn } from '@utils';
import { forwardRef, ReactNode } from 'react';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  icon?: ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className='relative'>
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        <div className='absolute top-8 right-4 transform -translate-y-1/2'>
          {icon}
        </div>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
