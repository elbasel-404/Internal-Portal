"use server"

import { DeputationElementSchema, ResponseSchema } from "@api/schemas/index"
import { getDemo } from "@db/actions"
import { DeputationRequestDetails } from "@types"
import { getFetchHeaders } from "./getFetchHeaders"

export const getDeputationRequestDetails = async (
  id: string,
): Promise<DeputationRequestDetails> => {
  const isDemo = await getDemo()
  if (isDemo) return details

  const DeputationType = (value: string) => {
    switch (value) {
      case "internal":
        return "داخلي"
      case "external":
        return "خارجي"
      default:
        return "غير محدد"
    }
  }

  // ! VARIABLES
  // ! ==================================
  const url = "api/po/hr/deputation"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = { id: id }
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
  const validatedData = DeputationElementSchema.parse(data[0])

  // ! PARSING
  // ! ==================================
  const returnedData: DeputationRequestDetails = {
    id: validatedData.id.toString(),
    requestDate: validatedData.create_date.split(" ")[0],
    deputation: DeputationType(validatedData.type),
    transportation: validatedData.transportation_type,
    deputationType: validatedData.deputation_type[1].toString(),
    trainingRequestNumber: validatedData.training_request_id.toString(),
    startDate: validatedData.date_from,
    endDate: validatedData.date_to,
    duration: validatedData.duration.toString(),
    kilometers: validatedData.distance.toString(),
    city: validatedData.city_id[1].toString(),
    task: validatedData.task_name,
    taskDetails:
      typeof validatedData.note === "string"
        ? validatedData.note
        : validatedData.note
          ? validatedData.note.toString()
          : "__",
    departureDatesStatus:
      validatedData.travel_days_setting === "before_deputation"
        ? "قبل بداية الانتداب"
        : "بعد بداية الانتداب",
    travelDuration: validatedData.travel_days.toString(),
    travelStartDate: validatedData.date_from_travel,
    travelEndDate: validatedData.date_to_travel,
    deputationAmount: validatedData.amount.toString(),
    transferDate:
      typeof validatedData.expected_date === "string"
        ? validatedData.expected_date
        : validatedData.expected_date
          ? validatedData.expected_date.toString()
          : "__",
    reserved: validatedData.ticket_reserved,
    issueVisa: validatedData.is_need_visa,
    replacementEmployee:
      Array.isArray(validatedData.substitute_employee_id) &&
      validatedData.substitute_employee_id[1]
        ? validatedData.substitute_employee_id[1].toString()
        : "__",
    status: validatedData.state,
    reason: validatedData.refuse_reason.toString() || "__",
    deputationPlaces: [
      { id: "1", name: "السعودية", city: "الرياض" },
      { id: "2", name: "مصر", city: "القاهرة" },
    ],
    attachments: Array.isArray(validatedData.attachment_ids)
      ? validatedData.attachment_ids.map((file) => new File([""], String(file)))
      : [],
  }

  return returnedData
}

const details: DeputationRequestDetails = {
  id: "2",
  requestDate: "17-04-2024",
  deputation: "خارجي",
  transportation: "برا",
  deputationType: "رحلة تدريب",
  trainingRequestNumber: "54800001",
  startDate: "10/10/2024",
  endDate: "20/10/2024",
  duration: "10 ايام",
  kilometers: "1000 كيلومتر",
  city: "الدمام",
  task: "اجتماع",
  taskDetails:
    "بالأمس، عُقد اجتماع مهم في قاعة الاجتماعات الرئيسية بمقر الشركة، بحضور المدير العام وعدد من المسؤولين والموظفين. تم خلال الاجتماع مناقشة نتائج العمل خلال الفترة الماضية، واستعراض التحديات التي واجهت الفريق، بالإضافة إلى وضع خطة عمل للمرحلة القادمة. كما تم التركيز على أهمية التعاون بين الأقسام المختلفة من أجل تحقيق الأهداف المرجوة. في نهاية الاجتماع، تم فتح المجال لطرح الأسئلة والمقترحات، مما ساهم في تعزيز روح المشاركة والتواصل بين جميع الحاضرين.",
  departureDatesStatus: "قبل بداية الانتداب",
  travelDuration: "8 ايام",
  travelStartDate: "10/10/2024",
  travelEndDate: "17/10/2024",
  deputationAmount: "2400.00",
  transferDate: "10/10/2024",
  reserved: true,
  issueVisa: false,
  replacementEmployee: "محمد علي",
  status: "مرفوض",
  reason: "غير مناسب",
  deputationPlaces: [
    { id: "1", name: "السعودية", city: "الرياض" }, // Saudi Arabia
    { id: "2", name: "مصر", city: "القاهرة" }, // Egypt
    { id: "3", name: "المغرب", city: "الرباط" }, // Morocco
    { id: "4", name: "تونس", city: "تونس" }, // Tunisia
    { id: "5", name: "الجزائر", city: "الجزائر" }, // Algeria
    { id: "6", name: "العراق", city: "بغداد" }, // Iraq
    { id: "7", name: "سوريا", city: "دمشق" }, // Syria
    { id: "8", name: "السودان", city: "الخرطوم" }, // Sudan
    { id: "9", name: "عُمان", city: "مسقط" }, // Oman
    { id: "10", name: "قطر", city: "الدوحة" },
  ],
  attachments: [
    new File([""], "نموذج طلب .pdf"),
    new File([""], "نموذج طلب 2 .pdf"),
  ],
}
