import { RequestGeneralData } from "@components"
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
      <RequestGeneralData model="custody_close" />
      <section>{children}</section>
    </>
  )
}

export default ReplacementCovenantLayout
