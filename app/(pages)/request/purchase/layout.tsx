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
      <section>{children}</section>
    </>
  )
}

export default PurchaseLayout
