"use server"

import type { Employee } from "@types"
import { EmployeesListElementSchema, ResponseSchema } from "@api/schemas"
import { getData } from "./getData"

export const getEmployeeRequests = async (): Promise<Employee[]> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : ""

  return getData<Employee>({
    url: "api/po/read/employee-search-request",
    responseSchema: ResponseSchema,
    dataSchema: EmployeesListElementSchema,
    additionalBody: {
      employee_object: "",
      related_employees: false,
      limit: 10000,
      page: 1,
    },
    parseData: (data) => {
      return data.map((item: any) => ({
        id: item.id.toString(),
        name: getStringValue(item.complete_name),
        image: getStringValue(item.image)
          ? `data:image/gif;base64,${item.image}`
          : "/default-image.svg",
        position: getArrayValue(item.job_id),
        phone: getStringValue(item.mobile_phone),
        recycleWork: `تحويلة العمل ${getStringValue(item.work_phone)}`,
        address: getStringValue(item.work_location),
        email: getStringValue(item.work_email),
        sector: getArrayValue(item.sector_id),
        generalAdministration: getArrayValue(item.administration_id),
        management: getArrayValue(item.department_global_id),
        department: getArrayValue(item.department_id),
        generalManager: getArrayValue(item.sector_manager_id),
      }))
    },
    dummyData,
  })
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
