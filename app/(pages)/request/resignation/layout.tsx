import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Resignation",
  description: "Resignation data",
}
interface ResignationLayoutProps {
  children: ReactNode
}
const ResignationLayout = ({ children }: ResignationLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default ResignationLayout
