"use server"

import type { Competencies } from "@types"

export const getArtisticCompetenciesRequests = async (): Promise<
  Competencies[]
> => {
  return ArtisticCompetenciesData
}

const ArtisticCompetenciesData: Competencies[] = [
  {
    id: "7",
    competencyName: "البرمجة",
    agreementLevel: "المستوى الثاني القيادة (Leading)",
  },
  {
    id: "8",
    competencyName: "تحليل البيانات",
    agreementLevel: "المستوى الثالث القيادة (Leading)",
  },
  {
    id: "9",
    competencyName: "إدارة قواعد البيانات",
    agreementLevel: "المستوى الأول القيادة (Leading)",
  },
]
