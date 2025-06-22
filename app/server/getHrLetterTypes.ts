import {
  type HrLetterType,
  HrLetterTypeSchema,
} from "@api/schemas/hr-letter-types/schema"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"

export const getHrLetterTypes = async (): Promise<HrLetterType[]> => {
  return getData<HrLetterType>({
    url: "api/po/salary/identification/request/type/read",
    includeEmployeeId: false,
    responseSchema: ResponseSchema,
    dataSchema: HrLetterTypeSchema,
    parseData: (data) => {
      return data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
      }))
    },
    dummyData,
  })
}

const dummyData: HrLetterType[] = [
  {
    id: "salary_detail",
    name: "تعريف بتفاصيل الراتب",
  },
  {
    id: "salary_check",
    name: "تثبيت راتب",
  },
  {
    id: "total_salary",
    name: "اجمالي الراتب",
  },
]
