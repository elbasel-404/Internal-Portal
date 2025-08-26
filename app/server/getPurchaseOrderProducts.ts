"use server"

import type { PurchaseOrderProduct } from "@types"

export const getPurchaseOrderProducts = async () // id: string,
: Promise<PurchaseOrderProduct[]> => {
  return dummyData
}

const dummyData: PurchaseOrderProduct[] = [
  {
    id: 1,
    category: "أكل",
    name: "ماك بوك برو M1",
    description: "الكمية و السعر",
    quantity: 1000,
    tax: "ضريبة القيمة المضافة 15%",
    unitPrice: 1000,
    completedQuantity: 0,
  },
  {
    id: 2,
    category: "أكل",
    name: "ماك بوك برو M1",
    description: "الكمية و السعر",
    quantity: 1000,
    tax: "ضريبة القيمة المضافة 15%",
    unitPrice: 1000,
    completedQuantity: 0,
  },
]
