import { EvaluationCriteriaTable ,EvaluationResultTable} from '../../components';
import { RequestDetails, RequestStatus } from '@components';
import { getRequestStatus, getSupplierEvaluationRequestDetails, getSupplierEvaluationRequestCriteria } from '@server';
import { RequestHeader, SupplierEvaluationCriterion, SupplierEvaluationCriterionResult } from '@types';

type Params = Promise<{ id: string }>;

interface SupplierEvaluationDetailsPageProps {
  params: Params;
}

const SupplierEvaluationDetailsPage = async ({
  params,
}: SupplierEvaluationDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر";
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
  } = (await getSupplierEvaluationRequestDetails(id)) || {};

  const evaluationCriteriaData = (await getSupplierEvaluationRequestCriteria(id)) || [];

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم العقد من الاعتماد",
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
  ];


  const evaluationResultData: SupplierEvaluationCriterionResult[] =
  evaluationCriteriaData?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      weight: item.weight,
      evaluationPoints: item.evaluationPoints,
      totalPoints: item.totalPoints,
    };
  }) || [];

  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <EvaluationCriteriaTable data={[]} />
      <EvaluationResultTable data={evaluationResultData} />
    </main>
  );
};

export default SupplierEvaluationDetailsPage;
