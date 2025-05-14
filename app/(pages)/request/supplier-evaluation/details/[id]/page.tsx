import { EvaluationCriteriaTable ,EvaluationResultTable} from '../../components';
import { RequestDetails, RequestStatus } from '@components';
import { getRequestStatus, getSupplierEvaluationRequestDetails } from '@server';
import { RequestHeader } from '@types';

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
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
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
      evaluationCriteria,
  } = (await getSupplierEvaluationRequestDetails(id)) || {};

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
  return (
    <main className='space-y-4'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <EvaluationCriteriaTable data={[]}/>
      <EvaluationResultTable data={[]}/>
    </main>
  );
};

export default SupplierEvaluationDetailsPage;
