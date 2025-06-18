import { RequestDetails, RequestStatus } from "@components"
import { getTraineeRequestDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"
import { notFound } from "next/navigation"
import { RequestTypeSection } from "./components/RequestTypeSection"

type Params = Promise<{ id: string }>
interface VacationDetailsPageProps {
  params: Params
}

const RemoteWorkDetailsPage = async ({ params }: VacationDetailsPageProps) => {
  const { id } = await params
  if (!id) notFound()
  const model = "hr.distance.work"
  const requestStatus = await getRequestStatus(id, model)
  const requestDetails = await getTraineeRequestDetails(id)
  if (!requestDetails) notFound()
  // ! TODO: add server action instead:
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "اسم المتدرب",
      value: requestDetails.name,
    },
    {
      label: "رقم الهوية",
      value: requestDetails.idNumber,
    },
    {
      label: "المسمي التدريبي",
      value: requestDetails.trainingTitle,
    },
    {
      label: "البريد الالكتروني",
      value: requestDetails.email,
    },
    {
      label: "رقم الجوال",
      value: requestDetails.phone,
    },
    {
      label: "الحالة",
      value: requestDetails.status,
    },
  ]

  return (
    <>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <RequestTypeSection />
    </>
  )
}

export default RemoteWorkDetailsPage
