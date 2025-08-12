import type { ReactNode } from "react"

export const metadata = {
  title: "Bank Account Change",
  description: "Bank Account Change Data",
}
interface BankAccountChangeLayoutProps {
  children: ReactNode
}
const BankAccountChangeLayout = ({
  children,
}: BankAccountChangeLayoutProps) => {
  return (
    <>
      <section>{children}</section>
    </>
  )
}

export default BankAccountChangeLayout
