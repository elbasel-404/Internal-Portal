import type { ReactNode } from "react"
import { TicketData } from "./components"

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
      <TicketData />
      <section>{children}</section>
    </>
  )
}

export default TicketLayout
