'use server';

import type { EmployeeMembersDetails } from '@types';

export const getEmployeeMembersDetails = async (
  id: string
): Promise<EmployeeMembersDetails | void> => {
  const employeeMembersDetails: EmployeeMembersDetails = {
    id: '1',
    date: '2024-05-05',
    requestType: 'اضافة',
    relation: 'أب',
    nameAr: 'يوسف حمد عبد الله القشيمط',
    nameEn: 'youssef Hamad Abdullah Alqushaymit',
    idNumber: '10326569',
    birthDate: '2024-05-05 ',
    attachments: [
      new File([''], 'نموذج طلب 2 .pdf'),
      new File([''], 'نموذج طلب .pdf'),
    ],
  };
  return { ...employeeMembersDetails, id };
};
