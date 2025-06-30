import { CreateRequestStatus, Instructions } from "@components"
import {
  getArtisticCompetenciesRequests,
  getBasicCompetenciesRequests,
  getCreateRequestStatus,
  getFlowGoalsRequests,
  getLeadershipCompetenciesRequests,
} from "@server"
import { EvaluationGoalsFlowForm } from "../components"

const NewEvaluationFlowGoals = async () => {
  const goalsData = await getFlowGoalsRequests()
  const leadershipCompetenciesData = await getLeadershipCompetenciesRequests()
  const basicCompetenciesData = await getBasicCompetenciesRequests()
  const ArtisticCompetenciesData = await getArtisticCompetenciesRequests()
  // const requestStatus = await getRequestStatus("", "EvaluationGoal")
  const requestStatus = await getCreateRequestStatus("hr.performance.planning")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <EvaluationGoalsFlowForm
        goalsData={goalsData}
        leadershipData={leadershipCompetenciesData}
        basicData={basicCompetenciesData}
        artisticData={ArtisticCompetenciesData}
      />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية عرض وانشاء متابعة تخطيط الأداء"
      />
    </div>
  )
}

export default NewEvaluationFlowGoals
