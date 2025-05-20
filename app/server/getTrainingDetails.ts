'use server';

import type { TrainingDetails } from '@types';

export const getTrainingDetails = async (
  id: string
): Promise<TrainingDetails | void> => {
  const trainingDetails: TrainingDetails = {
    id: '15',
    courseName: 'دورة تدريبية في تطوير البرمجيات',
    courseDate: 'من 17-04-2024 إلى 17-04-2024',
    courseValue: '5000 ريال',
    employeeName: 'أحمد محمد',
    jobNumber: '12345',
    jobTitle: 'مهندس برمجيات',
    sector: 'تكنولوجيا المعلومات',
    requestDate: '2024-01-15',
    directWorkData: 'بيانات العمل المباشرة',
    mandateAllowance: 'بدل التفويض',
    mechanismConvening: 'آلية الانعقاد',
    transcationDate: '2024-01-20',
    status: 'قيد المراجعة',
    duration: '3 أيام',
    trainingCenter: 'أكاديمية الاستثمار',
    courseProgram: 'البرنامج التدريبي',
    attachments: [
      new File([''], 'نموذج طلب 5.pdf'),
      new File([''], 'نموذج طلب 6.pdf'),
    ],
  };
  return { ...trainingDetails, id };
};
