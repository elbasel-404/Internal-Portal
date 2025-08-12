import type { ReactNode } from "react"

export const metadata = {
  title: "Custody",
  description: "Custody Data",
}
interface CustodyLayoutProps {
  children: ReactNode
}
const ReplacementCovenantLayout = ({ children }: CustodyLayoutProps) => {
  return (
    <>
      <section>{children}</section>
    </>
  )
}

export default ReplacementCovenantLayout
