"use server"

import { ProbationEvaluationElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { ProbationPeriodRequest } from "@types"
import { getData } from "./getData"

export const getProbationPeriodRequests = async (): Promise<
  ProbationPeriodRequest[]
> => {
  return getData<ProbationPeriodRequest>({
    url: "api/po/hr/probation-evaluation",
    responseSchema: ResponseSchema,
    dataSchema: ProbationEvaluationElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          date: String(typedItem.date || ""),
          employee:
            Array.isArray(typedItem.employee_id) &&
            typedItem.employee_id.length > 1
              ? String(typedItem.employee_id[1])
              : "",
          jobTitle: String(typedItem.number || ""),
          recommendation: String(typedItem.recommendation || ""),
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData: ProbationPeriodDummyData,
  })
}

const ProbationPeriodDummyData: ProbationPeriodRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    employee: "عبدالله بن حسين جفري [1651]",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    recommendation: "اجتياز فترة التجربة",
    status: "الموظف",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    employee: "سعود محمد القحطاني [1652]",
    jobTitle: "محلل نظم موارد بشرية",
    recommendation: "تمديد فترة التجربة",
    status: "المدير المباشر",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    employee: "فهد عبدالعزيز الدوسري [1654]",
    jobTitle: "أخصائي موارد بشرية",
    recommendation: "إنهاء الخدمات",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    employee: "محمد سعيد الغامدي [1657]",
    jobTitle: "محلل نظم معلومات",
    recommendation: "تمديد فترة التجربة",
    status: "اعتمد",
  },
]
