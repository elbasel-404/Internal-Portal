import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

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
      {/* @TODO not integrated */}
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default ProbationPeriodLayout
