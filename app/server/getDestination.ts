import {
  type DestinationElement,
  DestinationElementSchema,
} from "@api/schemas/destination/schema"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"

export const getDestinationElement = async (): Promise<
  DestinationElement[]
> => {
  return getData<DestinationElement>({
    url: "api/po/salary/identification/request/destination/read",
    responseSchema: ResponseSchema,
    dataSchema: DestinationElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: typedItem.id,
          name: typedItem.name,
        }
      })
    },
    dummyData: dummyData,
  })
}

const dummyData: DestinationElement[] = [
  {
    id: 5,
    name: "لمن يهمه الأمر ",
  },
  {
    id: 7,
    name: "مصرف الإنماء",
  },
  {
    id: 16,
    name: " مصرف الراجحى",
  },
]
