"use server"

import { FamilyNewSchema, ResponseSchema } from "@api/schemas"
import type { NewsFamily } from "@types"
import { formatDate } from "@utils"
import { getData } from "./getData"

export const getFamilyNewsList = async (): Promise<NewsFamily[]> => {
  return getData<NewsFamily>({
    url: "api/po/read/portal-news",
    includeEmployeeId: false,
    additionalBody: { news_type: "family_news" },
    responseSchema: ResponseSchema,
    dataSchema: FamilyNewSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, any>
        return {
          id: typedItem.id,
          title: typedItem.title,
          date: formatDate(typedItem.create_date),
          image: typedItem.image
            ? `data:image/gif;base64,${typedItem.image}`
            : "/monshaatFamily-1.svg",
          description: typedItem.resume,
        }
      })
    },
    dummyData,
  })
}

const dummyData: NewsFamily[] = [
  {
    id: 1,
    title:
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 - 07:54 صباحاً",
    image: "/monshaatFamily-1.svg",
    description: "",
  },
  {
    id: 2,
    title:
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 - 07:54 صباحا",
    image: "/monshaatFamily-2.svg",
    description: "",
  },
  {
    id: 3,
    title:
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 - 07:54 صباحا",
    image: "/monshaatFamily-3.svg",
    description: "",
  },
  {
    id: 4,
    title:
      "رزقت الزميلة: لمياء بنت عبدالله الربيعان بأحمد جعله الله من مواليد ال...",
    date: "01.06.2024 - 07:54 صباحا",
    image: "/MonshaatFamily-4.svg",
    description: "",
  },
]
