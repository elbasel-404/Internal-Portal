import { RequestDetails, RequestStatus } from '@components';
import { AnglesLeftIcon } from '@icons';
import { getRequestStatus, getTrainingDetails } from '@server';
import { RequestHeader } from '@types';
import { Button } from '@ui';

type Params = Promise<{ id: string }>;

interface TrainingDetailsPageProps {
  params: Params;
}

const TrainingDetailsPage = async ({ params }: TrainingDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const {
    courseName,
    courseDate,
    duration,
    courseProgram,
    courseValue,
    employeeName,
    jobNumber,
    jobTitle,
    sector,
    trainingCenter,
    directWorkData,
    mandateAllowance,
    mechanismConvening,
    transcationDate,
    status,
    requestDate,
    attachments,
  } = (await getTrainingDetails(id)) || {};

  const requestHeaders: RequestHeader[] = [
    { label: 'رقم الطلب', value: id },
    { label: 'تاريخ الطلب', value: requestDate },
    { label: 'الموظف', value: employeeName },
    { label: 'الرقم الوظيفي', value: jobNumber },
    { label: 'المسمى الوظيفي', value: jobTitle },
    { label: 'القطاع', value: sector },
    { label: 'تاريخ الدورة', value: courseDate },
    { label: 'مسمى الدورة', value: courseName },
    { label: 'المدة', value: duration },
    { label: 'آلية الانعقاد', value: mechanismConvening },
    { label: 'مركز التدريب', value: trainingCenter },
    { label: 'قيمة الدورة', value: courseValue },
    { label: 'بدل الانتداب (بالريال)', value: mandateAllowance },
    { label: 'تاريخ التحويل', value: transcationDate },
    { label: 'بيانات مباشرة العمل', value: directWorkData },
    { label: 'الحالة', value: status },
    { label: 'برنامج الدورة', value: courseProgram },
    { label: 'المرفقات', value: attachments },
  ];

  return (
    <>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <Button className='flex w-full text-xl font-medium justify-center rounded-lg items-center gap-2 bg-primary hover:bg-primary text-white p-6 border-2 border-primary'>
        <span className='text-lg font-bold'>تأكيد التدريب</span>
        <AnglesLeftIcon width={18} height={18} className='fill-white' />
      </Button>
    </>
  );
};

export default TrainingDetailsPage;
