import { Instructions, CreateRequestStatus } from "@components"
import {
  getArtisticCompetenciesRequests,
  getBasicCompetenciesRequests,
  getGoalsRequests,
  getLeadershipCompetenciesRequests,
  getCreateRequestStatus,
} from "@server"
import { EvaluationGoalsForm } from "../components"

const NewEvaluationGoals = async () => {
  const goalsData = await getGoalsRequests()
  const leadershipCompetenciesData = await getLeadershipCompetenciesRequests()
  const basicCompetenciesData = await getBasicCompetenciesRequests()
  const ArtisticCompetenciesData = await getArtisticCompetenciesRequests()
  const requestStatus = await getCreateRequestStatus("hr.performance.planning")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <EvaluationGoalsForm
        goalsData={goalsData}
        leadershipData={leadershipCompetenciesData}
        basicData={basicCompetenciesData}
        artisticData={ArtisticCompetenciesData}
      />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية عرض وانشاء تخطيط الأداء"
      />
    </div>
  )
}

export default NewEvaluationGoals
