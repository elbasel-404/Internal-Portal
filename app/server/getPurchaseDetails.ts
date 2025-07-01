"use server"

import { ResponseSchema } from "@api/schemas/responseSchema"
import { PurchaseDetails } from "@types"
import { getData } from "./getData"
import { getPurchaseProductsByRequestId } from "./getPurchaseProductsByRequestId"

export const getPurchaseDetails = async (
  id: string,
): Promise<PurchaseDetails | void> => {
  const purchaseProducts = await getPurchaseProductsByRequestId(id)
  const result = await getData<PurchaseDetails>({
    url: "api/purchase/request/read/po",
    responseSchema: ResponseSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id || "__"),
          requestDate: String(typedData.date || "__"),
          type: "__",
          requestTitle: "__",
          requestOutcomes: "__",
          projectName: "__",
          programName: "__",
          planType: "__",
          description: "__",
          costs: "__",
          awardAmountBeforeChange: "__",
          awardAmount: "__",
          attachments: [],
          purchaseProducts: [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return { ...result[0], purchaseProducts }
}

const dummyData: PurchaseDetails = {
  id: "1",
  requestDate: "17-04-2024",
  type: "تشغيلي",
  requestTitle: "برامج الابتكار وتبني التقنية",
  requestOutcomes: "تحسين الكفاءة التشغيلية وزيادة التفاعل الرقمي.",
  projectName: "مبادرة التحول الرقمي",
  programName: "برنامج الابتكار الحكومي",
  planType: "خطة سنوية",
  description: 'عملية شراء لتطبيق "سهل+" لتحسين تجربة المستخدم.',
  costs: "250,000 ريال",
  awardAmount: "245,000 ريال",
  awardAmountBeforeChange: "250,000 ريال",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
  purchaseProducts: [],
}
