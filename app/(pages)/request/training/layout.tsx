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
      <section>{children}</section>
    </>
  )
}

export default TrainingLayout
