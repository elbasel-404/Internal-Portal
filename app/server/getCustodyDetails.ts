"use server"

import { CustodyElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { CustodyDetails } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getCustodyDetails = async (
  id: string,
): Promise<CustodyDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return custodyDetailsDummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/custody"
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
  const validatedData = CustodyElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: CustodyDetails = {
    id: validatedData.id.toString(),
    date: validatedData.create_date.toISOString().split("T")[0],
    custodyAmount: validatedData.custody_amount.toString() + " " + "ريال سعودي",
    custodyType: validatedData.custody_type,
    custodyPurpose: validatedData.custody_reason,
  }

  return returnedData
}

const custodyDetailsDummyData: CustodyDetails = {
  id: "1",
  date: "2024-15-05",
  custodyAmount: "5000 ريال سعودي",
  custodyType: "عهدة مؤقتة",
  custodyPurpose:
    "لتوفير الاعمال والخدمات والنثريات الطارئة الخاصة بخدمات الإدرة العامة للمارفق والخدمات الإدارية",
}
