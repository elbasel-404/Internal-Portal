"use server"

import { ResponseSchema, TransactionListElementSchema } from "@api/schemas"
import { getDemo } from "@db/actions"
import type { TransactionRequest } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"
import { getStoredEmployeeId } from "@auth"

export const getTransactionRequests = async (): Promise<
  TransactionRequest[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIABLES
  // ! ======>============================
  const employeeId = await getStoredEmployeeId()
  const url = "api/po/read/retrieve-my-requests"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = { employee_id: employeeId }
  const requestBodyString = JSON.stringify(requestBody)
  const requestUrl = `${apiRootUrl}/${url}`

  // ! FETCH
  // ! ==================================
  const apiResponse = await fetch(requestUrl, {
    headers,
    method: "POST",
    body: requestBodyString,
  })
  const responseJson = await apiResponse.json()

  // ! VALIDATION
  // ! ==================================
  const validatedResponse = ResponseSchema.safeParse(responseJson)
  // const { result } = validatedResponse;
  const result = validatedResponse.data?.result
  const data = result?.data
  const validatedData = TransactionListElementSchema.array().safeParse(data)
  const transactionData = validatedData.data

  // ! PARSING
  // ! ==================================
  const returnedData: TransactionRequest[] = (transactionData ?? []).map(
    (data) => {
      const transactionItem: TransactionRequest = {
        id: data.id.toString(),
        date: data.date ?? "",
        name: data.name ?? "",
        status: data.state ?? "",
      }
      return transactionItem
    },
  )
  return returnedData
}

const dummyData: TransactionRequest[] = [
  {
    id: "#55965",
    name: "طلب تنفيذ",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55964",
    name: "إدارة المكافآت والترقيات",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55963",
    name: "دورة تدريبية خارجية لمدة 3 أيام",
    date: "2024-05-05",
    status: "مرفوض",
  },
  {
    id: "#55962",
    name: "إدارة المكافآت والترقيات",
    date: "2024-05-05",
    status: "تحت الإجراء",
  },
  {
    id: "#55961",
    name: "إدارة المكافآت والترقيات",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55960",
    name: "إجازة سنوية لمدة 24 يوم",
    date: "2024-05-05",
    status: "مرفوض",
  },
  {
    id: "#55959",
    name: "طلب نقل العمل للموظف بنت عبد العزيز الباشر",
    date: "2024-05-05",
    status: "تحت الإجراء",
  },
  {
    id: "#55958",
    name: "طلب إجازة مرضية",
    date: "2024-05-04",
    status: "اعتمد",
  },
  {
    id: "#55957",
    name: "طلب ترقية",
    date: "2024-05-04",
    status: "اعتمد",
  },
  {
    id: "#55956",
    name: "طلب تدريب داخلي",
    date: "2024-05-03",
    status: "مرفوض",
  },
  {
    id: "#55955",
    name: "طلب تنفيذ",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55954",
    name: "إدارة المكافآت والترقيات",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55953",
    name: "دورة تدريبية خارجية لمدة 3 أيام",
    date: "2024-05-05",
    status: "تحت الإجراء",
  },
  {
    id: "#55952",
    name: "إدارة المكافآت والترقيات",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55951",
    name: "إدارة المكافآت والترقيات",
    date: "2024-05-05",
    status: "مرفوض",
  },
  {
    id: "#55950",
    name: "إجازة سنوية لمدة 24 يوم",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55949",
    name: "طلب نقل العمل للموظف بنت عبد العزيز الباشر",
    date: "2024-05-05",
    status: "اعتمد",
  },
  {
    id: "#55948",
    name: "طلب إجازة مرضية",
    date: "2024-05-04",
    status: "اعتمد",
  },
  {
    id: "#55947",
    name: "طلب ترقية",
    date: "2024-05-04",
    status: "اعتمد",
  },
  {
    id: "#55946",
    name: "طلب تدريب داخلي",
    date: "2024-05-03",
    status: "مرفوض",
  },
]
