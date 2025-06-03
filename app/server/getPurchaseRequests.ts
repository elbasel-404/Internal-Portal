"use server"

import type { PurchaseRequest } from "@types"

export const getPurchaseRequests = async (): Promise<PurchaseRequest[]> => {
  return PurchaseDummyData
}

const PurchaseDummyData: PurchaseRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "اتفاقية طارئة",
    status: "اتفاقية شراء",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "عامة",
    status: "تحت الطرح",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "اتفاقية طارئة",
    status: "التحليل الفني",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "اتفاقية طارئة",
    status: "اتفاقية شراء",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "محدودة",
    status: "مدقق مالي",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "اتفاقية طارئة",
    status: "مدير الإدارة المالية",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "شراء مباشر",
    status: "الترسية و التعميد",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    costs: "1000 ريال سعودي",
    description: "تجربة طلب شراء",
    submissionMechanism: "عامة",
    status: "إدارة العقود والمشتريات",
  },
]
