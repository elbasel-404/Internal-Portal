import { ReactNode } from "react"

export const metadata = {
  title: "Overtime Assignment",
  description: "Overtime Assignment data",
}
interface OvertimeAssignmentLayoutProps {
  children: ReactNode
}
const OvertimeAssignmentLayout = ({
  children,
}: OvertimeAssignmentLayoutProps) => {
  return (
    <>
      <section>{children}</section>
    </>
  )
}

export default OvertimeAssignmentLayout
