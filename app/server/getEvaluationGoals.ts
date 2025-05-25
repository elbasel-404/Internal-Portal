'use server';

import type { EvaluationGoal } from '@types';

export const getEvaluationGoals = async (): Promise<
  EvaluationGoal[]
> => {
  return EvaluationGoalsDummyData;
};

const EvaluationGoalsDummyData: EvaluationGoal[] = [
  { id: '#10011', requestDate: "2021 - 01 - 01", year: "2021", status: "طلب" },
  { id: '#10012', requestDate: "2022 - 01 - 01", year: "2022", status: "المدير المباشر" },
  { id: '#10013', requestDate: "2023 - 01 - 01", year: "2023", status: "مدير القطاع" },
  { id: '#10014', requestDate: "2024 - 01 - 01", year: "2024", status: "عمليات الموارد البشرية" },
  { id: '#10015', requestDate: "2025 - 01 - 01", year: "2025", status: "معتمد وتم الصرف" },
  { id: '#10016', requestDate: "2026 - 01 - 01", year: "2026", status: "معتمد" },
  { id: '#10018', requestDate: "2028 - 01 - 01", year: "2028", status: "طلب" },
  { id: '#10019', requestDate: "2029 - 01 - 01", year: "2029", status: "طلب" },
  { id: '#10020', requestDate: "2030 - 01 - 01", year: "2030", status: "طلب" },
];
