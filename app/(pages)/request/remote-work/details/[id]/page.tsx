import { RequestDetails, RequestStatus } from "@components"
import { getRemoteWorkDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>
interface VacationDetailsPageProps {
  params: Params
}

const RemoteWorkDetailsPage = async ({ params }: VacationDetailsPageProps) => {
  const { id } = await params
  if (!id) notFound()
  const model = "hr.distance.work"
  const requestStatus = await getRequestStatus(id, model)
  const requestDetails = await getRemoteWorkDetails(id)
  if (!requestDetails) notFound()
  // ! TODO: add server action instead:
  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "تاريخ الطلب",
      value: requestDetails.requestDate,
    },
    {
      label: "تاريخ العمل عن بعد",
      value: requestDetails.remoteWorkDate,
    },
    {
      label: "المدة",
      value: requestDetails.duration,
    },
    {
      label: "تم الإنشاء من خلال التطبيق",
      value: requestDetails.madeThroughTheApp,
    },
    {
      label: "المهام التي سيتم العمل عليها",
      value: requestDetails.notes,
    },
  ]

  return (
    <>
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
    </>
  )
}

export default RemoteWorkDetailsPage
