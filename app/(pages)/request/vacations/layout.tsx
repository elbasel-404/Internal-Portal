import { ReactNode } from "react"

export const metadata = {
  title: "Vacations",
  description: "Vacations data",
}
interface VacationsLayoutProps {
  children: ReactNode
}
const VacationsLayout = ({ children }: VacationsLayoutProps) => {
  return <>{children}</>
}

export default VacationsLayout
