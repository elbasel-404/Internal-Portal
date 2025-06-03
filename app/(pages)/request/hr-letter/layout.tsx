import type { ReactNode } from "react"
import { HrLetterData } from "./components"

export const metadata = {
  title: "HR Letter",
  description: "Hr Letter Data",
}
interface HrLetterLayoutProps {
  children: ReactNode
}
const HrLetterLayout = ({ children }: HrLetterLayoutProps) => {
  return (
    <>
      <HrLetterData />
      <section>{children}</section>
    </>
  )
}

export default HrLetterLayout
