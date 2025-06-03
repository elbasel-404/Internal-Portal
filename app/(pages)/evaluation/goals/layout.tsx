import { ReactNode } from "react"
import { EvaluationGoalsData } from "./components"

export const metadata = {
  title: "Evaluation Goals",
  description: "Evaluation Goals Data",
}
interface EvaluationGoalsLayoutProps {
  children: ReactNode
}
const EvaluationGoalsLayout = ({ children }: EvaluationGoalsLayoutProps) => {
  return (
    <>
      <EvaluationGoalsData />
      <section>{children}</section>
    </>
  )
}

export default EvaluationGoalsLayout
