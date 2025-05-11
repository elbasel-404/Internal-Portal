import { Instructions } from '@components';
import { getBankAccountRequests } from '@server';
import { BankAccountTable } from './components';

const BankAccountChangeListPage = async () => {
  const bankAccountData = await getBankAccountRequests();
  return (
    <div className='space-y-4 mb-12'>
      <BankAccountTable data={bankAccountData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف إمكانية تقديم طلب تغيير الحساب البنكي، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات تغيير الحساب البنكي.'
      />
    </div>
  );
};

export default BankAccountChangeListPage;
