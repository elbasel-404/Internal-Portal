"use server"

import { cookies } from "next/headers"
export const setUserId = async (userId: number) => {
  const cookiesStore = await cookies()
  cookiesStore.set("userId", userId.toFixed(), {
    expires: new Date("9999-12-31T23:59:59.999Z"),
    secure: false,
  })
}
