import type { RequestStatus } from "@types"
import {
  RequestDetailsWorkflowElementSchema,
  ResponseSchema,
} from "@api/schemas"
import { getData } from "./getData"

export const getRequestStatus = async (
  id: string,
  model: string, // id: string,
): Promise<RequestStatus[]> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  const getStringValue = (field: unknown): string =>
    typeof field === "string"
      ? field
      : typeof field === "number"
        ? String(field)
        : ""

  return getData<RequestStatus>({
    url: "api/po/last_update",
    includeEmployeeId: true,
    responseSchema: ResponseSchema,
    dataSchema: RequestDetailsWorkflowElementSchema,
    additionalBody: { res_id: id, res_model: model },
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, unknown>

        return {
          id: getStringValue(typedItem.id),
          title: getArrayValue(typedItem.state),
          subtitle: getStringValue(typedItem.employee_name),
          icon: getStringValue(typedItem.icon),
          status: getStringValue(typedItem?.status),
        }
      })
    },
    dummyData,
  })
}

const dummyData: RequestStatus[] = [
  {
    id: "1",
    title: "مقدم الطلب",
    subtitle: "عساف بن رشود الصاعدي",
    icon: "person",
    status: "completed",
  },
  {
    id: "2",
    title: "المدير المباشر",
    subtitle: "حمد بن يوسف القشيميط",
    icon: "person",
    status: "in-progress",
  },
  {
    id: "3",
    title: "عمليات الموارد البشرية",
    subtitle: "حمد بن يوسف القشيميط",
    icon: "person",
    status: "pending",
  },
  {
    id: "4",
    title: "أُعتمد",
    subtitle: "حمد بن يوسف القشيميط",
    icon: "personConfirmed",
    status: "pending",
  },
]
