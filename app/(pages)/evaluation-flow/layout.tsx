import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

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
      {/* @TODO not integrated */}
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default EvaluationFlowLayout
