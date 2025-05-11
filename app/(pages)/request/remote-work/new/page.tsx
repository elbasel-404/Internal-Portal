import { CreateRequestStatus } from '@components';
import { getCreateRequestStatus } from '@server';
import { RemoteWorkForm } from '../components';

const NewRemoteWorkPage = async () => {
  const model = 'hr.distance.work'
  const requestStatus = await getCreateRequestStatus(model);
  const requestCaption =
  'انت الان في مرحلة انشاء الطلب';
  return (
    <div className='space-y-4 mb-16'>
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <RemoteWorkForm />
    </div>
  );
};

export default NewRemoteWorkPage;
