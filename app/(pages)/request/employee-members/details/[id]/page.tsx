import { RequestDetails, RequestStatus } from '@components';
import { getEmployeeMembersDetails, getRequestStatus } from '@server';
import { RequestHeader } from '@types';

type Params = Promise<{ id: string }>;

interface EmployeeMembersDetailsPageProps {
  params: Params;
}

const EmployeeMembersDetailsPage = async ({
  params,
}: EmployeeMembersDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    'انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر';
  const {
    date,
    requestType,
    relation,
    nameAr,
    nameEn,
    birthDate,
    idNumber,
    attachments,
  } = (await getEmployeeMembersDetails(id)) || {};

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
      label: 'نوع الطلب',
      value: requestType,
    },
    {
      label: 'الاسم الكامل للفرد بالعربية',
      value: nameAr,
    },
    {
      label: 'الاسم الكامل للفرد بالانجليزية',
      value: nameEn,
    },
    {
      label: 'رقم الهوية',
      value: idNumber,
    },
    {
      label: 'تاريخ الميلاد',
      value: birthDate,
    },
    {
      label: 'صلة القرابة',
      value: relation,
    },
    {
      label: 'المرفقات',
      value: attachments,
    },
  ];
  return (
    <main>
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
    </main>
  );
};

export default EmployeeMembersDetailsPage;
