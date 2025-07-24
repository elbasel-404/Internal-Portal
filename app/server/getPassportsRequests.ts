"use server"

import { PassportRequestSchema, ResponseSchema } from "@api/schemas"
import type { PassportRequest } from "@types"
import { getData } from "./getData"

export const getPassportRequests = async (): Promise<PassportRequest[]> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  return getData<PassportRequest>({
    url: "api/po/hr/passport-request",
    responseSchema: ResponseSchema,
    dataSchema: PassportRequestSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: getStringValue(typedItem.name),
          date: getStringValue(typedItem.date),
          passportNumber: getStringValue(typedItem.new_passport),
          passportExpireDate: getStringValue(typedItem.passport_end_date),
          status: getStringValue(typedItem.state),
        }
      })
    },
    dummyData: dummyData,
  })
}

const dummyData: PassportRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "طلب",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "المدير المباشر",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "طلب",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "المدير المباشر",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "المدير المباشر",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "عمليات الموارد البشرية",
  },
]
