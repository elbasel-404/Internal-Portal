'use server';

import type { SupplierEvaluationRequest } from '@types';

export const getSupplierEvaluationRequests = async (): Promise<
  SupplierEvaluationRequest[]
> => {
  return SupplierEvaluationData;
};

const SupplierEvaluationData: SupplierEvaluationRequest[] = [
  {
    id: '#55460',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'المدير المباشر',
  },
  {
    id: '#55461',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'الموظف',
  },
  {
    id: '#55462',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'الموظف',
  },
  {
    id: '#55463',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'الموظف',
  },
  {
    id: '#55464',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'الموظف',
  },
  {
    id: '#55465',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'مدير القطاع',
  },
  {
    id: '#55466',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'اعتمد',
  },
  {
    id: '#55467',
    date: '2024-05-05 - 04:30:00',
    employee: '(1762) عساف بن رشود الصاعدي',
    contract: '2025-077',
    status: 'مرفوض',
  },
];
