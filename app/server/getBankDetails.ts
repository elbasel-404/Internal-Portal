import {
  BankDetailSchema,
  type BankDetail,
} from "@api/schemas/bank-details/schema"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
// Removed unused import: import { da } from "date-fns/locale"

export const getBankDetails = async (): Promise<BankDetail[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/new-bank"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
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
  const validatedData = BankDetailSchema.array().parse(data)

  // ! PARSING
  // ! ==================================

  const returnedData: BankDetail[] = validatedData.map((data) => {
    const bankItem: BankDetail = {
      id: data.id,
      name: data.name,
      display_name: data.display_name,
      street: data.street,
      street2: data.street2,
      zip: data.zip,
      city: data.city,
      state: data.state,
      country: data.country,
      email: data.email,
      phone: data.phone,
      active: data.active,
      bic: data.bic,
      create_uid: data.create_uid,
      write_date: data.write_date,
      __last_update: data.__last_update,
      create_date: data.create_date,
      write_uid: data.write_uid,
    }
    return bankItem
  })

  return returnedData
}

const dummyData: BankDetail[] = [
  {
    id: 1,
    name: "Dummy Bank 1",
    street: false,
    street2: false,
    zip: false,
    city: false,
    state: false,
    country: false,
    email: false,
    phone: false,
    active: true,
    bic: false,
    create_uid: [1, "admin"],
    create_date: new Date("2023-01-01"),
    write_uid: [2, "editor"],
    write_date: new Date("2023-01-02"),
    display_name: "Dummy Bank 1 - DUMMY1",
    __last_update: new Date("2023-01-03"),
  },
  {
    id: 2,
    name: "Dummy Bank 2",
    street: false,
    street2: false,
    zip: false,
    city: "Sample City",
    state: false,
    country: [1, "CountryName"],
    email: false,
    phone: false,
    active: true,
    bic: "DUMMYBIC",
    create_uid: [3, "creator"],
    create_date: new Date("2023-02-01"),
    write_uid: [4, "updater"],
    write_date: new Date("2023-02-02"),
    display_name: "Dummy Bank 2 - DUMMY2",
    __last_update: new Date("2023-02-03"),
  },
]
