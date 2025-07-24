import {
  RelativeRelationElementSchema,
  type RelativeRelationElement,
} from "@api/schemas/relative-relation/schema"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"

export const getRelativeRelations = async (): Promise<
  RelativeRelationElement[]
> => {
  return getData<RelativeRelationElement>({
    url: "api/po/hr/medical/insurance/relative-relation",
    responseSchema: ResponseSchema,
    dataSchema: RelativeRelationElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id),
          name: String(typedItem.name),
        }
      })
    },
    dummyData: dummyData,
  })
}

const dummyData: RelativeRelationElement[] = [
  {
    id: "son",
    name: "إبن",
  },
  {
    id: "daughter",
    name: "إبنة",
  },
  {
    id: "husband",
    name: "زوج (ة)",
  },
  {
    id: "father",
    name: "أب",
  },
  {
    id: "mother",
    name: "أم",
  },
]
