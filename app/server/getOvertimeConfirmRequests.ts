"use server"

import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { OvertimeAssignmentElementSchema, ResponseSchema } from "@api/schemas"
import type { OvertimeConfirmRequest } from "@types"
import { getStoredEmployeeId } from "@auth"

export const getOvertimeConfirmRequests = async (): Promise<
  OvertimeConfirmRequest[]
> => {
  const employeeId = await getStoredEmployeeId()
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/hr/overtime_request"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
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

  const returnedData: OvertimeConfirmRequest[] = validatedData.map((data) => {
    const newsItem: OvertimeConfirmRequest = {
      id: getStringValue(data.name),
      date: getStringValue(data.date),
      applicant: getArrayValue(data.employee_id),
      management: getArrayValue(data.department_id),
      job: getArrayValue(data.job_id),
      category: getArrayValue(data.type_job_id),
      overTimeDuration: "5.0",
      assignmentNumber: "7080",
      status: getStringValue(data.state),
    }
    return newsItem
  })

  return returnedData
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
