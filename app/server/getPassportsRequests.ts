'use server';

import type { PassportRequest } from '@types';

export const getPassportRequests = async (): Promise<PassportRequest[]> => {
  return PassportDummyData;
};

const PassportDummyData: PassportRequest[] = [
  {
    id: '#55465',
    date: '2024-05-05',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'طلب',
  },
  {
    id: '#55466',
    date: '2024-05-06',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'المدير المباشر',
  },
  {
    id: '#55467',
    date: '2024-05-07',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55468',
    date: '2024-05-08',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'طلب',
  },
  {
    id: '#55469',
    date: '2024-05-09',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'المدير المباشر',
  },
  {
    id: '#55470',
    date: '2024-05-10',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55471',
    date: '2024-05-11',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'المدير المباشر',
  },
  {
    id: '#55472',
    date: '2024-05-11',
    passportNumber: 'P975101',
    passportExpireDate: '2025-5-15',
    status: 'عمليات الموارد البشرية',
  },
];
