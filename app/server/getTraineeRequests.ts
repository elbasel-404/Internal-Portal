"use server"

import { TraineeRequest } from "@types"

export const getTraineeRequests = async (): Promise<TraineeRequest[]> => {
  return dummmyData
}

const dummmyData: TraineeRequest[] = [
  {
    id: "#55965",
    name: "محمد",
    trainingTitle: "جديد",
    date: "2024-05-03",
    status: "طلب",
  },
  {
    id: "#55964",
    name: "محمد",
    trainingTitle: "جديد",
    date: "2024-05-04",
    status: "المدير المباشر",
  },
  {
    id: "#55963",
    name: "محمد",
    trainingTitle: "جديد",
    date: "2024-05-03",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55962",
    name: "محمد",
    trainingTitle: "جديد",
    date: "2024-05-04",
    status: "اعتمد",
  },
]
