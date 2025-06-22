"use server"

import { TrainingElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { InternalCoursesRequest } from "@types"
import { getData } from "./getData"

export const getInternalCoursesRequests = async (): Promise<
  InternalCoursesRequest[]
> => {
  return getData<InternalCoursesRequest>({
    url: "api/po/hr/training",
    employeeIdKey: "create_employee_id",
    responseSchema: ResponseSchema,
    dataSchema: TrainingElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          courseName: String(typedItem.name || ""),
          fromDate: String(typedItem.date_from || ""),
          toDate: String(typedItem.date_to || ""),
          duration: String(typedItem.number_of_days || ""),
          type: String(typedItem.type || ""),
          trainingCenter: String(typedItem.training_center || ""),
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData: InternalCoursesDummyData,
  })
}

const InternalCoursesDummyData: InternalCoursesRequest[] = [
  {
    id: "15",
    courseName: "Certified Power PI Professional",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    duration: "3 أيام",
    type: "محلي",
    trainingCenter: "أكاديمية الاستثمار",
    status: "اعتمد",
  },
  {
    id: "159",
    courseName: "Certified Power BI Professional",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    duration: "7 أيام",
    type: "دولي",
    trainingCenter: "أكاديمية الاستثمار",
    status: "الترشح",
  },
  {
    id: "158",
    courseName: "Data Analysis with Python",
    fromDate: "2024-06-10",
    toDate: "2024-06-15",
    duration: "5 أيام",
    type: "محلي",
    trainingCenter: "المعهد التقني للبيانات",
    status: "جديد",
  },
  {
    id: "156",
    courseName: "Advanced Excel for Business",
    fromDate: "2024-07-01",
    toDate: "2024-07-05",
    duration: "5 أيام",
    type: "دولي",
    trainingCenter: "مركز المهارات المالية",
    status: "جديد",
  },
]
