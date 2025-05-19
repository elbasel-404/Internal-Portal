'use server';

import { DeputationRequestDetails } from '@types';

export const getDeputationRequestDetails = async (
  id: string
): Promise<DeputationRequestDetails | void> => {
  try {
    const details: DeputationRequestDetails = {
      id,
      requestDate: "17-04-2024",
      deputation: "داخلي",
      transportation: "برا",
      startDate: "10/10/2024",
      endDate: "20/10/2024",
      duration: "10 ايام",
      city: "الدمام",
      deputationType: "مهمة عمل",
      task: "اجتماع",
      taskDetails: "بالأمس، عُقد اجتماع مهم في قاعة الاجتماعات الرئيسية بمقر الشركة، بحضور المدير العام وعدد من المسؤولين والموظفين. تم خلال الاجتماع مناقشة نتائج العمل خلال الفترة الماضية، واستعراض التحديات التي واجهت الفريق، بالإضافة إلى وضع خطة عمل للمرحلة القادمة. كما تم التركيز على أهمية التعاون بين الأقسام المختلفة من أجل تحقيق الأهداف المرجوة. في نهاية الاجتماع، تم فتح المجال لطرح الأسئلة والمقترحات، مما ساهم في تعزيز روح المشاركة والتواصل بين جميع الحاضرين.",
      departureDatesStatus: "قبل بداية الانتداب",
      travelDuration: "8 ايام",
      travelStartDate: "10/10/2024",
      travelEndDate: "17/10/2024",
      deputationAmount: "2400.00",
      transferDate: "10/10/2024",
      reserved: "نعم",
      status: "مرفوض",
      reason: "غير مناسب",
      notes: "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف",
      attachments: [
        new File([''], 'نموذج طلب .pdf'),
        new File([''], 'نموذج طلب 2 .pdf'),
      ],
    };
    return details;
  } catch (error) {
    console.error('Error in getWorkDocumentDetails:', error);
    return;
  }
};
