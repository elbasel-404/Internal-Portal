"use server"

import { JobApplicationSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { JobApplicationsRequest } from "@types"
import z from "zod"
import { getData } from "./getData"

export const getJobApplicationsRequests = async (): Promise<
  JobApplicationsRequest[]
> => {
  const jobApplicationType = (jobType: string) => {
    if (jobType === "new") return "جديد"
    else if (jobType === "replacement") return "بديل مستقيل"
    return "نقل داخلي"
  }
  return getData<JobApplicationsRequest>({
    url: "api/po/hr/employee/job/requests/read",
    responseSchema: ResponseSchema,
    dataSchema: JobApplicationSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as z.infer<typeof JobApplicationSchema>

        return {
          id: String(typedItem.id || ""),
          date: String(typedItem.date || ""),
          description: jobApplicationType(typedItem.type),
          jobTitle:
            Array.isArray(typedItem.job_id) && typedItem.job_id.length > 1
              ? String(typedItem.job_id[1])
              : "",
          status: String(typedItem.state || ""),
        }
      })
    },
    dummyData,
  })
}

const dummyData: JobApplicationsRequest[] = [
  {
    id: "#55465",
    date: "2024-05-05",
    description: "جديد",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "الموظف",
  },
  {
    id: "#55466",
    date: "2024-05-06",
    description: "بديل مستقيل",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55467",
    date: "2024-05-07",
    description: "جديد",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "اعتمد",
  },
  {
    id: "#55468",
    date: "2024-05-08",
    description: "نقل داخلي",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "طلب",
  },
  {
    id: "#55469",
    date: "2024-05-09",
    description: "بديل مستقيل",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "اعتمد",
  },
  {
    id: "#55470",
    date: "2024-05-10",
    description: "جديد",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55471",
    date: "2024-05-11",
    description: "بديل مستقيل",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "طلب",
  },
  {
    id: "#55472",
    date: "2024-05-11",
    description: "نقل داخلي",
    jobTitle: "أخصائي تطوير تنظيمي أول",
    status: "اعتمد",
  },
]
