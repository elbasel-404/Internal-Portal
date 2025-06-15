"use server"

import { EmployeeMemberSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "@db/actions"
import type { EmployeeMembersDetails } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getEmployeeMembersDetails = async (
  id: string,
): Promise<EmployeeMembersDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return employeeMembersDetails

  const renderRequestTypeValue = (value: string) => {
    if (value === "add") {
      return "إضافة"
    } else if (value === "update") {
      return "تحديث"
    } else {
      return "حذف"
    }
  }

  const renderRelativeRelationTypeValue = (value: string) => {
    if (value === "father") {
      return "أب"
    } else if (value === "mother") {
      return "أم"
    } else if (value === "son") {
      return "إبن"
    } else if (value === "daughter") {
      return "إبنة"
    } else {
      return "زوج (ة)"
    }
  }

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/employee/members/read"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
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
  const validatedData = EmployeeMemberSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: EmployeeMembersDetails = {
    id: validatedData.id.toString(),
    date: validatedData.date,
    requestType: renderRequestTypeValue(validatedData.type),
    relation: renderRelativeRelationTypeValue(validatedData.relative_relation),
    nameAr: validatedData.individual_complete_name,
    nameEn: validatedData.individual_english_name,
    idNumber: validatedData.identity,
    birthDate: validatedData.birthday,
    attachments: validatedData.attachment_ids.map(
      (file: any) => new File([""], file.toString()),
    ),
  }

  return returnedData
}

const employeeMembersDetails: EmployeeMembersDetails = {
  id: "1",
  date: "2024-05-05",
  requestType: "اضافة",
  relation: "أب",
  nameAr: "يوسف حمد عبد الله القشيمط",
  nameEn: "youssef Hamad Abdullah Alqushaymit",
  idNumber: "10326569",
  birthDate: "2024-05-05 ",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
