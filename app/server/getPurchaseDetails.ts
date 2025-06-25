"use server"

import { PurchaseDetails } from "@types"
import { getPurchaseProductsByRequestId } from "./getPurchaseProductsByRequestId"

export const getPurchaseDetails = async (
  id: string,
): Promise<PurchaseDetails | void> => {
  const purchaseProducts = await getPurchaseProductsByRequestId(id)
  return { ...dummyData, purchaseProducts }
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
