"use server"

import type { ChangeContractPurchaseRequest } from "@types"

export const getChangeContractPurchaseRequests = async (): Promise<
  ChangeContractPurchaseRequest[]
> => {
  return DummyData
}

const DummyData: ChangeContractPurchaseRequest[] = [
  {
    id: "28567",
    purchaseOrderNumber: "#12345",
    contractNumber: "#54321",
    competitionName: "منافسة 1",
    requestDate: "2024-05-01",
    increaseAmount: "1000 ريال سعودي",
    decreaseAmount: "500 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "28568",
    purchaseOrderNumber: "#12346",
    contractNumber: "#54322",
    competitionName: "منافسة 2",
    requestDate: "2024-05-02",
    increaseAmount: "2000 ريال سعودي",
    decreaseAmount: "1000 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "28569",
    purchaseOrderNumber: "#12347",
    contractNumber: "#54323",
    competitionName: "منافسة 3",
    requestDate: "2024-05-03",
    increaseAmount: "1500 ريال سعودي",
    decreaseAmount: "750 ريال سعودي",
    status: "مكتمل",
  },
  {
    id: "28570",
    purchaseOrderNumber: "#12348",
    contractNumber: "#54324",
    competitionName: "منافسة 4",
    requestDate: "2024-05-04",
    increaseAmount: "3000 ريال سعودي",
    decreaseAmount: "1500 ريال سعودي",
    status: "مرفوض",
  },
  {
    id: "28571",
    purchaseOrderNumber: "#12349",
    contractNumber: "#54325",
    competitionName: "منافسة 5",
    requestDate: "2024-05-05",
    increaseAmount: "2500 ريال سعودي",
    decreaseAmount: "1250 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "28572",
    purchaseOrderNumber: "#12350",
    contractNumber: "#54326",
    competitionName: "منافسة 6",
    requestDate: "2024-05-06",
    increaseAmount: "1800 ريال سعودي",
    decreaseAmount: "900 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "28573",
    purchaseOrderNumber: "#12351",
    contractNumber: "#54327",
    competitionName: "منافسة 7",
    requestDate: "2024-05-07",
    increaseAmount: "2200 ريال سعودي",
    decreaseAmount: "1100 ريال سعودي",
    status: "مكتمل",
  },
]
