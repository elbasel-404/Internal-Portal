import { RequestDetails, RequestStatus, Table } from "@components"
import { CheckboxField } from "@components/form"
import { CheckIcon, XMarkIcon } from "@icons"
import { paths } from "@lib"
import { getRequestStatus, getTrainingDetails } from "@server"
import { RequestHeader } from "@types"
import { Button } from "@ui"
import { RotateCcw } from "lucide-react"
import Link from "next/link"

type Params = Promise<{ id: string }>
interface TrainingDetailsPageProps {
  params: Params
}

const tableHeaders = [
  { label: "تاريخ الدورة (من /إلى)" },
  { label: "المدة (باليوم)" },
  { label: "أيام السفر" },
  { label: "إعدادات تواريخ السفر" },
  { label: "تاريخ السفر للتدريب" },
  { label: "تاريخ العودة من التدريب" },
]

const TrainingDetailsPage = async ({ params }: TrainingDetailsPageProps) => {
  const { id } = await params
  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const requestStatus = await getRequestStatus(id, "hr.training.request")
  const {
    duration,
    courseProgram,
    courseValue,
    employeeName,
    jobNumber,
    jobTitle,
    sector,
    trainingCenter,
    mandateAllowance,
    mechanismConvening,
    transcationDate,
    status,
    requestDate,
    trainingType,
    trainingName,
    trainingMethod,
    trainingStartDate,
    trainingEndDate,
    country,
    city,
    travelDays,
    trainingStartBefore,
    trainingEmployee,
    trainingSchedule,
    attachments,
  } = (await getTrainingDetails(id)) || {}

  const trainingScheduleData = trainingSchedule ?? []

  const TrainingMethodDisplay = () => {
    if (!trainingMethod || trainingMethod.length === 0) {
      return <span className="text-gray-500">لا توجد طرق تدريب محددة</span>
    }

    return (
      <div className="flex flex-wrap gap-4">
        {trainingMethod.map((method, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckboxField
              label={""}
              name={""}
              className="rounded-[3px] shadow-none space-y-0 mt-2"
              checked={method.checked}
            />
            <label className="font-medium text-foreground">{method.name}</label>
          </div>
        ))}
      </div>
    )
  }

  const requestHeaders: RequestHeader[] = [
    { label: "رقم الطلب", value: id },
    { label: "تاريخ الطلب", value: requestDate },
    { label: "نوع التدريب", value: trainingType },
    { label: "طبيعة التدريب", value: <TrainingMethodDisplay /> },
    { label: "مسمى التدريب", value: trainingName },
    { label: "آلية الانعقاد", value: mechanismConvening },
    { label: "تاريخ بداية التدريب", value: trainingStartDate },
    { label: "تاريخ نهاية التدريب", value: trainingEndDate },
    { label: "مدة التدريب", value: duration },
    { label: "اسم مركز التدريب", value: trainingCenter },
    { label: "الدولة", value: country },
    { label: "المدينة", value: city },
    { label: "أيام السفر", value: travelDays },
    { label: "بداية انتداب التدريب", value: trainingStartBefore },
    { label: "الموظف البديل", value: trainingEmployee },
    { label: "برنامج الدورة", value: courseProgram },
    { label: "قيمة الدورة", value: courseValue },
    { label: "بدل الانتداب (بالريال)", value: mandateAllowance },
    { label: "تاريخ التحويل", value: transcationDate },
    { label: "الحالة", value: status },
    { label: "المرفقات", value: attachments },
  ]

  const employeeHeaders: RequestHeader[] = [
    { label: "الموظف", value: employeeName },
    { label: "الرقم الوظيفي", value: jobNumber },
    { label: "المسمى الوظيفي", value: jobTitle },
    { label: "القطاع", value: sector },
  ]

  return (
    <>
      <RequestStatus status={requestStatus} />
      <RequestDetails
        headers={employeeHeaders}
        requestDetailsLabel="بيانات الموظف"
      />
      <RequestDetails headers={requestHeaders} />

      <div className="bg-white rounded-lg py-8 px-4 mt-6">
        <Table
          tableClassName="h-fit"
          columns={tableHeaders}
          rows={trainingScheduleData}
          toggleId={false}
        />
        <div className="flex justify-end items-center gap-4">
          <Button className="flex group gap-1 items-center shadow-none hover:bg-green-600 hover:text-white justify-end text-success-foreground bg-success rounded-xl px-4 py-2.5">
            <CheckIcon className="fill-success-foreground group-hover:fill-white" />
            موافق
          </Button>

          <Button className="flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5">
            <XMarkIcon className="fill-destructive-foreground group-hover:fill-white" />
            مرفوض
          </Button>

          <Link href={paths.training.href}>
            <Button
              type="button"
              className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4"
            >
              <RotateCcw />
              تراجع
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TrainingDetailsPage
