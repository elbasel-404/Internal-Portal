"use server"

import type { Employee } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"
import { EmployeeDepartmentElementSchema, ResponseSchema } from "@api/schemas"
export const getEmployeeDepartmentRequests = async (): Promise<Employee[]> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIBLES
  // ! ==================================
  const url = "api/po/read/relative-employees"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = { employee_id: 305 }
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
  const validatedData = EmployeeDepartmentElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: Employee[] = validatedData.map((data) => {
    const newsItem: Employee = {
      id: data.id.toString(),
      name: data.complete_name,
      image: `data:image/gif;base64,${data.image}`,
      position: data.job_id[1].toString(),
      phone: data.mobile_phone,
      recycleWork: `تحويلة العمل ${data.work_phone}`,
      address: data.work_location,
      email: data.work_email,
      sector: data.sector_id[1].toString(),
      generalAdministration: data.administration_id[1].toString(),
      management: data.department_global_id[1].toString(),
      department: data.department_id[1].toString(),
      generalManager: data.sector_manager_id[1].toString(),
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
