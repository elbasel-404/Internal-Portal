"use server"

import { RemoteWorkRequest } from "@types"
import { RemoteWorkElementSchema, ResponseSchema } from "../../api-schemas"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { getStoredEmployeeId } from "@auth"

export const getRemoteWorkRequests = async (): Promise<RemoteWorkRequest[]> => {
  const isDemo = await getDemo()
  if (isDemo) return remoteWorkRequests

  // ! VARIBLES
  // ! ==================================
  const employeeId = await getStoredEmployeeId()
  const url = "api/po/hr/distance/work"
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
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = RemoteWorkElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: RemoteWorkRequest[] = validatedData.map((data) => {
    const vacationItem: RemoteWorkRequest = {
      id: data.id.toString(),
      date: data.create_date,
      startDate: data.date_from,
      endDate: data.date_to,
      durationInDays: data.duration,
      status: data.state,
    }
    return vacationItem
  })

  return returnedData
}

const remoteWorkRequests: RemoteWorkRequest[] = [
  {
    id: "#55965",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    status: "طلب",
  },
  {
    id: "#55964",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: 3,
    status: "المدير المباشر",
  },
  {
    id: "#55963",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55962",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: 3,
    status: "اعتمد",
  },
  {
    id: "#55961",
    date: "2024-05-05 - 04:30:00",

    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    status: "طلب",
  },
  {
    id: "#55960",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-04-10",
    endDate: "2024-05-03",
    durationInDays: 24,
    status: "المدير المباشر",
  },
  {
    id: "#55959",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55958",
    date: "2024-05-04 - 14:30:00",
    startDate: "2024-05-02",
    endDate: "2024-05-03",
    durationInDays: 2,
    status: "طلب",
  },
  {
    id: "#55957",
    date: "2024-05-04 - 10:15:00",

    startDate: "2024-05-01",
    endDate: "2024-05-02",
    durationInDays: 2,
    status: "اعتمد",
  },
  {
    id: "#55956",
    date: "2024-05-03 - 09:45:00",
    startDate: "2024-04-29",
    endDate: "2024-05-01",
    durationInDays: 3,
    status: "عمليات الموارد البشرية",
  },
]
