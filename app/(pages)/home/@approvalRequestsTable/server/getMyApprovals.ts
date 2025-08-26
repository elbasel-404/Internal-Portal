"use server"

import { getDemo } from "@db/actions"
import { RequestType } from "@types"
import { getSession, getStoredEmployeeId } from "@auth"
import z from "zod"

export const getMyApprovals = async (): Promise<RequestType[]> => {
  const demo = await getDemo()
  if (demo) return dummyData
  const employeeId = await getStoredEmployeeId()

  const url = `https://apis.monshaat.gov.sa/ERP/TaskService/api/mo/retrieve_my_requests_new?employee_id=${employeeId}`
  const session = await getSession()
  const accessToken = session?.access_token

  const json = await fetch(url, {
    method: "POST",
    headers: {
      // cookie: "session_id=7cdbcfdc84f050a2afa624abf502f7d241f19b06",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Cookie: "session_id=7cdbcfdc84f050a2afa624abf502f7d241f19b06",
      "x-api-key": "85ced9c9-b64b-4d76-85a5-ae3b869b044d",
    },
  }).then((res) => res.json())

  const { success, error, data } = responseSchema.safeParse(json)

  if (!success) {
    console.log({ json })
    console.error(error)
    return [
      {
        id: "VALIDATION_ERROR",
        date: "VALIDATION_ERROR",
        description: "VALIDATION_ERROR",
      },
    ]
  }

  const actualData = data?.at(0)?.data
  const dataKeys = Object.keys(actualData)
  const items = dataKeys.map((key) => {
    const value = actualData[key]
    const valueIsArray = Array.isArray(value)
    if (valueIsArray && value.length > 0) {
      return value.map((item) => ({
        id: item.id,
        date: item.create_date,
        description: key,
      }))
    }
  })

  const flattenedItems = items
    .flat()
    .filter((item) => item !== undefined) as RequestType[]
  return flattenedItems.sort((a, b) => (a.date < b.date ? 1 : -1))
}

const resModelSchema = z.enum([
  "hr.holidays",
  "hr.deputation",
  "hr.job.request",
  "hr.authorization",
  "change.bank.account",
  "change.bank.account.request",
  "hr.medical.insurance",
  "salary.identification.request",
  "helpdesk.ticket",
  "hr.distance.work",
  "purchase.request",
  "purchase.requisition",
  "purchase.contract",
  "contractor.request",
  "hr.relation.supplier.evaluation",
  "work.order",
  "hr.payslip",
  "hr.payslip.run",
  "hr.training.request",
  "payment.order",
  "purchase.order",
  "purchase.add.budget",
  "certificate.achievement",
  "hr.training.public",
  "hr.resignation",
  "manage.financial.custody",
  "manage.financial.custody.close",
  "hr.employee.members",
  "hr.passport.request",
  "hr.probation.evaluation",
  "hr.performance.planning",
  "hr.performance.flow",
  "hr.overtime.assignment",
  "hr.performance.evaluation",
  "hr.overtime.request",
  "helpdesk.service",
])
const itemSchema = z.object({
  id: z.string().or(z.any()),
  name: z.string().or(z.any()),
  current_employee_account: z.string().or(z.any()),
  employee_id: z.array(z.union([z.number(), z.string()])).or(z.any()),
  new_bank_id: z.array(z.union([z.number(), z.string()])).or(z.any()),
  iban: z.string().or(z.any()),
  attachment_ids: z.array(z.union([z.number(), z.string()])).or(z.any()),
  account_status: z.string().or(z.any()),
  state: z.string().or(z.any()),
  order_date: z.string().or(z.any()),
  refuse_reason: z.boolean().or(z.any()),
  check_attachment: z.boolean().or(z.any()),
  website_message_ids: z.array(z.union([z.number(), z.string()])).or(z.any()),
  message_follower_ids: z.array(z.union([z.number(), z.string()])).or(z.any()),
  message_ids: z.array(z.union([z.number(), z.string()])).or(z.any()),
  message_last_post: z.boolean().or(z.any()),
  create_uid: z.array(z.union([z.number(), z.string()])).or(z.any()),
  create_date: z.string().or(z.any()),
  write_uid: z.array(z.union([z.number(), z.string()])).or(z.any()),
  write_date: z.string().or(z.any()),
  message_is_follower: z.boolean().or(z.any()),
  message_partner_ids: z.array(z.union([z.number(), z.string()])).or(z.any()),
  message_channel_ids: z.array(z.union([z.number(), z.string()])).or(z.any()),
  message_unread: z.boolean().or(z.any()),
  message_unread_counter: z.number().or(z.any()),
  message_needaction: z.boolean().or(z.any()),
  message_needaction_counter: z.number().or(z.any()),
  display_name: z.string().or(z.any()),
  __last_update: z.string().or(z.any()),
  res_model: resModelSchema.or(z.any()),
})

