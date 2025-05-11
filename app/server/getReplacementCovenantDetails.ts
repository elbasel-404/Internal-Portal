'use server';

import type { ReplacementCovenantDetails } from '@types';

export const getReplacementCovenantDetails = async (
  id: string
): Promise<ReplacementCovenantDetails | void> => {
  const replacementCovenantDetails: ReplacementCovenantDetails = {
    id: '1',
    date: '2024/15/5',
    pledgeAmount: '500.000',
    pledgeType: '__',
    covenantRequestNumber: 5056,
    covenantPurpose:
      'لتوفير الاعمال والخدمات والنثريات الطارئة الخاصة بخدمات الإدرة العامة للمارفق والخدمات الإدارية',
    covenantAmount: '10000',
    covenantDate: '20/2/2025',
  };
  return { ...replacementCovenantDetails, id };
};
