import type { GeneralInfo } from '@types';
import { InfoGrid } from '@components';
import { colors } from '@lib';

const data: GeneralInfo[] = [
  {
    title: 'الاستئذانات تحت الإجراء',
    count: 1.15,
    icon: 'SandClockIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -20,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'الاستئذانات المعتمدة',
    count: 1.15,
    icon: 'StampIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -21,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'المرفوضة /  والملغاة',
    count: 1.15,
    icon: 'ClipboardIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -22,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
  {
    title: 'كل الاستئذانات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -23,
    key: 'employeeRequests',
    active: true,
    index: 3,
  },
];

export const PermissionData = () => {
  return (
    <div className='py-6'>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
