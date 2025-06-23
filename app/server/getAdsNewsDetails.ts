"use server"

import type { AdsNewsDetails } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { AdNewSchema, ResponseSchema } from "@api/schemas"
export const getAdsNewsDetails = async (
  id: string,
): Promise<AdsNewsDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/read/portal-news"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers

  const requestBody = {
    news_type: "ads",
    news_id: id,
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
  const validatedData = AdNewSchema.parse(data[0])

  // ! PARSING
  // ! ==================================
  const returnedData: AdsNewsDetails = {
    id: validatedData.id,
    title: validatedData.title,
    date: new Date(validatedData.create_date).toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    description: validatedData.description,
    imageUrl: `data:image/gif;base64,${validatedData.image}`,
  }
  return returnedData
}

const dummyData: AdsNewsDetails = {
  id: 1,
  title: "نشرة منشآت الربعية - الربيع الثاني",
  date: "2024 يوليو 26",
  description: "نشرة منشآت الربع الثاني - الربع الثاني",
  imageUrl: "/images/news-2.png",
}
