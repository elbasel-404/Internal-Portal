'use server';

import type { GoalRequest } from '@types';

export const getGoalsRequests = async (): Promise<GoalRequest[]> => {
  return GoalsDummyData;
};

const GoalsDummyData: GoalRequest[] = [
  {
    id: '1',
    individualGoal: 'إعداد القوائم المالية',
    indicators: [
      {
        indicatorPerformance: 'إعداد جلسات تعريفية على النظام',
        targetType: 'number',
        targetValue: '50',
        indicatorScale: 'مقياس 1',
        achievementSteps: 'خطوة 1',
        indicatorWeight: '95',
      },
      {
        indicatorPerformance: 'متابعة مؤشرات النظام',
        targetType: 'date',
        targetValue: '2025-12-31',
        indicatorScale: 'مقياس 2',
        achievementSteps: 'خطوة 2',
        indicatorWeight: '5',
      },
    ],
    goalWeight: '60',
    firstCorporateGoal: 'تحقيق التميز المؤسسي',
    secondStrategicGoal: 'تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت',
    thirdStrategicGoal: 'تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت',
  },
];
