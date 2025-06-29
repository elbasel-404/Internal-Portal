"use server"

import type { MedicalInsuranceDetails } from "@types"
import {
  MedicalInsuranceElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getData } from "./getData"

export const getMedicalInsuranceDetails = async (
  id: string,
): Promise<MedicalInsuranceDetails | void> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<MedicalInsuranceDetails>({
    url: "api/po/hr/medical/insurance/read",
    responseSchema: ResponseSchema,
    dataSchema: MedicalInsuranceElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id) || "",
          requestDate: getStringValue(typedData.date),
          insuranceCategory: getArrayValue(
            typedData.medical_insurance_category_id,
          ),
          coverage: getStringValue(typedData.coverage),
          insuranceStartDate: getStringValue(typedData.date_from),
          insuranceEndDate: getStringValue(typedData.date_to),
          insurancePolicy: getArrayValue(typedData.medical_insurance_type_id),
          insuranceValue: getStringValue(typedData.insurance_amount),
          nameAR: getStringValue(typedData.individual_complete_name),
          nameEN: getStringValue(typedData.individual_english_name) || "NA",
          relationType: getStringValue(typedData.relative_relation),
          requestType: getStringValue(typedData.request_type),
          attachments: Array.isArray(typedData.attachment_ids)
            ? typedData.attachment_ids.map(
                (file: string | number) => new File([""], file.toString()),
              )
            : [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
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
