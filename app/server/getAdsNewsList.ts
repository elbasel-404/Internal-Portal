"use server"

import type { AdsListRequst } from "@types"
import { AdNewSchema, ResponseSchema } from "@api/schemas"
import { getData } from "./getData"

export const getAdsNewsList = async (): Promise<AdsListRequst[]> => {
  return getData<AdsListRequst>({
    url: "api/po/read/portal-news",
    includeEmployeeId: false,
    additionalBody: { news_type: "ads" },
    responseSchema: ResponseSchema,
    dataSchema: AdNewSchema,
    parseData: (data) => {
      return data.map(
        (item: {
          id: number
          title: string
          create_date: string
          resume: string
          image: string
        }) => ({
          id: item.id,
          title: item.title,
          date: new Date(item.create_date).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          description: item.resume,
          image: `data:image/gif;base64,${item.image}`,
        }),
      )
    },
    dummyData,
  })
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
