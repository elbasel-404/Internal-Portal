import { ReactNode } from "react"
import { RequestGeneralData } from "@components"

export const metadata = {
  title: "Supplier Evaluation Request",
  description: "Supplier Evaluation Request data",
}
interface VacationsLayoutProps {
  children: ReactNode
}
const VacationsLayout = ({ children }: VacationsLayoutProps) => {
  return (
    <>
      {/* @TODO not integrated */}
      <RequestGeneralData model="holidays" />
      {children}
    </>
  )
}

export default VacationsLayout
