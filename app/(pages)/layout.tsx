import { Body } from "@components"
import { fonts } from "@lib"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"
import { getSession, logout } from "@auth"
import { redirect } from "next/navigation"

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
  const session = await getSession()
  if (!session) {
    await logout()
    redirect("/home")
  }

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
