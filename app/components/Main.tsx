"use client"

import { useIsMobile } from "@hooks"
import { isSideBarOpenAtom } from "@atoms"
import { cn } from "@utils"
import { useAtomValue } from "jotai"
import { useEffect, useState, type ReactNode } from "react"

interface MainProps {
  children: ReactNode
}

export const Main = ({ children }: MainProps) => {
  const isMobileScreen = useIsMobile()
  const isSideBarOpen = useAtomValue(isSideBarOpenAtom)
  const [padding, setPadding] = useState("")

  useEffect(() => {
    if (isMobileScreen === undefined) return
    const padding = isMobileScreen
      ? ""
      : isSideBarOpen
        ? "!pr-[344px]"
        : "!pr-[135px]"
    setPadding(padding)
  }, [isMobileScreen, isSideBarOpen])

  return (
    <main
      className={cn(
        "px-4 md:px-8 lg:pl-16 lg:pr-[135px] lg:transition-all lg:duration-500 space-y-6 mt-6",
        padding,
      )}
    >
      {children}
    </main>
  )
}
