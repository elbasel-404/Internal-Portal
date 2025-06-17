"use server"

import { OvertimeConfirmDetails } from "@types"

export const getOvertimeConfirmDetails = async (
  id: string,
): Promise<OvertimeConfirmDetails | void> => {
  try {
    const details: OvertimeConfirmDetails = {
      id,
      applicant: "خالد إبراهيم",
      management: "إدارة تقنية المعلومات",
      overTimeDuration: "5.0",
      assignmentNumber: "7080",
    }
    return details
  } catch (error) {
    return
  }
}
