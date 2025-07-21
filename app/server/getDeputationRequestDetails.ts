"use server"

import { DeputationElementSchema, ResponseSchema } from "@api/schemas/index"
import { DeputationRequestDetails } from "@types"
import { getData } from "./getData"

export const getDeputationRequestDetails = async (
  id: string,
): Promise<DeputationRequestDetails> => {
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

  const result = await getData<DeputationRequestDetails>({
    url: "api/po/hr/deputation",
    responseSchema: ResponseSchema,
    dataSchema: DeputationElementSchema,
    parseData: (data) => {
      if (!data || data.length === 0) {
        return [dummyData]
      }

      const typedData = data[0] as Record<string, unknown>

      return [
        {
          id: String(typedData.id),
          requestDate: String(typedData.create_date).split(" ")[0],
          deputation: DeputationType(String(typedData.type)),
          transportation: String(typedData.transportation_type),
          deputationType: String(typedData.deputation_type)[1].toString(),
          trainingRequestNumber: String(
            typedData.training_request_id,
          ).toString(),
          startDate: String(typedData.date_from),
          endDate: String(typedData.date_to),
          duration: String(typedData.duration).toString(),
          kilometers: String(typedData.distance).toString(),
          city: String(typedData.city_id)[1].toString(),
          task: String(typedData.task_name),
          taskDetails:
            typeof typedData.note === "string"
              ? typedData.note
              : typedData.note
                ? typedData.note.toString()
                : "__",
          departureDatesStatus:
            typedData.travel_days_setting === "before_deputation"
              ? "قبل بداية الانتداب"
              : "بعد بداية الانتداب",
          travelDuration: String(typedData.travel_days).toString(),
          travelStartDate: String(typedData.date_from_travel),
          travelEndDate: String(typedData.date_to_travel),
          deputationAmount: String(typedData.amount).toString(),
          transferDate:
            typeof typedData.expected_date === "string"
              ? typedData.expected_date
              : typedData.expected_date
                ? typedData.expected_date.toString()
                : "__",
          reserved: Boolean(typedData.ticket_reserved),
          issueVisa: Boolean(typedData.is_need_visa),
          replacementEmployee:
            Array.isArray(typedData.substitute_employee_id) &&
            typedData.substitute_employee_id[1]
              ? typedData.substitute_employee_id[1].toString()
              : "__",
          status: String(typedData.state),
          reason: String(typedData.refuse_reason).toString() || "__",
          deputationPlaces: [
            { id: "1", name: "السعودية", city: "الرياض" },
            { id: "2", name: "مصر", city: "القاهرة" },
          ],
          attachments: Array.isArray(typedData.attachment_ids)
            ? typedData.attachment_ids.map(
                (file) => new File([""], String(file)),
              )
            : [],
        },
      ]
    },
    additionalBody: { id },
    dummyData: [dummyData],
  })

  return result[0]
}

const dummyData: DeputationRequestDetails = {
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
