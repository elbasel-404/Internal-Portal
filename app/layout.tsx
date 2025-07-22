import { InitUser, Login, RefreshSession } from "@components"
import { getRefreshToken, getSession } from "@server"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./(pages)/globals.css"
import { Toaster } from "sonner"

// export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "منشآت",
}

interface RootLayoutProps {
  children: ReactNode
}

// export const experimental_ppr = true // needs canary version of next.js

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await getSession()
  const refreshToken = await getRefreshToken()

  if (!session && refreshToken) {
    return (
      <html>
        <body className="h-screen flex items-center justify-center bg-gradient-to-b from-sky-500 to-pink-500">
          <RefreshSession />
        </body>
      </html>
    )
  }

  if (!session) {
    return (
      <html lang="ar">
        <body>
          <Toaster
            richColors
            expand={true}
            position="top-center"
            closeButton={true}
            visibleToasts={10}
          />
          <InitUser />
          <Login />
        </body>
      </html>
    )
  }

  return <>{children}</>
}

export default RootLayout
