"use server"

import { WorkDocumentDetails } from "@types"

export const getWorkDocumentDetails = async (
  id: string,
): Promise<WorkDocumentDetails | void> => {
  try {
    const details: WorkDocumentDetails = {
      id,
      requestType: "تحديث",
      requestDate: "2024-11-03",
      documentType: "تعليمات وارشادات",
      documentAddress: "pop",
      target: "inht",
      employee: "[1762] عساف بن رشود الصاعدي",
      sector: "خدمات المنشآت",
      management:
        "خدمات المنشآت / التقنية والحلول الرقمية / تقنية المعلومات / الأنظمة الداخلية",
      status: "اعتمد",
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
