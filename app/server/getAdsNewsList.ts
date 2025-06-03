"use server"

import type { AdsListRequst } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { AdNewSchema, ResponseSchema } from "@api/schemas"
export const getAdsNewsList = async (): Promise<AdsListRequst[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/read/portal-news"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = { news_type: "ads" }
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
  const validatedData = AdNewSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: AdsListRequst[] = validatedData.map((data) => {
    const newsItem: AdsListRequst = {
      id: data.id,
      title: data.title,
      date: new Date(data.create_date).toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: data.resume,
      image: `data:image/gif;base64,${data.image}`,
    }
    return newsItem
  })
  return returnedData
}

const dummyData: AdsListRequst[] = [
  {
    id: 1,
    title: "نشرة منشآت الربعية - الربيع الثاني",
    date: "2024 يوليو 26",
    description: "نشرة منشآت الربع الثاني - الربع الثاني",
    image: "/images/news-3.png",
  },
  {
    id: 2,
    title: "نشرة منشآت الربعية - الربيع الثاني",
    date: "2024 يوليو 26",
    description: "نشرة منشآت الربع الثاني - الربع الثاني",
    image: "/images/news-2.png",
  },
  {
    id: 3,
    title: "نشرة منشآت الربعية - الربيع الثاني",
    date: "2024 يوليو 26",
    description: "نشرة منشآت الربع الثاني - الربع الثاني",
    image: "/images/news-1.png",
  },
  {
    id: 4,
    title: "نشرة منشآت الربعية - الربيع الثاني",
    date: "2024 يوليو 26",
    description: "نشرة منشآت الربع الثاني - الربع الثاني",
    image: "/images/news-2.png",
  },
  {
    id: 5,
    title: "نشرة منشآت الربعية - الربيع الثاني",
    date: "2024 يوليو 26",
    description: "نشرة منشآت الربع الثاني - الربع الثاني",
    image: "/images/news-3.png",
  },
  {
    id: 6,
    title: "نشرة منشآت الربعية - الربيع الثاني",
    date: "2024 يوليو 26",
    description: "نشرة منشآت الربع الثاني - الربع الثاني",
    image: "/images/news-1.png",
  },
]
