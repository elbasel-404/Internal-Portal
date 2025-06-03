"use client"

import type { ReactNode } from "react"
import { JotaiProvider } from "./JotaiProvider"
import { ThemeProvider } from "./ThemeProvider"
import { DirectionProvider } from "@radix-ui/react-direction"

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <JotaiProvider>
      <ThemeProvider>
        <DirectionProvider dir="rtl">{children}</DirectionProvider>
      </ThemeProvider>
    </JotaiProvider>
  )
}
