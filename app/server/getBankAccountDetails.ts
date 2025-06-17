"use server"

import type { BankAccountDetails } from "@types"
import {
  ChangeBankAccountElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getBankAccountDetails = async (
  id: string,
): Promise<BankAccountDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/change-bank-request"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = { id: id }
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
  const validatedData = ChangeBankAccountElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: BankAccountDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.create_date.toISOString().split("T")[0],
    employeeCurrentAccount: validatedData.current_employee_account,
    bankName: validatedData.new_bank_id[1].toString(),
    ibanNumber: validatedData.iban,
    accountStatus: validatedData.state,
  }

  return returnedData
}

const dummyData: BankAccountDetails = {
  id: "1",
  requestDate: "2021-09-01",
  employeeCurrentAccount: "البنك العربي الوطني - SA2030400108051444390029",
  bankName: "ADCB, Alkarama Brunch, Dubai, UAE",
  ibanNumber: "SA2030400108051444390029",
  accountStatus: "مثبت",
}
