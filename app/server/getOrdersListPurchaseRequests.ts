"use server"

import type { OrdersListPurchaseRequest } from "@types"

export const getOrdersListPurchaseRequests = async (): Promise<
  OrdersListPurchaseRequest[]
> => {
  return DummyData
}

const DummyData: OrdersListPurchaseRequest[] = [
  {
    id: "28567",
    purchaseOrderNumber: "#12345",
    contractNumber: "#54321",
    competitionName: "منافسة 1",
    awardAmount: "500 ريال سعودي",
    otherChangeRequests: "طلب زيادة 1000 ريال سعودي، طلب خصم 500 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "28568",
    purchaseOrderNumber: "#12346",
    contractNumber: "#54322",
    competitionName: "منافسة 2",
    awardAmount: "1000 ريال سعودي",
    otherChangeRequests: "طلب زيادة 2000 ريال سعودي، طلب خصم 100  0 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "28569",
    purchaseOrderNumber: "#12347",
    contractNumber: "#54323",
    competitionName: "منافسة 3",
    awardAmount: "750 ريال سعودي",
    otherChangeRequests: "طلب زيادة 1500 ريال سعودي، طلب خصم 750 ريال سعودي",
    status: "مكتمل",
  },
  {
    id: "28570",
    purchaseOrderNumber: "#12348",
    contractNumber: "#54324",
    competitionName: "منافسة 4",
    awardAmount: "1500 ريال سعودي",
    otherChangeRequests: "طلب زيادة 3000 ريال سعودي، طلب خصم 1500 ريال سعودي",
    status: "مرفوض",
  },
  {
    id: "28571",
    purchaseOrderNumber: "#12349",
    contractNumber: "#54325",
    competitionName: "منافسة 5",
    awardAmount: "1250 ريال سعودي",
    otherChangeRequests: "طلب زيادة 2500 ريال سعودي، طلب خصم 1250 ريال سعودي",
    status: "قيد المراجعة",
  },
  {
    id: "28572",
    purchaseOrderNumber: "#12350",
    contractNumber: "#54326",
    competitionName: "منافسة 6",
    awardAmount: "1100 ريال سعودي",
    otherChangeRequests: "طلب زيادة 2200 ريال سعودي، طلب خصم 1100 ريال سعودي",
    status: "موافقة مبدئية",
  },
  {
    id: "28573",
    purchaseOrderNumber: "#12351",
    contractNumber: "#54327",
    competitionName: "منافسة 7",
    awardAmount: "1100 ريال سعودي",
    otherChangeRequests: "طلب زيادة 2200 ريال سعودي، طلب خصم 1100 ريال سعودي",
    status: "مكتمل",
  },
]
