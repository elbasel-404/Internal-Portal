import {
  type DestinationElement,
  DestinationElementSchema,
} from "@api/schemas/destination/schema"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getDestinationElement = async (): Promise<
  DestinationElement[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/salary/identification/request/destination/read"
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
  const validatedData = DestinationElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const returnedData: DestinationElement[] = validatedData.map((data) => {
    const destinationItem: DestinationElement = {
      id: data.id,
      name: data.name,
    }
    return destinationItem
  })

  return returnedData
}

const dummyData: DestinationElement[] = [
  {
    id: 5,
    name: "لمن يهمه الأمر ",
  },
  {
    id: 7,
    name: "مصرف الإنماء",
  },
  {
    id: 16,
    name: " مصرف الراجحى",
  },
]
