"use server"

import { BatchProductSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { PurchaseProduct } from "@types"
import { getData } from "./getData"

export const getPurchaseProductsByRequestId = async (
  id: string,
): Promise<PurchaseProduct[]> => {
  return getData<PurchaseProduct>({
    url: "api/purchase/products/data/read/po",
    includeEmployeeId: false,
    additionalBody: { id },
    responseSchema: ResponseSchema,
    dataSchema: BatchProductSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        console.log(item)
        const typedItem = item as Record<string, string>
        return {
          id: String(typedItem.product_id[0] ?? ""),
          product: typedItem.product_id[1] ?? "",
          description: String(typedItem.name ?? ""),
          quantity: String(typedItem.product_qty ?? ""),
          completedQuantity: String(typedItem.quantity_completed ?? ""),
          completedCost: String(typedItem.amount_completed ?? ""),
          underCompletedQauntity: String(
            typedItem.quantity_under_completed ?? "",
          ),
          remainingQuantity: String(typedItem.quantity_remain ?? ""),
          remainingCost: String(typedItem.amount_quantity_remain ?? ""),
          unitPrice: String(typedItem.price_unit ?? ""),
          unitPriceWithTax: String(typedItem.unit_price_after_tax ?? ""),
          subtotal: String(typedItem.price_subtotal ?? ""),
          subtotalWithTax: "",
        }
      })
    },
    dummyData,
  })
}

const dummyData: PurchaseProduct[] = [
  {
    id: "1",
    product: "لوحة مفاتيح ميكانيكية",
    description: "لوحة مفاتيح ميكانيكية للأعمال المكتبية",
    quantity: "15",
    completedQuantity: "10",
    completedCost: "3000",
    underCompletedQauntity: "2",
    remainingQuantity: "3",
    remainingCost: "900",
    unitPrice: "300",
    unitPriceWithTax: "345",
    subtotal: "4500",
    subtotalWithTax: "5175",
  },
  {
    id: "2",
    product: "ماوس لاسلكي Logitech",
    description: "ماوس دقيق للاستخدام المكتبي",
    quantity: "20",
    completedQuantity: "18",
    completedCost: "1800",
    underCompletedQauntity: "1",
    remainingQuantity: "1",
    remainingCost: "100",
    unitPrice: "100",
    unitPriceWithTax: "115",
    subtotal: "2000",
    subtotalWithTax: "2300",
  },
]
