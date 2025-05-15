import {
  Instructions,
  RequestDetails,
  RequestStatus,
  Table,
} from '@components';
import { ModalLink } from '@components/modals/ModalLink';
import { CirclePlusIcon } from '@icons';
import { getPurchaseDetails, getPurchaseProductsByRequestId } from '@server';
import { RequestHeader } from '@types';

type Params = Promise<{ id: string }>;

interface PurchaseDetailsPageProps {
  params: Params;
}

const tableHeaders = [
  { label: 'المنتج' },
  { label: 'الوصف' },
  { label: 'الكمية' },
  { label: 'الكمية المنجزة' },
  { label: 'المبلغ المنجز' },
  { label: 'الكمية تحت المنجزة' },
  { label: 'الكمية المتبقية' },
  { label: 'المبلغ المتبقى' },
  { label: 'سعر الوحدة' },
  { label: 'سعر الوحدة بعد الضريبة' },
  { label: 'الاجمالي الفرعى' },
  { label: 'الإجمالي بعد الضريبة' },
];

const PurchaseDetailsPage = async ({ params }: PurchaseDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = [
    {
      id: '1',
      title: 'مقدم الطلب',
      subtitle: 'عساف بن رشود الصاعدي',
      icon: 'person',
      status: 'completed',
    },
    {
      id: '2',
      title: 'المدير المباشر',
      subtitle: 'حمد بن يوسف القشيميط',
      icon: 'person',
      status: 'in-progress',
    },
    {
      id: '3',
      title: 'عمليات الموارد البشرية',
      subtitle: 'حمد بن يوسف القشيميط',
      icon: 'person',
      status: 'pending',
    },
    {
      id: '4',
      title: 'مدير القطاع',
      subtitle: 'حمد بن يوسف القشيميط',
      icon: 'person',
      status: 'pending',
    },
    {
      id: '5',
      title: 'مدقق مالي',
      subtitle: 'حمد بن يوسف القشيميط',
      icon: 'person',
      status: 'pending',
    },
    {
      id: '6',
      title: 'أمر شراء',
      subtitle: 'حمد بن يوسف القشيميط',
      icon: 'person',
      status: 'pending',
    },
    {
      id: '7',
      title: 'أُعتمد',
      subtitle: 'حمد بن يوسف القشيميط',
      icon: 'personConfirmed',
      status: 'pending',
    },
  ];
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const productsData = await getPurchaseProductsByRequestId({
    purchaseRequestId: id,
  });
  const {
    requestDate,
    type,
    requestTitle,
    requestOutcomes,
    description,
    projectName,
    programName,
    planType,
    costs,
    awardAmount,
    awardAmountBeforeChange,
    attachments,
  } = (await getPurchaseDetails(id)) || {};

  const requestHeaders: RequestHeader[] = [
    {
      label: 'رقم الطلب',
      value: id,
    },
    {
      label: 'تاريخ الطلب',
      value: requestDate,
    },
    {
      label: 'النوع',
      value: type,
    },
    {
      label: 'عنوان الطلب',
      value: requestTitle,
    },
    {
      label: 'الوصف',
      value: description,
    },
    {
      label: 'مخرجات الطلب',
      value: requestOutcomes,
    },
    {
      label: 'نوع الخطة',
      value: planType,
    },
    {
      label: 'اسم (المبادرة/البرنامج)',
      value: programName,
    },
    {
      label: 'اسم المشروع',
      value: projectName,
    },
    {
      label: 'التكاليف (التكلفة الإجمالية للمشروع)',
      value: costs,
    },
    {
      label: 'مبلغ الترسية',
      value: awardAmount,
    },
    {
      label: 'مبلغ الترسية قبل التغيير',
      value: awardAmountBeforeChange,
    },
    {
      label: 'المرفقات',
      value: attachments,
    },
  ];
  return (
    <main className='space-y-4'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      {requestStatus.some((step) => step.id === '6') && (
        <div className='bg-white pt-4 pb-4 px-4 rounded-lg space-y-3'>
          <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary'>
            <h2 className='text-darkBlue font-bold text-xl'>
              المنتجات<span className='text-red-500'>*</span>
            </h2>
          </div>

          <Table
            tableClassName='h-fit'
            columns={tableHeaders}
            rows={productsData}
            toggleId={false}
          />
        </div>
      )}
      {requestStatus.some((step) => step.id === '6') && (
        <div className='bg-white pt-4 pb-4 px-4 rounded-lg space-y-3'>
          <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary'>
            <h2 className='text-darkBlue font-bold text-xl'>
              قائمة الدفعات<span className='text-red-500'>*</span>
            </h2>
            <ModalLink
              name='BatchsModal'
              className='flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary'
            >
              <CirclePlusIcon className='fill-white group-hover:fill-primary' />
              إضافة عنصر
            </ModalLink>
          </div>

          {/* <Table
            tableClassName='h-fit'
            columns={tableHeaders}
            rows={newProductsData}
            toggleId={false}
          /> */}
        </div>
      )}
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف إمكانية تقديم طلب أمر شراء، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من الحقول اللازمة.'
      />
    </main>
  );
};

export default PurchaseDetailsPage;
