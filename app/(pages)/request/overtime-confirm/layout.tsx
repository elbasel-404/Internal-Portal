import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Overtime Confirm",
  description: "Overtime Confirm data",
}
interface OvertimeConfirmLayoutProps {
  children: ReactNode
}
const OvertimeConfirmLayout = ({ children }: OvertimeConfirmLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="overtime_request" />
      <section>{children}</section>
    </>
  )
}

export default OvertimeConfirmLayout
