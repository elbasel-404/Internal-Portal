"use server"

import { ResponseSchema } from "@api/schemas/responseSchema"
import type { VacationType } from "@api/schemas/vacation-types/schema"
import { VacationTypeSchema } from "@api/schemas/vacation-types/schema"
import { getData } from "./getData"

export const getVacationElements = async (): Promise<VacationType[]> => {
  return getData<VacationType>({
    url: "api/po/hr/holidays/status/by_gender",
    responseSchema: ResponseSchema,
    dataSchema: VacationTypeSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: Number(typedItem.id || 0),
          name: String(typedItem.name || ""),
          display_name: String(typedItem.display_name || ""),
        }
      })
    },
    dummyData: dummyData,
  })
}

const dummyData: VacationType[] = [
  {
    id: 1,
    name: "sick",
    display_name: "إجازة مرضية",
  },
  {
    id: 2,
    name: "annual",
    display_name: "إجازة سنوية",
  },
  {
    id: 3,
    name: "marriage",
    display_name: "إجازة زواج",
  },
  {
    id: 4,
    name: "maternity",
    display_name: "إجازة أمومة",
  },
  {
    id: 5,
    name: "paternity",
    display_name: "إجازة أبوة",
  },
  {
    id: 6,
    name: "compassionate",
    display_name: "إجازة اضطرارية",
  },
]
