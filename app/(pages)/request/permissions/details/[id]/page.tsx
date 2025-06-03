import { RequestDetails, RequestStatus } from "@components"
import { getPermissionDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface PermissionDetailsPageProps {
  params: Params
}

const PermissionsDetailsPage = async ({
  params,
}: PermissionDetailsPageProps) => {
  const { id } = await params
  const model = "hr.authorization"
  const requestStatus = await getRequestStatus(id, model)
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const {
    requestDate,
    type,
    reason,
    attachments,
    dateFrom,
    dateTo,
    duration,
    time,
  } = (await getPermissionDetails(id)) || {}

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "تاريخ الطلب",
      value: requestDate,
    },
    {
      label: "نوع الاستئذان",
      value: type,
    },
    {
      label: "سبب الاستئذان",
      value: reason,
    },
    {
      label: "التوقيت",
      value: time,
    },
    {
      label: "المدة",
      value: duration,
    },
    {
      label: "من تاريخ",
      value: dateFrom,
    },
    {
      label: "إلى تاريخ",
      value: dateTo,
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

export default PermissionsDetailsPage
