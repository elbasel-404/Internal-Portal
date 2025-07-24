import { TrainingField, TrainingFieldSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"

export const getTrainingFields = async (
  fieldName: string,
): Promise<TrainingField[]> => {
  return getData<TrainingField>({
    url: "api/po/hr/training-request/fields",
    responseSchema: ResponseSchema,
    dataSchema: TrainingFieldSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: Number(typedItem.id),
          name: String(typedItem.name),
          training_type: String(typedItem.training_type),
        }
      })
    },
    additionalBody: { field_name: fieldName },
    dummyData: dummyData,
  })
}

const dummyData: TrainingField[] = [
  {
    id: 5,
    name: "إضافة",
  },
  {
    id: 7,
    name: "تحديث",
  },
  {
    id: 16,
    name: "حذف",
  },
]
