"use server"

import type { Employee } from "@types"
import { EmployeeDepartmentElementSchema, ResponseSchema } from "@api/schemas"
import { getData } from "./getData"

export const getEmployeeDepartmentRequests = async (): Promise<Employee[]> => {
  return getData<Employee>({
    url: "api/po/read/relative-employees",
    responseSchema: ResponseSchema,
    dataSchema: EmployeeDepartmentElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, any>
        return {
          id: typedItem.id.toString(),
          name: typedItem.complete_name,
          image: `data:image/gif;base64,${typedItem.image}`,
          position: typedItem.job_id[1].toString(),
          phone: typedItem.mobile_phone,
          recycleWork: `تحويلة العمل ${typedItem.work_phone}`,
          address: typedItem.work_location,
          email: typedItem.work_email,
          sector: typedItem.sector_id[1].toString(),
          generalAdministration: typedItem.administration_id[1].toString(),
          management: typedItem.department_global_id[1].toString(),
          department: typedItem.department_id[1].toString(),
          generalManager: typedItem.sector_manager_id[1].toString(),
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
