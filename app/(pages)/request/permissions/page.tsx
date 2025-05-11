import { Instructions } from '@components';
import { PermissionTable } from './components';
import { getPermissionRequests } from '../../../server/getPermissionRequests';

const PermissionsListPage = async () => {
  const permissionData = await getPermissionRequests();
  return (
    <div className='space-y-4 mb-12'>
      <PermissionTable data={permissionData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذة الخدمة للموظف امكانية طلب استئذان, يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من تاريخ بداية ونهاية الاٍستئذان.'
      />
    </div>
  );
};

export default PermissionsListPage;
