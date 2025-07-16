"use server"

import { PurchaseField, PurchaseFieldSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"

export const getPurchaseFields = async (
  field_name: string,
): Promise<PurchaseField[]> => {
  return getData<PurchaseField>({
    url: "api/purchase/request/fields/po",
    additionalBody: { field_name: field_name },
    responseSchema: ResponseSchema,
    dataSchema: PurchaseFieldSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: typedItem.id || "",
          name: typedItem.name || "",
          key: typedItem.key || "",
          value: typedItem.value || "",
        }
      })
    },
    dummyData,
  })
}

const dummyData: PurchaseField[] = [
  {
    id: 5,
    name: "إضافة",
    key: "material",
    value: "‫تشغيلي‬",
  },
  {
    id: 7,
    name: "تحديث",
    key: "project",
    value: "خطة استراتيجية",
  },
  {
    id: 16,
    name: "حذف",
    key: "direct-payment",
    value: "دفعة مباشرة",
  },
]
