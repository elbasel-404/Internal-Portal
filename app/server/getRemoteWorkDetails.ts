"use server"

import type { RemoteWorkDetails } from "@types"
import { RemoteWorkElementSchema, ResponseSchema } from "../../api-schemas"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getRemoteWorkDetails = async (
  id: string,
): Promise<RemoteWorkDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/distance/work"
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
  const validatedData = RemoteWorkElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: RemoteWorkDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.create_date.toISOString().split("T")[0],
    remoteWorkDate: `من ${validatedData.date_from} الي  ${validatedData.date_to}`,
    duration: validatedData.duration.toString(),
    madeThroughTheApp: "false",
    notes: typeof validatedData.note === "string" ? validatedData.note : "",
  }

  return returnedData
}

const dummyData: RemoteWorkDetails = {
  id: "1",
  requestDate: "2021-09-01",
  remoteWorkDate: "من 17-04-2024 الى 18-04-2024",
  duration: "1 يوم",
  madeThroughTheApp: "نعم",
  notes:
    "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ",
}
