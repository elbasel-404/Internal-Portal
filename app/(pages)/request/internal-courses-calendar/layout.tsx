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
      <section>{children}</section>
    </>
  )
}

export default InternalCoursesCalendarLayout
