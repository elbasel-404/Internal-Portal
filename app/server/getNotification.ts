"use server";

import type { NotificationItem } from "@types";

export const getNotifications = async (): Promise<NotificationItem[]> => {
  return notifications;
};
const notifications: NotificationItem[] = [
  {
    date: "2024-05-05",
    time: "04:30.00",
    message:
      "تم اعتماد العقد رقم 2024-001 ويعتمد على إدخالكم بيانات محضر بدء...",
    icon: "MemoCircleCheck",
    unread: true,
  },
  {
    date: "2024-05-05",
    time: "04:30.00",
    message: "تم اسناد طلب تعاقد لك",
    icon: "NoteCheck",
  },
  {
    date: "2024-05-05",
    time: "04:30.00",
    message: "لقد تم تقديم طلب إغلاق الفترات المالية رقم الطلب 0033",
    icon: "PaperPlane",
    unread: true,
  },
];
