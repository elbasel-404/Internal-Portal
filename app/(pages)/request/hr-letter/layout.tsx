import type { ReactNode } from "react"

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
      <section>{children}</section>
    </>
  )
}

export default HrLetterLayout
