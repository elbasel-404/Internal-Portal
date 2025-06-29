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

  const TravelDaySettingsArabic = (value: string) => {
    if (value === "before_training") return "قبل بداية التدريب"
    else if (value === "after_training") return "بعد نهاية التدريب"
    else return ""
  }

  const TrainingType = (value: string) => {
    if (value === "local") return "محلي"
    else if (value === "internal") return "دولي"
    else return ""
  }

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/training-request"
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
  const validatedData = TrainingElementSchema.parse(data[0])

  // ! TRAINING METHOD CHECKBOXES
  // ! ==================================
  const buildTrainingMethod = () => {
    const methods = []

    if (validatedData.is_test) {
      methods.push({ name: "اختبار", checked: true })
    } else {
      methods.push({ name: "اختبار", checked: false })
    }

    if (validatedData.is_training) {
      methods.push({ name: "تدريب", checked: true })
    } else {
      methods.push({ name: "تدريب", checked: false })
    }

    if (validatedData.is_membership) {
      methods.push({ name: "عضوية", checked: true })
    } else {
      methods.push({ name: "عضوية", checked: false })
    }

    if (validatedData.is_studying_subjects) {
      methods.push({ name: "مواد دراسية", checked: true })
    } else {
      methods.push({ name: "مواد دراسية", checked: false })
    }

    return methods
  }

  // ! PARSING
  // ! ==================================

  const returnedData: TrainingDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.date,
    city:
      Array.isArray(validatedData.city_id) && validatedData.city_id[1]
        ? validatedData.city_id[1].toString()
        : "__",
    country:
      Array.isArray(validatedData.country_id) && validatedData.country_id[1]
        ? validatedData.country_id[1].toString()
        : "__",
    travelDays: validatedData.travel_days + " " + "يوم",
    courseProgram: validatedData.programme_session,
    courseValue: validatedData.amount_training.toString(),
    duration: validatedData.duration.toString(),
    employeeName: validatedData.employee_id[1].toString(),
    jobNumber: validatedData.employee_id[0]?.toString(),
    jobTitle: validatedData.grade_id[1]?.toString(),
    mandateAllowance: validatedData.deputation_allowance.toString(),
    mechanismConvening: TrainingType(validatedData.type),
    sector: validatedData.department_id[1]?.toString(),
    status: validatedData.state,
    trainingCenter:
      typeof validatedData.training_center === "string"
        ? validatedData.training_center
        : validatedData.training_center === true
          ? "true"
          : validatedData.training_center === false
            ? "false"
            : "",
    trainingEmployee: Array.isArray(validatedData.substitute_employee_id)
      ? validatedData.substitute_employee_id[1]?.toString()
      : "__",
    trainingEndDate:
      typeof validatedData.date_to_travel === "boolean"
        ? "__"
        : validatedData.date_to_travel,
    trainingStartDate:
      typeof validatedData.date_from_travel === "boolean"
        ? "__"
        : validatedData.date_from_travel,
    trainingMethod: buildTrainingMethod(),
    trainingName: validatedData.name,
    trainingSchedule: Array.isArray(validatedData.hr_training_division_ids)
      ? validatedData.hr_training_division_ids.map((item) => ({
          id: item.id?.toString() ?? "",
          trainingDate: item.date_from_travel + "/" + item.date_to_travel || "",
          durationWithDays: item.duration?.toString() ?? "",
          travelDays: item.duration?.toString() ?? "",
          travelDateSettings:
            TravelDaySettingsArabic(item.travel_days_setting) ?? "",
          travelDateForTraining: item.date_from_travel ?? "",
          travelDateForReturn: item.date_to_travel ?? "",
        }))
      : [],
    trainingStartBefore:
      typeof validatedData.travel_days_setting === "boolean"
        ? validatedData.travel_days_setting.toString()
        : validatedData.travel_days_setting,
    trainingType: Array.isArray(validatedData.training_type_id)
      ? validatedData.training_type_id[1]?.toString()
      : "__",
    transcationDate: validatedData.expected_date || "__",
    attachments: Array.isArray(validatedData.attachment_ids)
      ? validatedData.attachment_ids.map((file) => new File([""], String(file)))
      : [],
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
  trainingMethod: [
    { name: "اختبار", checked: true },
    { name: "تدريب", checked: true },
    { name: "عضوية", checked: false },
    { name: "مواد دراسية", checked: true },
  ],
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
