import { getTicketRequests } from '@server';
import { TicketTable } from './components';

const TicketsListPage = async () => {
  const TicketData = await getTicketRequests();
  return (
    <div className='space-y-4 mb-12'>
      <TicketTable data={TicketData} />
    </div>
  );
};

export default TicketsListPage;
