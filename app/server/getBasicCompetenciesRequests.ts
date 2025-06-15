"use server"

import type { Competencies } from "@types"

export const getBasicCompetenciesRequests = async (): Promise<
  Competencies[]
> => {
  return BasicCompetenciesData
}

const BasicCompetenciesData: Competencies[] = [
  {
    id: "4",
    competencyName: "التواصل الفعال",
    agreementLevel: "المستوى الثالث القيادة (Leading)",
  },
  {
    id: "5",
    competencyName: "إدارة الوقت",
    agreementLevel: "المستوى الثاني القيادة (Leading)",
  },
  {
    id: "6",
    competencyName: "العمل الجماعي",
    agreementLevel: "المستوى الأول القيادة (Leading)",
  },
]
