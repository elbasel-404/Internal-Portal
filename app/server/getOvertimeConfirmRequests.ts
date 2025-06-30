"use server"

import { OvertimeConfirmElementSchema, ResponseSchema } from "@api/schemas"
import type { OvertimeConfirmRequest } from "@types"
import { getData } from "./getData"

export const getOvertimeConfirmRequests = async (): Promise<
  OvertimeConfirmRequest[]
> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  return getData<OvertimeConfirmRequest>({
    url: "api/po/hr/overtime_request",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: OvertimeConfirmElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        return {
          id: getStringValue(typedItem.name),
          date: getStringValue(typedItem.date),
          applicant: getArrayValue(typedItem.employee_id),
          management: getArrayValue(typedItem.department_id),
          job: getArrayValue(typedItem.job_id),
          category: getArrayValue(typedItem.type_job_id),
          overTimeDuration: getStringValue(typedItem.nb_extras_time),
          assignmentNumber: getArrayValue(typedItem.overtime_assignment_id),
          status: getStringValue(typedItem.state),
        }
      })
    },
    dummyData,
  })
}

const dummyData: OvertimeConfirmRequest[] = [
  {
    id: "#55465",
    date: "2024-03-10",
    applicant: "أحمد علي",
    management: "إدارة تقنية المعلومات",
    job: "مهندس برمجيات",
    category: "ساعات إضافية عادية",
    overTimeDuration: "5.0",
    assignmentNumber: "7080",
    status: "طلب",
  },
  {
    id: "#55466",
    date: "2024-03-09",
    applicant: "محمد خالد",
    management: "إدارة الموارد البشرية",
    job: "أخصائي موارد بشرية",
    category: "ساعات إضافية نهاية الأسبوع",
    overTimeDuration: "5.0",
    assignmentNumber: "5457",
    status: "المدير المباشر",
  },
  {
    id: "#55467",
    date: "2024-03-08",
    applicant: "سارة محمود",
    management: "إدارة المالية",
    job: "محاسب",
    category: "ساعات إضافية عادية",
    overTimeDuration: "8.0",
    assignmentNumber: "6486",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55468",
    date: "2024-03-07",
    applicant: "يوسف حسن",
    management: "إدارة تقنية المعلومات",
    job: "مدير مشاريع",
    category: "ساعات إضافية عادية",
    overTimeDuration: "7.0",
    assignmentNumber: "5784",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55469",
    date: "2024-03-06",
    applicant: "نورا عبد الله",
    management: "إدارة التسويق",
    job: "مسؤولة محتوى",
    category: "ساعات إضافية حملة تسويقية",
    overTimeDuration: "3.0",
    assignmentNumber: "1356",
    status: "المدير المباشر",
  },
  {
    id: "#55470",
    date: "2024-03-05",
    applicant: "خالد إبراهيم",
    management: "إدارة المشتريات",
    job: "أخصائي مشتريات",
    category: "ساعات إضافية عادية",
    overTimeDuration: "4.0",
    assignmentNumber: "5436",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55471",
    date: "2024-03-04",
    applicant: "ليلى حسن",
    management: "إدارة تقنية المعلومات",
    job: "مهندسة شبكات",
    category: "ساعات إضافية صيانة",
    overTimeDuration: "9.0",
    assignmentNumber: "9856",
    status: "المدير المباشر",
  },
  {
    id: "#55472",
    date: "2024-03-03",
    applicant: "سالم فهد",
    management: "إدارة العمليات",
    job: "مشرف عمليات",
    category: "ساعات إضافية نهاية الأسبوع",
    overTimeDuration: "7.0",
    assignmentNumber: "5980",
    status: "عمليات الموارد البشرية",
  },
]
