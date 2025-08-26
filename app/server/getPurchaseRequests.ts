"use server"

import { PurchaseSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { PurchaseRequest } from "@types"
import { getData } from "./getData"

export const getPurchaseRequests = async (): Promise<PurchaseRequest[]> => {
  return getData<PurchaseRequest>({
    url: "api/purchase/request/read/po",
    responseSchema: ResponseSchema,
    dataSchema: PurchaseSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          date: String(typedItem.date || "__"),
          description: String(typedItem.description),
          costs: String(typedItem.estimated_budget + " " + "ريال سعودي"),
          submissionMechanism: "__",
          status: String(typedItem.state || "__"),
        }
      })
    },
    dummyData: PurchaseDummyData,
  })
}

const PurchaseDummyData: PurchaseRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "اتفاقية طارئة",
    status: "اتفاقية شراء",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "عامة",
    status: "تحت الطرح",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "اتفاقية طارئة",
    status: "التحليل الفني",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "اتفاقية طارئة",
    status: "اتفاقية شراء",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "محدودة",
    status: "مدقق مالي",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "اتفاقية طارئة",
    status: "مدير الإدارة المالية",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "شراء مباشر",
    status: "الترسية و التعميد",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    description: "تجربة طلب شراء",
    costs: "1000 ريال سعودي",
    submissionMechanism: "عامة",
    status: "إدارة العقود والمشتريات",
  },
]
