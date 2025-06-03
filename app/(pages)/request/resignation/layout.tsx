import { ReactNode } from "react"
import { ResignationData } from "./components"

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
      <ResignationData />
      <section>{children}</section>
    </>
  )
}

export default ResignationLayout
