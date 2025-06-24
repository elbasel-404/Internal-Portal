"use server"

import type { GoalFlowRequest } from "@types"

export const getFlowGoalsRequests = async (): Promise<GoalFlowRequest[]> => {
  return GoalsDummyData
}

const GoalsDummyData: GoalFlowRequest[] = [
  {
    id: "1",
    individualGoal: "إعداد القوائم المالية",
    goalWeight: "20",
    progressStatus: "متأخر",
    notes: "تم الانتهاء من إعداد القوائم المالية للربع الأول",
    firstCorporateGoal: "تحقيق التميز المؤسسي",
    secondStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    thirdStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    indicators: [
      {
        indicatorPerformance: "إعداد جلسات تعريفية على النظام",
        targetType: "number",
        targetValue: "50",
        indicatorScale: "مقياس 1",
        achievementSteps: "خطوة 1",
        indicatorWeight: "95",
      },
      {
        indicatorPerformance: "متابعة مؤشرات النظام",
        targetType: "date",
        targetValue: "2025-12-31",
        indicatorScale: "مقياس 2",
        achievementSteps: "خطوة 2",
        indicatorWeight: "5",
      },
    ],
  },
  {
    id: "2",
    individualGoal: "تحسين العمليات المحاسبية",
    goalWeight: "30",
    progressStatus: "مؤجل",
    notes: "لا يزال هناك بعض التحسينات المطلوبة في العمليات المحاسبية",
    firstCorporateGoal: "تحقيق التميز المؤسسي",
    secondStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    thirdStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    indicators: [
      {
        indicatorPerformance: "إعداد جلسات تعريفية على النظام",
        targetType: "number",
        targetValue: "50",
        indicatorScale: "مقياس 1",
        achievementSteps: "خطوة 1",
        indicatorWeight: "95",
      },
      {
        indicatorPerformance: "متابعة مؤشرات النظام",
        targetType: "date",
        targetValue: "2025-12-31",
        indicatorScale: "مقياس 2",
        achievementSteps: "خطوة 2",
        indicatorWeight: "5",
      },
    ],
  },
  {
    id: "3",
    individualGoal: "تدريب الفريق على النظام الجديد",
    goalWeight: "40",
    progressStatus: "على المسار",
    notes: "تم تدريب الفريق بنجاح على النظام الجديد",
    firstCorporateGoal: "تحقيق التميز المؤسسي",
    secondStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    thirdStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    indicators: [
      {
        indicatorPerformance: "إعداد جلسات تعريفية على النظام",
        targetType: "number",
        targetValue: "50",
        indicatorScale: "مقياس 1",
        achievementSteps: "خطوة 1",
        indicatorWeight: "95",
      },
      {
        indicatorPerformance: "متابعة مؤشرات النظام",
        targetType: "date",
        targetValue: "2025-12-31",
        indicatorScale: "مقياس 2",
        achievementSteps: "خطوة 2",
        indicatorWeight: "5",
      },
    ],
  },
  {
    id: "4",
    individualGoal: "إعداد التقارير الشهرية",
    goalWeight: "10",
    progressStatus: "متأخر",
    notes: "تم إعداد التقارير الشهرية ولكن هناك بعض البيانات الناقصة",
    firstCorporateGoal: "تحقيق التميز المؤسسي",
    secondStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    thirdStrategicGoal: "تحقيق التميز المؤسسي أعلى مستوى قطاع المنشآت",
    indicators: [
      {
        indicatorPerformance: "إعداد جلسات تعريفية على النظام",
        targetType: "number",
        targetValue: "50",
        indicatorScale: "مقياس 1",
        achievementSteps: "خطوة 1",
        indicatorWeight: "95",
      },
      {
        indicatorPerformance: "متابعة مؤشرات النظام",
        targetType: "date",
        targetValue: "2025-12-31",
        indicatorScale: "مقياس 2",
        achievementSteps: "خطوة 2",
        indicatorWeight: "5",
      },
    ],
  },
]
