"use server"

import type { VacationRequest } from "@types"
import { z } from "zod"
import { HolidayElementSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getVacationRequests = async (): Promise<VacationRequest[]> => {
  return getData<VacationRequest>({
    url: "api/po/hr/holidays/request",
    responseSchema: ResponseSchema,
    dataSchema: HolidayElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as z.infer<typeof HolidayElementSchema>

        // Safely extract holiday status
        const holidayStatus =
          Array.isArray(typedItem.holiday_status_id) &&
          typedItem.holiday_status_id.length > 1
            ? String(typedItem.holiday_status_id[1])
            : ""

        // Safely handle date splitting
        const doneDate =
          typeof typedItem.done_date === "string"
            ? typedItem.done_date.split(" ")[0]
            : undefined

        return {
          id: String(typedItem.id || "__"),
          date: String(typedItem.date || "__"),
          description: holidayStatus || "__",
          startDate: String(typedItem.date_from || "__"),
          endDate: String(typedItem.date_to || "__"),
          durationInDays: Number(typedItem.duration || 0),
          approvalDate: doneDate || "__",
          status: String(typedItem.state || "__"),
        }
      })
    },
    dummyData,
  })
}
const dummyData: VacationRequest[] = [
  {
    id: "#dummy",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة المولود",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: "",
    status: "طلب",
  },
  {
    id: "#55964",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة سنوية",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: 3,
    approvalDate: "",
    status: "المدير المباشر",
  },
  {
    id: "#55963",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة مرضية",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: "",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55962",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة سنوية",
    startDate: "2024-05-02",
    endDate: "2024-05-04",
    durationInDays: 3,
    approvalDate: "",
    status: "اعتمد",
  },
  {
    id: "#55961",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة المولود",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: "",
    status: "طلب",
  },
  {
    id: "#55960",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة سنوية",
    startDate: "2024-04-10",
    endDate: "2024-05-03",
    durationInDays: 24,
    approvalDate: "",
    status: "المدير المباشر",
  },
  {
    id: "#55959",
    date: "2024-05-05 - 04:30:00",
    description: "إجازة مرضية",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    durationInDays: 3,
    approvalDate: "",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55958",
    date: "2024-05-04 - 14:30:00",
    description: "إجازة مرضية",
    startDate: "2024-05-02",
    endDate: "2024-05-03",
    durationInDays: 2,
    approvalDate: "",
    status: "طلب",
  },
  {
    id: "#55957",
    date: "2024-05-04 - 10:15:00",
    description: "إجازة المولود",
    startDate: "2024-05-01",
    endDate: "2024-05-02",
    durationInDays: 2,
    approvalDate: "",
    status: "اعتمد",
  },
  {
    id: "#55956",
    date: "2024-05-03 - 09:45:00",
    description: "إجازة سنوية",
    startDate: "2024-04-29",
    endDate: "2024-05-01",
    durationInDays: 3,
    approvalDate: "",
    status: "عمليات الموارد البشرية",
  },
]

// let approvalDate = j.done_date as string;
// const typeOfApprovalData = typeof approvalDate;
// if (typeOfApprovalData !== "string") {
//   approvalDate = "";
// }
// const item: VacationRequest = {
//   id: String(j.id),
//   date: j.date,
//   description: j.display_name,
//   startDate: j.date_from,
//   endDate: j.date_to,
//   approvalDate,
//   durationInDays: j.duration,
//   status: j.state,
// };
// return item;
