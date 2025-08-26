"use server"

import type { PurchaseOrderDetails } from "@types"

export const getPurchaseOrderDetails = async (
  id: string,
): Promise<PurchaseOrderDetails | void> => {
  const dummyData: PurchaseOrderDetails = {
    purchaseRequestId: id,
    purchaseOrderNumber: "PO-55465",
    contractNumber: "C-55465",
    contractDuration: "6 أشهر",
    contractEndDate: "2024-11-05",
    contractStartDate: "2024-05-05",
    contractType: "اتفاقية شراء",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    initiativeName: "مبادرة 1",
    awardAmount: "1000 ريال سعودي",
    planType: "تشغيلي",
    products: [
      {
        id: "1",
        classification: "إلكترونيات",
        itemName: "حاسوب محمول",
        description: "حاسوب محمول بمواصفات متوسطة",
        quantity: "100",
        unitPrice: "1000 ريال سعودي",
        tax: "15%",
        totalAfterTax: "115,000 ريال سعودي",
      },
      {
        id: "2",
        classification: "إلكترونيات",
        itemName: "هاتف ذكي",
        description: "هاتف ذكي بمواصفات عالية",
        quantity: "50",
        unitPrice: "2000 ريال سعودي",
        tax: "15%",
        totalAfterTax: "115,000 ريال سعودي",
      },
    ],
    totalAmount: "230,000 ريال سعودي",
    purchaseRequestDate: "2024-05-05",
    programName: "برنامج 1",
    remainingAmount: "500 ريال سعودي",
    requestAddress: "الرياض، السعودية",
    requestOutcomes: "تحسين الكفاءة التشغيلية",
    resourceName: "المورد 1",
    spentAmount: "500 ريال سعودي",
    type: "شراء معدات",
  }
  return dummyData
}
