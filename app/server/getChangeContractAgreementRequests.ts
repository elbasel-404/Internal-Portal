"use server"

import type { ChangeContractAgreementRequest } from "@types"

export const getChangeContractAgreementRequests = async (): Promise<
  ChangeContractAgreementRequest[]
> => {
  return DummyData
}

const DummyData: ChangeContractAgreementRequest[] = [
  {
    id: "1",
    purchaseAgreementNumber: "#12345",
    contractNumber: "#54321",
    competitionName: "منافسة 1",
    requestDate: "2024-05-01",
    changeAmount: "1000 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "2",
    purchaseAgreementNumber: "#12346",
    contractNumber: "#54322",
    competitionName: "منافسة 2",
    requestDate: "2024-05-02",
    changeAmount: "2000 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "3",
    purchaseAgreementNumber: "#12347",
    contractNumber: "#54323",
    competitionName: "منافسة 3",
    requestDate: "2024-05-03",
    changeAmount: "1500 ريال سعودي",
    status: "مكتمل",
  },
  {
    id: "4",
    purchaseAgreementNumber: "#12348",
    contractNumber: "#54324",
    competitionName: "منافسة 4",
    requestDate: "2024-05-04",
    changeAmount: "3000 ريال سعودي",
    status: "مرفوض",
  },
  {
    id: "5",
    purchaseAgreementNumber: "#12349",
    contractNumber: "#54325",
    competitionName: "منافسة 5",
    requestDate: "2024-05-05",
    changeAmount: "2500 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "6",
    purchaseAgreementNumber: "#12350",
    contractNumber: "#54326",
    competitionName: "منافسة 6",
    requestDate: "2024-05-06",
    changeAmount: "1800 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "7",
    purchaseAgreementNumber: "#12351",
    contractNumber: "#54327",
    competitionName: "منافسة 7",
    requestDate: "2024-05-07",
    changeAmount: "2200 ريال سعودي",
    status: "مكتمل",
  },
]
