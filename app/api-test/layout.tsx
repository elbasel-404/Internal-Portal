import { JetBrains_Mono } from "next/font/google"
import type { ReactNode } from "react"
import "../(pages)/globals.css"
import { Toaster } from "sonner"

interface RootLayoutProps {
  children: ReactNode
}
const font = JetBrains_Mono({ subsets: ["latin-ext"] })

const ApiLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html dir="ltr" className="app-scrollbar">
      <body className={font.className}>
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  )
}

export default ApiLayout
