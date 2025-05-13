import { Instructions } from '@components';
import { EvaluationTable } from './components';
import { getSupplierEvaluationRequests } from '@server';

export const dynamic = "force-dynamic"

const SupplierEvaluationRequestsListPage = async () => {
  const SupplierEvaluationRequests = await getSupplierEvaluationRequests();

  return (
    <div className='space-y-4 mb-12'>
      <EvaluationTable data={SupplierEvaluationRequests} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف إمكانية طلب إجازة. يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من تاريخ بداية ونهاية الإدارة.'
      />
    </div>
  );
};

export default SupplierEvaluationRequestsListPage;
