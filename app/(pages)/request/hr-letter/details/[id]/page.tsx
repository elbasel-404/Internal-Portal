import { RequestDetails, RequestStatus } from "@components"
import { getHrLetterDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface HrLetterDetailsPageProps {
  params: Params
}

const HrLetterDetailsPage = async ({ params }: HrLetterDetailsPageProps) => {
  const { id } = await params
  const model = "salary.identification.request"
  const requestStatus = await getRequestStatus(id, model)
  const {
    requestDate,
    type,
    destinationAr,
    destinationEn,
    notes,
    attachments,
  } = (await getHrLetterDetails(id)) || {}

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
      label: "مسمى الجهة الموجه لها",
      value: destinationAr,
    },
    {
      label: "مسمى الجهة الموجه لها بالانجليزية",
      value: destinationEn,
    },
    {
      label: "ملاحظات",
      value: notes,
    },
    {
      label: "النموذج",
      value: type,
    },
    {
      label: "المرفقات",
      value: attachments,
    },
  ]
  return (
    <main>
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
    </main>
  )
}

export default HrLetterDetailsPage
