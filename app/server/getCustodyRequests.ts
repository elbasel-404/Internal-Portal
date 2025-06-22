"use server"

import { CustodyElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { CustodyRequest } from "@types"
import { getData } from "./getData"

export const getCustodyRequests = async (): Promise<CustodyRequest[]> => {
  return getData<CustodyRequest>({
    url: "api/po/hr/custody",
    responseSchema: ResponseSchema,
    dataSchema: CustodyElementSchema,
    parseData: (data) => {
      return data.map((item: any) => ({
        id: item.id.toString(),
        date: new Date(item.create_date).toISOString().split("T")[0],
        custodyAmount: item.custody_amount,
        custodyType: item.custody_type,
        status: item.state,
      }))
    },
    dummyData: CustodyDummyData,
  })
}

const CustodyDummyData: CustodyRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    custodyAmount: 1000,
    custodyType: "عهدة مؤقتة",
    status: "طلب",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    custodyAmount: 1000,
    custodyType: "عهدة مؤقتة",
    status: "اعتمد",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    custodyAmount: 1000,
    custodyType: "عهدة مؤقتة",
    status: "مدير عام الإدارة والمشتريات",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    custodyAmount: 1000,
    custodyType: "عهدة مؤقتة",
    status: "طلب",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    custodyAmount: 1000,
    custodyType: "عهدة مؤقتة",
    status: "مدير الإدارة المالية",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    custodyAmount: 1000,
    custodyType: "عهدة مؤقتة",
    status: "عمليات الموارد البشرية",
  },
]
