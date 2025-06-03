import { cn } from "@utils"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react"

const inputVariants = cva(
  "flex h-10 w-full rounded-full bg-secondary px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      variant: {
        icon: "pr-7",
        default: "",
        outline: "border border-gray-300",
        filled: "bg-gray-100 border-none",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
)
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: ReactNode
  label?: string
  iconPosition?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant: variant,
      size,
      type,
      icon,
      iconPosition = "right-4",
      label,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`relative ${label && "space-y-1"}`}>
        {label && (
          <h4 className="text-foreground font-medium text-sm">{label}</h4>
        )}
        <input
          type={type}
          className={cn(inputVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        <div
          className={`absolute top-1/2 ${iconPosition} transform -translate-y-1/2`}
        >
          {icon}
        </div>
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
