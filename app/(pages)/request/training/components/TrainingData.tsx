import { InfoGrid } from '@components';
import { colors } from '@lib';
import type { GeneralInfo } from '@types';

const data: GeneralInfo[] = [
  {
    title: 'الدورات تحت الإجراء',
    count: 1.15,
    icon: 'CalenderSpecialIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -230,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'الدورات المعتمدة',
    count: 1.15,
    icon: 'StampIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -231,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'الدورات المرفوضة',
    count: 1.15,
    icon: 'ClipboardIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -232,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'كل الدورات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -234,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
];

export const TrainingData = () => {
  return (
    <div>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
