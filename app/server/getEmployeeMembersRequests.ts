"use server"

import { EmployeeMemberSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import { getStoredEmployeeId } from "@auth"
import { getDemo } from "@db/actions"
import type { EmployeeMembersRequest } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getEmployeeMembersRequests = async () => {
  const isDemo = await getDemo()
  if (isDemo) return dummyData

  // ! VARIABLES
  // ! ==================================
  const employeeId = await getStoredEmployeeId()
  const url = "api/po/hr/employee/members/read"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = { employee_id: Number(employeeId) }
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
  const result = validatedResponse.data?.result
  const data = result?.data
  const validatedData = EmployeeMemberSchema.array().safeParse(data)
  const employeeMembersData = validatedData.data

  // ! PARSING
  // ! ==================================
  const returnedData: EmployeeMembersRequest[] = employeeMembersData
    ? employeeMembersData.map((data) => {
        const employeeMember: EmployeeMembersRequest = {
          id: data.id.toString(),
          date: data.date,
          applicant: data.employee_id[1]
            .toString()
            .replace(/\[\d+\]\s*/, "")
            .split(/\s+/)[0],
          requestType: data.type,
          relation: data.relative_relation,
          nameAr: data.individual_complete_name,
          nameEn: data.individual_english_name,
          idNumber: data.identity,
          birthDate: data.birthday,
          status: data.state,
        }
        return employeeMember
      })
    : []

  return returnedData
}

const dummyData: EmployeeMembersRequest[] = [
  {
    id: "#55965",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55964",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55963",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55962",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "المدير المباشر",
  },
  {
    id: "#55961",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55960",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55959",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "المدير المباشر",
  },
  {
    id: "#55958",
    date: "2024-05-04",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55957",
    date: "2024-05-04",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55956",
    date: "2024-05-03",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "المدير المباشر",
  },
  {
    id: "#55955",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55954",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55953",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "المدير المباشر",
  },
  {
    id: "#55952",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55951",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "عمليات الموارد البشرية",
  },
  {
    id: "#55950",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55949",
    date: "2024-05-05",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "المدير المباشر",
  },
  {
    id: "#55948",
    date: "2024-05-04",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "اعتمد",
  },
  {
    id: "#55947",
    date: "2024-05-04",
    applicant: "حمد",
    requestType: "اضافة",
    relation: "أب",
    nameAr: "يوسف حمد عبد الله القشيمط",
    nameEn: "youssef Hamad Abdullah Alqushaymit",
    idNumber: "10326569",
    birthDate: "2024-05-05 ",
    status: "عمليات الموارد البشرية",
  },
]
