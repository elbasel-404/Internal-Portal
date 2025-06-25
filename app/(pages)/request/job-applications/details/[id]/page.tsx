import { Instructions, RequestDetails, RequestStatus } from "@components"
import { getJobApplicationsDetails, getRequestStatus } from "@server"
import type { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface JobApplicationsDetailsPageProps {
  params: Params
}

const JobApplicationsDetailsPage = async ({
  params,
}: JobApplicationsDetailsPageProps) => {
  const { id } = await params
  // const requestStatus = await getRequestStatus("", "")
  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const requestStatus = await getRequestStatus(id, "hr.job.request")
  const {
    requestDate,
    requestType,
    applicant,
    department,
    generalAdministration,
    management,
    sector,
  } = (await getJobApplicationsDetails(id)) || {}

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "مقدم الطلب",
      value: applicant,
    },
    {
      label: "تاريخ الطلب",
      value: requestDate,
    },
    {
      label: "نوع الطلب",
      value: requestType,
    },
    {
      label: "القطاع",
      value: sector,
    },
    {
      label: "الإدارة العامة",
      value: generalAdministration,
    },
    {
      label: "القسم",
      value: department,
    },
    {
      label: "الإدارة",
      value: management,
    },
  ]
  return (
    <main>
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية الإطلاع علي تفاصيل التوظيف "
      />
    </main>
  )
}

export default JobApplicationsDetailsPage
