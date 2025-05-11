import { InfoGrid } from '@components';
import { colors } from '@lib';
import type { GeneralInfo } from '@types';

const data: GeneralInfo[] = [
  {
    title: 'الطلبات تحت الإجراء',
    count: 1.15,
    icon: 'SandClockIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -180,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'الطلبات المعتمدة',
    count: 1.15,
    icon: 'StampIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -181,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'الطلبات المرفوضة',
    count: 1.15,
    icon: 'ClipboardIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -182,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
  {
    title: 'كل الطلبات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -183,
    key: 'employeeRequests',
    active: true,
    index: 3,
  },
];

export const OvertimeAssignmentData = () => {
  return (
    <div className='py-6'>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
