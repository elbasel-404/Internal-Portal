import { RequestDetails, RequestStatus, Table } from '@components';
import { CheckIcon, XMarkIcon } from '@icons';
import { getRequestStatus, getTrainingDetails } from '@server';
import { RequestHeader } from '@types';
import { Button } from '@ui';

type Params = Promise<{ id: string }>;
interface TrainingDetailsPageProps {
  params: Params;
}

const tableHeaders = [
  { label: 'تاريخ الدورة (من /إلى)' },
  { label: 'المدة (باليوم)' },
  { label: 'أيام السفر' },
  { label: 'إعدادات تواريخ السفر' },
  { label: 'تاريخ السفر للتدريب' },
  { label: 'تاريخ العودة من التدريب' },
];

const TrainingDetailsPage = async ({ params }: TrainingDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const {
    duration,
    courseProgram,
    courseValue,
    employeeName,
    jobNumber,
    jobTitle,
    sector,
    trainingCenter,
    mandateAllowance,
    mechanismConvening,
    transcationDate,
    status,
    requestDate,
    trainingType,
    trainingName,
    trainingMethod,
    trainingStartDate,
    trainingEndDate,
    country,
    city,
    travelDays,
    trainingStartBefore,
    trainingEmployee,
    trainingSchedule,
    attachments,
  } = (await getTrainingDetails(id)) || {};

  const trainingScheduleData = trainingSchedule ?? [];

  const requestHeaders: RequestHeader[] = [
    { label: 'رقم الطلب', value: id },
    { label: 'تاريخ الطلب', value: requestDate },
    { label: 'نوع التدريب', value: trainingType },
    { label: 'طبيعة التدريب', value: trainingMethod?.join(', ') },
    { label: 'مسمى التدريب', value: trainingName },
    { label: 'آلية الانعقاد', value: mechanismConvening },
    { label: 'تاريخ بداية التدريب', value: trainingStartDate },
    { label: 'تاريخ نهاية التدريب', value: trainingEndDate },
    { label: 'مدة التدريب', value: duration },
    { label: 'اسم مركز التدريب', value: trainingCenter },
    { label: 'الدولة', value: country },
    { label: 'المدينة', value: city },
    { label: 'أيام السفر', value: travelDays },
    { label: 'بداية انتداب التدريب', value: trainingStartBefore },
    { label: 'الموظف البديل', value: trainingEmployee },
    { label: 'برنامج الدورة', value: courseProgram },
    { label: 'قيمة الدورة', value: courseValue },
    { label: 'بدل الانتداب (بالريال)', value: mandateAllowance },
    { label: 'تاريخ التحويل', value: transcationDate },
    { label: 'الحالة', value: status },
    { label: 'المرفقات', value: attachments },
  ];

  const employeeHeaders: RequestHeader[] = [
    { label: 'الموظف', value: employeeName },
    { label: 'الرقم الوظيفي', value: jobNumber },
    { label: 'المسمى الوظيفي', value: jobTitle },
    { label: 'القطاع', value: sector },
  ];

  return (
    <>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails
        headers={employeeHeaders}
        requestDetailsLabel='بيانات الموظف'
      />
      <RequestDetails headers={requestHeaders} />
      <div className='bg-white rounded-lg py-8 px-4 mt-6'>
        <Table
          tableClassName='h-fit'
          columns={tableHeaders}
          rows={trainingScheduleData}
          toggleId={false}
        />
        <div className='flex justify-end items-center gap-4'>
          <Button className='flex group gap-1 items-center shadow-none hover:bg-green-600 hover:text-white justify-end text-success-foreground bg-success rounded-xl px-4 py-2.5'>
            <CheckIcon className='fill-success-foreground group-hover:fill-white' />
            موافق
          </Button>

          <Button className='flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5'>
            <XMarkIcon className='fill-destructive-foreground group-hover:fill-white' />
            مرفوض
          </Button>

          <Button className='flex group gap-1 items-center shadow-none hover:bg-red-600 hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-4 py-2.5'>
            <XMarkIcon className='fill-destructive-foreground group-hover:fill-white' />
            تراجع
          </Button>
        </div>
      </div>
    </>
  );
};

export default TrainingDetailsPage;
