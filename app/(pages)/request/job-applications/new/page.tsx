import { RequestStatus } from '@components';
import { getRequestStatus } from '@server';
import { JobApplicationsForm } from '../components';

const NewJobApplicationPage = async () => {
  const requestStatus = await getRequestStatus();
  // ! TODO: Add server action:
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  return (
    <div className='space-y-4 mb-16'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <JobApplicationsForm />
    </div>
  );
};

export default NewJobApplicationPage;
