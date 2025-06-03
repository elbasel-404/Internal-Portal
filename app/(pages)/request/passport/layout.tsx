import { ReactNode } from "react"
import { PassportData } from "./components"

export const metadata = {
  title: "Passport",
  description: "Passport data",
}
interface PassportLayoutProps {
  children: ReactNode
}
const PassportLayout = ({ children }: PassportLayoutProps) => {
  return (
    <>
      <PassportData />
      <section>{children}</section>
    </>
  )
}

export default PassportLayout
