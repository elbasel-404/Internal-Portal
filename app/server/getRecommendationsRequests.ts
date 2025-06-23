"use server"

import { RecommendationSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { RecommendationRequest } from "@types"
import { getData } from "./getData"

export const getRecommendationsRequests = async (): Promise<
  RecommendationRequest[]
> => {
  return getData<RecommendationRequest>({
    url: "api/po/hr/application/read",
    responseSchema: ResponseSchema,
    dataSchema: RecommendationSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>
        return {
          id: String(typedItem.id || ""),
          date: String(typedItem.date || ""),
          type: String(typedItem.type || ""),
          cycle:
            Array.isArray(typedItem.training_id) &&
            typedItem.training_id.length > 1
              ? String(typedItem.training_id[1])
              : "",
          startDate: String(typedItem.date_from || ""),
          endDate: String(typedItem.date_to || ""),
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData: RecommendationsDummyData,
  })
}

const RecommendationsDummyData: RecommendationRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    type: "محلي",
    cycle: "طلب دورة جماعية من النظام",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    status: "اعتمد",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    type: "دولي",
    cycle: "دورة تدريب خارجية",
    startDate: "2024-06-05",
    endDate: "2024-06-20",
    status: "المدير المباشر",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    type: "محلي",
    cycle: "دورة تخصصية",
    startDate: "2024-06-10",
    endDate: "2024-06-25",
    status: "مدير عام الموارد البشرية",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    type: "محلي",
    cycle: "طلب تطوير مهارات",
    startDate: "2024-06-15",
    endDate: "2024-06-30",
    status: "اعتمد",
  },
]
