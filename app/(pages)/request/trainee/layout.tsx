import { ReactNode } from "react"
import { TraineeData } from "./components"

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
      <TraineeData />
      <section>{children}</section>
    </>
  )
}

export default TraineeLayout
