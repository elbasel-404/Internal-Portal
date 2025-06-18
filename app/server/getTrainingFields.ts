import {
  TrainingField,
  TrainingFieldSchema
} from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getTrainingFields = async (
  fieldName: string,
): Promise<TrainingField[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/training-request/fields"
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

  console.log(responseJson)

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = TrainingFieldSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const returnedData: TrainingField[] = validatedData.map((data) => {
    const employeeMemberFieldItem: TrainingField = {
      id: data.id,
      name: data.name,
      training_type: data.training_type,
    }
    return employeeMemberFieldItem
  })

  return returnedData
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
