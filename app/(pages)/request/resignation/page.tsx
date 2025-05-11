import { Instructions } from '@components';
import { getResignationRequests } from '@server';
import { ResignationTable } from './components';

const ResignationListPage = async () => {
  const resignationData = await getResignationRequests();
  return (
    <div className='space-y-4 mb-12'>
      <ResignationTable data={resignationData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للمدير المباشر امكانبة الاطلاع علي قائمة طلبات انهاء خدمة'
      />
    </div>
  );
};

export default ResignationListPage;
