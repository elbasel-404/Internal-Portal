"use server"

import type { ContractorDetails } from "@types"
import { getData } from "./getData"
import { ResponseSchema, ContractorListElementSchema } from "../../api-schemas"

export const getContractorDetails = async (
  id: string,
): Promise<ContractorDetails | void> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<ContractorDetails>({
    url: "api/po/hr/custody-close/read",
    responseSchema: ResponseSchema,
    dataSchema: ContractorListElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>
      return [
        {
          id: getStringValue(typedData.name),
          date: getStringValue(typedData.close_date),
          pledgeAmount: getStringValue(typedData.close_amount),
          pledgeType:
            getStringValue(typedData.close_type) === "close"
              ? "اقفال"
              : "استعاضة",
          covenantRequestNumber: getStringValue(typedData.custody_id_number),
          covenantPurpose: getStringValue(typedData.custody_reason),
          covenantAmount: getStringValue(typedData.custody_amount),
          covenantDate: getStringValue(typedData.order_date),
          details: Array.isArray(typedData.details)
            ? typedData.details.map((detail: Record<string, unknown>) => ({
                product: getStringValue(detail.product_name),
                statement: getStringValue(detail.description),
                amount: getStringValue(detail.amount),
                invoiceNumber: getStringValue(detail.invoice_no),
                attachments: "",
              }))
            : [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}
const dummyData: ContractorDetails = {
  id: "1",
  date: "2024/15/5",
  pledgeAmount: "500.000",
  pledgeType: "_",
  covenantRequestNumber: "5056",
  covenantPurpose:
    "لتوفير الاعمال والخدمات والنثريات الطارئة الخاصة بخدمات الإدرة العامة للمارفق والخدمات الإدارية",
  covenantAmount: "10000",
  covenantDate: "20/2/2025",
  details: [
    {
      product: "المنتج",
      statement: "بيان المنتج",
      amount: "1000",
      invoiceNumber: "12354",
      attachments: "",
    },
    {
      product: "المنتج",
      statement: "بيان المنتج",
      amount: "2000",
      invoiceNumber: "12354",
      attachments: "",
    },
    {
      product: "المنتج",
      statement: "بيان المنتج",
      amount: "1000",
      invoiceNumber: "18632",
      attachments: "",
    },
  ],
}
