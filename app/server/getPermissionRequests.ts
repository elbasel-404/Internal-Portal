"use server"

import type { PermissionRequest } from "@types"
import { ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getPermissionRequests = async (): Promise<PermissionRequest[]> => {
  return getData<PermissionRequest>({
    url: "api/po/hr/authorization",
    responseSchema: ResponseSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          date: new Date(String(typedItem.create_date || ""))
            .toISOString()
            .split("T")[0],
          description:
            Array.isArray(typedItem.type_id) && typedItem.type_id.length > 1
              ? String(typedItem.type_id[1])
              : "",
          fromDate: String(typedItem.date_from || ""),
          toDate: String(typedItem.date_to || ""),
          timing: `من ${typedItem.hour_from ? Number(typedItem.hour_from).toFixed(2) : ""} الى ${
            typedItem.hour_to ? Number(typedItem.hour_to).toFixed(2) : ""
          }`,
          durationInHours: typedItem.hour_number
            ? Number(typedItem.hour_number).toFixed(2)
            : "",
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData: PermissionDummyData,
  })
}

const PermissionDummyData: PermissionRequest[] = [
  {
    id: "#dummy",
    date: "2024-05-05",
    description: "استئذان عمل",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "طلب",
  },
  {
    id: "#53965",
    date: "2024-05-05",
    description: "استئذان شخصي",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "المدير المباشر",
  },
  {
    id: "#57965",
    date: "2024-05-05",
    description: "اضطراري",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#52965",
    date: "2024-05-05",
    description: "استئذان عمل",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "اعتمد",
  },
]
