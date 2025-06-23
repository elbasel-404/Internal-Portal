import type { RequestStatus } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import {
  RequestDetailsWorkflowElementSchema,
  ResponseSchema,
} from "@api/schemas"

export const getRequestStatus = async (
  id: string,
  model: string, // id: string,
): Promise<RequestStatus[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/last_update"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = { res_id: id, res_model: model }
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
  const validatedData = RequestDetailsWorkflowElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const returnedData: RequestStatus[] = validatedData.map((data) => {
    const vacationItem: RequestStatus = {
      id: data.id?.toString(),
      title: data.state[1],
      subtitle: data.employee_name?.toString(),
      icon: data.icon,
      status: data?.status,
    }
    return vacationItem
  })

  return returnedData
}

const dummyData: RequestStatus[] = [
  {
    id: "1",
    title: "مقدم الطلب",
    subtitle: "عساف بن رشود الصاعدي",
    icon: "person",
    status: "completed",
  },
  {
    id: "2",
    title: "المدير المباشر",
    subtitle: "حمد بن يوسف القشيميط",
    icon: "person",
    status: "in-progress",
  },
  {
    id: "3",
    title: "عمليات الموارد البشرية",
    subtitle: "حمد بن يوسف القشيميط",
    icon: "person",
    status: "pending",
  },
  {
    id: "4",
    title: "أُعتمد",
    subtitle: "حمد بن يوسف القشيميط",
    icon: "personConfirmed",
    status: "pending",
  },
]
