import type { ReactNode } from "react"
import { JobApplicationsData } from "./components"

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
      <JobApplicationsData />
      <section>{children}</section>
    </>
  )
}

export default JobApplicationsLayout
