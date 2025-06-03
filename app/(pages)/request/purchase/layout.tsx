import { ReactNode } from "react"
import { PurchaseData } from "./components"

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
      <PurchaseData />
      <section>{children}</section>
    </>
  )
}

export default PurchaseLayout
