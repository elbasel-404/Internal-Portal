"use server"

import type { TicketRequest } from "@types"

export const getTicketRequests = async (): Promise<TicketRequest[]> => {
  return TicketDummyData
}

const TicketDummyData: TicketRequest[] = [
  {
    id: "#55465",
    description: "طلب",
    category: "فيش الكهرباء يفصل باستمرار",
    date: "2024-05-05",
    status: "جديدة",
  },
  {
    id: "#55466",
    description: "طلب",
    category: "طلب لابتوب للمتدربة لمياء الدوسري",
    date: "2024-05-06",
    status: "تم حل الطلب",
  },
  {
    id: "#55467",
    description: "طلب",
    category: "اصلاح مشكلة الاوفيس",
    date: "2024-05-07",
    status: "تم الإلغاء",
  },
  {
    id: "#55468",
    description: "طلب",
    category: "طلب لابتوب للمتدربة لمياء الدوسري",
    date: "2024-05-08",
    status: "بإنتظار المستخدم",
  },
  {
    id: "#55469",
    description: "طلب",
    category: "طلب هاتف شبكي",
    date: "2024-05-09",
    status: "جديدة",
  },
  {
    id: "#55470",
    description: "طلب",
    category: "فيش الكهرباء يفصل باستمرار",
    date: "2024-05-10",
    status: "تم حل الطلب",
  },
  {
    id: "#55471",
    description: "طلب",
    category: "اصلاح مشكلة الاوفيس",
    date: "2024-05-11",
    status: "تم الإلغاء",
  },
  {
    id: "#55472",
    description: "طلب",
    category: "طلب لابتوب للمتدربة لمياء الدوسري",
    date: "2024-05-11",
    status: "تم حل الطلب",
  },
]
