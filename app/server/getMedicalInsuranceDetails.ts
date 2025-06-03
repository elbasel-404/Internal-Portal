"use server"

import type { MedicalInsuranceDetails } from "@types"
import {
  MedicalInsuranceElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getMedicalInsuranceDetails = async (
  id: string,
): Promise<MedicalInsuranceDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/medical/insurance/read"
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
  const validatedData = MedicalInsuranceElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: MedicalInsuranceDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.date,
    insuranceCategory:
      validatedData.medical_insurance_category_id[1]?.toString(),
    coverage: validatedData.coverage.toString(),
    insuranceStartDate: validatedData.date_from.toString(),
    insuranceEndDate: validatedData.date_to.toString(),
    insurancePolicy: validatedData.medical_insurance_type_id[1]?.toString(),
    insuranceValue: validatedData.insurance_amount.toString(),
    nameAR: validatedData.individual_complete_name,
    nameEN: validatedData.individual_english_name || "NA",
    relationType: validatedData.relative_relation,
    requestType: validatedData.request_type,
    attachments: validatedData.attachment_ids.map(
      (file) => new File([""], file.toString()),
    ),
  }

  return returnedData
}
const dummyData: MedicalInsuranceDetails = {
  id: "1",
  requestDate: "2021-09-01",
  requestType: "استبعاد",
  relationType: "ابن",
  nameAR: "محمود بن الحميد",
  nameEN: "Mahmoud Al Hamid",
  insurancePolicy: "التعاونية 2024",
  insuranceCategory: "VIP",
  insuranceValue: "0.05",
  coverage: "سنوي",
  insuranceStartDate: "15-12-2024",
  insuranceEndDate: "30-12-2024",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
