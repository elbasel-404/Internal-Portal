import { Instructions } from '@components';
import { getPurchaseRequests } from '@server';
import { PurchaseTable } from './components';

const PurchaseListPage = async () => {
  const purchaseData = await getPurchaseRequests();
  return (
    <div className='space-y-6 mb-12'>
      <PurchaseTable data={purchaseData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة عرض الترشيحات الخاصة به للدورات الداخلية'
      />
    </div>
  );
};

export default PurchaseListPage;
