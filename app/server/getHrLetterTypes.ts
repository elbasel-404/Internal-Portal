import {
  type HrLetterType,
  HrLetterTypeSchema,
} from "@api/schemas/hr-letter-types/schema"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getHrLetterTypes = async (): Promise<HrLetterType[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/salary/identification/request/type/read"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = {}
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
  console.log({ responseJson })

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = HrLetterTypeSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const returnedData: HrLetterType[] = validatedData.map((data) => {
    const destinationItem: HrLetterType = {
      id: data.id.toString(),
      name: data.name,
    }
    return destinationItem
  })

  return returnedData
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
