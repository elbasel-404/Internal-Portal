"use server"

import type { OrdersListAgreementRequest } from "@types"

export const getOrdersListAgreementRequests = async (): Promise<
  OrdersListAgreementRequest[]
> => {
  return DummyData
}

const DummyData: OrdersListAgreementRequest[] = [
  {
    id: "26890",
    AgreementNumber: "#12345",
    contractNumber: "#54321",
    competitionName: "منافسة 1",
    awardAmount: "1000 ريال سعودي",
    otherChangeRequests: "طلب تغيير 1000 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "26891",
    AgreementNumber: "#12346",
    contractNumber: "#54322",
    competitionName: "منافسة 2",
    awardAmount: "2000 ريال سعودي",
    otherChangeRequests: "طلب تغيير 2000 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "26892",
    AgreementNumber: "#12347",
    contractNumber: "#54323",
    competitionName: "منافسة 3",
    awardAmount: "1500 ريال سعودي",
    otherChangeRequests: "طلب تغيير 1500 ريال سعودي",
    status: "مكتمل",
  },
  {
    id: "26893",
    contractNumber: "#54324",
    competitionName: "منافسة 4",
    AgreementNumber: "#12348",
    awardAmount: "3000 ريال سعودي",
    otherChangeRequests: "طلب تغيير 3000 ريال سعودي",
    status: "مرفوض",
  },
  {
    id: "26894",
    AgreementNumber: "#12349",
    contractNumber: "#54325",
    competitionName: "منافسة 5",
    awardAmount: "2500 ريال سعودي",
    otherChangeRequests: "طلب تغيير 2500 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "26895",
    contractNumber: "#54326",
    competitionName: "منافسة 6",
    AgreementNumber: "#12350",
    awardAmount: "2200 ريال سعودي",
    otherChangeRequests: "طلب تغيير 2200 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "26896",
    AgreementNumber: "#12351",
    contractNumber: "#54327",
    competitionName: "منافسة 7",
    awardAmount: "1800 ريال سعودي",
    otherChangeRequests: "طلب تغيير 1800 ريال سعودي",
    status: "مكتمل",
  },
]
