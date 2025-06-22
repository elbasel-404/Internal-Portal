"use server"

import type { BankAccountRequest } from "@types"
import {
  ChangeBankAccountElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getData } from "./getData"

export const getBankAccountRequests = async (): Promise<
  BankAccountRequest[]
> => {
  return getData<BankAccountRequest>({
    url: "api/po/hr/change-bank-request",
    responseSchema: ResponseSchema,
    dataSchema: ChangeBankAccountElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          date: new Date(String(typedItem.create_date || ""))
            .toISOString()
            .split("T")[0],
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData: BankAccountDummyData,
  })
}

const BankAccountDummyData: BankAccountRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    status: "طلب",
  },
  {
    id: "#53965",
    date: "2024-05-05",
    status: "المدير المباشر",
  },
  {
    id: "#57965",
    date: "2024-05-05",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#52965",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55955",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#54965",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55968",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55645",
    date: "2024-05-05",
    status: "المدير المباشر",
  },
  {
    id: "#55974",
    date: "2024-05-05",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#51965",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#54565",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55765",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#51265",
    date: "2024-05-05",
    status: "اعتمد",
  },
]
