import { Body } from "@components"
import { fonts } from "@lib"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"

// export const dynamic = "force-dynamic"

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
        <NextTopLoader color="#007C9E" height={10} showSpinner={false} />
        {modalSlot}
        {children}
      </Body>
    </html>
  )
}

export default RootLayout
