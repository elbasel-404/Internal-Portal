"use server"

import { RecommendationSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "@db/actions"
import { RecommendationDetails } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getRecommendationDetails = async (
  id: string,
): Promise<RecommendationDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/application/read"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
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
  const validatedData = RecommendationSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: RecommendationDetails = {
    id: validatedData.id.toString(),
    recommendationDate: validatedData.date,
    city: validatedData.place[1].toString(),
    cycle: validatedData.training_id[1].toString(),
    cycleCost: "0 ريال",
    cycleDate: validatedData.date_from,
    cycleProgram: "__",
    degree: validatedData.degree_id[1].toString(),
    duration: validatedData.number_of_days.toString(),
    employee: validatedData.employee_id[1].toString(),
    jobNumber: validatedData.job_id[0].toString(),
    jobTitle: validatedData.job_id[1].toString(),
    trainingCenter: validatedData.training_center,
    type: validatedData.type,
    management: validatedData.department_id[1].toString(),
  }

  return returnedData
}
const dummyData: RecommendationDetails = {
  id: "1",
  recommendationDate: "17-04-2024",
  city: "الرياض",
  cycle: "دورة القيادة الإدارية",
  cycleCost: "5000 ريال",
  cycleDate: "01-05-2024",
  cycleProgram: "برنامج تطوير المهارات الإدارية",
  degree: "بكالوريوس إدارة أعمال",
  duration: "5 أيام",
  employee: "حمد بن يوسف القشميط",
  jobNumber: "123456",
  jobTitle: "مدير مشاريع",
  management: "إدارة التخطيط الاستراتيجي",
  trainingCenter: "مركز تدريب القيادة",
  type: "تطوير مهني",
}
