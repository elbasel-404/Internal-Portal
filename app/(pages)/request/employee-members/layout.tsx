import type { ReactNode } from "react"
import { EmployeeMembersData } from "./components"

export const metadata = {
  title: "Employee Members",
  description: "Employee Members Data",
}
interface EmployeeMembersLayoutProps {
  children: ReactNode
}
const EmployeeMembersLayout = ({ children }: EmployeeMembersLayoutProps) => {
  return (
    <>
      <EmployeeMembersData />
      <section>{children}</section>
    </>
  )
}

export default EmployeeMembersLayout
