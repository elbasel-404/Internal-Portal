"use server"

import { DeputationElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getStoredEmployeeId } from "@auth"
import { getDemo } from "@db/actions"
import type { DeputationRequest } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getDeputationRequests = async (): Promise<DeputationRequest[]> => {
  const isDemo = await getDemo()
  if (isDemo) return DeputationRequestsDummyData

  const DeputationType = (value: string) => {
    switch (value) {
      case "internal":
        return "داخلي"
      case "external":
        return "خارجي"
      default:
        return "غير محدد"
    }
  }

  // ! VARIABLES
  // ! ==================================
  const employeeId = await getStoredEmployeeId()
  const url = "api/po/hr/deputation"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
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
  const validatedResponse = ResponseSchema.safeParse(responseJson)
  // const { result } = validatedResponse;
  const result = validatedResponse.data?.result
  const data = result?.data
  const validatedData = DeputationElementSchema.array().parse(data)
  const deputationsData = validatedData

  // ! PARSING
  // ! ==================================
  const returnedData: DeputationRequest[] = deputationsData
    ? deputationsData.map((data) => {
        const deputationItem: DeputationRequest = {
          id: data.id.toString(),
          requestDate: data.create_date.split(" ")[0],
          deputation: DeputationType(data.type),
          startDate: data.date_from,
          endDate: data.date_to,
          duration: data.duration.toString(),
          status: data.state,
        }
        return deputationItem
      })
    : []

  return returnedData
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
