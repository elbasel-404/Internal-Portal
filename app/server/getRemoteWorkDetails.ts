"use server"

import type { RemoteWorkDetails } from "@types"
import { formatDate } from "@utils"
import { RemoteWorkElementSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getRemoteWorkDetails = async (
  id: string,
): Promise<RemoteWorkDetails | void> => {
  const result = await getData<RemoteWorkDetails>({
    url: "api/po/hr/distance/work",
    responseSchema: ResponseSchema,
    dataSchema: RemoteWorkElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, Date>

      return [
        {
          id: String(typedData.id),
          requestDate: formatDate(typedData.create_date),
          remoteWorkDate: `من ${typedData.date_from} الي  ${typedData.date_to}`,
          duration: String(typedData.duration),
          madeThroughTheApp: typedData.is_from_mobile ? "نعم" : "لا",
          notes:
            typeof typedData.description === "string"
              ? typedData.description
              : "",
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}

const dummyData: RemoteWorkDetails = {
  id: "1",
  requestDate: "2021-09-01",
  remoteWorkDate: "من 17-04-2024 الى 18-04-2024",
  duration: "1 يوم",
  madeThroughTheApp: "نعم",
  notes:
    "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ",
}
