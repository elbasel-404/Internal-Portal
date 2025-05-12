'use server';

import { RecommendationDetails } from '@types';

export const getRecommendationDetails = async (
  id: string
): Promise<RecommendationDetails | void> => {
  try {
    const details: RecommendationDetails = {
      id,
      recommendationDate: '17-04-2024',
      city: 'الرياض',
      cycle: 'دورة القيادة الإدارية',
      cycleCost: '5000 ريال',
      cycleDate: '01-05-2024',
      cycleProgram: 'برنامج تطوير المهارات الإدارية',
      degree: 'بكالوريوس إدارة أعمال',
      duration: '5 أيام',
      employee: 'حمد بن يوسف القشميط',
      jobNumber: '123456',
      jobTitle: 'مدير مشاريع',
      management: 'إدارة التخطيط الاستراتيجي',
      trainingCenter: 'مركز تدريب القيادة',
      type: 'تطوير مهني',
    };
    return details;
  } catch (error) {
    console.error('Error in getRecommendationDetails:', error);
    return;
  }
};
