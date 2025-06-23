"use server"

import { VacationDetails } from "@types"
import { HolidayElementSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getVacationDetails = async (
  id: string,
): Promise<VacationDetails> => {
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
          id: String(typedData.id || ""),
          requestDate: String(typedData.date || ""),
          type:
            Array.isArray(typedData.holiday_status_id) &&
            typedData.holiday_status_id.length > 1
              ? String(typedData.holiday_status_id[1])
              : "",
          vacationDate: `من ${typedData.date_from || ""} الي ${typedData.date_to || ""}`,
          duration: String(typedData.duration || ""),
          alternativeEmployee:
            Array.isArray(typedData.substitute_employee_id) &&
            typedData.substitute_employee_id.length > 1
              ? String(typedData.substitute_employee_id[1])
              : "",
          notes: String(typedData.notes || ""),
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
