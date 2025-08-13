import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Trainee List",
  description: "Trainee data",
}
interface TraineeLayoutProps {
  children: ReactNode
}
const TraineeLayout = ({ children }: TraineeLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default TraineeLayout
