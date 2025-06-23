"use server"

import type { MedicalInsuranceRequest } from "@types"
import {
  MedicalInsuranceElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getData } from "./getData"

export const getMedicalInsuranceRequests = async (): Promise<
  MedicalInsuranceRequest[]
> => {
  return getData<MedicalInsuranceRequest>({
    url: "api/po/hr/medical/insurance/read",
    responseSchema: ResponseSchema,
    dataSchema: MedicalInsuranceElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          date: String(typedItem.date || ""),
          description: String(typedItem.request_type || ""),
          relation: String(typedItem.relative_relation || ""),
          nameAR: String(typedItem.individual_complete_name || ""),
          nameEN: String(typedItem.individual_english_name || ""),
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData: MedicalInsuranceDummyData,
  })
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
