import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Job Applications",
  description: "Job Applications Data",
}
interface JobApplicationsLayoutProps {
  children: ReactNode
}
const JobApplicationsLayout = ({ children }: JobApplicationsLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default JobApplicationsLayout
