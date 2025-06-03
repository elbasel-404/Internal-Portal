"use client"

import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@utils"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  LegacyRef,
} from "react"

interface ComponentProps {
  className?: string
  dir?: "ltr" | "rtl" // Add `dir` as a prop
}

const RadixSwitch = (
  { className, dir = "ltr", ...props }: ComponentProps, // Default `dir` to 'ltr'
  ref: LegacyRef<HTMLButtonElement> | undefined,
) => {
  const rootClassName = cn(
    "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-opacity data-[state=unchecked]:bg-input",
    className,
  )

  const thumbClassName = cn(
    'pointer-events-none block h-4 w-4 rounded-full data-[state="unchecked"]:bg-white data-[state="checked"]:bg-primary transition-transform drop-shadow-2xl',
    {
      "ltr:data-[state=checked]:translate-x-4 ltr:data-[state=unchecked]:translate-x-0":
        dir === "ltr",
      "rtl:data-[state=checked]:-translate-x-4 rtl:data-[state=unchecked]:translate-x-0":
        dir === "rtl",
    },
  )

  return (
    <SwitchPrimitives.Root
      className={rootClassName}
      {...props}
      ref={ref}
      dir={dir}
    >
      <SwitchPrimitives.Thumb className={thumbClassName} />
    </SwitchPrimitives.Root>
  )
}

type Ref = ElementRef<typeof SwitchPrimitives.Root>
type Props = ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
  ComponentProps
const Switch = forwardRef<Ref, Props>(RadixSwitch)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
