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
  const requestStatus = await getRequestStatus(
    id,
    "manage.financial.custody.close",
  )
  const {
    applicantName,
    sector,
    department,
    jobTitle,
    directManager,
    departmentManager,
    generalManager,
    sectorManager,
    projectName,
    contractorCompany,
    contractStartDate,
    contractEndDate,
    contractorName,
    idNumber,
    nationality,
    jobTitleContractor,
    employeeNumber,
    email,
    mobile,
    state,
    attachmentList,
  } = (await getContractorDetails(id)) || {}

  const requestOwnerDetails: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "مقدم الطلب",
      value: applicantName,
    },
    {
      label: "القطاع",
      value: sector,
    },
    {
      label: "الادارة/القسم",
      value: department,
    },
    {
      label: "المسمي الوظيفي",
      value: jobTitle,
    },
    {
      label: "المدير المباشر",
      value: directManager,
    },
    {
      label: "مدير الادارة",
      value: departmentManager,
    },
    {
      label: "مدير عام الادارة",
      value: generalManager,
    },
    {
      label: "نائب القطاع المعني",
      value: sectorManager,
    },
  ]
  const requestContractorDetails: RequestHeader[] = [
    {
      label: "اسم المشروع",
      value: projectName,
    },
    {
      label: "الشركة المشغلة",
      value: contractorCompany,
    },
    {
      label: "تاريخ بداية العقد",
      value: contractStartDate,
    },
    {
      label: "تاريخ نهاية العقد",
      value: contractEndDate,
    },
    {
      label: "اسم المتعاقد",
      value: contractorName,
    },
    {
      label: "رقم الهوية/الاقامة",
      value: idNumber,
    },
    {
      label: "الجنسية",
      value: nationality,
    },
    {
      label: "المسمي الوظيفي",
      value: jobTitleContractor,
    },
    {
      label: "الرقم الوظيفي",
      value: employeeNumber,
    },
    {
      label: "البريد الالكتروني",
      value: email,
    },
    {
      label: "رقم الجوال",
      value: mobile,
    },
    {
      label: "الحالة",
      value: state,
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
