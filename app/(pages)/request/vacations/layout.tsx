import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Vacations",
  description: "Vacations data",
}
interface VacationsLayoutProps {
  children: ReactNode
}
const VacationsLayout = ({ children }: VacationsLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="holidays" />
      {children}
    </>
  )
}

export default VacationsLayout
