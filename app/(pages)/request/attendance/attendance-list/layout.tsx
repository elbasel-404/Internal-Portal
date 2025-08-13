import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Attendance List",
  description: "Attendance List Data",
}
interface AttendanceListLayoutLayoutProps {
  children: ReactNode
}
const AttendanceListLayout = ({
  children,
}: AttendanceListLayoutLayoutProps) => {
  return (
    <>
      {/* @TODO not integrated */}
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default AttendanceListLayout
