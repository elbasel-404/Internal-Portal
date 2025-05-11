import { InfoGrid } from '@components';
import { colors } from '@lib';
import type { GeneralInfo } from '@types';

const data: GeneralInfo[] = [
  {
    title: 'التوظيفات تحت الإجراء',
    count: 1.15,
    icon: 'SandClockIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -140,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'التوظيفات المعتمدة',
    count: 1.15,
    icon: 'StampIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -141,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'التوظيفات المرفوضة',
    count: 1.15,
    icon: 'ClipboardIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -142,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
  {
    title: 'كل التوظيفات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -143,
    key: 'employeeRequests',
    active: true,
    index: 3,
  },
];

export const JobApplicationsData = () => {
  return (
    <div className='py-6'>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
