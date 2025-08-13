import { RequestGeneralData } from "@components"
import type { ReactNode } from "react"

export const metadata = {
  title: "Transaction List",
  description: "Transaction List Data",
}
interface TransactionListLayoutProps {
  children: ReactNode
}
const TransactionLayout = ({ children }: TransactionListLayoutProps) => {
  return (
    <>
      {/* @TODO not integrated */}
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default TransactionLayout
