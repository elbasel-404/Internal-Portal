"use server"

import { ResponseSchema, ContractorListElementSchema } from "../../api-schemas"
import type { ContractorRequest } from "@types"
import { getData } from "./getData"
import { z } from "zod"

export const getContractorRequests = async (): Promise<ContractorRequest[]> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  return getData<ContractorRequest>({
    url: "api/po/contractor-request",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: ContractorListElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as z.infer<typeof ContractorListElementSchema>

        return {
          id: getStringValue(typedItem.id),
          contractorName: getStringValue(typedItem.contractor_name),
          projectName: getStringValue(typedItem.project_name),
          date: getStringValue(typedItem.create_date),
          status: getArrayValue(typedItem.stage_id),
        }
      })
    },
    dummyData,
  })
}

const dummyData: ContractorRequest[] = [
  {
    id: "00266",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
  {
    id: "00267",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
  {
    id: "00268",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
  {
    id: "00269",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
  {
    id: "00270",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
  {
    id: "00271",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
  {
    id: "00272",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
  {
    id: "00273",
    contractorName: "أحمد بن أحمد بن أحمد الأحمد",
    projectName: "النفقات التشغلية للهيئة",
    date: "2025-03-04 13:09:08",
    status: "المدير المباشر",
  },
]
