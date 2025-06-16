"use server"

import { getStoredEmployeeId } from "@auth"
import type { MedicalInsuranceRequest } from "@types"
import {
  MedicalInsuranceElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getMedicalInsuranceRequests = async (): Promise<
  MedicalInsuranceRequest[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return MedicalInsuranceDummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/medical/insurance/read"
  const employeeId = await getStoredEmployeeId()
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
  const validatedData = MedicalInsuranceElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: MedicalInsuranceRequest[] = validatedData.map((data) => {
    const vacationItem: MedicalInsuranceRequest = {
      id: data.id.toString(),
      date: data.date,
      description: data.request_type,
      relation: data.relative_relation,
      nameAR: data.individual_complete_name,
      nameEN: data.individual_english_name,
      status: data.state,
    }
    return vacationItem
  })

  return returnedData
}

const MedicalInsuranceDummyData: MedicalInsuranceRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    description: "استبعاد",
    relation: "ابن",
    nameAR: "محمد بن الحميد",
    nameEN: "Muhammed Al Hamid",
    status: "الموظف",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    description: "إضافة",
    relation: "ابنة",
    nameAR: "سارة بنت الحميد",
    nameEN: "Sarah Al Hamid",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    description: "استبعاد",
    relation: "زوجة",
    nameAR: "فاطمة عبد الرحمن",
    nameEN: "Fatima Abdulrahman",
    status: "اعتمد",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    description: "إضافة",
    relation: "ابن",
    nameAR: "عبدالله بن الحميد",
    nameEN: "Abdullah Al Hamid",
    status: "الموظف",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    description: "إضافة",
    relation: "زوج (ة)",
    nameAR: "ريم السالم",
    nameEN: "Reem Al Salem",
    status: "اعتمد",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    description: "استبعاد",
    relation: "ابن",
    nameAR: "علي بن الحميد",
    nameEN: "Ali Al Hamid",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    description: "استبعاد",
    relation: "ابنة",
    nameAR: "نور بنت الحميد",
    nameEN: "Noor Al Hamid",
    status: "الموظف",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    description: "إضافة",
    relation: "ابن",
    nameAR: "محمود بن الحميد",
    nameEN: "Mahmoud Al Hamid",
    status: "اعتمد",
  },
]
