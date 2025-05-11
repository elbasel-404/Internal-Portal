import { Instructions } from '@components';
import { getTrialPeriodRequests } from '@server';
import { TrialPeriodTable } from './components';

const TrialPeriodListPage = async () => {
  const TrialPeriodData = await getTrialPeriodRequests();
  return (
    <div className='space-y-4 mb-12'>
      <TrialPeriodTable data={TrialPeriodData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للمدير المباشر إمكانية الإطلاع على قائمة طلبات تقييم فترة التجربة.'
      />
    </div>
  );
};

export default TrialPeriodListPage;
