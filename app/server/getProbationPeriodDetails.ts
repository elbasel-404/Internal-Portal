'use server';

import type { ProbationPeriodDetails } from '@types';

export const getProbationPeriodDetails = async (
  // !It will be used for integration
  // id: string
): Promise<ProbationPeriodDetails | void> => {
  const probationPeriodDetails: ProbationPeriodDetails = {
    employeeName: '[1651] عبدالله بن حسين الجفري',
    jobNumber: '[1651]',
    jobTitle: 'أخصائي تطوير تنظيمي أول',
    management:
      'الخدمات المشتركة/الموارد البشرية/تطوير الموارد البشرية/التطوير التنظيمي',
    appointmentDate: '02-08-2023',
    endProbationPeriodDate: '02-08-2025',
    recommendation: 'اجتياز فترة التجربة',
    notes: 'ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ',
    attachments: [
      new File([''], 'نموذج طلب 2 .pdf'),
      new File([''], 'نموذج طلب .pdf'),
    ],
  };
  return { ...probationPeriodDetails };
};
