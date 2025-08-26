import type { attachment } from "@types"
import {
  RequestContractorFieldsElementSchema,
  ResponseSchema,
} from "../../../../../api-schemas"
import { getData } from "../../../../server/getData"

export const getAttachmentData = async (): Promise<attachment[]> => {
  const getArrayValue = (field: unknown, index: number = 1): string =>
    Array.isArray(field) ? (field[index]?.toString() ?? "") : ""

  return getData<attachment>({
    url: "api/po/contractor-request/fields",
    includeEmployeeId: false,
    responseSchema: ResponseSchema,
    dataSchema: RequestContractorFieldsElementSchema,
    additionalBody: { field_name: "docs" },
    parseData: (data) => {
      if (!data || data.length === 0) {
        return dummyData
      }
      const typedData = data[0] as Record<string, unknown>

      return [
        {
          identity: getArrayValue(typedData.identity_attachment_ids, 0),
          acceptableUse: getArrayValue(
            typedData.acceptable_use_attachment_ids,
            0,
          ),
          nonDisclosure: getArrayValue(
            typedData.nondisclosure_attachment_ids,
            0,
          ),
        },
      ]
    },
    dummyData,
  })
}

const dummyData: attachment[] = [
  {
    identity: "file_12345.pdf",
    acceptableUse: "file_67890.pdf",
    nonDisclosure: "file_54321.pdf",
  },
]
