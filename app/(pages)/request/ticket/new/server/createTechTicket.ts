"use server"

// import { getSession } from "@auth"
import { redirect } from "next/navigation"
import { getEmployeeEmail } from "../../../../../server/auth/getEmployeeIdEmail"
import z from "zod"

export const createTechTicket = async (formData: FormData) => {
  // const attachments = formData.getAll("files")
  const category = formData.get("category")
  const subCategory = formData.get("subCategory")
  const subCategoryII = formData.get("subCategory2")
  const subCategoryIII = formData.get("subCategory3")
  const comments = formData.get("comments")

  const email = await getEmployeeEmail()
  const headers = new Headers()
  headers.append("Accept", "application/json")
  headers.append("x-api-key", "API_KEY")
  headers.append(
    "Authorization",
    "Basic bW9uc2hhYXRfbW9iaWxlX2FwcDpNMGJpbGVAcHA=",
  )
  headers.append("content-type", "application/json")

  const raw = JSON.stringify({
    user_id: email,
    callerEmail: email,
    description: comments,
    shortDescription: comments,
    category: category,
    subcategory: subCategory,
    subcategory2: subCategoryII,
    subcategory3: subCategoryIII,
  })

  const response = await fetch(
    "https://helpstg.monshaat.gov.sa/api/tisu4/monshaat_incident_api/createincident",
    {
      method: "POST",
      body: raw,
      headers,
    },
  ).then((res) => res.json())

  const { data, error } = responseSchema.safeParse(response)
  if (error) throw new Error(JSON.stringify(error.flatten().fieldErrors))
  const { result } = data
  const {
    // category,
    // email,
    assignedTo,
    assignmentGroup,
    caller,
    description,
    number,
    opened_at,
    priority,
    short_description,
    state,
    subcategory,
    u_subcategory_2,
  } = result

  redirect(
    `/request/ticket/new/technical/report-problem/success?number=${encodeURIComponent(number)}&sys_id=${encodeURIComponent(result.sys_id)}&caller=${encodeURIComponent(caller)}&email=${encodeURIComponent(email)}&category=${encodeURIComponent(category?.toString() ?? "N/A")}&subcategory=${encodeURIComponent(subcategory)}&u_subcategory_2=${encodeURIComponent(u_subcategory_2 || "")}&state=${encodeURIComponent(state)}&priority=${encodeURIComponent(priority)}&assignmentGroup=${encodeURIComponent(assignmentGroup)}&assignedTo=${encodeURIComponent(assignedTo)}&short_description=${encodeURIComponent(short_description)}&description=${encodeURIComponent(description)}&opened_at=${encodeURIComponent(opened_at)}`,
  )
}

//   {
//   result: {
//     number: 'INC1022562',
//     sys_id: '3d775b10c92f26d020d29fe1d22173e0',
//     caller: 'Assaf Alsaedi',
//     email: 'asaedi@monshaat.gov.sa',
//     category: 'البرامج',
//     subcategory: 'The program is not responding',
//     u_subcategory_2: null,
//     state: 'جديد',
//     priority: 'اساسي',
//     assignmentGroup: 'الدعم الفني',
//     assignedTo: '',
//     short_description: 'safsf',
//     description: 'safsf',
//     opened_at: '2025-08-20 06:49:37'
//   }
// }

const responseSchema = z.object({
  result: z.object({
    number: z.string(),
    sys_id: z.string(),
    caller: z.string(),
    email: z.string(),
    category: z.string(),
    subcategory: z.string(),
    u_subcategory_2: z.string().nullable(),
    state: z.string(),
    priority: z.string(),
    assignmentGroup: z.string(),
    assignedTo: z.string(),
    short_description: z.string(),
    description: z.string(),
    opened_at: z.string(),
  }),
})
