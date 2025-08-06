"use server"

import type { AttendanceListRequest } from "@types"
import { AttendanceSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"
import { z } from "zod"
interface attendProps {
  start?: string
  end?: string
  month?: string
}

export const getAttendanceListRequests = async ({
  start,
  end,
  month,
}: attendProps): Promise<AttendanceListRequest[]> => {
  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  return getData<AttendanceListRequest>({
    url: "api/po/read/employee-attendance",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: AttendanceSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as z.infer<typeof AttendanceSchema>

        return {
          id: getStringValue(typedItem.id),
          date: getStringValue(typedItem.date),
          login: getStringValue(typedItem.check_in),
          exit: getStringValue(typedItem.check_out),
          workingHours: getStringValue(typedItem.worked_hours),
          delay: getStringValue(typedItem.retard),
          earlyExit: getStringValue(typedItem.leave),
          overTime: getStringValue(typedItem.hours_supp),
          permission: getStringValue(typedItem.authorization),
          status: getStringValue(typedItem.absence_type),
        }
      })
    },
    dummyData,
    additionalBody: {
      emp_id: 1722,
      date_start: start,
      date_end: end,
      month_date: month,
    },
  })
}

const dummyData: AttendanceListRequest[] = [
  {
    id: "1",
    date: "2024-12-01",
    login: "08:00 AM",
    exit: "05:00 PM",
    workingHours: "40 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "حاضر",
  },
  {
    id: "2",
    date: "2024-12-02",
    login: "08:15 AM",
    exit: "04:45 PM",
    workingHours: "20 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "غائب",
  },
  {
    id: "3",
    date: "2024-12-03",
    login: "09:00 AM",
    exit: "06:00 PM",
    workingHours: "20 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "حاضر",
  },
  {
    id: "4",
    date: "2024-12-04",
    login: "10:00 AM",
    exit: "05:00 PM",
    workingHours: "30 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "غائب",
  },
  {
    id: "5",
    date: "2024-12-05",
    login: "08:00 AM",
    exit: "05:30 PM",
    workingHours: "50 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "حاضر",
  },
  {
    id: "6",
    date: "2024-12-06",
    login: "08:30 AM",
    exit: "05:00 PM",
    workingHours: "12 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "غائب",
  },
  {
    id: "7",
    date: "2024-12-07",
    login: "08:00 AM",
    exit: "03:00 PM",
    workingHours: "18 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "حاضر",
  },
  {
    id: "8",
    date: "2024-12-08",
    login: "07:45 AM",
    exit: "05:15 PM",
    workingHours: "20 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "غائب",
  },
  {
    id: "9",
    date: "2024-12-09",
    login: "08:00 AM",
    exit: "05:00 PM",
    workingHours: "40 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "حاضر",
  },
  {
    id: "10",
    date: "2024-12-10",
    login: "08:30 AM",
    exit: "05:30 PM",
    workingHours: "35 ساعة",
    delay: "08.01:02",
    earlyExit: "08.01:02",
    overTime: "08.01:02",
    permission: "08.01:02",
    status: "غائب",
  },
]
