"use server"

import { TrainingElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { TrainingDetails } from "@types"
import { getData } from "./getData"

export const getTrainingDetails = async (
  id: string,
): Promise<TrainingDetails | void> => {
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

  const result = await getData<TrainingDetails>({
    url: "api/po/hr/training-request",
    responseSchema: ResponseSchema,
    dataSchema: TrainingElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, string>

      const buildTrainingMethod = () => {
        const methods = []

        if (typedData.is_test) {
          methods.push({ name: "اختبار", checked: true })
        } else {
          methods.push({ name: "اختبار", checked: false })
        }

        if (typedData.is_training) {
          methods.push({ name: "تدريب", checked: true })
        } else {
          methods.push({ name: "تدريب", checked: false })
        }

        if (typedData.is_membership) {
          methods.push({ name: "عضوية", checked: true })
        } else {
          methods.push({ name: "عضوية", checked: false })
        }

        if (typedData.is_studying_subjects) {
          methods.push({ name: "مواد دراسية", checked: true })
        } else {
          methods.push({ name: "مواد دراسية", checked: false })
        }

        return methods
      }

      return [
        {
          id: typedData.id ?? "",
          requestDate: typedData.date ?? "",
          city:
            Array.isArray(typedData.city_id) && typedData.city_id[1]
              ? typedData.city_id[1]
              : "__",
          country:
            Array.isArray(typedData.country_id) && typedData.country_id[1]
              ? typedData.country_id[1]
              : "__",
          travelDays: typedData.travel_days ?? "" + " يوم",
          courseProgram: typedData.programme_session ?? "",
          courseValue: typedData.amount_training ?? "",
          duration: typedData.duration ?? "",
          employeeName:
            Array.isArray(typedData.employee_id) && typedData.employee_id[1]
              ? typedData.employee_id[1]
              : "__",
          jobNumber:
            Array.isArray(typedData.employee_id) && typedData.employee_id[0]
              ? typedData.employee_id[0]
              : "__",
          jobTitle:
            Array.isArray(typedData.grade_id) && typedData.grade_id[1]
              ? typedData.grade_id[1]
              : "__",
          mandateAllowance: typedData.deputation_allowance ?? "",
          mechanismConvening: TrainingType(typedData.type ?? ""),
          sector:
            Array.isArray(typedData.department_id) && typedData.department_id[1]
              ? typedData.department_id[1]
              : "__",
          status: typedData.state ?? "",
          trainingCenter:
            typeof typedData.training_center === "string"
              ? typedData.training_center
              : typedData.training_center === true
                ? "true"
                : typedData.training_center === false
                  ? "false"
                  : "",
          trainingEmployee:
            Array.isArray(typedData.substitute_employee_id) &&
            typedData.substitute_employee_id[1]
              ? typedData.substitute_employee_id[1]
              : "__",
          trainingEndDate:
            typeof typedData.date_to_travel === "string"
              ? typedData.date_to_travel
              : "__",
          trainingStartDate:
            typeof typedData.date_from_travel === "string"
              ? typedData.date_from_travel
              : "__",
          trainingMethod: buildTrainingMethod(),
          trainingName: typedData.name ?? "",
          trainingSchedule: Array.isArray(typedData.hr_training_division_ids)
            ? typedData.hr_training_division_ids.map((item) => ({
                id: item.id ?? "",
                trainingDate:
                  item.date_from_travel && item.date_to_travel
                    ? `${item.date_from_travel} / ${item.date_to_travel}`
                    : "",
                durationWithDays: item.duration ?? "",
                travelDays: item.duration ?? "",
                travelDateSettings: TravelDaySettingsArabic(
                  item.travel_days_setting ?? "",
                ),
                travelDateForTraining: item.date_from_travel ?? "",
                travelDateForReturn: item.date_to_travel ?? "",
              }))
            : [],
          trainingStartBefore: typedData.travel_days_setting ?? "",
          trainingType:
            Array.isArray(typedData.training_type_id) &&
            typedData.training_type_id[1]
              ? typedData.training_type_id[1]
              : "__",
          transcationDate: typedData.expected_date ?? "__",
          attachments: Array.isArray(typedData.attachment_ids)
            ? typedData.attachment_ids.map(
                (file) => new File([""], String(file)),
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

const dummyData: TrainingDetails = {
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
