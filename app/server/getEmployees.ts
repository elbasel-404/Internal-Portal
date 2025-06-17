"use server"

import type { Employee } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { EmployeesListElementSchema, ResponseSchema } from "@api/schemas"
import { getStoredEmployeeId } from "@auth"

export const getEmployeeRequests = async (): Promise<Employee[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData
  const employeeId = await getStoredEmployeeId()

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/read/employee-search-request"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = {
    // employee_id: 305,
    employee_id: employeeId,
    employee_object: "",
    related_employees: false,
    limit: 10000,
    page: 1,
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
  const validatedData = EmployeesListElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : ""

  const returnedData: Employee[] = validatedData.map((data) => {
    const newsItem: Employee = {
      id: data.id.toString(),
      name: getStringValue(data.complete_name),
      image: getStringValue(data.image)
        ? `data:image/gif;base64,${data.image}`
        : "/default-image.svg",
      position: getArrayValue(data.job_id),
      phone: getStringValue(data.mobile_phone),
      recycleWork: `تحويلة العمل ${getStringValue(data.work_phone)}`,
      address: getStringValue(data.work_location),
      email: getStringValue(data.work_email),
      sector: getArrayValue(data.sector_id),
      generalAdministration: getArrayValue(data.administration_id),
      management: getArrayValue(data.department_global_id),
      department: getArrayValue(data.department_id),
      generalManager: getArrayValue(data.sector_manager_id),
    }
    return newsItem
  })

  return returnedData
}

const dummyData: Employee[] = [
  {
    id: "220164#",
    name: "سعود القامري",
    position: "مبرر عام المبادئ والخدمات الدولية",
    image: "/employee-1.svg",
    phone: "0507770500",
    recycleWork: "تحويلة العمل 4554",
    address: "العامل الرئيسي - الدور الأرضي",
    email: "hqushaymit@monshaat.gov.sa",
    sector: "الخدمات المشتركة",
    generalAdministration: "الخدمات المشتركة/المالية..",
    management: "المرافق والخدمات الادراية",
    department: "المرافق والخدمات الادراية",
    generalManager: "مي بنت سعد البدراني",
  },
  {
    id: "220165#",
    name: "نورة العتبس",
    position: "مبرر عام المبادئ والخدمات الدولية",
    image: "/employee-2.svg",
    phone: "0507770501",
    recycleWork: "تحويلة العمل 4554",
    address: "العامل الرئيسي - الدور الأرضي",
    email: "hqushaymit@monshaat.gov.sa",
    sector: "الخدمات المشتركة",
    generalAdministration: "الخدمات المشتركة/المالية..",
    management: "المرافق والخدمات الادراية",
    department: "المرافق والخدمات الادراية",
    generalManager: "مي بنت سعد البدراني",
  },
  {
    id: "220166#",
    name: "عبدالله الشمري",
    position: "مبرر عام المبادئ والخدمات الدولية",
    image: "/employee-6.svg",
    phone: "0508670500",
    recycleWork: "تحويلة العمل 4554",
    address: "العامل الرئيسي - الدور الأرضي",
    email: "hqushaymit@monshaat.gov.sa",
    sector: "الخدمات المشتركة",
    generalAdministration: "الخدمات المشتركة/المالية..",
    management: "المرافق والخدمات الادراية",
    department: "المرافق والخدمات الادراية",
    generalManager: "مي بنت سعد البدراني",
  },
  {
    id: "220167#",
    name: "فاطمة الحربي",
    position: "مبرر عام المبادئ والخدمات الدولية",
    image: "/employee-5.svg",
    phone: "0507260500",
    recycleWork: "تحويلة العمل 4554",
    address: "العامل الرئيسي - الدور الأرضي",
    email: "hqushaymit@monshaat.gov.sa",
    sector: "الخدمات المشتركة",
    generalAdministration: "الخدمات المشتركة/المالية..",
    management: "المرافق والخدمات الادراية",
    department: "المرافق والخدمات الادراية",
    generalManager: "مي بنت سعد البدراني",
  },
  {
    id: "220168#",
    name: "فهد الدوسري",
    position: "مبرر عام المبادئ والخدمات الدولية",
    image: "/employee-4.svg",
    phone: "0507150500",
    recycleWork: "تحويلة العمل 4554",
    address: "العامل الرئيسي - الدور الأرضي",
    email: "hqushaymit@monshaat.gov.sa",
    sector: "الخدمات المشتركة",
    generalAdministration: "الخدمات المشتركة/المالية..",
    management: "المرافق والخدمات الادراية",
    department: "المرافق والخدمات الادراية",
    generalManager: "مي بنت سعد البدراني",
  },
  {
    id: "220169#",
    name: "رهف العبدلله",
    position: "مبرر عام المبادئ والخدمات الدولية",
    image: "/employee-3.svg",
    phone: "0507890500",
    recycleWork: "تحويلة العمل 4554",
    address: "العامل الرئيسي - الدور الأرضي",
    email: "hqushaymit@monshaat.gov.sa",
    sector: "الخدمات المشتركة",
    generalAdministration: "الخدمات المشتركة/المالية..",
    management: "المرافق والخدمات الادراية",
    department: "المرافق والخدمات الادراية",
    generalManager: "مي بنت سعد البدراني",
  },
]
