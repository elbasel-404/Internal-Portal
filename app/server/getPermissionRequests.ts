"use server"

import type { PermissionRequest } from "@types"
// import { PermissionElementSchema, ResponseSchema } from '../../api-schemas';
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { getStoredEmployeeId } from "@auth"

export const getPermissionRequests = async (): Promise<PermissionRequest[]> => {
  const isDemo = await getDemo()
  if (isDemo) return PermissionDummyData

  // ! VARIABLES
  // ! ==================================
  const employeeId = await getStoredEmployeeId()
  const url = "api/po/hr/authorization"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = { employee_id: employeeId }
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
  // const validatedResponse = ResponseSchema.parse(responseJson);
  // const { result } = validatedResponse;
  // const { data } = result;
  // const validatedData = PermissionElementSchema.array().parse(data);

  // ! PARSING
  // ! ==================================
  // const returnedData: PermissionRequest[] = validatedData.map((data) => {
  //   const vacationItem: PermissionRequest = {
  //     id: data.id.toString(),
  //     date: data.create_date.toISOString().split('T')[0],
  //     description: data.type_id[1].toString(),
  //     fromDate: data.date_from,
  //     toDate: data.date_to,
  //     timing: `من ${data.hour_from.toFixed(2)} الى ${data.hour_to.toFixed(2)}`,
  //     durationInHours: data.hour_number.toFixed(2),
  //     status: data.state,
  //   };
  //   return vacationItem;
  // });

  // return returnedData;
  return PermissionDummyData
}

const PermissionDummyData: PermissionRequest[] = [
  {
    id: "#dummy",
    date: "2024-05-05",
    description: "استئذان عمل",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "طلب",
  },
  {
    id: "#53965",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "2",
    status: "المدير المباشر",
  },
  {
    id: "#57965",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "5",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#52965",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "6",
    status: "اعتمد",
  },
  {
    id: "#55955",
    date: "2024-05-05",
    description: "استئذان عمل",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "4",
    status: "اعتمد",
  },
  {
    id: "#54965",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "7",
    status: "اعتمد",
  },
  {
    id: "#55968",
    date: "2024-05-05",
    description: "استئذان عمل",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "اعتمد",
  },
  {
    id: "#55645",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "5",
    status: "المدير المباشر",
  },
  {
    id: "#55974",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#51965",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "اعتمد",
  },
  {
    id: "#54565",
    date: "2024-05-05",
    description: "استئذان عمل",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "اعتمد",
  },
  {
    id: "#55765",
    date: "2024-05-05",
    description: "استئذان شخصي",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "اعتمد",
  },
  {
    id: "#51265",
    date: "2024-05-05",
    description: "استئذان عمل",

    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    timing: "من 10:00 إلى 13:00",
    durationInHours: "3",
    status: "اعتمد",
  },
]
