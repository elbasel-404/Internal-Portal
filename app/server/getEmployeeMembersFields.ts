"use server"

import {
  EmployeeMembersField,
  EmployeeMembersFieldSchema,
} from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getData } from "./getData"

export const getEmployeeMembersFields = async (
  field_name: string,
): Promise<EmployeeMembersField[]> => {
  return getData<EmployeeMembersField>({
    url: "api/po/hr/employee/members/fields",
    additionalBody: { field_name: field_name },
    responseSchema: ResponseSchema,
    dataSchema: EmployeeMembersFieldSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: typedItem.id || 0,
          name: String(typedItem.name || ""),
          birthday: typedItem.birthday as string | undefined,
          family_name_ar: typedItem.family_name_ar as string | undefined,
          family_name_en: typedItem.family_name_en as string | undefined,
          father_name_ar: typedItem.father_name_ar as string | undefined,
          father_name_en: typedItem.father_name_en as string | undefined,
          first_name_ar: typedItem.first_name_ar as string | undefined,
          first_name_en: typedItem.first_name_en as string | undefined,
          grandfather_name_ar: typedItem.grandfather_name_ar as
            | string
            | undefined,
          grandfather_name_en: typedItem.grandfather_name_en as
            | string
            | undefined,
          identity: typedItem.identity as string | undefined,
          relative_relation: typedItem.relative_relation as string | undefined,
          individual_complete_name: typedItem.individual_complete_name as
            | string
            | undefined,
        }
      })
    },
    dummyData,
  })
}

const dummyData: EmployeeMembersField[] = [
  {
    id: "add",
    name: "إضافة",
  },
  {
    id: "update",
    name: "تحديث",
  },
  {
    id: "delete",
    name: "حذف",
  },
]
