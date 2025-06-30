export interface TrainingMethod {
  name: string
  checked: boolean
}

export type TrainingDetails = {
  id: string
  requestDate: string
  employeeName: string
  jobNumber: string
  jobTitle: string
  sector: string
  duration: string
  mechanismConvening: string
  courseValue: string
  mandateAllowance: string
  transcationDate: string | boolean
  trainingCenter: string
  status: string
  courseProgram: string
  trainingType: string
  trainingName: string
  trainingMethod: TrainingMethod[]
  trainingStartDate: string
  trainingEndDate: string
  country: string | number
  city: string
  travelDays: string | boolean
  trainingStartBefore: string
  trainingEmployee: string
  trainingSchedule: {
    id: string
    trainingDate: string
    durationWithDays: string
    travelDays: string
    travelDateSettings: string
    travelDateForTraining: string
    travelDateForReturn: string
  }[]
  attachments: File[]
}
