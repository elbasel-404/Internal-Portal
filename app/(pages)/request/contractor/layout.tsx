import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Contractor",
  description: "Contractor Data",
}
interface ContractorLayoutProps {
  children: ReactNode
}
const ContractorLayout = ({ children }: ContractorLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default ContractorLayout
