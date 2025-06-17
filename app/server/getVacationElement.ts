import { ResponseSchema } from "@api/schemas/responseSchema"
import type { VacationType } from "@api/schemas/vacation-types/schema"
import { VacationTypeSchema } from "@api/schemas/vacation-types/schema"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getVacationElements = async (): Promise<VacationType[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/holidays/status/by_gender"
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
  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = VacationTypeSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const returnedData: VacationType[] = validatedData.map((data) => {
    const vacationItem: VacationType = {
      id: data.id,
      name: data.name,
      display_name: data.display_name,
    }
    return vacationItem
  })

  return returnedData
}

const dummyData: VacationType[] = [
  {
    id: 5,
    name: "إجازة سنوية",
    display_name: "إجازة سنوية",
  },
  {
    id: 7,
    name: "إجازة مرضيّة",
    display_name: "إجازة مرضيّة",
  },
  {
    id: 16,
    name: "إجازة المولود",
    display_name: "إجازة المولود",
  },
  {
    id: 18,
    name: "إجازة وفاة",
    display_name: "إجازة وفاة",
  },
  {
    id: 25,
    name: "إجازة زواج",
    display_name: "إجازة زواج",
  },
  {
    id: 26,
    name: "حج",
    display_name: "حج",
  },
  {
    id: 34,
    name: "اجازه عن بعد",
    display_name: "اجازه عن بعد",
  },
]
