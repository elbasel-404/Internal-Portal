import { InitUser, Login } from "@components"
import { getSession } from "@server"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./(pages)/globals.css"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "منشآت",
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await getSession()
  if (!session)
    return (
      <html>
        <body>
          <InitUser />
          <Login />
        </body>
      </html>
    )

  return <>{children}</>
}

export default RootLayout
