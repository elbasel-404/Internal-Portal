import { RequestDetails, RequestStatus } from "@components"
import { getRequestStatus, getWorkDocumentDetails } from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface WorkDocumentDetailsPageProps {
  params: Params
}

const WorkDocumentDetailsPage = async ({
  params,
}: WorkDocumentDetailsPageProps) => {
  const { id } = await params
  const requestStatus = await getRequestStatus("", "")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const {
    requestType,
    requestDate,
    documentAddress,
    documentType,
    employee,
    sector,
    management,
    target,
    status,
    attachments,
  } = (await getWorkDocumentDetails(id)) || {}

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
      label: "نوع الوثيقة",
      value: documentType,
    },
    {
      label: "عنوان الوثيقة",
      value: documentAddress,
    },
    {
      label: "الهدف",
      value: target,
    },
    {
      label: "الموظف",
      value: employee,
    },
    {
      label: "القطاع",
      value: sector,
    },
    {
      label: "الإدارة",
      value: management,
    },
    {
      label: "الحالة",
      value: status,
    },
    {
      label: "المرفقات",
      value: attachments,
    },
  ]
  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
    </main>
  )
}

export default WorkDocumentDetailsPage
