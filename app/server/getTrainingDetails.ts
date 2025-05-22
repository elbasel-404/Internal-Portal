'use server';

import type { TrainingDetails } from '@types';

export const getTrainingDetails = async (
  id: string
): Promise<TrainingDetails | void> => {
  const trainingDetails: TrainingDetails = {
    id: '15',
    courseValue: '5000 ريال',
    employeeName: 'أحمد محمد',
    jobNumber: '12345',
    jobTitle: 'مهندس برمجيات',
    sector: 'تكنولوجيا المعلومات',
    requestDate: '2024-01-15',
    mandateAllowance: 'بدل التفويض',
    mechanismConvening: 'دولي (خارج المملكة)',
    transcationDate: '2024-01-20',
    status: 'قيد المراجعة',
    duration: '5 أيام',
    trainingCenter: 'المركز الوطني للتدريب',
    courseProgram: 'برنامج الدورة',
    trainingType: 'شهادة احترافية',
    trainingName: 'دورة في تطوير البرمجيات',
    trainingMethod: ['اختبار', 'تدريب', 'محاكاة', 'مواد دراسية'],
    trainingStartDate: '2024-10-20',
    trainingEndDate: '2024-10-30',
    country: 'الإمارات العربية المتحدة',
    city: 'دبي',
    travelDays: '1 يوم',
    trainingStartBefore: 'قبل بداية التدريب',
    trainingEmployee: 'عساف بن رشود الطعمي',
    attachments: [
      new File([''], 'نموذج طلب 5.pdf'),
      new File([''], 'نموذج طلب 6.pdf'),
    ],
    trainingSchedule: [
      {
        id: '1',
        trainingDate: '2024-10-20 / 2024-10-30',
        durationWithDays: '5 أيام',
        travelDays: '1 يوم',
        travelDateSettings: 'قبل بداية التدريب',
        travelDateForTraining: '2024-10-20',
        travelDateForReturn: '2024-10-30',
      },
      {
        id: '2',
        trainingDate: '2024-10-14 / 2024-10-28',
        durationWithDays: '8 أيام',
        travelDays: '2 يوم',
        travelDateSettings: 'بعد بداية التدريب',
        travelDateForTraining: '2024-10-14',
        travelDateForReturn: '2024-10-28',
      },
    ],
  };
  return { ...trainingDetails, id };
};
