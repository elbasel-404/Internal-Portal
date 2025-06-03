import { ReactNode } from "react"
import { OvertimeConfirmData } from "./components"

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
      <OvertimeConfirmData />
      <section>{children}</section>
    </>
  )
}

export default OvertimeConfirmLayout
