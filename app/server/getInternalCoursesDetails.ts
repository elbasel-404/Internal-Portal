"use server"

import { TrainingElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { InternalCoursesDetails } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getInternalCoursesDetails = async (
  id: string,
): Promise<InternalCoursesDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return internalCoursesDetails

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/training"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = { id: id }
  const requestBodyString = JSON.stringify(requestBody)
  const requestUrl = `${apiRootUrl}/${url}`

  // ! FETCH
  // ! ==================================
  const apiResponse = await fetch(requestUrl, {
    headers,
    method: "POST",
    body: requestBodyString,
  })
  const responseJson = await apiResponse.json()

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = TrainingElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: InternalCoursesDetails = {
    id: validatedData.id.toString(),
    courseDate: validatedData.date,
    courseName: validatedData.name,
    duration: validatedData.number_of_days.toString(),
    type: validatedData.type,
    trainingCenter: validatedData.training_center,
    city: validatedData.city.toString(),
    seatsNumber: validatedData.number_place.toString(),
    subscribersNumber: validatedData.number_participant.toString(),
    courseProgram: validatedData.programme_training,
    displayButton: validatedData.display_button,
  }

  return returnedData
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
