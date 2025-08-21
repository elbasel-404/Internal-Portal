"use server"

import type { BankAccountDetails } from "@types"
import {
  ChangeBankAccountElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getData } from "./getData"
import { formatDate } from "@utils"

export const getBankAccountDetails = async (
  id: string,
): Promise<BankAccountDetails | void> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<BankAccountDetails>({
    url: "api/po/hr/change-bank-request",
    responseSchema: ResponseSchema,
    dataSchema: ChangeBankAccountElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>
      const accountStatusValue = () => {
        const status = getStringValue(typedData.account_status)
        return status === "approve"
          ? "مثبت"
          : status === "reject"
            ? "غير مثبت"
            : status
      }
      return [
        {
          id: getStringValue(typedData.id),
          requestDate: formatDate(
            new Date(getStringValue(typedData.create_date)),
          ),
          employeeCurrentAccount: getStringValue(
            typedData.current_employee_account,
          ),
          bankName: getArrayValue(typedData.new_bank_id),
          ibanNumber: getStringValue(typedData.iban),
          accountStatus: accountStatusValue(),
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}

const dummyData: BankAccountDetails = {
  id: "1",
  requestDate: "2021-09-01",
  employeeCurrentAccount: "البنك العربي الوطني - SA2030400108051444390029",
  bankName: "ADCB, Alkarama Brunch, Dubai, UAE",
  ibanNumber: "SA2030400108051444390029",
  accountStatus: "مثبت",
}
