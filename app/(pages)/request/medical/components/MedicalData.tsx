import { InfoGrid } from '@components';
import { colors } from '@lib';
import type { GeneralInfo } from '@types';

const data: GeneralInfo[] = [
  {
    title: 'التأمينات تحت الإجراء',
    count: 1.15,
    icon: 'SandClockIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -90,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'التأمينات المعتمدة',
    count: 1.15,
    icon: 'StampIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -91,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'المرفوضة / الملغاة',
    count: 1.15,
    icon: 'ClipboardIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -92,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
  {
    title: 'كل التأمينات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -93,
    key: 'employeeRequests',
    active: true,
    index: 3,
  },
];

export const MedicalData = () => {
  return (
    <div className='py-6'>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
