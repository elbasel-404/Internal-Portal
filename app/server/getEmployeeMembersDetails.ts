"use server"

import type { EmployeeMembersDetails } from "@types"
import { EmployeeMemberSchema, ResponseSchema } from "../../api-schemas"
import { getData } from "./getData"

export const getEmployeeMembersDetails = async (
  id: string,
): Promise<EmployeeMembersDetails> => {
  const results = await getData<EmployeeMembersDetails>({
    url: "api/po/hr/employee/members/read",
    responseSchema: ResponseSchema,
    dataSchema: EmployeeMemberSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [employeeMembersDetails]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id || ""),
          date: String(typedData.date || ""),
          requestType: renderRequestTypeValue(String(typedData.type || "")),
          relation: renderRelativeRelationTypeValue(
            String(typedData.relative_relation || ""),
          ),
          nameAr: String(typedData.individual_complete_name || ""),
          nameEn: String(typedData.individual_english_name || ""),
          idNumber: String(typedData.identity || ""),
          birthDate: String(typedData.birthday || ""),
          attachments: Array.isArray(typedData.attachment_ids)
            ? typedData.attachment_ids.map(
                (file: unknown) => new File([""], String(file)),
              )
            : [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [employeeMembersDetails],
  })

  return results[0]
}

const renderRequestTypeValue = (value: string) => {
  if (value === "add") {
    return "إضافة"
  } else if (value === "update") {
    return "تحديث"
  } else {
    return "حذف"
  }
}

const renderRelativeRelationTypeValue = (value: string) => {
  if (value === "father") {
    return "أب"
  } else if (value === "mother") {
    return "أم"
  } else if (value === "son") {
    return "إبن"
  } else if (value === "daughter") {
    return "إبنة"
  } else {
    return "زوج (ة)"
  }
}

const employeeMembersDetails: EmployeeMembersDetails = {
  id: "1",
  date: "2024-05-05",
  requestType: "اضافة",
  relation: "أب",
  nameAr: "يوسف حمد عبد الله القشيمط",
  nameEn: "youssef Hamad Abdullah Alqushaymit",
  idNumber: "10326569",
  birthDate: "2024-05-05 ",
  attachments: [
    new File([""], "نموذج طلب 2 .pdf"),
    new File([""], "نموذج طلب .pdf"),
  ],
}
