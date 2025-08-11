"use server"

import type { NewsListRequest } from "@types"
import {
  NewsElementSchema,
  ResponseSchema,
  type NewsElementType,
} from "@api/schemas"
import { formatDate } from "@utils"
import { getData } from "./getData"

export const getNewsListRequests = async (
  { limit, page } = { limit: 4, page: 1 },
): Promise<NewsListRequest[]> => {
  return getData<NewsListRequest, NewsElementType>({
    revalidate: 86400,
    url: "api/po/read/portal-news",
    includeEmployeeId: false,
    additionalBody: { news_type: "news", limit, page },
    responseSchema: ResponseSchema,
    dataSchema: NewsElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        // Safely handle date formatting
        const createDate =
          typedItem.create_date instanceof Date
            ? typedItem.create_date
            : typedItem.create_date
              ? new Date(String(typedItem.create_date))
              : new Date()

        // Handle image safely
        const imageBase64 =
          typeof typedItem.image === "string" ? typedItem.image : ""

        return {
          id: Number(typedItem.id || 0),
          title: String(typedItem.title || ""),
          date: formatDate(createDate),
          description: String(typedItem.resume || ""),
          image: `data:image/gif;base64,${imageBase64}`,
        }
      })
    },
    dummyData,
  })
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
