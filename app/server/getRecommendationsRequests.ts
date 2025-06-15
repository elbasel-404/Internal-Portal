"use server"

import { RecommendationSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "@db/actions"
import type { RecommendationRequest } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"
import { getStoredEmployeeId } from "@auth"

export const getRecommendationsRequests = async (): Promise<
  RecommendationRequest[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return RecommendationsDummyData
  const employeeId = await getStoredEmployeeId()

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/application/read"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  // const requestBody = { employee_id: 1711 }
  const requestBody = { employee_id: employeeId }
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
  const validatedData = RecommendationSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: RecommendationRequest[] = validatedData.map((data) => {
    const vacationItem: RecommendationRequest = {
      id: data.id.toString(),
      date: data.date,
      type: data.type,
      cycle: data.training_id[1].toString(),
      startDate: data.date_from,
      endDate: data.date_to,
      status: data.state,
    }
    return vacationItem
  })

  return returnedData
}

const RecommendationsDummyData: RecommendationRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    type: "محلي",
    cycle: "طلب دورة جماعية من النظام",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    status: "اعتمد",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    type: "دولي",
    cycle: "دورة تدريب خارجية",
    startDate: "2024-06-05",
    endDate: "2024-06-20",
    status: "المدير المباشر",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    type: "محلي",
    cycle: "دورة تخصصية",
    startDate: "2024-06-10",
    endDate: "2024-06-25",
    status: "مدير عام الموارد البشرية",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    type: "محلي",
    cycle: "طلب تطوير مهارات",
    startDate: "2024-06-15",
    endDate: "2024-06-30",
    status: "اعتمد",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    type: "دولي",
    cycle: "مؤتمر خارجي",
    startDate: "2024-07-01",
    endDate: "2024-07-10",
    status: "المدير المباشر",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    type: "محلي",
    cycle: "دورة داخلية",
    startDate: "2024-07-05",
    endDate: "2024-07-15",
    status: "اعتمد",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    type: "محلي",
    cycle: "تدريب ميداني",
    startDate: "2024-07-10",
    endDate: "2024-07-25",
    status: "المدير المباشر",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    type: "دولي",
    cycle: "ورشة عمل دولية",
    startDate: "2024-07-20",
    endDate: "2024-08-05",
    status: "اعتمد",
  },
]
