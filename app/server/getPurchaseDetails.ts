"use server"

import { PurchaseSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { PurchaseDetails, PurchasePayments, PurchaseProduct } from "@types"
import { getData } from "./getData"

export const getPurchaseDetails = async (
  id: string,
): Promise<PurchaseDetails | void> => {
  const purchaseType = (type: string) => {
    if (type === "material") return "تشغيلي"
    else if (type === "project") return "الخطة الاستراتيجية"
    else return "دفعة مباشرة"
  }
  const result = await getData<PurchaseDetails>({
    url: "api/purchase/request/read/po",
    responseSchema: ResponseSchema,
    dataSchema: PurchaseSchema,
    includeEmployeeId: false,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id || "__"),
          requestDate: String(typedData.date || "__"),
          type: purchaseType(String(typedData.type)),
          requestTitle: String(typedData.request_title || "__"),
          requestOutcomes: String(typedData.note || "__"),
          projectName: Array.isArray(typedData.purchase_program_id)
            ? String(typedData.purchase_program_id[1] || "__")
            : "__",
          programName: Array.isArray(typedData.purchase_initiative_id)
            ? String(typedData.purchase_initiative_id[1] || "__")
            : "__",
          planType: Array.isArray(typedData.strategic_plan_type_id)
            ? String(typedData.strategic_plan_type_id[1] || "__")
            : "__",
          paymentType: Array.isArray(typedData.direct_payment_type_id)
            ? String(typedData.direct_payment_type_id[1] || "__")
            : "__",
          payment_partner: Array.isArray(typedData.payment_partner_id)
            ? String(typedData.payment_partner_id[1] || "__")
            : "__",
          description: String(typedData.description || "__"),
          totalAmount: String(typedData.estimated_budget + " " + "ريال سعودي"),
          awardAmountBeforeChange: "__",
          awardAmount: String(typedData.award_amount + " " + "ريال سعودي"),
          attachments: Array.isArray(typedData.attachment_ids)
            ? typedData.attachment_ids.map(
                (file) => new File([""], String(file)),
              )
            : [],
          purchaseProducts: Array.isArray(typedData.products)
            ? (typedData.products as PurchaseProduct[])
            : [],
          payments: Array.isArray(typedData.payments)
            ? (typedData.payments as PurchasePayments[])
            : [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
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
  paymentType: "فواتير الخدمات",
  payment_partner: "أعضاء اللجنة التنفيذية لمجلس ادارة منشآت",
  description: 'عملية شراء لتطبيق "سهل+" لتحسين تجربة المستخدم.',
  totalAmount: "250,000 ريال",
  awardAmount: "245,000 ريال",
  awardAmountBeforeChange: "250,000 ريال",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
  purchaseProducts: [],
  payments: [],
}
