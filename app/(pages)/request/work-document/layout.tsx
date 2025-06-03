import { ReactNode } from "react"
import { WorkDocumentData } from "./components"

export const metadata = {
  title: "Work Document",
  description: "Work Document data",
}
interface WorkDocumentLayoutProps {
  children: ReactNode
}
const WorkDocumentLayout = ({ children }: WorkDocumentLayoutProps) => {
  return (
    <>
      <WorkDocumentData />
      <section>{children}</section>
    </>
  )
}

export default WorkDocumentLayout
