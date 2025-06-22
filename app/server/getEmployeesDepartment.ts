"use server"

import type { Employee } from "@types"
import { EmployeeDepartmentElementSchema, ResponseSchema } from "@api/schemas"
import { getData } from "./getData"

export const getEmployeeDepartmentRequests = async (): Promise<Employee[]> => {
  const getArrayValue = (field: unknown, index: number = 1): string => {
    if (Array.isArray(field) && field[index] !== undefined) {
      return String(field[index])
    }
    return ""
  }

  const getStringValue = (field: unknown): string => {
    return typeof field === "string" ? field : ""
  }

  return getData<Employee>({
    url: "api/po/read/relative-employees",
    responseSchema: ResponseSchema,
    dataSchema: EmployeeDepartmentElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        // Get image with fallback
        const imageBase64 = getStringValue(typedItem.image)
        const imageSrc = imageBase64
          ? `data:image/gif;base64,${imageBase64}`
          : ""

        return {
          id: String(typedItem.id || ""),
          name: getStringValue(typedItem.complete_name),
          image: imageSrc,
          position: getArrayValue(typedItem.job_id),
          phone: getStringValue(typedItem.mobile_phone),
          recycleWork: `تحويلة العمل ${getStringValue(typedItem.work_phone)}`,
          address: getStringValue(typedItem.work_location),
          email: getStringValue(typedItem.work_email),
          sector: getArrayValue(typedItem.sector_id),
          generalAdministration: getArrayValue(typedItem.administration_id),
          management: getArrayValue(typedItem.department_global_id),
          department: getArrayValue(typedItem.department_id),
          generalManager: getArrayValue(typedItem.sector_manager_id),
        }
      })
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
