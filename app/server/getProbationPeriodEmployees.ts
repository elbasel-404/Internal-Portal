import { ProbationEvaluationEmployeeSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { ProbationPeriodEmployees } from "@types"
import { getData } from "./getData"

export const getProbationPeriodEmployees = async (): Promise<
  ProbationPeriodEmployees[]
> => {
  return getData<ProbationPeriodEmployees>({
    url: "api/po/hr/probation-evaluation/fields",
    responseSchema: ResponseSchema,
    dataSchema: ProbationEvaluationEmployeeSchema,
    parseData: (data) => {
      return data.map((item: unknown) => {
        const typedItem = item as Record<string, any>
        return {
          id: String(typedItem.id),
          employeeName: String(typedItem.complete_name),
          jobTitle: typedItem.job_id[1],
          jobNumber: String(typedItem.number),
          department: typedItem.department_id[1],
          appointmentDate: String(typedItem.hiring_date),
          endProbationPeriodDate: String(typedItem.date_probation_end),
        }
      })
    },
    additionalBody: { field_name: "employees" },
    dummyData: dummyData,
  })
}

const dummyData: ProbationPeriodEmployees[] = [
  {
    id: "1",
    employeeName: "عساف بن رشود الصاعدي",
    jobNumber: "12345",
    jobTitle: "مهندس برمجيات",
    department: "تكنولوجيا المعلومات",
    appointmentDate: "2023-01-15",
    endProbationPeriodDate: "2023-04-15",
  },
  {
    id: "2",
    employeeName: "سارة بنت عبدالله القحطاني",
    jobNumber: "67890",
    jobTitle: "محلل نظم",
    department: "تكنولوجيا المعلومات",
    appointmentDate: "2023-02-20",
    endProbationPeriodDate: "2023-05-20",
  },
  {
    id: "3",
    employeeName: "محمد بن علي العتيبي",
    jobNumber: "54321",
    jobTitle: "مدير مشروع",
    department: "إدارة المشاريع",
    appointmentDate: "2023-03-10",
    endProbationPeriodDate: "2023-06-10",
  },
  {
    id: "4",
    employeeName: "نورة بنت سعيد الزهراني",
    jobNumber: "98765",
    jobTitle: "أخصائي موارد بشرية",
    department: "الموارد البشرية",
    appointmentDate: "2023-04-05",
    endProbationPeriodDate: "2023-07-05",
  },
  {
    id: "5",
    employeeName: "فيصل بن عبدالله الدوسري",
    jobNumber: "11223",
    jobTitle: "محاسب",
    department: "المالية",
    appointmentDate: "2023-05-01",
    endProbationPeriodDate: "2023-08-01",
  },
]
