"use client"

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
  type Ref,
} from "react"
import {
  Root as CheckboxRoot,
  Indicator as CheckboxIndicator,
} from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@utils"

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxRoot> & {
  indicatorClassName?: string
  iconClassName?: string
}
type RefType = Ref<ElementRef<typeof CheckboxRoot>>

const RadixCheckbox = (
  { className, indicatorClassName, iconClassName, ...props }: CheckboxProps,
  ref: RefType,
) => (
  <CheckboxRoot
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxIndicator
      className={cn(
        "flex items-center justify-center text-current",
        indicatorClassName,
      )}
    >
      <CheckIcon className={cn("'h-4 w-4'", iconClassName)} />
    </CheckboxIndicator>
  </CheckboxRoot>
)

type CheckboxType = ElementRef<typeof CheckboxRoot>
export const Checkbox = forwardRef<CheckboxType, CheckboxProps>(RadixCheckbox)
Checkbox.displayName = "Checkbox"
