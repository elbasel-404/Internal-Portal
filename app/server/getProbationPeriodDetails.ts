"use server"

import { ProbationEvaluationElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "@db/actions"
import type { ProbationPeriodDetails } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getProbationPeriodDetails = async (
  // !It will be used for integration
  id: string,
): Promise<ProbationPeriodDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return probationPeriodDetails

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/probation-evaluation"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
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
  const validatedData = ProbationEvaluationElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  const returnedData: ProbationPeriodDetails = {
    employeeName: validatedData.employee_id[1].toString(),
    jobNumber: validatedData.job_id[0].toString(),
    jobTitle: validatedData.job_id[1].toString(),
    management: validatedData.department_id[1].toString(),
    appointmentDate: validatedData.date_hiring,
    endProbationPeriodDate: validatedData.date_probation_end,
    recommendation: validatedData.recommendation,
    notes: validatedData.notes.toString(),
    probationLineIds: validatedData.probation_line_ids.map(
      (line: { question: string; answer: string }) => ({
        question: line.question,
        answer: line.answer,
      }),
    ),
    attachments: validatedData.attachment_ids.map(
      (file: { toString: () => string }) => new File([""], file.toString()),
    ),
  }

  return returnedData
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