const dataSchema = z.object({
  isManager: z.boolean().or(z.any()),
  "bank account request": z.array(itemSchema).or(z.any()),
  holidays: z.array(itemSchema).or(z.any()),
  authorizations: z.array(itemSchema).or(z.any()),
  "distance work": z.array(itemSchema).or(z.any()),
  training: z.array(itemSchema).or(z.any()),
  deputations: z.array(itemSchema).or(z.any()),
  "purchase requests": z.array(itemSchema).or(z.any()),
  "certificate achievement": z.array(itemSchema).or(z.any()),
  "purchase orders": z.array(itemSchema).or(z.any()),
  "payment orders": z.array(itemSchema).or(z.any()),
  "purchase requisition": z.array(itemSchema).or(z.any()),
  "work orders": z.array(itemSchema).or(z.any()),
  "purchase add budget": z.array(itemSchema).or(z.any()),
  "purchase contracts": z.array(itemSchema).or(z.any()),
  "help desk": z.array(itemSchema).or(z.any()),
  "salary requests": z.array(itemSchema).or(z.any()),
  resignations: z.array(itemSchema).or(z.any()),
  training_public: z.array(itemSchema).or(z.any()),
  custody: z.array(itemSchema).or(z.any()),
  "custody close": z.array(itemSchema).or(z.any()),
  "medical insurance": z.array(itemSchema).or(z.any()),
  "probation evaluation": z.array(itemSchema).or(z.any()),
  "passport request": z.array(itemSchema).or(z.any()),
  "employee members": z.array(itemSchema).or(z.any()),
  payslip: z.array(itemSchema).or(z.any()),
  "payslip run": z.array(itemSchema).or(z.any()),
  "overtime assignment": z.array(itemSchema).or(z.any()),
  "overtime request": z.array(itemSchema).or(z.any()),
  "performance evaluation": z.array(itemSchema).or(z.any()),
  "job request": z.array(itemSchema).or(z.any()),
  "performance planning": z.array(itemSchema).or(z.any()),
  "performance flow": z.array(itemSchema).or(z.any()),
  "contractor request": z.array(itemSchema).or(z.any()),
  "supplier evaluation": z.array(itemSchema).or(z.any()),
})

const responseSchema = z.array(
  z.object({
    status: z.string().or(z.any()),
    message: z.string().or(z.any()),
    data: dataSchema.or(z.any()),
  }),
)

const dummyData: RequestType[] = [
  { id: "#55965", description: "طلب تنفيذ", date: "2024-05-05 - 04:30:00" },
  {
    id: "#55964",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55963",
    description: "دورة تدريبية خارجية لمدة 3 أيام",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55962",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55961",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55960",
    description: "إجازة سنوية لمدة 24 يوم",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55959",
    description: "طلب نقل العمل للموظف بنت عبد العزيز الباشر",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55958",
    description: "طلب إجازة مرضية",
    date: "2024-05-04 - 14:30:00",
  },
  { id: "#55957", description: "طلب ترقية", date: "2024-05-04 - 10:15:00" },
  {
    id: "#55956",
    description: "طلب تدريب داخلي",
    date: "2024-05-03 - 09:45:00",
  },
  { id: "#55955", description: "طلب تنفيذ", date: "2024-05-05 - 04:30:00" },
  {
    id: "#55954",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55953",
    description: "دورة تدريبية خارجية لمدة 3 أيام",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55952",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55951",
    description: "إدارة المكافآت والترقيات",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55950",
    description: "إجازة سنوية لمدة 24 يوم",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55949",
    description: "طلب نقل العمل للموظف بنت عبد العزيز الباشر",
    date: "2024-05-05 - 04:30:00",
  },
  {
    id: "#55948",
    description: "طلب إجازة مرضية",
    date: "2024-05-04 - 14:30:00",
  },
  { id: "#55947", description: "طلب ترقية", date: "2024-05-04 - 10:15:00" },
  {
    id: "#55946",
    description: "طلب تدريب داخلي",
    date: "2024-05-03 - 09:45:00",
  },
]
