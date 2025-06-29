"use server"

import { getData } from "./getData"
import { OvertimeAssignmentElementSchema, ResponseSchema } from "@api/schemas"

import { OvertimeAssignmentDetails } from "@types"

export const getOvertimeAssignmentDetails = async (
  id: string,
): Promise<OvertimeAssignmentDetails | void> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string" ? field : ""

  const result = await getData<OvertimeAssignmentDetails>({
    url: "api/po/hr/overtime_assignment",
    responseSchema: ResponseSchema,
    dataSchema: OvertimeAssignmentElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: getStringValue(typedData.name),
          applicant: getArrayValue(typedData.employee_id),
          fromDate: getStringValue(typedData.date_from),
          toDate: getStringValue(typedData.date_to),
          hours: typedData.nb_hours?.toString() ?? "",
          assignmentDescription: getStringValue(typedData.description),
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}
const dummyData: OvertimeAssignmentDetails = {
  id: "#55470",
  applicant: "خالد إبراهيم",
  fromDate: "2024-03-05 15:00",
  toDate: "2024-03-05 19:00",
  hours: "4",
  assignmentDescription: "التفاوض مع الموردين وتحديث العقود",
}
