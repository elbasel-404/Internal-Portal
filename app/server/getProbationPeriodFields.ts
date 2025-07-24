import { ProbationEvaluationFieldsSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { ProbationPeriodFields } from "@types"
import { getData } from "./getData"

export const getProbationPeriodFields = async (
  name: string,
): Promise<ProbationPeriodFields[]> => {
  return getData<ProbationPeriodFields>({
    url: "api/po/hr/probation-evaluation/fields",
    responseSchema: ResponseSchema,
    dataSchema: ProbationEvaluationFieldsSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id),
          name: String(typedItem.name),
          display_name: String(typedItem.display_name),
        }
      })
    },
    additionalBody: { field_name: name },
    dummyData: dummyData,
  })
}

const dummyData: ProbationPeriodFields[] = [
  {
    id: "1",
    name: "الموظفين",
    display_name: "الموظفين",
  },
  {
    id: "2",
    name: "الوظائف",
    display_name: "الوظائف",
  },
  {
    id: "3",
    name: "الإدارات",
    display_name: "الإدارات",
  },
  {
    id: "4",
    name: "المشرفين",
    display_name: "المشرفين",
  },
  {
    id: "5",
    name: "التقييمات",
    display_name: "التقييمات",
  },
]
