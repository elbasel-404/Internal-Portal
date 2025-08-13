import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Permissions",
  description: "Permissions data",
}
interface PermissionssLayoutProps {
  children: ReactNode
}
const PermissionLayout = ({ children }: PermissionssLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="authorisation" />
      <section>{children}</section>
    </>
  )
}

export default PermissionLayout
