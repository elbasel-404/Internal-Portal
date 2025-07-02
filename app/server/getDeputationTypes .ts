import { DeputationType, DeputationTypeSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"

export const getDeputationTypes = async (): Promise<DeputationType[]> => {
  return getData<DeputationType>({
    url: "api/po/hr/deputation_type",
    includeEmployeeId: false,
    responseSchema: ResponseSchema,
    dataSchema: DeputationTypeSchema,
    parseData: (data) => {
      return data.map((item) => {
        const deputationItem = item as DeputationType;
        return {
          id: String(deputationItem.id || ""),
          name: String(deputationItem.name || ""),
        }
      })
    },
    dummyData,
  })
}

const dummyData: DeputationType[] = [
  {
    id: "1",
    name: "مهمة عمل",
  },
  {
    id: "7",
    name: "رحلة تدريب",
  },
]
