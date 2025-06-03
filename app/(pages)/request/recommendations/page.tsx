import { Instructions } from "@components"
import { getRecommendationsRequests } from "@server"
import { RecommendationTable } from "./components"

const RecommendationListPage = async () => {
  const recommendationData = await getRecommendationsRequests()
  return (
    <div className="space-y-6 mb-12">
      <RecommendationTable data={recommendationData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة عرض الترشيحات الخاصة به للدورات الداخلية"
      />
    </div>
  )
}

export default RecommendationListPage
