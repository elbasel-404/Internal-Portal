import { Instructions, RequestStatus } from '@components';
import { getRequestStatus } from '@server';
import { PassportForm } from '../components';

const NewPassportPage = async () => {
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  return (
    <div className='space-y-4 mb-16'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <PassportForm />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذة الخدمة للموظف امكانية تقديم طلب تحديث بيانات الجواز, يتم تعبئة الطلب بالبيانات الاساسية ويجب على الموظف التأكد من معطيات بيانات الجواز'
      />
    </div>
  );
};

export default NewPassportPage;
