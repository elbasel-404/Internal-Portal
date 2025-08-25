import type { CreateRequestStatus } from "@types"
import {
  RequestCreateWorkflowElementSchema,
  ResponseSchema,
} from "../../../../../api-schemas"
import { getData } from "../../../../server/getData"

export const getContractorRequestWorkflow = async (): Promise<
  CreateRequestStatus[]
> => {
  return getData<CreateRequestStatus>({
    url: "api/po/contractor-request/fields",
    includeEmployeeId: false,
    responseSchema: ResponseSchema,
    dataSchema: RequestCreateWorkflowElementSchema,
    additionalBody: { field_name: "state" },
    parseData: (data) => {
      if (!data || data.length === 0) {
        return dummyData
      }

      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        return {
          status: String(typedItem.name) || "",
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
