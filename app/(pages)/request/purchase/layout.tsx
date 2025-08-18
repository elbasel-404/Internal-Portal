import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Purchase",
  description: "Purchase Data",
}
interface PurchaseLayoutProps {
  children: ReactNode
}
const PurchaseLayout = ({ children }: PurchaseLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="purchase_request" />
      <section>{children}</section>
    </>
  )
}

export default PurchaseLayout
