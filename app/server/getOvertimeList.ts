"use server"

import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { OvertimeListElementSchema, ResponseSchema } from "@api/schemas"

import type { OvertimeList } from "@types"

export const getOvertimeList = async (): Promise<OvertimeList[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/overtime_request/fields"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = {
    field_name: "assignment_ids",
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
  const validatedData = OvertimeListElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : ""

  const returnedData: OvertimeList[] = validatedData.map((data) => {
    const newsItem: OvertimeList = {
      id: data.id,
      name: getStringValue(data.name),
    }
    return newsItem
  })

  return returnedData
}

const dummyData: OvertimeList[] = [
  { id: 1, name: "5256" },
  { id: 2, name: "5445" },
  { id: 3, name: "7865" },
  { id: 4, name: "9452" },
  { id: 5, name: "2125" },
]
