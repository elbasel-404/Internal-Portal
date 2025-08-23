"use server"

import type { ChangeContractDetails } from "@types"

export const getChangeContractDetails = async (
  id: string,
): Promise<ChangeContractDetails | void> => {
  const dummyData: ChangeContractDetails = {
    requestChangeId: id,
    requestDate: "2024-11-03",
    purchaseOrderNumber: "#12345",
    competitionName: "منافسة 1",
    awardAmount: "1000 ريال سعودي",
    applicantName: "أحمد محمد",
    changeJustification:
      "تغيير في مواصفات المنتج المطلوب بسبب تحديثات من المورد.",
    proposedChanges: "زيادة الكمية المطلوبة من 100 إلى 150 وحدة.",
    changeType: [
      { name: "طلب زيادة", checked: true },
      { name: "طلب تخفيض", checked: true },
      { name: "طلب تغيير المدة", checked: false },
    ],
    newItem: [
      { name: "نعم", checked: true },
      { name: "لا", checked: false },
    ],
    periodExtensionOrReduction: [
      { name: "نعم", checked: true },
      { name: "لا", checked: false },
    ],
    contractExpirationDate: "2024-12-31",
    increaseAmount: "500 ريال سعودي",
    increasePercentage: "50%",
    reductionAmount: "0 ريال سعودي",
    reductionPercentage: "0%",
    commpletionRate: "75%",
    refuseReason: "لا يوجد",
    productsBeforeChange: [
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
    productsAfterChange: [
      {
        id: "1",
        classification: "إلكترونيات",
        itemName: "حاسوب محمول",
        description: "حاسوب محمول بمواصفات متوسطة",
        quantity: "150",
        unitPrice: "1000 ريال سعودي",
        tax: "15%",
        totalAfterTax: "172,500 ريال سعودي",
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
    attachments: [new File([""], "مستند التغيير.pdf")],
  }
  return dummyData
}
