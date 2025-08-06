"use server"

import { FamilyNewSchema, ResponseSchema } from "@api/schemas"
import type { NewsFamily } from "@types"
import { formatDate } from "@utils"
import { getData } from "./getData"

export const getFamilyNewsList = async (
  { limit, page } = { limit: 4, page: 1 },
): Promise<NewsFamily[]> => {
  return getData<NewsFamily>({
    revalidate: 86400,
    url: "api/po/read/portal-news",
    includeEmployeeId: false,
    additionalBody: { news_type: "family_news", limit, page },
    responseSchema: ResponseSchema,
    dataSchema: FamilyNewSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        // Safe type handling
        const id = typeof typedItem.id === "number" ? typedItem.id : 0
        const imageData =
          typeof typedItem.image === "string" ? typedItem.image : ""
        const createDate =
          typedItem.create_date instanceof Date
            ? typedItem.create_date
            : typedItem.create_date
              ? new Date(String(typedItem.create_date))
              : new Date()

        return {
          id: id,
          title: String(typedItem.title || ""),
          date: formatDate(createDate),
          image: imageData
            ? `data:image/gif;base64,${imageData}`
            : "/monshaatFamily-1.svg",
          description: String(typedItem.resume || ""),
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
