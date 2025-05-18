import {
  Instructions,
  ProductsTableSection,
  RequestDetails,
  RequestStatus,
} from '@components';
import { getUser } from '@db/actions';
import {
  getPurchaseDetails,
  getPurchaseProductsByRequestId,
  getUserId,
} from '@server';
import { RequestHeader } from '@types';
import { requestStatus } from '../../config';
import { BatchTableSection } from './sections/BatchTableSection';

type Params = Promise<{ id: string }>;

interface PurchaseDetailsPageProps {
  params: Params;
}

const PurchaseDetailsPage = async ({ params }: PurchaseDetailsPageProps) => {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) throw new Error('Invalid User Id');

  const { batchs } = await getUser(userId);
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
    { label: 'رقم الطلب', value: id },
    { label: 'تاريخ الطلب', value: requestDate },
    { label: 'النوع', value: type },
    { label: 'عنوان الطلب', value: requestTitle },
    { label: 'الوصف', value: description },
    { label: 'مخرجات الطلب', value: requestOutcomes },
    { label: 'نوع الخطة', value: planType },
    { label: 'اسم (المبادرة/البرنامج)', value: programName },
    { label: 'اسم المشروع', value: projectName },
    { label: 'التكاليف (التكلفة الإجمالية للمشروع)', value: costs },
    { label: 'مبلغ الترسية', value: awardAmount },
    { label: 'مبلغ الترسية قبل التغيير', value: awardAmountBeforeChange },
    { label: 'المرفقات', value: attachments },
  ];

  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';

  return (
    <main className='space-y-4'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <ProductsTableSection
        requestStatus={requestStatus}
        productsData={productsData}
      />
      <BatchTableSection requestStatus={requestStatus} batchs={batchs} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف إمكانية تقديم طلب أمر شراء، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من الحقول اللازمة.'
      />
    </main>
  );
};

export default PurchaseDetailsPage;
