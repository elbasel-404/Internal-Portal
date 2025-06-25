import { RequestDetails, RequestStatus } from "@components"
import { getMedicalInsuranceDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface MedicalInsuranceDetailsPageProps {
  params: Params
}

const MedicalInsuranceDetailsPage = async ({
  params,
}: MedicalInsuranceDetailsPageProps) => {
  const { id } = await params
  const model = "hr.medical.insurance"
  const requestStatus = await getRequestStatus(id, model)
  const {
    requestDate,
    requestType,
    relationType,
    nameAR,
    nameEN,
    insurancePolicy,
    insuranceCategory,
    insuranceValue,
    coverage,
    insuranceStartDate,
    insuranceEndDate,
    attachments,
  } = (await getMedicalInsuranceDetails(id)) || {}

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
      label: "نوع الطلب",
      value: requestType,
    },
    {
      label: "صلة القرابة",
      value: relationType,
    },
    {
      label: "الاسم الكامل للفرد بالعربية",
      value: nameAR,
    },
    {
      label: "الاسم الكامل للفرد بالانجليزية",
      value: nameEN,
    },
    {
      label: "بوليصة التأمين",
      value: insurancePolicy,
    },
    {
      label: "فئة التأمين",
      value: insuranceCategory,
    },
    {
      label: "قيمة التأمين",
      value: insuranceValue,
    },
    {
      label: "التغطية",
      value: coverage,
    },
    {
      label: "تاريخ بداية التأمين",
      value: insuranceStartDate,
    },
    {
      label: "تاريخ انتهاء التأمين",
      value: insuranceEndDate,
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

export default MedicalInsuranceDetailsPage
