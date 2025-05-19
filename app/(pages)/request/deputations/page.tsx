import { getDeputationRequests } from '@server';
import { DeputationTable } from './components';

const DeputationListPage = async () => {
  const DeputationData = await getDeputationRequests();
  return (
    <div className='mb-12'>
      <DeputationTable data={DeputationData} />
    </div>
  );
};

export default DeputationListPage;
