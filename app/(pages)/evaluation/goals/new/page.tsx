import { Instructions, RequestStatus } from '@components';
import { getGoalsRequests, getRequestStatus } from '@server';
import { EvaluationGoalsForm } from '../components';

const NewEvaluationGoals = async () => {
  const goalsData = await getGoalsRequests();
  const requestStatus = await getRequestStatus();
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <EvaluationGoalsForm goalsData={goalsData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف امكانية عرض وانشاء تخطيط الأداء'
      />
    </div>
  )
}

export default NewEvaluationGoals
