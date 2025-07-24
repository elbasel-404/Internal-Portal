"use server"

import { HrTrainingSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { InternalCoursesDetails } from "@types"
import { getData } from "./getData"

export const getInternalCoursesDetails = async (
  id: string,
): Promise<InternalCoursesDetails | void> => {
  const result = await getData<InternalCoursesDetails>({
    url: "api/po/hr/training",
    responseSchema: ResponseSchema,
    dataSchema: HrTrainingSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [internalCoursesDetails]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id),
          courseDate: String(typedData.create_date),
          courseName: String(typedData.name),
          duration: String(typedData.number_of_days),
          type: String(typedData.type),
          trainingCenter: String(typedData.training_center),
          city: String(typedData.city),
          seatsNumber: String(typedData.number_place),
          subscribersNumber: String(typedData.number_participant),
          courseProgram: String(typedData.programme_training),
          displayButton: Boolean(typedData.display_button),
        },
      ]
    },
    additionalBody: { id },
    dummyData: [internalCoursesDetails],
  })
  return result[0]
}

const internalCoursesDetails: InternalCoursesDetails = {
  id: "1",
  courseName: "Certefied Power BI Professional",
  courseDate: "من 17-04-2024 إلى 17-04-2024",
  duration: "3 أيام",
  type: "محلي",
  trainingCenter: "أكاديمية الاستثمار",
  city: "الرياض",
  seatsNumber: "20",
  subscribersNumber: "15",
  courseProgram: "البرنامج التدريبي",
  displayButton: true,
}
