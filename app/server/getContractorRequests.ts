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

  return getData<ContractorRequest>({
    url: "api/po/hr/custody-close/read",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: ContractorListElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as z.infer<typeof ContractorListElementSchema>

        return {
          id: getStringValue(typedItem.name),
          date: getStringValue(typedItem.close_date),
          pledgeAmount: `${getStringValue(typedItem.close_amount)} ريال سعودي`,
          pledgeType:
            getStringValue(typedItem.close_type) === "close"
              ? "اقفال"
              : "استعاضة",
          status: getStringValue(typedItem.state),
        }
      })
    },
    dummyData,
  })
}

const dummyData: ContractorRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "طلب",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "اعتمد",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "مدير عام الإدارة والمشتريات",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "طلب",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "مدير الإدارة المالية",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "نائب المحافظ",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    pledgeAmount: "1000 ريال سعودي",
    pledgeType: "عهدة مؤقتة",
    status: "اعتمد",
  },
]
