"use server"

import type { ProfileInfo } from "@types"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { ProfileElementSchema } from "@api/schemas"
import { getData } from "./getData"

export const getProfileInfo = async (): Promise<ProfileInfo> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  const result = await getData<ProfileInfo>({
    url: "api/po/read/home/employee-info",
    responseSchema: ResponseSchema,
    dataSchema: ProfileElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      // Handle image safely
      const imageBase64 =
        typeof typedData.image_medium === "string" ? typedData.image_medium : ""

      return [
        {
          id: getStringValue(typedData.id),
          name: getStringValue(typedData.complete_name),
          image: `data:image/gif;base64,${imageBase64}`,
          department: getArrayValue(typedData.department_id),
          job: getArrayValue(typedData.job_id),
          jobNumber: getStringValue(typedData.number),
          degree: getArrayValue(typedData.degree_id),
          serviceDuration: getStringValue(typedData.service_duration_display),
        },
      ]
    },
    dummyData: [dummyData],
  })

  return result[0]
}

const dummyData: ProfileInfo = {
  id: "1",
  name: "عساف بن رشود الصاعدي",
  image: "/demo-img.png",
  department: "المركز السعودي للتعليم الإلكتروني",
  job: "مدير الأنظمة الداخلية (مكلف)",
  jobNumber: "1307",
  degree: "10",
  serviceDuration: "1 سنة و6 شهر و 7يوم",
}
