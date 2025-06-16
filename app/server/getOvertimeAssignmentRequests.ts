"use server"

import { getStoredEmployeeId } from "@auth"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { OvertimeAssignmentElementSchema, ResponseSchema } from "@api/schemas"

import type { OvertimeAssignmentRequest } from "@types"

export const getOvertimeAssignmentRequests = async (): Promise<
  OvertimeAssignmentRequest[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData
  const employeeId = await getStoredEmployeeId()

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/overtime_assignment"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = {
    employee_id: employeeId,
  }
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
  const validatedData = OvertimeAssignmentElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : ""

  const returnedData: OvertimeAssignmentRequest[] = validatedData.map(
    (data) => {
      const newsItem: OvertimeAssignmentRequest = {
        id: getStringValue(data.name),
        date: getStringValue(data.date),
        applicant: getArrayValue(data.employee_id),
        management: getArrayValue(data.department_id),
        job: getArrayValue(data.job_id),
        category: getArrayValue(data.type_job_id),
        fromDate: getStringValue(data.date_from),
        toDate: getStringValue(data.date_to),
        hours: data.nb_hours,
        assignmentDescription: getStringValue(data.description),
        status: getStringValue(data.state),
      }
      return newsItem
    },
  )

  return returnedData
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
