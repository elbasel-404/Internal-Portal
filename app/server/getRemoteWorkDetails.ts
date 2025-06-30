"use server"

import type { RemoteWorkDetails } from "@types"
import { RemoteWorkElementSchema, ResponseSchema } from "../../api-schemas"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { formatDate } from "@utils"

export const getRemoteWorkDetails = async (
  id: string,
): Promise<RemoteWorkDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/distance/work"
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
  const validatedData = RemoteWorkElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: RemoteWorkDetails = {
    id: validatedData.id.toString(),
    requestDate: formatDate(validatedData.create_date),
    remoteWorkDate: `من ${validatedData.date_from} الي  ${validatedData.date_to}`,
    duration: validatedData.duration.toString(),
    madeThroughTheApp: validatedData.is_from_mobile ? "نعم" : "لا",
    notes:
      typeof validatedData.description === "string"
        ? validatedData.description
        : "",
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
