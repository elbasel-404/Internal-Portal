import { getOvertimeConfirmRequests } from '@server';
import { OvertimeConfirmTable } from './components';

const OvertimeConfirmListPage = async () => {
  const overtimeConfirmData = await getOvertimeConfirmRequests();
  return (
    <div className='mb-12'>
      <OvertimeConfirmTable data={overtimeConfirmData} />
    </div>
  );
};

export default OvertimeConfirmListPage;
