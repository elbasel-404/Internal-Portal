"use server"

import { TrainingElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getStoredEmployeeId } from "@auth"
import { getDemo } from "@db/actions"
import type { TrainingRequest } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getTrainingRequests = async (): Promise<TrainingRequest[]> => {
  const isDemo = await getDemo()
  if (isDemo) return TrainingDummyData

  // ! VARIABLES
  // ! ==================================
  const employeeId = await getStoredEmployeeId()
  const url = "api/po/hr/training-request"
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
  const result = validatedResponse.data?.result
  const data = result?.data
  const validatedData = TrainingElementSchema.array().parse(data)
  const employeeMembersData = validatedData

  // ! PARSING
  // ! ==================================
  const returnedData: TrainingRequest[] = employeeMembersData
    ? employeeMembersData.map((data) => {
        const employeeMember: TrainingRequest = {
          id: data.id.toString(),
          requestDate: data.date,
          fromDate: data.date_from || "__",
          toDate: data.date_to || "__",
          duration: data.duration.toString() + " " + "أيام",
          type: data.type,
          status: data.state,
        }
        return employeeMember
      })
    : []

  return returnedData
}

const TrainingDummyData: TrainingRequest[] = [
  {
    id: "#55465",
    requestDate: "2024-01-15",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    duration: "3 أيام",
    type: "محلي",
    status: "قسم التدريب",
  },
  {
    id: "#53965",
    requestDate: "2024-02-20",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    duration: "7 أيام",
    type: "دولي",
    status: "مدير عام الموارد البشرية",
  },
  {
    id: "#56231",
    requestDate: "2024-03-10",
    fromDate: "2024-06-10",
    toDate: "2024-06-15",
    duration: "5 أيام",
    type: "محلي",
    status: "معتمد وتم أمر الصرف",
  },
  {
    id: "#57892",
    requestDate: "2024-04-25",
    fromDate: "2024-07-01",
    toDate: "2024-07-05",
    duration: "5 أيام",
    type: "دولي",
    status: "اعتمد",
  },
  {
    id: "#58974",
    requestDate: "2024-05-15",
    fromDate: "2024-08-15",
    toDate: "2024-08-20",
    duration: "6 أيام",
    type: "محلي",
    status: "المدير المباشر",
  },
  {
    id: "#59784",
    requestDate: "2024-06-30",
    fromDate: "2024-09-05",
    toDate: "2024-09-10",
    duration: "5 أيام",
    type: "دولي",
    status: "معتمد وتم أمر الصرف",
  },
  {
    id: "#60231",
    requestDate: "2024-07-20",
    fromDate: "2024-10-12",
    toDate: "2024-10-18",
    duration: "6 أيام",
    type: "محلي",
    status: "اعتمد",
  },
  {
    id: "#61543",
    requestDate: "2024-08-15",
    fromDate: "2024-11-05",
    toDate: "2024-11-20",
    duration: "15 أيام",
    type: "دولي",
    status: "مدير عام الموارد البشرية",
  },
  {
    id: "#62398",
    requestDate: "2024-09-10",
    fromDate: "2024-12-01",
    toDate: "2024-12-07",
    duration: "6 أيام",
    type: "محلي",
    status: "المدير المباشر",
  },
  {
    id: "#63125",
    requestDate: "2024-10-05",
    fromDate: "2025-01-10",
    toDate: "2025-01-15",
    duration: "5 أيام",
    type: "دولي",
    status: "اعتمد",
  },
  {
    id: "#64578",
    requestDate: "2024-11-20",
    fromDate: "2025-02-15",
    toDate: "2025-02-20",
    duration: "6 أيام",
    type: "محلي",
    status: "مدير عام الموارد البشرية",
  },
  {
    id: "#65987",
    requestDate: "2024-12-15",
    fromDate: "2025-03-05",
    toDate: "2025-03-10",
    duration: "5 أيام",
    type: "دولي",
    status: "قسم التدريب",
  },
]
