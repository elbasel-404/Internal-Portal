"use server"

import { ProbationEvaluationElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { ProbationPeriodDetails } from "@types"
import { getData } from "./getData"

export const getProbationPeriodDetails = async (
  // !It will be used for integration
  id: string,
): Promise<ProbationPeriodDetails | void> => {
  const result = await getData<ProbationPeriodDetails>({
    url: "api/po/hr/probation-evaluation",
    responseSchema: ResponseSchema,
    dataSchema: ProbationEvaluationElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [probationPeriodDetails]
      }

      const typedData = data[0] as Record<string, any>

      return [
        {
          employeeName: typedData.employee_id[1],
          jobNumber: typedData.job_id[0],
          jobTitle: typedData.job_id[1],
          management: typedData.department_id[1],
          appointmentDate: String(typedData.date_hiring),
          endProbationPeriodDate: String(typedData.date_probation_end),
          recommendation: String(typedData.recommendation),
          notes: String(typedData.notes),
          probationLineIds: Array.isArray(typedData.probation_line_ids)
            ? typedData.probation_line_ids.map(
                (line: { question: string; answer: string }) => ({
                  question: line.question,
                  answer: line.answer,
                }),
              )
            : [],
          attachments: Array.isArray(typedData.attachment_ids)
            ? typedData.attachment_ids.map(
                (file) => new File([""], String(file)),
              )
            : [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [probationPeriodDetails],
  })

  return result[0]
}

const probationPeriodDetails: ProbationPeriodDetails = {
  employeeName: "[1651] عبدالله بن حسين الجفري",
  jobNumber: "[1651]",
  jobTitle: "أخصائي تطوير تنظيمي أول",
  management:
    "الخدمات المشتركة/الموارد البشرية/تطوير الموارد البشرية/التطوير التنظيمي",
  appointmentDate: "02-08-2023",
  endProbationPeriodDate: "02-08-2025",
  recommendation: "اجتياز فترة التجربة",
  notes: "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
