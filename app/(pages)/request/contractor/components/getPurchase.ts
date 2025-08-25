import type { purchase } from "@types"
import {
  RequestContractorFieldsElementSchema,
  ResponseSchema,
} from "../../../../../api-schemas"
import { getData } from "../../../../server/getData"

export const getPurchaseData = async (): Promise<purchase[]> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  return getData<purchase>({
    url: "api/po/contractor-request/fields",
    includeEmployeeId: false,
    responseSchema: ResponseSchema,
    dataSchema: RequestContractorFieldsElementSchema,
    additionalBody: { field_name: "purchase_request_id" },
    parseData: (data) => {
      if (!data || data.length === 0) {
        return dummyData
      }

      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: getStringValue(typedItem.purchase_request_id),
          name: getStringValue(typedItem.purchase_request_name),
          projectName: getStringValue(typedItem.project_name),
          contractorCompany: getStringValue(typedItem.contractor_company),
          contractDateStart: getStringValue(typedItem.contract_date_start),
          contractDateEnd: getStringValue(typedItem.contract_date_end),
          contractNumber: getStringValue(typedItem.contract_name),
        }
      })
    },
    dummyData,
  })
}

const dummyData: purchase[] = [
  {
    id: "4891",
    name: "250280",
    projectName: "أدوات الحاسب الآلي (إتفاقية إطارية)",
    contractorCompany: "الشركة العربية لخدمات الانترنت والاتصالات",
    contractDateStart: "2025-07-27",
    contractDateEnd: "2025-07-28",
    contractNumber: "2025-056",
  },
  {
    id: "4890",
    name: "250279",
    projectName: "أدوات الحاسب الآلي (إتفاقية إطارية)",
    contractorCompany: "شركة الحلول المتميزة",
    contractDateStart: "2025-07-27",
    contractDateEnd: "2025-08-05",
    contractNumber: "2025-060",
  },
  {
    id: "4889",
    name: "250278",
    projectName: "إطلاق برنامج الامتياز التجاري - تشغيلي",
    contractorCompany: "الشركة العربية لخدمات الانترنت والاتصالات",
    contractDateStart: "2025-07-27",
    contractDateEnd: "2025-07-28",
    contractNumber: "2025-055",
  },
]
