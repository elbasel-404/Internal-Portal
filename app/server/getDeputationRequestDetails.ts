"use server";

import { DeputationRequestDetails } from "@types";

export const getDeputationRequestDetails = async (
  id: string
): Promise<DeputationRequestDetails | void> => {
  try {
    const details: DeputationRequestDetails = {
      id,
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
      notes:
        "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف",
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
    };
    return details;
  } catch (error) {
    console.error("Error in getWorkDocumentDetails:", error);
    return;
  }
};
