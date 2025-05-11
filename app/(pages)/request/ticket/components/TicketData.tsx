import { InfoGrid } from '@components';
import { colors } from '@lib';
import type { GeneralInfo } from '@types';

const data: GeneralInfo[] = [
  {
    title: 'التذاكر المفتوحة',
    count: 20,
    icon: 'PriceIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -160,
    key: 'employeeRequests',
    active: true,
    index: 0,
  },
  {
    title: 'التذاكر المغلقة',
    count: 30,
    icon: 'TagWithXIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -161,
    key: 'employeeRequests',
    active: true,
    index: 2,
  },
  {
    title: 'كل التذاكر',
    count: 50,
    icon: 'ListAlternativeIcon',
    backgroundColor: colors.light.primaryOpacity,
    id: -162,
    key: 'employeeRequests',
    active: true,
    index: 3,
  },
];

export const TicketData = () => {
  return (
    <div>
      <InfoGrid info={data} className='lg:grid-cols-2' />
    </div>
  );
};
