import { getWorkDocumentRequests } from '@server';
import { WorkDocumentTable } from './components';

const WorkDocumentListPage = async () => {
  const workDocumentData = await getWorkDocumentRequests();
  return (
    <div className='mb-12'>
      <WorkDocumentTable data={workDocumentData} />
    </div>
  );
};

export default WorkDocumentListPage;
