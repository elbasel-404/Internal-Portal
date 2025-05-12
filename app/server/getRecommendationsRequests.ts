'use server';

import type { RecommendationRequest } from '@types';

export const getRecommendationsRequests = async (): Promise<
  RecommendationRequest[]
> => {
  return RecommendationsDummyData;
};

const RecommendationsDummyData: RecommendationRequest[] = [
  {
    id: '#55465',
    date: '2024-05-05',
    type: 'محلي',
    cycle: 'طلب دورة جماعية من النظام',
    startDate: '2024-06-01',
    endDate: '2024-06-15',
    status: 'اعتمد',
  },
  {
    id: '#55466',
    date: '2024-05-06',
    type: 'دولي',
    cycle: 'دورة تدريب خارجية',
    startDate: '2024-06-05',
    endDate: '2024-06-20',
    status: 'المدير المباشر',
  },
  {
    id: '#55467',
    date: '2024-05-07',
    type: 'محلي',
    cycle: 'دورة تخصصية',
    startDate: '2024-06-10',
    endDate: '2024-06-25',
    status: 'مدير عام الموارد البشرية',
  },
  {
    id: '#55468',
    date: '2024-05-08',
    type: 'محلي',
    cycle: 'طلب تطوير مهارات',
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    status: 'اعتمد',
  },
  {
    id: '#55469',
    date: '2024-05-09',
    type: 'دولي',
    cycle: 'مؤتمر خارجي',
    startDate: '2024-07-01',
    endDate: '2024-07-10',
    status: 'المدير المباشر',
  },
  {
    id: '#55470',
    date: '2024-05-10',
    type: 'محلي',
    cycle: 'دورة داخلية',
    startDate: '2024-07-05',
    endDate: '2024-07-15',
    status: 'اعتمد',
  },
  {
    id: '#55471',
    date: '2024-05-11',
    type: 'محلي',
    cycle: 'تدريب ميداني',
    startDate: '2024-07-10',
    endDate: '2024-07-25',
    status: 'المدير المباشر',
  },
  {
    id: '#55472',
    date: '2024-05-11',
    type: 'دولي',
    cycle: 'ورشة عمل دولية',
    startDate: '2024-07-20',
    endDate: '2024-08-05',
    status: 'اعتمد',
  },
];
