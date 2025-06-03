"use server"

import type { DeputationRequest } from "@types"

export const getDeputationRequests = async (): Promise<DeputationRequest[]> => {
  return DeputationRequestsDummyData
}

const DeputationRequestsDummyData: DeputationRequest[] = [
  {
    id: "#10011",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "داخلي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "طلب",
  },
  {
    id: "#10012",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "داخلي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "المدير المباشر",
  },
  {
    id: "#10013",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "خارجي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "مدير القطاع",
  },
  {
    id: "#10014",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "خارجي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#10015",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "خارجي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "مدير عام الموارد البشرية",
  },
  {
    id: "#10016",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "داخلي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "معتمد وتم الصرف",
  },
  {
    id: "#10017",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "داخلي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "معتمد",
  },
  {
    id: "#10018",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "داخلي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "مرفوض",
  },
  {
    id: "#10019",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "داخلي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "طلب",
  },
  {
    id: "#10020",
    requestDate: "2024-05-05 - 04.30.00",
    deputation: "داخلي",
    startDate: "2024-05-05 - 04.30.00",
    endDate: "2024-05-15 - 04.30.00",
    duration: "10",
    status: "طلب",
  },
]
