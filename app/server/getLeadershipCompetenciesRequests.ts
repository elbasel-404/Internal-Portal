"use server"

import type { Competencies } from "@types"

export const getLeadershipCompetenciesRequests = async (): Promise<
  Competencies[]
> => {
  return LeadershipCompetenciesData
}

const LeadershipCompetenciesData: Competencies[] = [
  {
    id: "1",
    competencyName: "القيادة الاستراتيجية",
    agreementLevel: "المستوى الأول القيادة (Leading)",
  },
  {
    id: "2",
    competencyName: "اتخاذ القرار",
    agreementLevel: "المستوى الثاني القيادة (Leading)",
  },
  {
    id: "3",
    competencyName: "إدارة الفريق",
    agreementLevel: "المستوى الثالث القيادة (Leading)",
  },
]
