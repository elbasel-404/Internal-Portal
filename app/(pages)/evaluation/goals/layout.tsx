import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

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
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default EvaluationGoalsLayout
