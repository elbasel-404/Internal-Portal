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
      <section>{children}</section>
    </>
  )
}

export default OvertimeConfirmLayout
