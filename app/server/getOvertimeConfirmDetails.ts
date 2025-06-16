"use server"

import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { OvertimeAssignmentElementSchema, ResponseSchema } from "@api/schemas"

import { OvertimeConfirmDetails } from "@types"

export const getOvertimeConfirmDetails = async (
  id: string,
): Promise<OvertimeConfirmDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/overtime_assignment"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = {
    id: id,
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
  const validatedData = OvertimeAssignmentElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : ""

  const returnedData: OvertimeConfirmDetails = {
    id: getStringValue(validatedData.name),
    applicant: getArrayValue(validatedData.employee_id),
    management: getStringValue(validatedData.date_from),
    overTimeDuration: getStringValue(validatedData.date_to),
    assignmentNumber: getStringValue(validatedData.description),
  }
  return returnedData
}
const dummyData: OvertimeConfirmDetails = {
  id: "#55470",
  applicant: "خالد إبراهيم",
  management: "إدارة تقنية المعلومات",
  overTimeDuration: "5.0",
  assignmentNumber: "7080",
}
