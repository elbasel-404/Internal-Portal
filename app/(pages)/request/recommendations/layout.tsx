import { RequestGeneralData } from "@components"
import { ReactNode } from "react"

export const metadata = {
  title: "Recommendation",
  description: "Recommendation Data",
}
interface RecommendationLayoutProps {
  children: ReactNode
}
const RecommendationLayout = ({ children }: RecommendationLayoutProps) => {
  return (
    <>
      <RequestGeneralData model="holidays" />
      <section>{children}</section>
    </>
  )
}

export default RecommendationLayout
