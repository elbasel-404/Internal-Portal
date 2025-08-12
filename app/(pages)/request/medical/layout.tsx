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
      <section>{children}</section>
    </>
  )
}

export default MedicalInsuranceLayout
