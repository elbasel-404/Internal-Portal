"use server"

import type { EvaluationGoalDetails } from "@types"

export const getEvaluationGoalDetails = async (
  id: string,
): Promise<EvaluationGoalDetails | void> => {
  const evaluationGoalDetails: EvaluationGoalDetails = {
    id: "1",
    employee: "حمد بن يوسف",
    year: "2025",
  }
  return { ...evaluationGoalDetails, id }
}
