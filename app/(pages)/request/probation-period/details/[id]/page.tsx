import { RequestDetails, RequestStatus } from '@components';
import { getProbationPeriodDetails, getRequestStatus } from '@server';
import { RequestHeader } from '@types';
import { ProbationPeriodCriteria } from '../../components';

// !  // !It will be used when id passed to endpoint for integration
// type Params = Promise<{ id: string }>;

// interface ProbationPeriodDetailsPageProps {
//   params: Params;
// }

const ProbationPeriodDetailsPage = async ({
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
    endProbationPeriodDate,
    recommendation,
    notes,
    attachments,
  } = (await getProbationPeriodDetails()) || {};

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
      value: endProbationPeriodDate,
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
        evaluationCritera={<ProbationPeriodCriteria />}
      />
    </main>
  );
};

export default ProbationPeriodDetailsPage;
