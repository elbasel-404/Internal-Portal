"use server"

import { FamilyNewSchema, ResponseSchema } from "@api/schemas"
import type { NewsFamily } from "@types"
// Removed unused import: import { formatNewsDate } from "@utils"
import { formatDate } from "@utils"
import { getData } from "./getData"

export const getFamilyNewsDetails = async (
  id: string,
): Promise<NewsFamily | void> => {
  const requestBody = {
    news_type: "family_news",
    news_id: id,
  }

  const result = await getData<NewsFamily>({
    url: "api/po/read/portal-news",
    responseSchema: ResponseSchema,
    dataSchema: FamilyNewSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: Number(typedData.id),
          title: String(typedData.title),
          date: formatDate(
            typedData.create_date instanceof Date
              ? typedData.create_date
              : typedData.create_date
                ? new Date(String(typedData.create_date))
                : new Date(),
          ),
          image: typedData.image
            ? `data:image/gif;base64,${typedData.image}`
            : "/monshaatFamily-1.svg",
          description: String(typedData.resume ?? ""),
        },
      ]
    },
    additionalBody: requestBody,
    dummyData: [dummyData],
  })
  return result[0]
}
const dummyData: NewsFamily = {
  id: 1,
  title:
    "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
  date: "01.06.2024 - 07:54 صباحاً",
  image: "/monshaatFamily-1.svg",
  description: "",
}
