'use server';

import type { TrialPeriodDetails } from '@types';

export const getTrialPeriodDetails = async (
  // !It will be used for integration
  // id: string
): Promise<TrialPeriodDetails | void> => {
  const trialPeriodDetails: TrialPeriodDetails = {
    employeeName: '[1651] عبدالله بن حسين الجفري',
    jobNumber: '[1651]',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    management:
      'الخدمات المشتركة/الموارد البشرية/تطوير الموارد البشرية/التطوير التنظيمي',
    appointmentDate: '02-08-2023',
    endTrialPeriodDate: '02-08-2025',
    recommendation: 'اجتياز فترة التجربة',
    notes: 'ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ',
    attachments: [
      new File([''], 'نموذج طلب 2 .pdf'),
      new File([''], 'نموذج طلب .pdf'),
    ],
  };
  return { ...trialPeriodDetails };
};
