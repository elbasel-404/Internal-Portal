"use server"

import { getData } from "./getData"
import { OvertimeConfirmElementSchema, ResponseSchema } from "@api/schemas"

import { OvertimeConfirmDetails } from "@types"

export const getOvertimeConfirmDetails = async (
  id: string,
): Promise<OvertimeConfirmDetails | void> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<OvertimeConfirmDetails>({
    url: "api/po/hr/overtime_request",
    responseSchema: ResponseSchema,
    dataSchema: OvertimeConfirmElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: getStringValue(typedData.name),
          applicant: getArrayValue(typedData.employee_id),
          management: getArrayValue(typedData.department_id),
          overTimeDuration: String(typedData.nb_extras_time),
          assignmentNumber: getArrayValue(typedData.overtime_assignment_id),
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}
const dummyData: OvertimeConfirmDetails = {
  id: "#55470",
  applicant: "خالد إبراهيم",
  management: "إدارة تقنية المعلومات",
  overTimeDuration: "5.0",
  assignmentNumber: "7080",
}
