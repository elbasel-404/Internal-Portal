import { InitUser, Login, RefreshSession } from "@components"
import { getRefreshToken, getSession } from "@server"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./(pages)/globals.css"
import { Toaster } from "sonner"
import { getLoggedOut } from "./server/getLoggedOut"

// export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "منشآت",
}

interface RootLayoutProps {
  children: ReactNode
}

// export const experimental_ppr = true // needs canary version of next.js

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  // TODO: move this to middleware instead as it is causing the entire app route segments
  // to be dynamiclly rendered on the server and no longer staticlly rendered.
  const session = await getSession()
  const refreshToken = await getRefreshToken()
  const loggedOut = await getLoggedOut()

  if (!session && refreshToken && !loggedOut) {
    return (
      <html>
        <body>
          <RefreshSession />
        </body>
      </html>
    )
  }

  if (!session) {
    return (
      <html>
        <body>
          <Toaster
            richColors
            expand={true}
            position="top-center"
            closeButton={false}
            visibleToasts={10}
          />
          <InitUser />
          <Login />
        </body>
      </html>
    )
  }

  if (session) {
    return <>{children}</>
  }

  return null
}

export default RootLayout
