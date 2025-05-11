import { InfoGrid } from '@components';
import { colors } from '@lib';
import type { GeneralInfo } from '@types';

const data: GeneralInfo[] = [
  {
    title: 'الطلبات تحت الإجراء',
    count: 1.15,
    icon: 'CalenderSpecialIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -20,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'الطلبات المرفوضة',
    count: 1.15,
    icon: 'ClipboardIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -22,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'كل الطلبات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -23,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
];

export const ResignationData = () => {
  return (
    <div className='py-6'>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
