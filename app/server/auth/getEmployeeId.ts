"use server"

import { ProfileElementSchema, ResponseSchema } from "@api/schemas"
import { getData } from "../getData"

export const getEmployeeId = async () => {
  const result = await getData<{ id: string }>({
    url: "api/po/read/profile",
    responseSchema: ResponseSchema,
    dataSchema: ProfileElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [{ id: "1" }]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id || ""),
        },
      ]
    },
    dummyData: [{ id: "1" }],
  })

  return result[0].id
}
