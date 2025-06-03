import type { ReactNode } from "react"
import { ProbationPeriodData } from "./components"

export const metadata = {
  title: "Probation Period",
  description: "Probation Period Data",
}
interface MedicalInsuranceLayoutProps {
  children: ReactNode
}
const ProbationPeriodLayout = ({ children }: MedicalInsuranceLayoutProps) => {
  return (
    <>
      <ProbationPeriodData />
      <section>{children}</section>
    </>
  )
}

export default ProbationPeriodLayout
