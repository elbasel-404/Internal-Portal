"use server"

import type { PassportRequest } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { PassportRequestSchema, ResponseSchema } from "@api/schemas"
import { getStoredEmployeeId } from "@auth"

export const getPassportRequests = async (): Promise<PassportRequest[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData
  const employeeId = await getStoredEmployeeId()

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/passport-request"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = {
    employee_id: employeeId,
  }
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
  const validatedData = PassportRequestSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const returnedData: PassportRequest[] = validatedData.map((data) => {
    const newsItem: PassportRequest = {
      id: getStringValue(data.name),
      date: getStringValue(data.date),
      passportNumber: getStringValue(data.new_passport),
      passportExpireDate: getStringValue(data.passport_end_date),
      status: getStringValue(data.state),
    }
    return newsItem
  })

  return returnedData
}

const dummyData: PassportRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "طلب",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "المدير المباشر",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "طلب",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "المدير المباشر",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "المدير المباشر",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    passportNumber: "P975101",
    passportExpireDate: "2025-5-15",
    status: "عمليات الموارد البشرية",
  },
]
