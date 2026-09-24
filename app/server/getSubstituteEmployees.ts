import {
  SubstituteEmployees,
  SubstituteEmployeesSchema,
} from "@api/schemas/index"
import { getSession } from "@auth"
import { z } from "zod"
import { getDemo } from "../db/actions/getDemo"

export const getSubstituteEmployees = async (): Promise<
  SubstituteEmployees[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  const session = await getSession()
  if (!session) return []

  const { access_token } = session
  const BEARER_TOKEN = access_token

  // ! VARIABLES
  // ! ==================================
  const requestUrl =
    "https://apis.monshaat.gov.sa/ERP/TaskService/api/call/all.requests/get_substitute_employees"
  const myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${BEARER_TOKEN}`)
  myHeaders.append("x-api-key", "API_KEY")
  myHeaders.append(
    "Cookie",
    "session_id=299e50186cad4718cbcbcb7767a599784865e408",
  )
  // ! FETCH
  // ! ==================================
  const apiResponse = await fetch(requestUrl, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  })
  const responseJson = await apiResponse.json()

  // ! VALIDATION
  // ! ==================================
  const schema = z.object({
    id: z.any(),
    name: z.any(),
    complete_name: z.any(),
    family_name: z.any(),
  })
  const validatedResponse = schema.array().parse(responseJson)
  const validatedData =
    SubstituteEmployeesSchema.array().parse(validatedResponse)

  // ! PARSING
  // ! ==================================

  const returnedData: SubstituteEmployees[] = validatedData.map((data) => {
    const substituteEmployee: SubstituteEmployees = {
      id: data.id,
      name: data.name,
      complete_name: data.complete_name,
      family_name: data.family_name,
    }
    return substituteEmployee
  })

  return returnedData
}

const dummyData: SubstituteEmployees[] = [
  {
    complete_name: "سارا بنت عبدالعزيز المنقور",
    family_name: "المنقور",
    id: 299,
    name: "سارا",
  },
  {
    complete_name: "سعود بن خالد السبهان",
    family_name: "السبهان",
    id: 975,
    name: "سعود",
  },
  {
    complete_name: "عبدالله  بن ناصر السلهام",
    family_name: "السلهام",
    id: 2156,
    name: "عبدالله ",
  },
  {
    complete_name: "عبدالمجيد بن حسن العمراني ",
    family_name: "العمراني ",
    id: 1877,
    name: "عبدالمجيد",
  },
  {
    complete_name: "فواز  بن محمود  التميمي ",
    family_name: "التميمي ",
    id: 2043,
    name: "فواز ",
  },
  {
    complete_name: "هيفاء  بنت يوسف  الشنيفي ",
    family_name: "الشنيفي ",
    id: 1597,
    name: "هيفاء ",
  },
]
