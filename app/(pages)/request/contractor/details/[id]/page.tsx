import { RequestDetails, RequestStatus } from "@components"
import { getContractorDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"
import { RequestTypeSection } from "../../../trainee/details/[id]/components/RequestTypeSection"

type Params = Promise<{ id: string }>

interface ContractorDetailsPageProps {
  params: Params
}

const ContractorDetailsPage = async ({
  params,
}: ContractorDetailsPageProps) => {
  const { id } = await params
  const attachmentList = [1, 2]
  const requestStatus = await getRequestStatus(
    id,
    "manage.financial.custody.close",
  )
  const {
    date,
    pledgeAmount,
    pledgeType,
    covenantRequestNumber,
    covenantPurpose,
    covenantAmount,
    covenantDate,
  } = (await getContractorDetails(id)) || {}

  const requestOwnerDetails: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "مقدم الطلب",
      value: date,
    },
    {
      label: "القطاع",
      value: pledgeAmount,
    },
    {
      label: "الادارة/القسم",
      value: pledgeType,
    },
    {
      label: "المسمي الوظيفي",
      value: covenantRequestNumber,
    },
    {
      label: "المدير المباشر",
      value: covenantPurpose,
    },
    {
      label: "مدير الادارة",
      value: covenantAmount,
    },
    {
      label: "مدير عام الادارة",
      value: covenantDate,
    },
    {
      label: "نائب القطاع المعني",
      value: covenantDate,
    },
  ]
  const requestContractorDetails: RequestHeader[] = [
    {
      label: "اسم المشروع",
      value: id,
    },
    {
      label: "الشركة المشغلة",
      value: date,
    },
    {
      label: "تاريخ بداية العقد",
      value: pledgeAmount,
    },
    {
      label: "تاريخ نهاية العقد",
      value: pledgeType,
    },
    {
      label: "اسم المتعاقد",
      value: covenantRequestNumber,
    },
    {
      label: "رقم الهوية/الاقامة",
      value: covenantPurpose,
    },
    {
      label: "الجنسية",
      value: covenantAmount,
    },
    {
      label: "المسمي الوظيفي",
      value: covenantDate,
    },
    {
      label: "الرقم الوظيفي",
      value: covenantDate,
    },
    {
      label: "البريد الالكتروني",
      value: covenantDate,
    },
    {
      label: "رقم الجوال",
      value: covenantDate,
    },
    {
      label: "الحالة",
      value: covenantDate,
    },
    {
      label: "المرفقات",
      value: attachmentList,
    },
  ]

  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} />
      <RequestDetails
        requestDetailsLabel="تفاصيل صاحب الطلب"
        headers={requestOwnerDetails}
      />
      <RequestDetails
        requestDetailsLabel="تفاصيل المتعاقد"
        headers={requestContractorDetails}
      />
      <RequestTypeSection />
      {/* <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب العهدة، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات طلب العهدة."
      /> */}
    </main>
  )
}

export default ContractorDetailsPage
