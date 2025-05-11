import { RequestDetails, RequestStatus } from '@components';
import { getCustodyDetails, getRequestStatus } from '@server';
import { RequestHeader } from '@types';

type Params = Promise<{ id: string }>;

interface ReplacementCovenantDetailsPageProps {
  params: Params;
}

const ReplacementCovenantDetailsPage = async ({
  params,
}: ReplacementCovenantDetailsPageProps) => {
  const { id } = await params;
  const model = 'manage.financial.custody';
  const requestStatus = await getRequestStatus(id, model);
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const { date, custodyType, custodyAmount, custodyPurpose } =
    (await getCustodyDetails(id)) || {};

  const requestHeaders: RequestHeader[] = [
    {
      label: 'رقم الطلب',
      value: id,
    },
    {
      label: 'تاريخ الطلب',
      value: date,
    },
    {
      label: 'مبلغ العهدة',
      value: custodyAmount,
    },
    {
      label: 'نوع العهدة',
      value: custodyType,
    },
    {
      label: 'الغرض من العهدة',
      value: custodyPurpose,
    },
  ];
  return (
    <main className='space-y-4'>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
    </main>
  );
};

export default ReplacementCovenantDetailsPage;
