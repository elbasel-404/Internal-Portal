'use server';

import type { ReplacementCovenantRequest } from '@types';

export const getReplacementCovenantRequests = async (): Promise<
  ReplacementCovenantRequest[]
> => {
  return ReplacementCovenantDummyData;
};

const ReplacementCovenantDummyData: ReplacementCovenantRequest[] = [
  {
    id: '#55465',
    date: '2024-05-05',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'طلب',
  },
  {
    id: '#55466',
    date: '2024-05-06',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'اعتمد',
  },
  {
    id: '#55467',
    date: '2024-05-07',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'مدير عام الإدارة والمشتريات',
  },
  {
    id: '#55468',
    date: '2024-05-08',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'طلب',
  },
  {
    id: '#55469',
    date: '2024-05-09',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'مدير الإدارة المالية',
  },
  {
    id: '#55470',
    date: '2024-05-10',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55471',
    date: '2024-05-11',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'نائب المحافظ',
  },
  {
    id: '#55472',
    date: '2024-05-11',
    pledgeAmount: '1000 ريال سعودي',
    pledgeType: 'عهدة مؤقتة',
    status: 'اعتمد',
  },
];
