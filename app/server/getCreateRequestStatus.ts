import type { CreateRequestStatus } from "@types"
import {
  RequestCreateWorkflowElementSchema,
  ResponseSchema,
} from "../../api-schemas"
import { getData } from "./getData"

export const getCreateRequestStatus = async (
  model?: string,
): Promise<CreateRequestStatus[]> => {
  return getData<CreateRequestStatus>({
    url: "api/po/request_workflow",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: RequestCreateWorkflowElementSchema,
    additionalBody: { model: model },
    parseData: (data) => {
      if (!data || data.length === 0) {
        return dummyData
      }

      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        return {
          status: String(typedItem.state) || "",
        }
      })
    },
    dummyData,
  })
}

const dummyData: CreateRequestStatus[] = [
  {
    status: "طلب",
  },
  {
    status: "المدير المباشر",
  },
  {
    status: "عمليات الموارد البشرية",
  },
  {
    status: "أعتمد",
  },
]
