"use server"

import { TrainingElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getDemo } from "@db/actions"
import type { TrainingDetails } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getTrainingDetails = async (
  id: string,
): Promise<TrainingDetails | void> => {
  const isDemo = await getDemo()
  if (isDemo) return trainingDetails

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/training-request"
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
  const validatedData = TrainingElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================

  // Extract id from a string like "15 - أحمد محمد"
  function extractId(str: string): string {
    // Assumes the id is before the first space or dash
    const match = str.match(/^(\d+)/)
    return match ? match[1] : ""
  }

  const employeeString = Array.isArray(validatedData.employee_id)
    ? validatedData.employee_id[1]?.toString() || ""
    : ""

  const returnedData: TrainingDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.date,
    city: validatedData.city,
    country: Array.isArray(validatedData.country_id)
      ? validatedData.country_id[1]
      : "",
    travelDays: validatedData.travel_days,
    courseProgram: validatedData.programme_session,
    courseValue: validatedData.amount_training.toString(),
    duration: validatedData.duration.toString(),
    employeeName: employeeString,
    jobNumber: extractId(employeeString),
    jobTitle: validatedData.grade_id[1]?.toString(),
    mandateAllowance: validatedData.deputation_allowance.toString(),
    mechanismConvening: validatedData.type,
    sector: validatedData.department_id[1]?.toString(),
    status: validatedData.state,
    trainingCenter: validatedData.training_center,
    trainingEmployee: Array.isArray(validatedData.substitute_employee_id)
      ? validatedData.substitute_employee_id[1]?.toString()
      : "",
    trainingEndDate: validatedData.date_to_travel,
    trainingStartDate: validatedData.date_from_travel,
    trainingMethod: [],
    trainingName: validatedData.name,
    trainingSchedule: [],
    trainingStartBefore: validatedData.travel_days_setting,
    trainingType: validatedData.type,
    transcationDate: validatedData.expected_date,
    attachments: validatedData.attachment_ids.map(
      (file: any) => new File([""], file.toString()),
    ),
  }

  return returnedData
}

const trainingDetails: TrainingDetails = {
  id: "15",
  courseValue: "5000 ريال",
  employeeName: "أحمد محمد",
  jobNumber: "12345",
  jobTitle: "مهندس برمجيات",
  sector: "تكنولوجيا المعلومات",
  requestDate: "2024-01-15",
  mandateAllowance: "بدل التفويض",
  mechanismConvening: "دولي (خارج المملكة)",
  transcationDate: "2024-01-20",
  status: "قيد المراجعة",
  duration: "5 أيام",
  trainingCenter: "المركز الوطني للتدريب",
  courseProgram: "برنامج الدورة",
  trainingType: "شهادة احترافية",
  trainingName: "دورة في تطوير البرمجيات",
  trainingMethod: ["اختبار", "تدريب", "محاكاة", "مواد دراسية"],
  trainingStartDate: "2024-10-20",
  trainingEndDate: "2024-10-30",
  country: "الإمارات العربية المتحدة",
  city: "دبي",
  travelDays: "1 يوم",
  trainingStartBefore: "قبل بداية التدريب",
  trainingEmployee: "عساف بن رشود الطعمي",
  attachments: [
    new File([""], "نموذج طلب 5.pdf"),
    new File([""], "نموذج طلب 6.pdf"),
  ],
  trainingSchedule: [
    {
      id: "1",
      trainingDate: "2024-10-20 / 2024-10-30",
      durationWithDays: "5 أيام",
      travelDays: "1 يوم",
      travelDateSettings: "قبل بداية التدريب",
      travelDateForTraining: "2024-10-20",
      travelDateForReturn: "2024-10-30",
    },
    {
      id: "2",
      trainingDate: "2024-10-14 / 2024-10-28",
      durationWithDays: "8 أيام",
      travelDays: "2 يوم",
      travelDateSettings: "بعد بداية التدريب",
      travelDateForTraining: "2024-10-14",
      travelDateForReturn: "2024-10-28",
    },
  ],
}
