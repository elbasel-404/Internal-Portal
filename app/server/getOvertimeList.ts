"use server"

import { getData } from "./getData"
import { OvertimeListElementSchema, ResponseSchema } from "@api/schemas"

import type { OvertimeList } from "@types"

export const getOvertimeList = async (): Promise<OvertimeList[]> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  return getData<OvertimeList>({
    url: "api/po/hr/overtime_request/fields",
    includeEmployeeId: true,
    additionalBody: { field_name: "assignment_ids" },
    responseSchema: ResponseSchema,
    dataSchema: OvertimeListElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        return {
          id: Number(typedItem.id),
          name: getStringValue(typedItem.name),
        }
      })
    },
    dummyData,
  })
}

const dummyData: OvertimeList[] = [
  { id: 1, name: "5256" },
  { id: 2, name: "5445" },
  { id: 3, name: "7865" },
  { id: 4, name: "9452" },
  { id: 5, name: "2125" },
]
