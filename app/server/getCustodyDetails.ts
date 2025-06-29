"use server"

import { CustodyElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { CustodyDetails } from "@types"
import { getData } from "./getData"

export const getCustodyDetails = async (
  id: string,
): Promise<CustodyDetails | void> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<CustodyDetails>({
    url: "api/po/hr/custody",
    responseSchema: ResponseSchema,
    dataSchema: CustodyElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: getStringValue(typedData.id),
          date: getStringValue(typedData.create_date),
          custodyAmount:
            getStringValue(typedData.custody_amount) + " " + "ريال سعودي",
          custodyType: getStringValue(typedData.custody_type),
          custodyPurpose: getStringValue(typedData.custody_reason),
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}

const dummyData: CustodyDetails = {
  id: "1",
  date: "2024-15-05",
  custodyAmount: "5000 ريال سعودي",
  custodyType: "عهدة مؤقتة",
  custodyPurpose:
    "لتوفير الاعمال والخدمات والنثريات الطارئة الخاصة بخدمات الإدرة العامة للمارفق والخدمات الإدارية",
}
