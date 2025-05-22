import { Instructions } from '@components';
import { getProbationPeriodRequests } from '@server';
import { ProbationPeriodTable } from './components';

const ProbationPeriodListPage = async () => {
  const ProbationPeriodData = await getProbationPeriodRequests();
  return (
    <div className='space-y-4 mb-12'>
      <ProbationPeriodTable data={ProbationPeriodData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للمدير المباشر إمكانية الإطلاع على قائمة طلبات تقييم فترة التجربة.'
      />
    </div>
  );
};

export default ProbationPeriodListPage;
