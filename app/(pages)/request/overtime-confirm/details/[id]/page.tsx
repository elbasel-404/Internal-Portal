import { RequestDetails, RequestStatus } from '@components';
import { getOvertimeConfirmDetails, getRequestStatus } from '@server';
import { RequestHeader } from '@types';

type Params = Promise<{ id: string }>;

interface OverTimeConfirmDetailsPageProps {
  params: Params;
}

const OverTimeConfirmDetailsPage = async ({
  params,
}: OverTimeConfirmDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const { applicant, assignmentNumber, overTimeDuration, management } =
    (await getOvertimeConfirmDetails(id)) || {};

  const requestHeaders: RequestHeader[] = [
    {
      label: 'رقم الطلب',
      value: id,
    },
    {
      label: 'رقم طلب التكليف',
      value: assignmentNumber,
    },
    {
      label: 'مقدم الطلب',
      value: applicant,
    },
    {
      label: 'مدة الوقت الإضافى',
      value: overTimeDuration,
    },
    {
      label: 'الإدارة',
      value: management,
    },
  ];
  return (
    <main className='space-y-4'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
    </main>
  );
};

export default OverTimeConfirmDetailsPage;
