import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Internal Courses Calendar",
  description: "Internal Courses Calendar Data",
}
interface InternalCoursesCalendarLayoutProps {
  children: ReactNode
}
const InternalCoursesCalendarLayout = ({
  children,
}: InternalCoursesCalendarLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="training_public" />
      <section>{children}</section>
    </>
  )
}

export default InternalCoursesCalendarLayout
