"use server"

import type { BankAccountRequest } from "@types"
import {
  ChangeBankAccountElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { getStoredEmployeeId } from "@auth"

export const getBankAccountRequests = async (): Promise<
  BankAccountRequest[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return BankAccountDummyData
  const employeeId = await getStoredEmployeeId()

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/change-bank-request"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
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
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = ChangeBankAccountElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: BankAccountRequest[] = validatedData.map((data) => {
    const bankAccountItem: BankAccountRequest = {
      id: data.id.toString(),
      date: data.create_date.toISOString().split("T")[0],
      status: data.state,
    }
    return bankAccountItem
  })

  return returnedData
}

const BankAccountDummyData: BankAccountRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    status: "طلب",
  },
  {
    id: "#53965",
    date: "2024-05-05",
    status: "المدير المباشر",
  },
  {
    id: "#57965",
    date: "2024-05-05",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#52965",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55955",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#54965",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55968",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55645",
    date: "2024-05-05",
    status: "المدير المباشر",
  },
  {
    id: "#55974",
    date: "2024-05-05",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#51965",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#54565",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55765",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#51265",
    date: "2024-05-05",
    status: "اعتمد",
  },
]
