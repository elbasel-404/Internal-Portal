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
import { ProfileInfo } from "@types"
// import { getProfileInfo } from "@server"
interface BodyProps {
  children: ReactNode
  className?: string
}

export const Body = async ({ children, className }: BodyProps) => {
  // const userInfo = await getProfileInfo()
  const userInfo: ProfileInfo = {
    id: "1",
    name: "John Doe",
    degree: "Bachelor of Science",
    department: "Computer Science",
    image: "/demo-img.png",
    job: "Software Engineer",
    jobNumber: "12345",
    serviceDuration: "5 years",
  }
  return (
    <body className={className}>
      <AppProvider>
        {/* <InitUser /> */}
        <Toaster richColors={true} position="top-center" />
        <RegisterChartJSPlugins />
        <AppSideBar userInfo={userInfo} />
        <ValidatePath />
        <NavBar userInfo={userInfo} />
        <Breadcrumbs />
        <Main>{children}</Main>
        <Footer />
        <Preferences />
        <ToggleDemo />
      </AppProvider>
    </body>
  )
}
