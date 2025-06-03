"use server"

import { TrainingElementSchema } from "@api/schemas/index"
import { ResponseSchema } from "@api/schemas/responseSchema"
import type { InternalCoursesRequest } from "@types"
import { getDemo } from "../db/actions/getDemo"
import { getFetchHeaders } from "./getFetchHeaders"

export const getInternalCoursesRequests = async (): Promise<
  InternalCoursesRequest[]
> => {
  const isDemo = await getDemo()
  if (isDemo) return InternalCoursesDummyData

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/training"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = { create_employee_id: 1722 }
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
  const validatedResponse = ResponseSchema.parse(responseJson)
  const { result } = validatedResponse
  const { data } = result
  const validatedData = TrainingElementSchema.array().parse(data)

  // ! PARSING
  // ! ==================================
  const returnedData: InternalCoursesRequest[] = validatedData.map((data) => {
    const trainingItem: InternalCoursesRequest = {
      id: data.id.toString(),
      courseName: data.name,
      fromDate: data.date_from,
      toDate: data.date_to,
      duration: data.number_of_days.toString(),
      type: data.type,
      trainingCenter: data.training_center,
      status: data.state,
    }
    return trainingItem
  })

  return returnedData
}

const InternalCoursesDummyData: InternalCoursesRequest[] = [
  {
    id: "15",
    courseName: "Certified Power PI Professional",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    duration: "3 أيام",
    type: "محلي",
    trainingCenter: "أكاديمية الاستثمار",
    status: "اعتمد",
  },
  {
    id: "159",
    courseName: "Certified Power BI Professional",
    fromDate: "2024-05-05",
    toDate: "2024-05-05",
    duration: "7 أيام",
    type: "دولي",
    trainingCenter: "أكاديمية الاستثمار",
    status: "الترشح",
  },
  {
    id: "158",
    courseName: "Data Analysis with Python",
    fromDate: "2024-06-10",
    toDate: "2024-06-15",
    duration: "5 أيام",
    type: "محلي",
    trainingCenter: "المعهد التقني للبيانات",
    status: "جديد",
  },
  {
    id: "156",
    courseName: "Advanced Excel for Business",
    fromDate: "2024-07-01",
    toDate: "2024-07-05",
    duration: "5 أيام",
    type: "دولي",
    trainingCenter: "مركز المهارات المالية",
    status: "اعتمد",
  },
  {
    id: "155",
    courseName: "Project Management Professional (PMP)",
    fromDate: "2024-08-15",
    toDate: "2024-08-20",
    duration: "6 أيام",
    type: "محلي",
    trainingCenter: "أكاديمية القيادة والإدارة",
    status: "الترشح",
  },
  {
    id: "153",
    courseName: "Cybersecurity Essentials",
    fromDate: "2024-09-05",
    toDate: "2024-09-10",
    duration: "5 أيام",
    type: "دولي",
    trainingCenter: "مركز الأمن السيبراني",
    status: "جديد",
  },
  {
    id: "152",
    courseName: "Artificial Intelligence Fundamentals",
    fromDate: "2024-10-12",
    toDate: "2024-10-18",
    duration: "6 أيام",
    type: "محلي",
    trainingCenter: "معهد الذكاء الاصطناعي",
    status: "اعتمد",
  },
  {
    id: "151",
    courseName: "Full-Stack Web Development",
    fromDate: "2024-11-05",
    toDate: "2024-11-20",
    duration: "15 أيام",
    type: "دولي",
    trainingCenter: "أكاديمية البرمجة الحديثة",
    status: "الترشح",
  },
  // {
  //   id: '#62398',
  //   courseName: 'Cloud Computing with AWS',
  //   fromDate: '2024-12-01',
  //   toDate: '2024-12-07',
  //   duration: '6 أيام',
  //   type: 'محلي',
  //   trainingCenter: 'مركز الحوسبة السحابية',
  //   status: 'جديد',
  // },
  // {
  //   id: '#63125',
  //   courseName: 'Digital Marketing Strategies',
  //   fromDate: '2025-01-10',
  //   toDate: '2025-01-15',
  //   duration: '5 أيام',
  //   type: 'دولي',
  //   trainingCenter: 'معهد التسويق الرقمي',
  //   status: 'اعتمد',
  // },
  // {
  //   id: '#64578',
  //   courseName: 'Machine Learning with TensorFlow',
  //   fromDate: '2025-02-15',
  //   toDate: '2025-02-20',
  //   duration: '6 أيام',
  //   type: 'محلي',
  //   trainingCenter: 'مركز الذكاء الاصطناعي التطبيقي',
  //   status: 'الترشح',
  // },
  // {
  //   id: '#65987',
  //   courseName: 'Blockchain and Cryptocurrency',
  //   fromDate: '2025-03-05',
  //   toDate: '2025-03-10',
  //   duration: '5 أيام',
  //   type: 'دولي',
  //   trainingCenter: 'أكاديمية الابتكار المالي',
  //   status: 'جديد',
  // },
]
