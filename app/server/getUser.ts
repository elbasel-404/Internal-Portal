"use server"

import type { User } from "@types"

export const getUser = async (): Promise<User> => {
  return user
}

const user = {
  name: "عساف بن رشود الصاعدي",
  job: "مدير الأنظمة الداخلية (مكلف)",
  department: "الانظمة الداخلية",
  score: 12,
  duration: "1 سنة و6 شهر و 13 يوم",
  employeeId: "1762",
  image: "/demo-img.png",
}
