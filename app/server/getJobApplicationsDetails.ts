"use server"

import { JobApplicationSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { JobApplicationsDetails } from "@types"
import { getData } from "./getData"

export const getJobApplicationsDetails = async (
  id: string,
): Promise<JobApplicationsDetails> => {
  const result = await getData<JobApplicationsDetails>({
    url: "api/po/hr/employee/job/requests/read",
    responseSchema: ResponseSchema,
    dataSchema: JobApplicationSchema,
    includeEmployeeId: false,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      const jobApplicationType = (jobType: string) => {
        if (jobType === "new") return "جديد"
        else if (jobType === "replacement") return "بديل مستقيل"
        return "نقل داخلي"
      }

      return [
        {
          id: String(typedData.id || ""),
          requestDate: String(typedData.date || ""),
          applicant:
            Array.isArray(typedData.employee_id) &&
            typedData.employee_id.length > 1
              ? String(typedData.employee_id[1])
              : "",
          department:
            Array.isArray(typedData.department_id) &&
            typedData.department_id.length > 1
              ? String(typedData.department_id[1])
              : "",
          generalAdministration:
            Array.isArray(typedData.department_global_id) &&
            typedData.department_global_id.length > 1
              ? String(typedData.department_global_id[1])
              : "",
          management:
            Array.isArray(typedData.administration_id) &&
            typedData.administration_id.length > 1
              ? String(typedData.administration_id[1])
              : "",
          requestType: jobApplicationType(String(typedData.type)),
          sector:
            Array.isArray(typedData.sector_id) && typedData.sector_id.length > 1
              ? String(typedData.sector_id[1])
              : "",
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}

const dummyData: JobApplicationsDetails = {
  id: "1",
  requestDate: "2021-09-01",
  requestType: "جديد",
  applicant: "(1762) عساف بن رشود الصاعدي",
  sector: "ريادة الاعمال",
  generalAdministration: "ريادة الاعمال / الإبتكار",
  department: "ريادة الاعمال / الإبتكار / الإبتكار / الإبتكار",
  management: "ريادة الاعمال / الإبتكار / الإبتكار / الإبتكار",
}
