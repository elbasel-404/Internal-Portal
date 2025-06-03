"use server"

import { colors } from "@lib"
import type { GeneralInfo } from "@types"

export const getAttendanceGeneralInfo = async (): Promise<GeneralInfo[]> => {
  return attendanceGeneralInfo
}

const attendanceGeneralInfo: GeneralInfo[] = [
  {
    title: "إجمالي عدد الساعات",
    count: 20,
    icon: "WorkTimeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -50,
    key: "employeeRequests",
    active: true,
    index: 0,
  },
  {
    title: "التأخير",
    count: 1.15,
    icon: "PersonWithLaptopIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -51,
    key: "employeeRequests",
    active: true,
    index: 1,
  },
  {
    title: "الساعات الإضافية",
    count: 20,
    icon: "TimerStartIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -52,
    key: "employeeRequests",
    active: true,
    index: 2,
  },
  {
    title: "الخروج المبكر",
    count: 1.15,
    icon: "WorkingHomeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -53,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
  {
    title: "الاستئذان",
    count: 1.15,
    icon: "TimeWithScreenIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -54,
    key: "employeeRequests",
    active: true,
    index: 4,
  },
]
