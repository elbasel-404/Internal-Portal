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
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: formatDate(item.create_date),
        image: item.image
          ? `data:image/gif;base64,${item.image}`
          : "/monshaatFamily-1.svg",
        description: item.resume,
      }))
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
