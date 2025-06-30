"use server"

import type { HrLetterDetails } from "@types"
import {
  ResponseSchema,
  SalaryIdentificationElementSchema,
} from "../../api-schemas"
import { getData } from "./getData"

export const getHrLetterDetails = async (
  id: string,
): Promise<HrLetterDetails | void> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<HrLetterDetails>({
    url: "api/po/salary/identification/request/read",
    responseSchema: ResponseSchema,
    dataSchema: SalaryIdentificationElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: getStringValue(typedData.id),
          requestDate: getStringValue(typedData.order_date),
          destinationAr: getArrayValue(typedData.destination_id),
          destinationEn: getStringValue(typedData.eng_destination),
          type: getStringValue(typedData.template_name),
          notes: getStringValue(typedData.notes),
          attachments: Array.isArray(typedData.message_ids)
            ? typedData.message_ids.map(
                (file: string | number) => new File([""], String(file)),
              )
            : [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}
const dummyData: HrLetterDetails = {
  id: "1",
  requestDate: "2021-09-01",
  destinationAr: "لمن يهمه الأمر",
  destinationEn: "Whom it may concern",
  type: "خطاب تعريف بالراتب",
  notes:
    "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
