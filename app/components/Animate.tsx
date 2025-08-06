"use client"

import type { ReactNode } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface AnimateProps {
  children: ReactNode
  className?: string
  dir?: "ltr" | "rtl"
}
export const Animate = ({ dir = "rtl", children, className }: AnimateProps) => {
  //   const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [parent] = useAutoAnimate({
    duration: 500,
  })
  return (
    <div dir={dir} ref={parent} className={className}>
      {children}
    </div>
  )
}
