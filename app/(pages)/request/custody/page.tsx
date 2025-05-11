import { Instructions } from '@components';
import { getCustodyRequests } from '@server';
import { CustodyTable } from './components';

const CustodyListPage = async () => {
  const custodyData = await getCustodyRequests();
  return (
    <div className='space-y-4 mb-12'>
      <CustodyTable data={custodyData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف إمكانية تقديم طلب العهدة، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات طلب العهدة.'
      />
    </div>
  );
};

export default CustodyListPage;
