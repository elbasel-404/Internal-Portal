"use server"

import { OvertimeAssignmentDetails } from "@types"

export const getOvertimeAssignmentDetails = async (
  id: string,
): Promise<OvertimeAssignmentDetails | void> => {
  try {
    const details: OvertimeAssignmentDetails = {
      id,
      applicant: "خالد إبراهيم",
      fromDate: "2024-03-05 15:00",
      toDate: "2024-03-05 19:00",
      hours: "4",
      assignmentDescription: "التفاوض مع الموردين وتحديث العقود",
    }
    return details
  } catch (error) {
    console.error("Error in getOvertimeAssignmentDetails:", error)
    return
  }
}
