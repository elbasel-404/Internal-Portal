import { CreateRequestStatus } from '@components';
import { getCreateRequestStatus, getRelativeRelations } from '@server';
import { MedicalForm } from '../components';

const NewMedicalInsurancePage = async () => {
  const model = 'hr.medical.insurance';
  const requestStatus = await getCreateRequestStatus(model);
  const relativeRelation = await getRelativeRelations();
  // ! TODO: Add server action:
  const requestCaption = 'انت الان في مرحلة انشاء الطلب';
  return (
    <div className='space-y-4 mb-16'>
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <MedicalForm relativeRelation={relativeRelation} />
    </div>
  );
};

export default NewMedicalInsurancePage;
