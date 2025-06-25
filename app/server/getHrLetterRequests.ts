"use server"

import type { HrLetterRequest } from "@types"
import {
  ResponseSchema,
  SalaryIdentificationElementSchema,
} from "../../api-schemas"
import { getData } from "./getData"

export const getHrLetterRequests = async (): Promise<HrLetterRequest[]> => {
  return getData<HrLetterRequest>({
    url: "api/po/salary/identification/request/read",
    responseSchema: ResponseSchema,
    dataSchema: SalaryIdentificationElementSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        // Safely handle array access
        const destinationId =
          Array.isArray(typedItem.destination_id) &&
          typedItem.destination_id.length > 1
            ? String(typedItem.destination_id[1] || "")
            : "__"

        return {
          id: String(typedItem.id || ""),
          date: String(typedItem.order_date || ""),
          description: String(typedItem.template_name || "__"),
          destination: destinationId,
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData: HrLetterDummyData,
  })
}

const HrLetterDummyData: HrLetterRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    description: "تعريف بتفاصيل الراتب",
    destination: "لمن يهمه الأمر",
    status: "طلب",
  },
  {
    id: "#53965",
    date: "2024-05-05",
    description: "تعريف بتفاصيل الراتب",
    destination: "لمن يهمه الأمر",
    status: "المدير المباشر",
  },
  {
    id: "#57965",
    date: "2024-05-05",
    description: "تثبيت راتب",
    destination: "لمن يهمه الأمر",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#52965",
    date: "2024-05-05",
    description: "تعريف بدون راتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
  {
    id: "#55955",
    date: "2024-05-05",
    description: "تعريف بتفاصيل الراتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
  {
    id: "#54965",
    date: "2024-05-05",
    description: "تثبيت راتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
  {
    id: "#55968",
    date: "2024-05-05",
    description: "تعريف بدون راتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
  {
    id: "#55645",
    date: "2024-05-05",
    description: "تعريف بتفاصيل الراتب",
    destination: "لمن يهمه الأمر",
    status: "المدير المباشر",
  },
  {
    id: "#55974",
    date: "2024-05-05",
    description: "تعريف بدون راتب",
    destination: "لمن يهمه الأمر",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#51965",
    date: "2024-05-05",
    description: "تثبيت راتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
  {
    id: "#54565",
    date: "2024-05-05",
    description: "تعريف بتفاصيل الراتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
  {
    id: "#55765",
    date: "2024-05-05",
    description: "تعريف بدون راتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
  {
    id: "#51265",
    date: "2024-05-05",
    description: "تعريف بتفاصيل الراتب",
    destination: "لمن يهمه الأمر",
    status: "اعتمد",
  },
]
