"use server"

import { AdNewSchema, ResponseSchema } from "@api/schemas"
import type { AdsNewsDetails } from "@types"
import { getData } from "./getData"
export const getAdsNewsDetails = async (
  id: string,
): Promise<AdsNewsDetails | void> => {
  const requestBody = {
    news_type: "ads",
    news_id: id,
  }

  const result = await getData<AdsNewsDetails>({
    url: "api/po/read/portal-news",
    responseSchema: ResponseSchema,
    dataSchema: AdNewSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: Number(typedData.id),
          title: String(typedData.title),
          date: new Date(
            typedData.create_date as string | number | Date,
          ).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          description: String(typedData.description),
          imageUrl: `data:image/gif;base64,${String(typedData.image)}`,
        },
      ]
    },
    additionalBody: requestBody,
    dummyData: [dummyData],
  })
  return result[0]
}

const dummyData: AdsNewsDetails = {
  id: 1,
  title: "نشرة منشآت الربعية - الربيع الثاني",
  date: "2024 يوليو 26",
  description: "نشرة منشآت الربع الثاني - الربع الثاني",
  imageUrl: "/images/news-2.png",
}
