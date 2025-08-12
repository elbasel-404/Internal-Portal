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
      <section>{children}</section>
    </>
  )
}

export default DeputationLayout
