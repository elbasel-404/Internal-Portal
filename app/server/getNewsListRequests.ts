"use server"

import type { NewsListRequest } from "@types"
import { NewsElementSchema, ResponseSchema } from "@api/schemas"
import { formatDate } from "@utils"
import { getData } from "./getData"

export const getNewsListRequests = async (): Promise<NewsListRequest[]> => {
  return getData<NewsListRequest>({
    url: "api/po/read/portal-news",
    includeEmployeeId: false,
    additionalBody: { news_type: "news" },
    responseSchema: ResponseSchema,
    dataSchema: NewsElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, any>
        return {
          id: typedItem.id,
          title: typedItem.title,
          date: formatDate(typedItem.create_date),
          description: typedItem.resume,
          image: `data:image/gif;base64,${typedItem.image}`,
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
