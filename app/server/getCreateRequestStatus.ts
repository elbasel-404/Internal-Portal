import type { CreateRequestStatus } from "@types"
// import {
//   RequestCreateWorkflowElementSchema,
//   ResponseSchema,
// } from "../../api-schemas"
// import { getDemo } from "../db/actions/getDemo"
// import { getFetchHeaders } from "./getFetchHeaders"

export const getCreateRequestStatus = async (
  model?: string,
): Promise<CreateRequestStatus[]> => {
  return dummyData
  // const isDemo = await getDemo()
  // if (isDemo) return dummyData

  // // ! VARIBLES
  // // ! ==================================
  // const url = "api/po/request_workflow"
  // const apiRootUrl = process.env.API_ROOT_URL as string
  // const fetchHeaders = await getFetchHeaders()
  // const headers = fetchHeaders?.headers
  // const requestBody = { model: model }
  // const requestBodyString = JSON.stringify(requestBody)
  // const requestUrl = `${apiRootUrl}/${url}`

  // // ! FETCH
  // // ! ==================================
  // const apiResponse = await fetch(requestUrl, {
  //   headers,
  //   method: "POST",
  //   body: requestBodyString,
  // })
  // const responseJson = await apiResponse.json()

  // // ! VALIDATION
  // // ! ==================================
  // const validatedResponse = ResponseSchema.parse(responseJson)
  // const { result } = validatedResponse
  // const { data } = result
  // const validatedData = RequestCreateWorkflowElementSchema.array().parse(data)

  // // ! PARSING
  // // ! ==================================

  // const returnedData: CreateRequestStatus[] = validatedData.map((data) => {
  //   const vacationItem: CreateRequestStatus = {
  //     status: data.state,
  //   }
  //   return vacationItem
  // })

  // return returnedData
}

const dummyData: CreateRequestStatus[] = [
  {
    status: "طلب",
  },
  {
    status: "المدير المباشر",
  },
  {
    status: "عمليات الموارد البشرية",
  },
  {
    status: "أعتمد",
  },
]
