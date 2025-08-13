import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

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
      <RequestGeneralData model="passport_request" />
      <section>{children}</section>
    </>
  )
}

export default PassportLayout
