import { Instructions, RequestDetails, RequestStatus } from '@components';
import { getBankAccountDetails, getRequestStatus } from '@server';
import type { RequestHeader } from '@types';

type Params = Promise<{ id: string }>;

interface BankAccountDetailsPageProps {
  params: Params;
}

const BankAccountDetailsPage = async ({
  params,
}: BankAccountDetailsPageProps) => {
  const { id } = await params;
  const model = 'change.bank.account.request';
  const requestStatus = await getRequestStatus(id, model);
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const {
    requestDate,
    employeeCurrentAccount,
    bankName,
    ibanNumber,
    accountStatus,
  } = (await getBankAccountDetails(id)) || {};

  const requestHeaders: RequestHeader[] = [
    {
      label: 'رقم الطلب',
      value: id,
    },
    {
      label: 'تاريخ الطلب',
      value: requestDate,
    },
    {
      label: 'الحساب الحالي للموظف',
      value: employeeCurrentAccount,
    },
    {
      label: 'اسم البنك الجديد',
      value: bankName,
    },
    {
      label: 'رقم الايبيان (IBAN)',
      value: ibanNumber,
    },
    {
      label: 'حالة الحساب البنكي',
      value: accountStatus,
    },
  ];
  return (
    <main className='space-y-6'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف امكانية الإطلاع على تفاصيل طلبات تغيير الحسابات البنكية'
      />
    </main>
  );
};

export default BankAccountDetailsPage;
