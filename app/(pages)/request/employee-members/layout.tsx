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
      <section>{children}</section>
    </>
  )
}

export default EmployeeMembersLayout
