import { RequestDetails, RequestStatus } from "@components"
import { getRequestStatus, getResignationDetails } from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface ResignationDetailsPageProps {
  params: Params
}

const ResignationDetailsPage = async ({
  params,
}: ResignationDetailsPageProps) => {
  const { id } = await params
  const requestStatus = await getRequestStatus(id)
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const {
    requestDate,
    lastWorkingDate,
    requestType,
    resignationReason,
    attachments,
  } = (await getResignationDetails(id)) || {}

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "نوع الطلب",
      value: requestType,
    },
    {
      label: "تاريخ الطلب",
      value: requestDate,
    },
    {
      label: "تاريخ اخر يوم عمل",
      value: lastWorkingDate,
    },
    {
      label: "سبب انهاء الخدمة",
      value: resignationReason,
    },
    {
      label: "المرفقات",
      value: attachments,
    },
  ]
  return (
    <main>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
    </main>
  )
}

export default ResignationDetailsPage
