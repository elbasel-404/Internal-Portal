// import type { VacationTypes } from "@types";
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { VacationType } from "@api/schemas/vacation-types/schema"
import { VacationTypeSchema } from "@api/schemas/vacation-types/schema"
import { getData } from "./getData"

export const getVacationElement = async (): Promise<VacationType[]> => {
  return getData<VacationType>({
    url: "api/po/hr/holidays/status/by_gender",
    responseSchema: ResponseSchema,
    dataSchema: VacationTypeSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: Number(typedItem.id),
          name: String(typedItem.name),
          display_name: String(typedItem.display_name),
        }
      })
    },
    dummyData: dummyData,
  })
}

const dummyData: VacationType[] = [
  {
    id: 5,
    name: "إجازة سنوية",
    display_name: "إجازة سنوية",
  },
  {
    id: 7,
    name: "إجازة مرضيّة",
    display_name: "إجازة مرضيّة",
  },
  {
    id: 16,
    name: "إجازة المولود",
    display_name: "إجازة المولود",
  },
  {
    id: 18,
    name: "إجازة وفاة",
    display_name: "إجازة وفاة",
  },
  {
    id: 25,
    name: "إجازة زواج",
    display_name: "إجازة زواج",
  },
  {
    id: 26,
    name: "حج",
    display_name: "حج",
  },
  {
    id: 34,
    name: "اجازه عن بعد",
    display_name: "اجازه عن بعد",
  },
]
