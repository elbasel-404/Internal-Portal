import { InfoGrid } from '@components';
import { colors } from '@lib';
import type { GeneralInfo } from '@types';

const data: GeneralInfo[] = [
  {
    title: 'الطلبات قيد الإجراء و المعتمدة',
    count: 1.15,
    icon: 'SandClockIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -120,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'الطلبات المرفوضة',
    count: 1.15,
    icon: 'FileWithXIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -121,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'الطلبات الملغية',
    count: 1.15,
    icon: 'TagWithXIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -122,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
  {
    title: 'كل الطلبات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -123,
    key: 'employeeRequests',
    active: true,
    index: 3,
  },
];

export const TransactionListData = () => {
  return (
    <div className='py-6'>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
