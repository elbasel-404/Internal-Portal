import { Instructions, RequestStatus } from '@components';
import { getRequestStatus } from '@server';
import { EmployeeMembersForm } from '../components';

const NewEmployeeMembersPage = async () => {
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  return (
    <div className='space-y-4 mb-16'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <EmployeeMembersForm />
      <Instructions
        title='توضيحات الخدمة'
        description='تتيح هذة الخدمة للموظف امكانية تقديم طلب تحديث افراد الاسرة, يتم تعبئة الطلب بالبيانات الاساسية ويجب على الموظف التأكد من معطيات افراد الاسرة'
      />
    </div>
  );
};

export default NewEmployeeMembersPage;
