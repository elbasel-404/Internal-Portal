import { Instructions, RequestDetails, RequestStatus } from "@components"
import { PencilIcon } from "@icons"
import {
  getArtisticCompetenciesRequests,
  getBasicCompetenciesRequests,
  getEvaluationGoalDetails,
  getGoalsRequests,
  getLeadershipCompetenciesRequests,
  getRequestStatus,
} from "@server"
import { RequestHeader } from "@types"
import { Button } from "@ui"
import { CompetenciesSection } from "../../components/CompetenciesSection"
import { GoalDetails } from "../../components/GoalDetails"

type Params = Promise<{ id: string }>

interface EvaluationGoalDetailsPageProps {
  params: Params
}

const EvaluationGoalDetailsPage = async ({
  params,
}: EvaluationGoalDetailsPageProps) => {
  const { id } = await params
  const requestStatus = await getRequestStatus(id, "EvaluationGoal")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const { employee, year } = (await getEvaluationGoalDetails(id)) || {}
  const goalsData = await getGoalsRequests()
  const leadershipData = await getLeadershipCompetenciesRequests()
  const basicData = await getBasicCompetenciesRequests()
  const artisticData = await getArtisticCompetenciesRequests()

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "الموظف",
      value: employee,
    },
    {
      label: "السنة",
      value: year,
    },
  ]

  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <GoalDetails goalsData={goalsData} />
      <div>
        <CompetenciesSection
          title="الجدارات السلوكية"
          subsections={[
            {
              title: "الجدارات القيادية",
              data: leadershipData,
            },
            {
              title: "الجدارات الاساسية",
              data: basicData,
            },
          ]}
          defaultExpanded={true}
        />
        <CompetenciesSection
          title="الجدارات الفنية"
          data={artisticData}
          defaultExpanded={true}
        />
      </div>
      <div className="flex justify-end mb-2 gap-2 px-4">
        <Button
          className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
          type="submit"
        >
          <PencilIcon className="fill-primary group-hover:fill-white" />
          تعديل على تخطيط الأداء
        </Button>
      </div>
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية الإطلاع على تفاصيل طلبات تخطيط الأداء"
      />
    </main>
  )
}

export default EvaluationGoalDetailsPage
