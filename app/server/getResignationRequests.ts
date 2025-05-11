'use server';

import type { ResignationRequest } from '@types';

export const getResignationRequests = async (): Promise<
  ResignationRequest[]
> => {
  return ResignationDummyData;
};

const ResignationDummyData: ResignationRequest[] = [
  {
    id: '#55465',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'استقالة',
    status: 'تحت الإجراء',
  },
  {
    id: '#53965',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'عدم تجديد العقد',
    status: 'تحت الإجراء',
  },
  {
    id: '#57965',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'تقاعد',
    status: 'تحت الإجراء',
  },
  {
    id: '#52965',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'استقالة',
    status: 'تحت الإجراء',
  },
  {
    id: '#55955',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'تقاعد',
    status: 'تحت الإجراء',
  },
  {
    id: '#54965',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'عدم تجديد العقد',
    status: 'تحت الإجراء',
  },
  {
    id: '#55968',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'استقالة',
    status: 'تحت الإجراء',
  },
  {
    id: '#55645',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'تقاعد',
    status: 'تحت الإجراء',
  },
  {
    id: '#55974',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'استقالة',
    status: 'تحت الإجراء',
  },
  {
    id: '#51965',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'عدم تجديد العقد',
    status: 'تحت الإجراء',
  },
  {
    id: '#51265',
    requestDate: '2024-05-05',
    lastWorkingDate: '2025-06-01',
    requestType: 'استقالة',
    status: 'تحت الإجراء',
  },
];
