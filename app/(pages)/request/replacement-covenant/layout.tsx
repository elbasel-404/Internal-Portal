import type { ReactNode } from "react"

export const metadata = {
  title: "Replacement Covenant",
  description: "Replacement Covenant Data",
}
interface ReplacementCovenantLayoutProps {
  children: ReactNode
}
const ReplacementCovenantLayout = ({
  children,
}: ReplacementCovenantLayoutProps) => {
  return (
    <>
      <section>{children}</section>
    </>
  )
}

export default ReplacementCovenantLayout
