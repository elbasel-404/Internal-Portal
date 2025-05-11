import { Instructions } from '@components';
import { getTransactionRequests } from '@server';
import { TransactionListTable } from './components/TransactionListTable';

const TransactionListPage = async () => {
  const transactionData = await getTransactionRequests();
  return (
    <div className='space-y-4 mb-12'>
      <TransactionListTable data={transactionData} />
      <Instructions
        title='توضيحات حول الخدمة'
        description='تتيح هذه الخدمة للموظف إمكانية عرض قائمة المعاملات تحت الإجراء مثل الإجازات، والانتدابات، ...'
      />
    </div>
  );
};

export default TransactionListPage;
