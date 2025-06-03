"use server"

import type { Indicator } from "@types"

export const getIndicatorsRequests = async (): Promise<Indicator[]> => {
  return IndicatorDummyData
}

const IndicatorDummyData: Indicator[] = [
  {
    id: "1",
    name: "إعداد جلسات تعريفية على النظام",
    isChecked: false,
    targetType: "number",
    targetValue: 50,
    indicatorScale: "مقياس 1",
    achievementSteps: "خطوة 1",
    indicatorWeight: 95,
  },
  {
    id: "2",
    name: "متابعة مؤشرات النظام",
    isChecked: false,
    targetType: "date",
    targetValue: "2025-12-31",
    indicatorScale: "مقياس 2",
    achievementSteps: "خطوة 2",
    indicatorWeight: 5,
  },
]
