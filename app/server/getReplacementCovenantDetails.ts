"use server"

import type { ReplacementCovenantDetails } from "@types"
import { getData } from "./getData"
import {
  ResponseSchema,
  ReplacementCovenantListElementSchema,
} from "../../api-schemas"

export const getReplacementCovenantDetails = async (
  id: string,
): Promise<ReplacementCovenantDetails | void> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<ReplacementCovenantDetails>({
    url: "api/po/hr/custody-close/read",
    responseSchema: ResponseSchema,
    dataSchema: ReplacementCovenantListElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: getStringValue(typedData.name),
          date: getStringValue(typedData.close_date),
          pledgeAmount: getStringValue(typedData.close_amount),
          pledgeType:
            getStringValue(typedData.close_type) === "close"
              ? "اقفال"
              : "استعاضة",
          covenantRequestNumber: getStringValue(typedData.custody_id_number),
          covenantPurpose:
            "لتوفير الاعمال والخدمات والنثريات الطارئة الخاصة بخدمات الإدرة العامة للمارفق والخدمات الإدارية",
          covenantAmount: getStringValue(typedData.custody_amount),
          covenantDate: getStringValue(typedData.order_date),
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}
const dummyData: ReplacementCovenantDetails = {
  id: "1",
  date: "2024/15/5",
  pledgeAmount: "500.000",
  pledgeType: "_",
  covenantRequestNumber: "5056",
  covenantPurpose:
    "لتوفير الاعمال والخدمات والنثريات الطارئة الخاصة بخدمات الإدرة العامة للمارفق والخدمات الإدارية",
  covenantAmount: "10000",
  covenantDate: "20/2/2025",
}
