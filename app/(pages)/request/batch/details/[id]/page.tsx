import {
  Instructions,
  ProductsTableSection,
  RequestDetails,
} from '@components';
import { getUser } from '@db/actions';
import { getBatchDetails, getUserId } from '@server';
import { RequestHeader } from '@types';

type Params = Promise<{ id: string }>;

interface BatchDetailsPageProps {
  params: Params;
}

const BatchDetailsPage = async ({ params }: BatchDetailsPageProps) => {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) throw new Error('Invalid User Id');

  const { batchProducts } = await getUser(userId);
  const batchProductsData = batchProducts.map((batchProductDetails, index) => {
    return {
      ...batchProductDetails,
      id: index + 'id',
    };
  });

  const { batchName, notes, paymentDate, attachments } =
    (await getBatchDetails(id)) || {};

  const requestHeaders: RequestHeader[] = [
    { label: 'رقم الدفعة', value: id },
    { label: 'اسم الدفعة', value: batchName },
    { label: 'تاريخ السداد', value: paymentDate },
    { label: 'ملاحظات', value: notes },
    { label: 'المرفقات', value: attachments },
  ];

  return (
    <main className='space-y-4'>
      <RequestDetails
        headers={requestHeaders}
        requestDetailsLabel='تفاصيل الدفعة'
      />
      <ProductsTableSection productsData={batchProductsData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف إمكانية تقديم طلب أمر شراء، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من الحقول اللازمة.'
      />
    </main>
  );
};

export default BatchDetailsPage;
