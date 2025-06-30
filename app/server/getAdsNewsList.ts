"use server"

import type { AdsListRequst } from "@types"
import { AdNewSchema, ResponseSchema } from "@api/schemas"
import { getData } from "./getData"

type GetAdsNewsListArgs = {
  limit?: number
  page?: number
}

/**
 * Fetches a list of ads news.
 *
 * @param {GetAdsNewsListArgs} args - The arguments for fetching ads news.
 * @param {number} [args.limit] - The maximum number of ads to fetch.
 * @returns {Promise<AdsListRequst[]>} A promise that resolves to an array of ads news.
 */
export const getAdsNewsList = async ({
  limit,
  page,
}: GetAdsNewsListArgs): Promise<AdsListRequst[]> => {
  return getData<AdsListRequst>({
    url: "api/po/read/portal-news",
    includeEmployeeId: false,
    additionalBody: { news_type: "ads", limit, page },
    responseSchema: ResponseSchema,
    dataSchema: AdNewSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: Number(typedItem.id || 0),
          title: String(typedItem.title || ""),
          date: new Date(
            String(typedItem.create_date || ""),
          ).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          description: String(typedItem.resume || ""),
          image: `data:image/gif;base64,${String(typedItem.image || "")}`,
        }
      })
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
