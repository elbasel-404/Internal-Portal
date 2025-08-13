import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Medical Insurance",
  description: "Medical Insurance Data",
}
interface MedicalInsuranceLayoutProps {
  children: ReactNode
}
const MedicalInsuranceLayout = ({ children }: MedicalInsuranceLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="medical_insurance" />
      <section>{children}</section>
    </>
  )
}

export default MedicalInsuranceLayout
