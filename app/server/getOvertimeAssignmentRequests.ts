"use server"

import { OvertimeAssignmentElementSchema, ResponseSchema } from "@api/schemas"
import type { OvertimeAssignmentRequest } from "@types"
import { getData } from "./getData"

export const getOvertimeAssignmentRequests = async (): Promise<
  OvertimeAssignmentRequest[]
> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : ""

  return getData<OvertimeAssignmentRequest>({
    url: "api/po/hr/overtime_assignment",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: OvertimeAssignmentElementSchema,
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
          fromDate: getStringValue(typedItem.date_from),
          toDate: getStringValue(typedItem.date_to),
          hours: Number(typedItem.nb_hours) || 0,
          assignmentDescription: getStringValue(typedItem.description),
          status: getStringValue(typedItem.state),
        }
      })
    },
    dummyData,
  })
}

const dummyData: OvertimeAssignmentRequest[] = [
  {
    id: "#55465",
    date: "2024-03-10",
    applicant: "أحمد علي",
    management: "إدارة تقنية المعلومات",
    job: "مهندس برمجيات",
    category: "ساعات إضافية عادية",
    fromDate: "2024-03-10 18:00",
    toDate: "2024-03-10 21:00",
    hours: 3,
    assignmentDescription: "إكمال تطوير النظام الجديد",
    status: "طلب",
  },
  {
    id: "#55466",
    date: "2024-03-09",
    applicant: "محمد خالد",
    management: "إدارة الموارد البشرية",
    job: "أخصائي موارد بشرية",
    category: "ساعات إضافية نهاية الأسبوع",
    fromDate: "2024-03-09 10:00",
    toDate: "2024-03-09 15:00",
    hours: 5,
    assignmentDescription: "إعداد تقارير الموظفين السنوية",
    status: "المدير المباشر",
  },
  {
    id: "#55467",
    date: "2024-03-08",
    applicant: "سارة محمود",
    management: "إدارة المالية",
    job: "محاسب",
    category: "ساعات إضافية عادية",
    fromDate: "2024-03-08 17:00",
    toDate: "2024-03-08 20:30",
    hours: 3.5,
    assignmentDescription: "مراجعة كشوف المرتبات",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55468",
    date: "2024-03-07",
    applicant: "يوسف حسن",
    management: "إدارة تقنية المعلومات",
    job: "مدير مشاريع",
    category: "ساعات إضافية عادية",
    fromDate: "2024-03-07 16:00",
    toDate: "2024-03-07 19:00",
    hours: 3,
    assignmentDescription: "الإشراف على إطلاق التحديث الجديد",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55469",
    date: "2024-03-06",
    applicant: "نورا عبد الله",
    management: "إدارة التسويق",
    job: "مسؤولة محتوى",
    category: "ساعات إضافية حملة تسويقية",
    fromDate: "2024-03-06 14:00",
    toDate: "2024-03-06 18:00",
    hours: 4,
    assignmentDescription: "إعداد المحتوى لمنصة التواصل الاجتماعي",
    status: "المدير المباشر",
  },
  {
    id: "#55470",
    date: "2024-03-05",
    applicant: "خالد إبراهيم",
    management: "إدارة المشتريات",
    job: "أخصائي مشتريات",
    category: "ساعات إضافية عادية",
    fromDate: "2024-03-05 15:00",
    toDate: "2024-03-05 19:00",
    hours: 4,
    assignmentDescription: "التفاوض مع الموردين وتحديث العقود",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55471",
    date: "2024-03-04",
    applicant: "ليلى حسن",
    management: "إدارة تقنية المعلومات",
    job: "مهندسة شبكات",
    category: "ساعات إضافية صيانة",
    fromDate: "2024-03-04 22:00",
    toDate: "2024-03-05 02:00",
    hours: 4,
    assignmentDescription: "صيانة الخوادم وتحديثات الأمان",
    status: "المدير المباشر",
  },
  {
    id: "#55472",
    date: "2024-03-03",
    applicant: "سالم فهد",
    management: "إدارة العمليات",
    job: "مشرف عمليات",
    category: "ساعات إضافية نهاية الأسبوع",
    fromDate: "2024-03-03 08:00",
    toDate: "2024-03-03 13:00",
    hours: 5,
    assignmentDescription: "متابعة تنفيذ إجراءات التشغيل اليومية",
    status: "عمليات الموارد البشرية",
  },
]
