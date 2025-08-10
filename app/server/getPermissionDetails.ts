"use server"

import { PermissionDetails } from "@types"
import { ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getPermissionDetails = async (
  id: string,
): Promise<PermissionDetails> => {
  const result = await getData<PermissionDetails>({
    url: "api/po/hr/authorization",
    responseSchema: ResponseSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id || "__"),
          requestDate: String(typedData.date || "__"),
          dateFrom: String(typedData.date_from || "__"),
          dateTo: String(typedData.date_to || "__"),
          reason: String(typedData.reason || "__"),
          duration: String(
            typedData.hour_number
              ? Number(typedData.hour_number).toFixed(2)
              : "__",
          ),
          type:
            Array.isArray(typedData.type_id) && typedData.type_id.length > 1
              ? String(typedData.type_id[1])
              : "__",
          time: `من ${
            typedData.hour_from ? Number(typedData.hour_from).toFixed(2) : "__"
          } الي ${
            typedData.hour_to ? Number(typedData.hour_to).toFixed(2) : "__"
          }`,
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

const dummyData: PermissionDetails = {
  id: "1",
  requestDate: "17-04-2024",
  type: "[01]استئذان شخصي",
  reason: "سبب مكتوب من قبل الموظف",
  time: "من 10:00 إلى 13:00",
  duration: "03:00 ساعة",
  dateFrom: "17-04-2024",
  dateTo: "17-04-2024",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
