import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Training",
  description: "Training Data",
}
interface TrainingLayoutProps {
  children: ReactNode
}
const TrainingLayout = ({ children }: TrainingLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="training_request" />
      <section>{children}</section>
    </>
  )
}

export default TrainingLayout
