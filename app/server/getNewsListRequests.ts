"use server"

import type { NewsListRequest } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { NewsElementSchema, ResponseSchema } from "@api/schemas"
import { formatDate } from "@utils"
export const getNewsListRequests = async (): Promise<NewsListRequest[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/read/portal-news"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  if (!headers) return []
  const requestBody = { news_type: "news" }
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
  const validatedData = NewsElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: NewsListRequest[] = validatedData.map((data) => {
    const newsItem: NewsListRequest = {
      id: data.id,
      title: data.title,
      date: formatDate(data.create_date),
      description: data.resume,
      image: `data:image/gif;base64,${data.image}`,
    }
    return newsItem
  })
  return returnedData
}

const dummyData: NewsListRequest[] = [
  {
    id: 1,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-1.svg",
  },
  {
    id: 2,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-2.svg",
  },
  {
    id: 3,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-3.svg",
  },
  {
    id: 4,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-1.svg",
  },
  {
    id: 5,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-2.svg",
  },
  {
    id: 6,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-3.svg",
  },
  {
    id: 7,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-1.svg",
  },
  {
    id: 8,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-2.svg",
  },
  {
    id: 9,
    title: '"منشآت" تطلق جولة الامتياز التجاري أغسطس المقبل في 14 مدينة...',
    date: "الجمعة 26 يوليو 2024",
    description:
      "نظمت الهية العامة للمنشآت الصغيرة والمتوطسة منشآت في مركز ذكا اليوم الحفل الختامي....",
    image: "/news-3.svg",
  },
]
