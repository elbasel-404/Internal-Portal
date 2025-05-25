import { RequestDetails, RequestStatus } from '@components';
import { getRequestStatus, getTrialPeriodDetails } from '@server';
import { RequestHeader } from '@types';
import { TrialPeriodCriteria } from '../../components';

// !  // !It will be used when id passed to endpoint for integration
// type Params = Promise<{ id: string }>;

// interface TrialPeriodDetailsPageProps {
//   params: Params;
// }

const TrialPeriodDetailsPage = async ({
//   params,
}) => {
  // !  // !It will be used when id passed to endpoint for integration
  //   const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const {
    employeeName,
    jobNumber,
    jobTitle,
    management,
    appointmentDate,
    endTrialPeriodDate,
    recommendation,
    notes,
    attachments,
  } = (await getTrialPeriodDetails()) || {};

  const requestHeaders: RequestHeader[] = [
    {
      label: 'اسم الموظف',
      value: employeeName,
    },
    {
      label: 'الرقم الوظيفى',
      value: jobNumber,
    },
    {
      label: 'المسمى الوظيفى',
      value: jobTitle,
    },
    {
      label: 'الإدارة/القطاع',
      value: management,
    },
    {
      label: 'تاريخ التعيين',
      value: appointmentDate,
    },
    {
      label: 'تاريخ إنتهاء فترة التجربة',
      value: endTrialPeriodDate,
    },
    {
      label: 'التوصية',
      value: recommendation,
    },
    {
      label: 'ملاحظات',
      value: notes,
    },
    {
      label: 'المرفقات',
      value: attachments,
    },
  ];
  return (
    <main>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails
        headers={requestHeaders}
        evaluationCriteria={<TrialPeriodCriteria />}
      />
    </main>
  );
};

export default TrialPeriodDetailsPage;
