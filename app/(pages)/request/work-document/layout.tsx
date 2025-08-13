import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

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
      {/* @TODO not integrated */}
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default WorkDocumentLayout
