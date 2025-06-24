import {
  AppSideBar,
  Breadcrumbs,
  Footer,
  // InitUser,
  Main,
  NavBar,
  RegisterChartJSPlugins,
} from "@components"
import { AppProvider } from "@components/providers"
import { Toaster } from "@ui"
import { type ReactNode } from "react"
import { Preferences } from "./Preferences"
import { ValidatePath } from "./ValidatePath"
import { ToggleDemo } from "./ToggleDemo"

interface BodyProps {
  children: ReactNode
  className?: string
}

export const Body = ({ children, className }: BodyProps) => {
  return (
    <body className={className}>
      <AppProvider>
        {/* <InitUser /> */}
        <Toaster richColors={true} position="top-center" />
        <RegisterChartJSPlugins />
        <AppSideBar />
        <ValidatePath />
        <NavBar />
        <Breadcrumbs />
        <Main>{children}</Main>
        <Footer />
        <Preferences />
        <ToggleDemo />
      </AppProvider>
    </body>
  )
}
