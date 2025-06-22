"use server"

import type { TraineeRequestDetails } from "@types"

export const getTraineeRequestDetails =
  async () /* _id: string */ // Parameter not used
  : Promise<TraineeRequestDetails | void> => {
    return dummyData
  }

const dummyData: TraineeRequestDetails = {
  id: "00001",
  name: "محمد",
  idNumber: "1032877654",
  trainingTitle: "تجربة",
  email: " test@test.com",
  phone: "0507270900",
  status: "المدير المباشر",
}
