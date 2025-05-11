import { CreateRequestStatus } from '@components';
import { getBankDetails, getCreateRequestStatus } from '@server';
import { BankAccountForm } from '../components';

const NewBankAccountChangePage = async () => {
  const model = 'change.bank.account.request';
  const requestStatus = await getCreateRequestStatus(model);
  const bankDetails = await getBankDetails();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  return (
    <div className='space-y-4 mb-16'>
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <BankAccountForm bankDetails={bankDetails} />
    </div>
  );
};

export default NewBankAccountChangePage;
