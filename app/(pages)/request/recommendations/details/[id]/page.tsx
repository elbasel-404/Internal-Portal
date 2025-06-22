import { Instructions, RequestDetails, RequestStatus } from "@components"
import { getRecommendationDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface RecommendationDetailsPageProps {
  params: Params
}

const RecommendationDetailsPage = async ({
  params,
}: RecommendationDetailsPageProps) => {
  const { id } = await params
  const requestStatus = await getRequestStatus("", "")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const {
    recommendationDate,
    employee,
    jobNumber,
    jobTitle,
    type,
    management,
    degree,
    cycleDate,
    duration,
    cycle,
    cycleCost,
    cycleProgram,
    city,
    trainingCenter,
  } = (await getRecommendationDetails(id)) || {}

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الترشيح",
      value: id,
    },
    {
      label: "تاريخ الترشيح",
      value: recommendationDate,
    },
    {
      label: "الموظف",
      value: employee,
    },
    {
      label: "الرقم الوظيفى",
      value: jobNumber,
    },
    {
      label: "المسمى الوظيفى",
      value: jobTitle,
    },
    {
      label: "الإدارة",
      value: management,
    },
    {
      label: "الدرجة",
      value: degree,
    },
    {
      label: "الدورة",
      value: cycle,
    },
    {
      label: "تاريخ الدورة",
      value: cycleDate,
    },
    {
      label: "المدة",
      value: duration,
    },
    {
      label: "النوع",
      value: type,
    },
    {
      label: "المدينة",
      value: city,
    },
    {
      label: "مركز التدريب",
      value: trainingCenter,
    },
    {
      label: "برنامج الدورة",
      value: cycleProgram,
    },
    {
      label: "قيمة الدورة",
      value: cycleCost,
    },
  ]
  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة عرض تفاصيل الترشيحات الخاصة به للدورات الداخلية"
      />
    </main>
  )
}

export default RecommendationDetailsPage
