import { RequestStatus } from '@components';
import { getRequestStatus } from '@server';
import { ProbationPeriodForm } from '../components';

const NewProbationPeriodPage = async () => {
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  return (
    <div className='space-y-4 mb-16'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <ProbationPeriodForm />
    </div>
  );
};

export default NewProbationPeriodPage;
