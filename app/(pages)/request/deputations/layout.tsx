import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Deputations",
  description: "Deputation data",
}
interface DeputationLayoutProps {
  children: ReactNode
}
const DeputationLayout = ({ children }: DeputationLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="deputation" />

      <section>{children}</section>
    </>
  )
}

export default DeputationLayout
