import { RequestDetails, RequestStatus } from '@components';
import { getOvertimeAssignmentDetails, getRequestStatus } from '@server';
import { RequestHeader } from '@types';

type Params = Promise<{ id: string }>;

interface OverTimeAssignmentDetailsPageProps {
  params: Params;
}

const OverTimeAssignmentDetailsPage = async ({
  params,
}: OverTimeAssignmentDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const {
    applicant,
    assignmentDescription,
    fromDate,
    toDate,
    hours
  } = (await getOvertimeAssignmentDetails(id)) || {};

  const requestHeaders: RequestHeader[] = [
    {
      label: 'رقم الطلب',
      value: id,
    },
    {
      label: 'مقدم الطلب',
      value: applicant,
    },
    {
      label: 'من تاريخ',
      value: fromDate,
    },
    {
      label: 'إلى تاريخ',
      value: toDate,
    },
    {
      label: 'عدد الساعات',
      value: hours,
    },
    {
      label: 'وصف التكليف',
      value: assignmentDescription,
    },
  ];
  return (
    <main className='space-y-4'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
    </main>
  );
};

export default OverTimeAssignmentDetailsPage;
