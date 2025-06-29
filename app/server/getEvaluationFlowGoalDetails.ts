"use server"

import type { EvaluationFlowGoalDetails } from "@types"

export const getEvaluationFlowGoalDetails = async (
  id: string,
): Promise<EvaluationFlowGoalDetails | void> => {
  const evaluationFlowGoalDetails: EvaluationFlowGoalDetails = {
    id: "1",
    employee: "حمد بن يوسف",
    year: "2025",
    evaluationFlowType: "المتابعة الشخصية",
    evaluationRequestNumber: "12568",
  }
  return { ...evaluationFlowGoalDetails, id }
}
