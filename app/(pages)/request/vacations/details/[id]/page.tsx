// app/pages/request/vacations/details/[id]/page.tsx
import { RequestDetails, RequestStatus } from "@components"
import { getRequestStatus, getVacationDetails } from "@server"
import { RequestHeader } from "@types"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>
interface VacationDetailsPageProps {
  params: Params
}

const VacationDetailsPage = async ({ params }: VacationDetailsPageProps) => {
  const { id } = await params
  if (!id) notFound()
  const model = "hr.holidays"
  const requestStatus = await getRequestStatus(id, model)
  const requestDetails = await getVacationDetails(id)
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
      label: "تاريخ الطلب",
      value: requestDetails.requestDate,
    },
    {
      label: "نوع الاجازة",
      value: requestDetails.type,
    },
    {
      label: "تاريخ الاجازة",
      value: requestDetails.vacationDate,
    },
    {
      label: "المدة",
      value: requestDetails.duration,
    },
    {
      label: "الموظف البديل",
      value: requestDetails.alternativeEmployee,
    },
    {
      label: "ملاحظات",
      value: requestDetails.notes,
    },
    {
      label: "المرفقات",
      value: requestDetails.attachments,
    },
  ]

  return (
    <>
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
    </>
  )
}

export default VacationDetailsPage
