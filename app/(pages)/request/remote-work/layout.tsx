import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Remote Work",
  description: "Remote work data",
}
interface VacationsLayoutProps {
  children: ReactNode
}
const RemoteWorksLayout = ({ children }: VacationsLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="distance_work" />
      <section>{children}</section>
    </>
  )
}

export default RemoteWorksLayout
