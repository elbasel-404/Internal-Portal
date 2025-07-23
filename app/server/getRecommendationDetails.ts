"use server"

import { RecommendationSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { RecommendationDetails } from "@types"
import { getData } from "./getData"

export const getRecommendationDetails = async (
  id: string,
): Promise<RecommendationDetails | void> => {
  const result = await getData<RecommendationDetails>({
    url: "api/po/hr/application/read",
    responseSchema: ResponseSchema,
    dataSchema: RecommendationSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, any>

      return [
        {
          id: String(typedData.id),
          recommendationDate: String(typedData.date),
          city: typedData.place[1],
          cycle: typedData.training_id[1],
          cycleCost: "0 ريال",
          cycleDate: String(typedData.date_from),
          cycleProgram: "__",
          degree: typedData.degree_id[1],
          duration: String(typedData.number_of_days),
          employee: typedData.employee_id[1],
          jobNumber: typedData.job_id[0],
          jobTitle: typedData.job_id[1],
          trainingCenter: String(typedData.training_center),
          type: String(typedData.type),
          management: typedData.department_id[1],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}
const dummyData: RecommendationDetails = {
  id: "1",
  recommendationDate: "17-04-2024",
  city: "الرياض",
  cycle: "دورة القيادة الإدارية",
  cycleCost: "5000 ريال",
  cycleDate: "01-05-2024",
  cycleProgram: "برنامج تطوير المهارات الإدارية",
  degree: "بكالوريوس إدارة أعمال",
  duration: "5 أيام",
  employee: "حمد بن يوسف القشميط",
  jobNumber: "123456",
  jobTitle: "مدير مشاريع",
  management: "إدارة التخطيط الاستراتيجي",
  trainingCenter: "مركز تدريب القيادة",
  type: "تطوير مهني",
}
