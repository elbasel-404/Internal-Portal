import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

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
      <RequestGeneralData model="employee_members" />
      <section>{children}</section>
    </>
  )
}

export default EmployeeMembersLayout
