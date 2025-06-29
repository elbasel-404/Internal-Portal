"use server"

import { VacationDetails } from "@types"
import { HolidayElementSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getVacationDetails = async (
  id: string,
): Promise<VacationDetails> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<VacationDetails>({
    url: "api/po/hr/holidays/request",
    responseSchema: ResponseSchema,
    dataSchema: HolidayElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: getStringValue(typedData.id),
          requestDate: getStringValue(typedData.date),
          type: getArrayValue(typedData.holiday_status_id),
          vacationDate: `من ${typedData.date_from || ""} الي ${typedData.date_to || ""}`,
          duration: getStringValue(typedData.duration),
          alternativeEmployee: getArrayValue(typedData.substitute_employee_id),
          notes: getStringValue(typedData.notes),
          attachments: Array.isArray(typedData.attachment_ids)
            ? typedData.attachment_ids.map(
                (file) => new File([""], String(file)),
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

const dummyData: VacationDetails = {
  id: "1",
  requestDate: "2024-05-05",
  type: "إجازة مرضية",
  vacationDate: "من 10-05-2024 الي 15-05-2024",
  duration: "5",
  alternativeEmployee: "سعود محمد القحطاني",
  notes: "ملاحظة",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
