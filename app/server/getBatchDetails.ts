"use server"

import { BatchDetails } from "@types"

export const getBatchDetails = async (
  id: string /* _id: string, */, // Parameter not used
): Promise<BatchDetails | void> => {
  return { ...dummyData }
}

const dummyData: BatchDetails = {
  id: "1",
  batchName: "الدفعة الأولى",
  paymentDate: "24-10-2025",
  notes: "ملاحظات",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
