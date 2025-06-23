import { Instructions, RequestDetails, RequestStatus } from "@components"
import { ModalLink } from "@components/modals/ModalLink"
import { PaperPlaneIcon, PencilIcon } from "@icons"
import { paths } from "@lib"
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
import Link from "next/link"
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
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const requestStatus = await getRequestStatus(id, "hr.performance.planning")
  const { employee, year, acceptEditRequest } =
    (await getEvaluationGoalDetails(id)) || {}
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
      {!acceptEditRequest ? (
        <div className="flex justify-end mb-2 gap-2 px-4">
          <ModalLink name="EditPerformanceModal">
            <Button
              className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
              type="submit"
            >
              <PencilIcon className="fill-primary group-hover:fill-white" />
              تعديل على تخطيط الأداء
            </Button>
          </ModalLink>
        </div>
      ) : (
        <div className="flex justify-end mb-2 gap-2">
          <Link href={paths.evaluationGoalsEdit.href}>
            <Button className="flex items-center group gap-1 bg-[#009957] bg-opacity-15 text-[#009957] shadow-none hover:bg-[#009957] hover:text-white rounded-xl p-4">
              <PencilIcon className="fill-[#009957] group-hover:fill-white w-5 h-5" />
              تعديل
            </Button>
          </Link>

          <Button
            className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
            type="button"
          >
            <PaperPlaneIcon className="fill-primary group-hover:fill-white" />
            إرسال
          </Button>
        </div>
      )}

      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية الإطلاع على تفاصيل طلبات تخطيط الأداء"
      />
    </main>
  )
}

export default EvaluationGoalDetailsPage
