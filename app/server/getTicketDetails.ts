"use server"

import { TicketDetails } from "@types"

export const getTicketDetails = async (
  id: string,
): Promise<TicketDetails | void> => {
  try {
    const details: TicketDetails = {
      id,
      requestDate: "17-04-2024",
      subject: "طلب لابتوب المدربة لمياء الدوسري",
      technicalTeam: "الدعم الفني",
      predicate: "Abdulaziz A Al Khuraiji",
      priority: "3",
      category: "اخرى",
      location: "الرياض",
      state: "تم حل الطلب",
      description:
        "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف",
      descriptionSolution:
        "ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظفملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف ملاحظة حول طلب اجازة تم فتحها من قبل الموظف",
      attachments: [
        new File([""], "نموذج طلب 2 .pdf"),
        new File([""], "نموذج طلب .pdf"),
      ],
    }
    return details
  } catch {
    return
  }
}
