import { RequestStatus } from '@components';
import { getRequestStatus } from '@server';
import { TicketForm } from '../components';

const NewTicketPage = async () => {
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  return (
    <div className='space-y-4 mb-16'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <TicketForm />
    </div>
  );
};

export default NewTicketPage;
