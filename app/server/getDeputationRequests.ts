'use server';

import type { DeputationRequest } from '@types';

export const getDeputationRequests = async (): Promise<
  DeputationRequest[]
> => {
  return DeputationRequestsDummyData;
};

const DeputationRequestsDummyData: DeputationRequest[] = [
  {
    id: '#55465',
    employee: 'أحمد علي',
    management: 'إدارة تقنية المعلومات',
    sector: 'خدمات منشآت',
    requestType: 'إصدار',
    documentType: 'إجراءات عمل',
    documentCode: '58464',
    status: 'طلب',
  },
  {
    id: '#55466',
    employee: 'محمد خالد',
    management: 'إدارة الموارد البشرية',
    sector: 'خدمات منشآت',
    requestType: 'تحديث',
    documentType: 'إجراءات عمل',
    documentCode: '48665',
    status: 'اعتمد',
  },
  {
    id: '#55467',
    employee: 'سارة محمود',
    management: 'إدارة المالية',
    sector: 'خدمات منشآت',
    requestType: 'إصدار',
    documentType: 'إجراءات عمل',
    documentCode: '78465',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55468',
    employee: 'يوسف حسن',
    management: 'إدارة تقنية المعلومات',
    sector: 'خدمات منشآت',
    requestType: 'إصدار',
    documentType: 'إجراءات عمل',
    documentCode: '84685',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55469',
    employee: 'نورا عبد الله',
    management: 'إدارة التسويق',
    sector: 'خدمات منشآت',
    requestType: 'تحديث',
    documentType: 'إجراءات عمل',
    documentCode: '15456',
    status: 'اعتمد',
  },
  {
    id: '#55470',
    employee: 'خالد إبراهيم',
    management: 'إدارة المشتريات',
    sector: 'خدمات منشآت',
    requestType: 'إصدار',
    documentType: 'إجراءات عمل',
    documentCode: '64585',
    status: 'عمليات الموارد البشرية',
  },
  {
    id: '#55471',
    employee: 'ليلى حسن',
    management: 'إدارة تقنية المعلومات',
    sector: 'خدمات منشآت',
    requestType: 'تحديث',
    documentType: 'إجراءات عمل',
    documentCode: '98457',
    status: 'اعتمد',
  },
  {
    id: '#55472',
    employee: 'سالم فهد',
    management: 'إدارة العمليات',
    sector: 'خدمات منشآت',
    requestType: 'إصدار',
    documentType: 'إجراءات عمل',
    documentCode: '84663',
    status: 'عمليات الموارد البشرية',
  },
];
