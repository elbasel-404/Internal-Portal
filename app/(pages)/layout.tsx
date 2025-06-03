import { Body } from "@components"
import { fonts } from "@lib"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "منشآت",
}

interface RootLayoutProps {
  children: ReactNode
  modalSlot: ReactNode
}

const RootLayout = ({ children, modalSlot }: Readonly<RootLayoutProps>) => {
  return (
    <html
      lang="en"
      dir="rtl"
      suppressHydrationWarning={true}
      className="app-scrollbar"
    >
      <Body
        className={`${fonts.className} antialiased app-scrollbar bg-background text-foreground`}
      >
        {modalSlot}
        {children}
      </Body>
    </html>
  )
}

export default RootLayout
