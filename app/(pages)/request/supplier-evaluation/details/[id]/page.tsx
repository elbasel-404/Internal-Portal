import {
  EvaluationCriteriaTable,
  EvaluationResultTable,
} from "../../components"
import { RequestDetails, RequestStatus, Instructions } from "@components"
import {
  getRequestStatus,
  getSupplierEvaluationRequestDetails,
  getSupplierEvaluationRequestCriteria,
} from "@server"
import {
  RequestHeader,
  SupplierEvaluationCriterionResult,
  SupplierKPI,
} from "@types"

type Params = Promise<{ id: string }>

interface SupplierEvaluationDetailsPageProps {
  params: Params
}

const SupplierEvaluationDetailsPage = async ({
  params,
}: SupplierEvaluationDetailsPageProps) => {
  const { id } = await params
  const requestStatus = await getRequestStatus(
    id,
    "hr.relation.supplier.evaluation",
  )
  const {
    requestDate,
    contract,
    step,
    purchaseRequestNumber,
    supplier,
    projectName,
    contractStartDate,
    contractEndDate,
    startDate,
    endDate,
    confirmationSerialNumber,
    confirmationProjectName,
    confirmationContractNumber,
    status,
    reason,
  } = (await getSupplierEvaluationRequestDetails(id)) || {}

  const evaluationCriteriaData =
    (await getSupplierEvaluationRequestCriteria(id)) || []

  const displayReason =
    status === "مرفوض" || status === "إعتماد" ? reason : null

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
      label: "العقد",
      value: contract,
    },
    {
      label: "المرحلة",
      value: step,
    },
    {
      label: "رقم طلب الشراء",
      value: purchaseRequestNumber,
    },
    {
      label: "المورد",
      value: supplier,
    },
    {
      label: "اسم المشروع",
      value: projectName,
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
      label: "التاريخ من",
      value: startDate,
    },
    {
      label: "التاريخ الي",
      value: endDate,
    },
    {
      label: "الرقم التسلسلي من الاعتماد",
      value: confirmationSerialNumber,
    },
    {
      label: "اسم المشروع من الاعتماد",
      value: confirmationProjectName,
    },
    {
      label: "رقم العقد من الاعتماد",
      value: confirmationContractNumber,
    },
    ...(displayReason
      ? [
          {
            label: (status === "مرفوض"
              ? "سبب الرفض"
              : "إعتماد") as RequestHeader["label"],
            value: reason,
          },
        ]
      : []),
  ]

  const evaluationResultData: SupplierEvaluationCriterionResult[] =
    evaluationCriteriaData?.map((item) => {
      const totalPointsValue = item.kpis.reduce((sum, kpi) => {
        return sum + parseFloat(kpi.pointsValue)
      }, 0)
      const evaluationPoints = (totalPointsValue / item.kpis.length)
        .toFixed(2)
        .toString()
      const totalPoints = (
        (parseFloat(item.weight) * parseFloat(evaluationPoints)) /
        100
      )
        .toFixed(2)
        .toString()
      return {
        id: item.id,
        name: item.name,
        weight: item.weight,
        evaluationPoints,
        totalPoints,
      }
    }) || []

  const CriteriaStatistics: SupplierKPI = {
    id: "0000",
    name: "",
    measurement: "",
    pointsValue: "",
    evaluationPoints: ["90-100", "70-89", "50-69"],
    notes: "لا يوجد",
  }

  return (
    <main>
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
      <EvaluationCriteriaTable
        data={CriteriaStatistics}
        evaluationCriteriaData={evaluationCriteriaData}
      />
      <EvaluationResultTable data={evaluationResultData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية الاطلاع علي تفاصيل طلب تقييم أداء المتعاقدين.."
      />
    </main>
  )
}

export default SupplierEvaluationDetailsPage
