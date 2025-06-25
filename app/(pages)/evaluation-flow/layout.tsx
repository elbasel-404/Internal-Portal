import { ReactNode } from "react"
import { EvaluationFlowData } from "./components"

export const metadata = {
  title: "Evaluation Flow",
  description: "Evaluation Flow Data",
}
interface EvaluationFlowLayoutProps {
  children: ReactNode
}
const EvaluationFlowLayout = ({ children }: EvaluationFlowLayoutProps) => {
  return (
    <>
      <EvaluationFlowData />
      <section>{children}</section>
    </>
  )
}

export default EvaluationFlowLayout
