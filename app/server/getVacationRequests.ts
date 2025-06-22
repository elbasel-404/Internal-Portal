"use server"

import type { VacationRequest } from "@types"
import { HolidayElementSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getVacationRequests = async (): Promise<VacationRequest[]> => {
  return getData<VacationRequest>({
    url: "api/po/hr/holidays/request",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: HolidayElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, any>
        return {
          id: typedItem.id.toString(),
          date: typedItem.date,
          description: typedItem.holiday_status_id[1].toString(),
          startDate: typedItem.date_from,
          endDate: typedItem.date_to,
          durationInDays: typedItem.duration,
          approvalDate: typedItem.done_date?.split(" ")[0],
          status: typedItem.state,
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
