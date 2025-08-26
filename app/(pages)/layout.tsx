import { Body } from "@components"
import { fonts } from "@lib"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"
import { ValidateSession } from "../components/ValidateSession"


export const metadata: Metadata = {
  title: "منشآت",
}

interface RootLayoutProps {
  children: ReactNode
  modalSlot: ReactNode
}

const RootLayout = async ({
  children,
  modalSlot,
}: Readonly<RootLayoutProps>) => {
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
        <ValidateSession />
        <NextTopLoader color="#007C9E" height={5} showSpinner={false} />
        {modalSlot}
        {children}
      </Body>
    </html>
  )
}

export default RootLayout
