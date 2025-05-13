import { InfoGrid } from '@components';
import { GeneralInfo } from '@types';
import { colors } from '@lib';

const data: GeneralInfo[] = [
  {
    title: 'الطلبات تحت الإجراء',
    count: 1.15,
    icon: 'CalenderSpecialIcon',
    id: -42,
    backgroundColor: colors.light.primaryOpacity,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
    {title: 'الطلبات المعتمدة',
    count: 1.15,
    icon: 'StampIcon',
    id: -43,
    backgroundColor: colors.light.primaryOpacity,
    key: 'employeeRequests',
    active: true,
    index: 1,
  },
  {
    title: 'الطلبات المرفوضة',
    count: 1.15,
    icon: 'ClipboardIcon',
    id: -44,
    backgroundColor: colors.light.primaryOpacity,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
  {
    title: 'كل الطلبات',
    count: 1.15,
    icon: 'ListAlternativeIcon',
    id: -45,
    backgroundColor: colors.light.primaryOpacity,
    key: 'employeeRequests',
    active: true,
    index: 3,
  },
];

export const EvaluationData = () => {
  return <InfoGrid info={data} />;
};
