import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Ticket",
  description: "Ticket Data",
}
interface TicketLayoutProps {
  children: ReactNode
}
const TicketLayout = ({ children }: TicketLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default TicketLayout
