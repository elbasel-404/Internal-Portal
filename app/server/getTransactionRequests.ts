"use server"

import { ResponseSchema, TransactionListElementSchema } from "@api/schemas"
import type { TransactionRequest } from "@types"
import { getData } from "./getData"

export const getTransactionRequests = async (): Promise<
  TransactionRequest[]
> => {
  return getData<TransactionRequest>({
    url: "api/po/read/retrieve-my-requests",
    responseSchema: ResponseSchema,
    dataSchema: TransactionListElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          date: String(typedItem.date || ""),
          name: String(typedItem.description || ""),
          status: String(typedItem.status || ""),
        }
      })
    },
    dummyData: dummyData,
  })
}

const dummyData: TransactionRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    name: "طلب إجازة سنوية",
    status: "طلب",
  },
  {
    id: "#53965",
    date: "2024-05-05",
    name: "طلب استئذان",
    status: "المدير المباشر",
  },
  {
    id: "#57965",
    date: "2024-05-05",
    name: "طلب إجازة مرضية",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#52965",
    date: "2024-05-05",
    name: "طلب تغيير حساب بنكي",
    status: "اعتمد",
  },
]
