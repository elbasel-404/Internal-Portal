"use server"

import { ResignationDetails } from "@types"

export const getResignationDetails = async (
  id: string,
): Promise<ResignationDetails | void> => {
  try {
    const details: ResignationDetails = {
      id,
      requestType: "استقالة",
      requestDate: "2024-11-03",
      lastWorkingDate: "2025-06-01",
      resignationReason: "فرصة وظيفة أفضل",
      attachments: [
        new File([""], "نموذج طلب 2 .pdf"),
        new File([""], "نموذج طلب .pdf"),
      ],
    }
    return details
  } catch (error) {
    return
  }
}
