import {
  EmployeeMembersField,
  EmployeeMembersFieldSchema,
} from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getEmployeeMembersFields = async (
  fieldName: string,
): Promise<EmployeeMembersField[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/employee/members/fields"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = { field_name: fieldName }
  const requestBodyString = JSON.stringify(requestBody)
  const requestUrl = `${apiRootUrl}/${url}`

  // ! FETCH
  // ! ==================================
  const apiResponse = await fetch(requestUrl, {
    headers,
    method: "POST",
    body: requestBodyString,
  })
  const responseJson = await apiResponse.json()

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = EmployeeMembersFieldSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const returnedData: EmployeeMembersField[] = validatedData.map((data) => {
    const employeeMemberFieldItem: EmployeeMembersField = {
      id: data.id,
      name: data.name,
      birthday: data.birthday,
      family_name_ar: data.family_name_ar,
      family_name_en: data.family_name_en,
      father_name_ar: data.family_name_ar,
      father_name_en: data.father_name_en,
      first_name_ar: data.first_name_ar,
      first_name_en: data.first_name_en,
      grandfather_name_ar: data.grandfather_name_ar,
      grandfather_name_en: data.grandfather_name_en,
      identity: data.identity,
      relative_relation: data.relative_relation,
      individual_complete_name: data.individual_complete_name,
    }
    return employeeMemberFieldItem
  })

  return returnedData
}

const dummyData: EmployeeMembersField[] = [
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
