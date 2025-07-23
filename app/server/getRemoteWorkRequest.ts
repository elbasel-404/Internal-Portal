"use server"

import { RemoteWorkRequest } from "@types"
import { formatDate } from "@utils"
import { RemoteWorkElementSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getRemoteWorkRequests = async (): Promise<RemoteWorkRequest[]> => {
  return getData<RemoteWorkRequest>({
    url: "api/po/hr/distance/work",
    responseSchema: ResponseSchema,
    dataSchema: RemoteWorkElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, Date>
        return {
          id: String(typedItem.id),
          date: formatDate(typedItem.create_date),
          startDate: String(typedItem.date_from),
          endDate: String(typedItem.date_to),
          durationInDays: String(typedItem.duration),
          status: String(typedItem.state),
        }
      })
    },
    dummyData: remoteWorkRequests,
  })
}

const remoteWorkRequests: RemoteWorkRequest[] = [
  {
    id: "#55965",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: "3",
    status: "طلب",
  },
  {
    id: "#55964",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: "3",
    status: "المدير المباشر",
  },
  {
    id: "#55963",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: "3",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55962",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: "3",
    status: "اعتمد",
  },
  {
    id: "#55961",
    date: "2024-05-05 - 04:30:00",

    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: "3",
    status: "طلب",
  },
  {
    id: "#55960",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-04-10",
    endDate: "2024-05-03",
    durationInDays: "24",
    status: "المدير المباشر",
  },
  {
    id: "#55959",
    date: "2024-05-05 - 04:30:00",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: "3",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55958",
    date: "2024-05-04 - 14:30:00",
    startDate: "2024-05-02",
    endDate: "2024-05-03",
    durationInDays: "2",
    status: "طلب",
  },
  {
    id: "#55957",
    date: "2024-05-04 - 10:15:00",

    startDate: "2024-05-01",
    endDate: "2024-05-02",
    durationInDays: "2",
    status: "اعتمد",
  },
  {
    id: "#55956",
    date: "2024-05-03 - 09:45:00",
    startDate: "2024-04-29",
    endDate: "2024-05-01",
    durationInDays: "3",
    status: "عمليات الموارد البشرية",
  },
]
